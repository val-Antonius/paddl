import { NextRequest, NextResponse } from 'next/server';
import { getBookedSlots } from '@/lib/db/bookings';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startDate, endDate } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'startDate and endDate are required'
        },
        { status: 400 }
      );
    }

    const bookedSlots = await getBookedSlots(startDate, endDate);

    // Transform data untuk frontend
    const formattedSlots = bookedSlots.map((slot: any) => ({
      date: slot.booking_date,
      court: slot.court?.name || '',
      courtId: slot.court_id,
      time: slot.time_slot,
      session: slot.session
    }));

    return NextResponse.json({
      success: true,
      data: formattedSlots
    });
  } catch (error) {
    console.error('POST /api/bookings/check-availability error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check availability'
      },
      { status: 500 }
    );
  }
}
