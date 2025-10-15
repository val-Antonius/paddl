import { NextRequest, NextResponse } from 'next/server';
import { createBookingWithPayment } from '@/lib/db/bookings';
import { getUserFromToken } from '@/lib/auth/service';
import { getCourtByName } from '@/lib/db/courts';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required'
        },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid token'
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { slots, totalAmount, adminFee } = body;

    // Validation
    if (!slots || !Array.isArray(slots) || slots.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data'
        },
        { status: 400 }
      );
    }

    // Prepare slots with court IDs
    const preparedSlots = [];
    for (const slot of slots) {
      const { court, date, time, session, price } = slot;

      // Get court ID
      const courtData = await getCourtByName(court);
      if (!courtData) {
        return NextResponse.json(
          {
            success: false,
            error: `Court "${court}" not found`
          },
          { status: 404 }
        );
      }

      preparedSlots.push({
        court_id: courtData.id,
        booking_date: date,
        time_slot: time,
        session,
        price
      });
    }

    // Create booking with Midtrans payment
    const result = await createBookingWithPayment(
      user.id,
      {
        name: user.name,
        email: user.email,
        phone: user.phone ?? undefined // ← FIX: Convert null to undefined
      },
      preparedSlots,
      totalAmount,
      adminFee || 5000
    );

    return NextResponse.json({
      success: true,
      data: {
        bookingId: result.booking.id,
        bookingNumber: result.booking.booking_number,
        status: result.booking.status,
        paymentStatus: result.booking.payment_status,
        totalAmount: result.booking.total_amount,
        adminFee: result.booking.admin_fee,
        paymentExpiredAt: result.booking.payment_expired_at,
        snapToken: result.snapToken,
        redirectUrl: result.redirectUrl,
        slots: result.booking.slots
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('POST /api/bookings error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create booking'
      },
      { status: 500 }
    );
  }
}