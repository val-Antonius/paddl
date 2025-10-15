import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, cancelBooking } from '@/lib/db/bookings';

// GET /api/bookings/:id - Get booking details
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const booking = await getBookingById(params.id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('GET /api/bookings/:id error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch booking'
      },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/:id - Update booking (SIMPLIFIED)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    // Untuk update payment status, seharusnya dari webhook Midtrans
    // Endpoint ini bisa dihapus atau digunakan untuk update lain
    
    return NextResponse.json(
      {
        success: false,
        error: 'Please use webhook for payment updates'
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('PATCH /api/bookings/:id error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update booking'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/:id - Cancel booking
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const success = await cancelBooking(params.id);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to cancel booking or booking cannot be cancelled'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('DELETE /api/bookings/:id error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to cancel booking'
      },
      { status: 500 }
    );
  }
}