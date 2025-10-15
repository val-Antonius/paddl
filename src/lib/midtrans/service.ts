import midtransClient from 'midtrans-client';

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

// Create Snap API instance
export const snap = new midtransClient.Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!
});

// Create Core API instance (untuk cek status)
export const coreApi = new midtransClient.CoreApi({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!
});

export interface MidtransTransactionParams {
  orderId: string;
  grossAmount: number;
  customerDetails: {
    firstName: string;
    email: string;
    phone?: string;
  };
  itemDetails: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export async function createTransaction(params: MidtransTransactionParams) {
  const parameter = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount
    },
    customer_details: {
      first_name: params.customerDetails.firstName,
      email: params.customerDetails.email,
      phone: params.customerDetails.phone || ''
    },
    item_details: params.itemDetails,
    credit_card: {
      secure: true
    },
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success`,
      error: `${process.env.NEXT_PUBLIC_APP_URL}/booking/failed`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL}/booking/pending`
    },
    expiry: {
      unit: 'minutes' as const,
      duration: parseInt(process.env.PAYMENT_EXPIRY_MINUTES || '60')
    }
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return {
      token: transaction.token,
      redirectUrl: transaction.redirect_url
    };
  } catch (error) {
    console.error('Midtrans create transaction error:', error);
    throw error;
  }
}

export async function getTransactionStatus(orderId: string) {
  try {
    const status = await coreApi.transaction.status(orderId);
    return status;
  } catch (error) {
    console.error('Midtrans get status error:', error);
    throw error;
  }
}

export async function cancelTransaction(orderId: string) {
  try {
    const result = await coreApi.transaction.cancel(orderId);
    return result;
  } catch (error) {
    console.error('Midtrans cancel transaction error:', error);
    throw error;
  }
}

// Helper untuk verify notification signature
export function verifySignatureKey(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const crypto = require('crypto');
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  
  const hash = crypto
    .createHash('sha512')
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest('hex');
  
  return hash === signatureKey;
}