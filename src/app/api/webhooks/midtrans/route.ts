import { NextRequest, NextResponse } from 'next/server';
import { updateBookingPaymentStatus } from '@/lib/db/bookings';
import { verifySignatureKey } from '@/lib/midtrans/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
      transaction_id
    } = body;

    console.log('Midtrans notification received:', {
      order_id,
      transaction_status,
      payment_type
    });

    // // Verify signature
    // const isValid = verifySignatureKey(
    //   order_id,
    //   status_code,
    //   gross_amount,
    //   signature_key
    // );

    // if (!isValid) {
    //   console.error('Invalid signature from Midtrans');
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: 'Invalid signature'
    //     },
    //     { status: 403 }
    //   );
    // }

const isValid = true; // ← Temporary untuk testing

console.log('=== SIGNATURE VERIFICATION ===', {
  isValid,
  order_id,
  status_code,
  gross_amount
});

if (!isValid) {
  console.error('❌ Invalid signature from Midtrans');
  return NextResponse.json(
    {
      success: false,
      error: 'Invalid signature'
    },
    { status: 403 }
  );
}


    // Update booking status
    const updated = await updateBookingPaymentStatus(
      order_id,
      transaction_status,
      fraud_status || 'accept',
      {
        transaction_id,
        status_code,
        transaction_status,
        fraud_status,
        payment_type,
        gross_amount
      }
    );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update booking'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Notification processed'
    });

  } catch (error) {
    console.error('Midtrans webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process notification'
      },
      { status: 500 }
    );
  }
}