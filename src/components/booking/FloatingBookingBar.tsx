import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PRICES } from '@/lib/constants';

interface FloatingBookingBarProps {
  slotCount: number;
  total: number;
  onProceed: () => void;
  onCancel: () => void;
}

export const FloatingBookingBar: React.FC<FloatingBookingBarProps> = ({
  slotCount,
  total,
  onProceed,
  onCancel
}) => {
  if (slotCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-indigo-200 shadow-2xl p-4 z-40 animate-slide-up">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <CheckCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <div className="font-bold text-gray-800 text-lg">
              {slotCount} slot dipilih
            </div>
            <div className="text-sm text-gray-600">
              Total: {formatCurrency(total + PRICES.admin)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all shadow-md hover:shadow-lg flex items-center gap-2 border-2 border-gray-200"
          >
            <X className="w-5 h-5" />
            Batalkan
          </button>
          <button
            onClick={onProceed}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            Lanjut Booking
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};