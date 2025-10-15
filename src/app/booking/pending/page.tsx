'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Clock } from 'lucide-react';

export default function PaymentPendingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md text-center">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-16 h-16 text-yellow-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Pembayaran Pending
        </h1>
        
        <p className="text-gray-600 mb-2">
          Pembayaran Anda sedang diproses.
        </p>
        
        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            Order ID: {orderId}
          </p>
        )}
        
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            Silakan selesaikan pembayaran Anda sesuai instruksi yang diberikan.
            Status booking akan otomatis diperbarui setelah pembayaran dikonfirmasi.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}