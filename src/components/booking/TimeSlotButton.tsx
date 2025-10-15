import React from 'react';
import type { Slot } from '@/types';

interface TimeSlotButtonProps {
  time: string;
  isBooked: boolean;
  isSelected: boolean;
  onToggle: () => void;
}

export const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
  time,
  isBooked,
  isSelected,
  onToggle
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={isBooked}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        isBooked
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : isSelected
          ? 'bg-indigo-600 text-white shadow-md scale-105'
          : 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100 hover:scale-105'
      }`}
    >
      {time}
    </button>
  );
};