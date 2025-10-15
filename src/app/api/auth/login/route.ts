import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required'
        },
        { status: 400 }
      );
    }

    // Login user
    const result = await login({ email, password });

    // Set cookie
    const response = NextResponse.json({
      success: true,
      data: result
    });

    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('POST /api/auth/login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to login'
      },
      { status: 401 }
    );
  }
}