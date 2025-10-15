import { NextRequest, NextResponse } from 'next/server';
import { expireUnpaidBookings } from '@/lib/db/bookings';

// Endpoint ini bisa dipanggil oleh cron service (Vercel Cron, atau external cron)
// Atau bisa juga dipanggil manual untuk testing

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional, untuk security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized'
        },
        { status: 401 }
      );
    }

    console.log('Running expire bookings cron job...');
    
    const expiredCount = await expireUnpaidBookings();
    
    console.log(`Expired ${expiredCount} bookings`);

    return NextResponse.json({
      success: true,
      message: `Successfully expired ${expiredCount} bookings`,
      count: expiredCount
    });

  } catch (error) {
    console.error('Cron expire bookings error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to expire bookings'
      },
      { status: 500 }
    );
  }
}