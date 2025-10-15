import { NextResponse } from 'next/server';
import { getAllCourts } from '@/lib/db/courts';

export async function GET() {
  try {
    const courts = await getAllCourts();
    
    return NextResponse.json({
      success: true,
      data: courts
    });
  } catch (error) {
    console.error('GET /api/courts error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch courts'
      },
      { status: 500 }
    );
  }
}