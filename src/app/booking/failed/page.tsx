'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-16 h-16 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Pembayaran Gagal
        </h1>
        
        <p className="text-gray-600 mb-2">
          Maaf, pembayaran Anda tidak dapat diproses.
        </p>
        
        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            Order ID: {orderId}
          </p>
        )}
        
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-red-800 font-medium mb-2">
            Kemungkinan penyebab:
          </p>
          <ul className="text-sm text-red-700 text-left space-y-1">
            <li>• Saldo tidak mencukupi</li>
            <li>• Kartu ditolak oleh bank</li>
            <li>• Koneksi terputus</li>
            <li>• Batas waktu pembayaran habis</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all"
          >
            Coba Lagi
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}