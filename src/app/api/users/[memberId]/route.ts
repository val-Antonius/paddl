import { NextRequest, NextResponse } from 'next/server';
import { getUserByMemberId } from '@/lib/db/users';
import { getUserBookings } from '@/lib/db/bookings';

// GET /api/users/:memberId - Get user details with bookings
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ memberId: string }> }
) {
  try {
    const params = await context.params;
    const user = await getUserByMemberId(params.memberId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found'
        },
        { status: 404 }
      );
    }

    // Get user's bookings
    const bookings = await getUserBookings(user.id);

    return NextResponse.json({
      success: true,
      data: {
        user,
        bookings
      }
    });
  } catch (error) {
    console.error('GET /api/users/:memberId error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user'
      },
      { status: 500 }
    );
  }
}