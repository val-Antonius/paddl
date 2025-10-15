import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/auth/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email, password, and name are required'
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format'
        },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 6 characters'
        },
        { status: 400 }
      );
    }

    // Register user
    const result = await register({ email, password, name, phone });

    // Set cookie
    const response = NextResponse.json(
      {
        success: true,
        data: result
      },
      { status: 201 }
    );

    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('POST /api/auth/register error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to register'
      },
      { status: 400 }
    );
  }
}