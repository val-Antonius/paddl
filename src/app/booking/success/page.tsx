'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Receipt
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchBookingDetail(params.id as string);
    }
  }, [params.id]);

  const fetchBookingDetail = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        credentials: 'include'
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch booking');
      }

      setBooking(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, paymentStatus: string) => {
    if (paymentStatus === 'paid' && status === 'confirmed') {
      return (
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          <CheckCircle className="w-5 h-5" />
          Pembayaran Berhasil
        </div>
      );
    } else if (paymentStatus === 'pending') {
      return (
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
          <AlertCircle className="w-5 h-5" />
          Menunggu Pembayaran
        </div>
      );
    } else if (status === 'expired' || paymentStatus === 'expired') {
      return (
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
          <XCircle className="w-5 h-5" />
          Expired
        </div>
      );
    } else if (status === 'cancelled') {
      return (
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
          <XCircle className="w-5 h-5" />
          Dibatalkan
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          <AlertCircle className="w-5 h-5" />
          Pending
        </div>
      );
    }
  };

  const handlePayNow = () => {
    if (booking && booking.midtrans_snap_token && window.snap) {
      window.snap.pay(booking.midtrans_snap_token, {
        onSuccess: function(result: any) {
          fetchBookingDetail(params.id as string);
        },
        onPending: function(result: any) {
          fetchBookingDetail(params.id as string);
        },
        onError: function(result: any) {
          alert('Pembayaran gagal. Silakan coba lagi.');
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail booking...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Tidak Ditemukan</h3>
          <p className="text-gray-600 mb-6">{error || 'Data booking tidak tersedia'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const isPaid = booking.payment_status === 'paid';
  const isPending = booking.payment_status === 'pending' || booking.payment_status === 'unpaid';
  const isExpired = booking.status === 'expired' || booking.payment_status === 'expired';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Load Midtrans Snap */}
      <script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      ></script>

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Kembali</span>
        </button>

        {/* Status Badge */}
        <div className="mb-6">
          {getStatusBadge(booking.status, booking.payment_status)}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <Receipt className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Detail Booking</h1>
            </div>
            <p className="text-indigo-100">Nomor Booking: {booking.booking_number}</p>
          </div>

          <div className="p-6">
            {/* User Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Informasi Pemesan</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama:</span>
                  <span className="font-medium text-gray-800">{booking.user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-800">{booking.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member ID:</span>
                  <span className="font-medium text-gray-800">{booking.user?.member_id}</span>
                </div>
              </div>
            </div>

            {/* Booking Slots */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Detail Pemesanan</h2>
              <div className="space-y-3">
                {booking.slots?.map((slot: any, idx: number) => (
                  <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{slot.court?.name}</div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(slot.booking_date).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {slot.time_slot} - {slot.session === 'day' ? 'Siang' : 'Malam'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">
                        {formatCurrency(slot.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pembayaran</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({booking.slots?.length} slot)</span>
                  <span>{formatCurrency(booking.total_amount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Admin</span>
                  <span>{formatCurrency(booking.admin_fee)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-2 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>{formatCurrency(booking.total_amount + booking.admin_fee)}</span>
                </div>
              </div>

              {/* Payment Info */}
              {booking.payment_method && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="w-5 h-5" />
                    <span>Metode Pembayaran: <span className="font-medium text-gray-800">{booking.payment_method}</span></span>
                  </div>
                  {booking.paid_at && (
                    <div className="mt-2 text-sm text-gray-600">
                      Dibayar pada: {new Date(booking.paid_at).toLocaleString('id-ID')}
                    </div>
                  )}
                </div>
              )}

              {/* Payment Expiry Warning */}
              {isPending && !isExpired && booking.payment_expired_at && (
                <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-800">Batas Waktu Pembayaran</div>
                      <div className="text-sm text-yellow-700 mt-1">
                        Selesaikan pembayaran sebelum:{' '}
                        <span className="font-semibold">
                          {new Date(booking.payment_expired_at).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              {isPending && !isExpired && (
                <button
                  onClick={handlePayNow}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Bayar Sekarang
                </button>
              )}
              
              {isPaid && (
                <div className="flex-1 bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-green-800">Pembayaran Berhasil!</div>
                  <div className="text-sm text-green-700 mt-1">Booking Anda telah dikonfirmasi</div>
                </div>
              )}

              <button
                onClick={() => router.push('/')}
                className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}