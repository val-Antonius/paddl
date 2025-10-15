'use client';

import React from 'react';
import { User, Calendar, CreditCard, CheckCircle, X } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { PRICES } from '@/lib/constants';
import type { Slot, UserInfo } from '@/types';

interface BookingModalProps {
  show: boolean;
  isProcessing: boolean;
  isSuccess: boolean;
  selectedSlots: Slot[];
  userInfo: UserInfo;
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  show,
  isProcessing,
  isSuccess,
  selectedSlots,
  userInfo,
  total,
  onClose,
  onConfirm
}) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 flex flex-col max-h-[90vh]">
        {!isProcessing && !isSuccess ? (
          <>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 flex items-center justify-between rounded-t-2xl flex-shrink-0">
              <h2 className="text-2xl font-bold">Konfirmasi Booking</h2>
              <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* User Info */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Informasi Pemesan
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama:</span>
                    <span className="font-medium text-gray-800">{userInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Member:</span>
                    <span className="font-medium text-gray-800">{userInfo.memberId}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Detail Pemesanan
                </h3>
                <div className="space-y-3">
                  {selectedSlots.map((slot, idx) => {
                    const formatted = formatDate(new Date(slot.date));
                    return (
                      <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{slot.court}</div>
                          <div className="text-sm text-gray-600">
                            {formatted.day}, {formatted.date} {formatted.month}
                          </div>
                          <div className="text-sm text-indigo-600 font-medium">
                            {slot.time} - {slot.session === 'day' ? 'Siang' : 'Malam'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-800">
                            {formatCurrency(slot.price)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Fixed Footer - Price Summary */}
            <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex-shrink-0">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({selectedSlots.length} slot)</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Admin</span>
                  <span>{formatCurrency(PRICES.admin)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-2 flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>{formatCurrency(total + PRICES.admin)}</span>
                </div>
              </div>

              <button
                onClick={onConfirm}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proses Pembayaran
              </button>
            </div>
          </>
        ) : isProcessing ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Memproses Pembayaran</h3>
            <p className="text-gray-600 text-center">Mohon tunggu sebentar...</p>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h3>
            <p className="text-gray-600 text-center">Booking Anda telah dikonfirmasi</p>
            <p className="text-sm text-gray-500 mt-2">Anda akan mendapat email konfirmasi segera</p>
          </div>
        )}
      </div>
    </div>
  );
};