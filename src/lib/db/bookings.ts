import { supabaseServer } from '../supabase/server';
import { createTransaction } from '../midtrans/service';
import type { Booking, BookingSlot, InsertBooking, InsertBookingSlot } from '@/types/database';

const PAYMENT_EXPIRY_MINUTES = parseInt(process.env.PAYMENT_EXPIRY_MINUTES || '60');

// Generate booking number
export function generateBookingNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BK${year}${month}${day}${random}`;
}

// Check if slot time has passed
export function hasSlotTimePassed(date: string, time: string): boolean {
  const slotDateTime = new Date(`${date}T${time}`);
  return slotDateTime < new Date();
}

// Check slot availability with time validation
export async function checkSlotAvailability(
  courtId: string,
  date: string,
  timeSlot: string
): Promise<{ available: boolean; reason?: string }> {
  // Check if slot time has passed
  if (hasSlotTimePassed(date, timeSlot)) {
    return { available: true }; // Slot sudah lewat, bisa dibooking lagi
  }

  // Check database
  const { data, error } = await supabaseServer.rpc('is_slot_available', {
    p_court_id: courtId,
    p_booking_date: date,
    p_time_slot: timeSlot
  });

  if (error) {
    console.error('Error checking availability:', error);
    return { available: false, reason: 'Database error' };
  }

  return {
    available: data === true,
    reason: data === false ? 'Slot already booked' : undefined
  };
}

// Get booked slots for date range (exclude expired)
export async function getBookedSlots(
  startDate: string,
  endDate: string
): Promise<any[]> {
  const { data, error } = await supabaseServer
    .from('booking_slots')
    .select(`
      *,
      court:courts(id, name),
      booking:bookings!inner(id, status, payment_status)
    `)
    .gte('booking_date', startDate)
    .lte('booking_date', endDate)
    .in('booking.status', ['pending', 'confirmed'])
    .neq('booking.payment_status', 'expired');

  if (error) {
    console.error('Error fetching booked slots:', error);
    throw new Error('Failed to fetch booked slots');
  }

  // Filter slots yang waktunya belum lewat
  const now = new Date();
  const activeSlots = (data || []).filter((slot: any) => {
    const slotTime = new Date(`${slot.booking_date}T${slot.time_slot}`);
    return slotTime > now;
  });

  return activeSlots;
}

// Create booking with Midtrans payment
export async function createBookingWithPayment(
  userId: string,
  userDetails: { name: string; email: string; phone?: string },
  slots: Omit<InsertBookingSlot, 'booking_id'>[],
  totalAmount: number,
  adminFee: number
): Promise<{ booking: any; snapToken: string; redirectUrl: string }> {
  // Validate all slots
  for (const slot of slots) {
    const availability = await checkSlotAvailability(
      slot.court_id,
      slot.booking_date,
      slot.time_slot
    );

    if (!availability.available) {
      throw new Error(
        `Slot ${slot.time_slot} on ${slot.booking_date} is not available: ${availability.reason}`
      );
    }
  }

  // Generate booking number
  const bookingNumber = generateBookingNumber();
  const orderId = `ORDER-${bookingNumber}`;

  // Calculate payment expiry
  const paymentExpiredAt = new Date();
  paymentExpiredAt.setMinutes(paymentExpiredAt.getMinutes() + PAYMENT_EXPIRY_MINUTES);

  // Prepare item details untuk Midtrans
  const itemDetails = slots.map((slot, index) => ({
    id: `SLOT-${index + 1}`,
    name: `Booking Slot ${slot.time_slot} - ${slot.session}`,
    price: slot.price,
    quantity: 1
  }));

  // Add admin fee
  itemDetails.push({
    id: 'ADMIN-FEE',
    name: 'Biaya Admin',
    price: adminFee,
    quantity: 1
  });

  // Create Midtrans transaction
  const midtransResponse = await createTransaction({
    orderId,
    grossAmount: totalAmount + adminFee,
    customerDetails: {
      firstName: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone
    },
    itemDetails
  });

  // Create booking in database
  const bookingData: InsertBooking = {
    user_id: userId,
    booking_number: bookingNumber,
    booking_date: slots[0].booking_date,
    total_amount: totalAmount,
    admin_fee: adminFee,
    status: 'pending',
    payment_status: 'unpaid',
    midtrans_order_id: orderId,
    midtrans_snap_token: midtransResponse.token,
    midtrans_redirect_url: midtransResponse.redirectUrl,
    payment_expired_at: paymentExpiredAt.toISOString()
  };

  const { data: booking, error: bookingError } = await supabaseServer
    .from('bookings')
    .insert(bookingData)
    .select()
    .single();

  if (bookingError) {
    console.error('Error creating booking:', bookingError);
    throw new Error('Failed to create booking');
  }

  // Insert slots
  const slotsWithBookingId = slots.map(slot => ({
    ...slot,
    booking_id: booking.id
  }));

  const { data: insertedSlots, error: slotsError } = await supabaseServer
    .from('booking_slots')
    .insert(slotsWithBookingId)
    .select();

  if (slotsError) {
    // Rollback: delete booking
    await supabaseServer.from('bookings').delete().eq('id', booking.id);
    console.error('Error creating booking slots:', slotsError);
    throw new Error('Failed to create booking slots');
  }

  // Log payment event
  await supabaseServer.from('payment_logs').insert({
    booking_id: booking.id,
    event_type: 'create',
    notes: 'Booking created, waiting for payment'
  });

  return {
    booking: {
      ...booking,
      slots: insertedSlots
    },
    snapToken: midtransResponse.token,
    redirectUrl: midtransResponse.redirectUrl
  };
}

// Update booking payment status dari Midtrans notification
export async function updateBookingPaymentStatus(
  orderId: string,
  transactionStatus: string,
  fraudStatus: string,
  midtransResponse: any
): Promise<boolean> {
  const { data: booking } = await supabaseServer
    .from('bookings')
    .select('id, status')
    .eq('midtrans_order_id', orderId)
    .single();

  if (!booking) {
    console.error('Booking not found for order:', orderId);
    return false;
  }

  let newPaymentStatus = 'unpaid';
  let newStatus = booking.status;
  let paidAt = null;

  // Map Midtrans status
  if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
    if (fraudStatus === 'accept') {
      newPaymentStatus = 'paid';
      newStatus = 'confirmed';
      paidAt = new Date().toISOString();
    }
  } else if (transactionStatus === 'pending') {
    newPaymentStatus = 'pending';
  } else if (transactionStatus === 'deny' || transactionStatus === 'cancel') {
    newPaymentStatus = 'failed';
    newStatus = 'cancelled';
  } else if (transactionStatus === 'expire') {
    newPaymentStatus = 'expired';
    newStatus = 'expired';
  }

  // Update booking
  const updateData: any = {
    payment_status: newPaymentStatus,
    status: newStatus,
    midtrans_transaction_id: midtransResponse.transaction_id,
    payment_method: midtransResponse.payment_type,
    updated_at: new Date().toISOString()
  };

  if (paidAt) {
    updateData.paid_at = paidAt;
  }

  const { error } = await supabaseServer
    .from('bookings')
    .update(updateData)
    .eq('id', booking.id);

  if (error) {
    console.error('Error updating booking payment:', error);
    return false;
  }

  // Log payment event
  await supabaseServer.from('payment_logs').insert({
    booking_id: booking.id,
    event_type: transactionStatus,
    midtrans_response: midtransResponse,
    status_code: midtransResponse.status_code,
    transaction_status: transactionStatus,
    fraud_status: fraudStatus,
    notes: `Payment ${transactionStatus}`
  });

  return true;
}

// Expire unpaid bookings (bisa dipanggil via cron)
export async function expireUnpaidBookings(): Promise<number> {
  const { data: expiredBookings, error } = await supabaseServer
    .from('bookings')
    .update({
      status: 'expired',
      payment_status: 'expired',
      updated_at: new Date().toISOString()
    })
    .eq('status', 'pending')
    .in('payment_status', ['unpaid', 'pending'])
    .lt('payment_expired_at', new Date().toISOString())
    .select();

  if (error) {
    console.error('Error expiring bookings:', error);
    return 0;
  }

  // Log expired bookings
  if (expiredBookings && expiredBookings.length > 0) {
    const logs = expiredBookings.map(booking => ({
      booking_id: booking.id,
      event_type: 'expired',
      notes: 'Auto-expired due to payment timeout'
    }));

    await supabaseServer.from('payment_logs').insert(logs);
  }

  return expiredBookings?.length || 0;
}

// Get booking by ID with full details
export async function getBookingById(id: string): Promise<any> {
  const { data, error } = await supabaseServer
    .from('bookings')
    .select(`
      *,
      user:users(id, name, email, phone, member_id),
      slots:booking_slots(
        *,
        court:courts(id, name, description)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching booking:', error);
    return null;
  }

  return data;
}

// Get booking by order ID
export async function getBookingByOrderId(orderId: string): Promise<any> {
  const { data, error } = await supabaseServer
    .from('bookings')
    .select(`
      *,
      user:users(id, name, email, phone, member_id),
      slots:booking_slots(
        *,
        court:courts(id, name, description)
      )
    `)
    .eq('midtrans_order_id', orderId)
    .single();

  if (error) {
    console.error('Error fetching booking by order:', error);
    return null;
  }

  return data;
}

// Get user bookings
export async function getUserBookings(userId: string): Promise<any[]> {
  const { data, error } = await supabaseServer
    .from('bookings')
    .select(`
      *,
      slots:booking_slots(
        *,
        court:courts(id, name, description)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }

  return data || [];
}

// Cancel booking
export async function cancelBooking(bookingId: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from('bookings')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('id', bookingId)
    .in('status', ['pending']); // Hanya bisa cancel yang pending

  if (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }

  // Log cancellation
  await supabaseServer.from('payment_logs').insert({
    booking_id: bookingId,
    event_type: 'cancel',
    notes: 'Booking cancelled by user'
  });

  return true;
}