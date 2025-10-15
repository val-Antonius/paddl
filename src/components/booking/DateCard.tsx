import React from 'react';
import { Calendar } from 'lucide-react';
import { CourtSlots } from './CourtSlots';
import type { FormattedDate, Slot, BookedSlot } from '@/types';

interface DateCardProps {
  formattedDate: FormattedDate;
  courts: string[];
  bookedSlots: BookedSlot[];
  selectedSlots: Slot[];
  onToggleSlot: (slot: Slot) => void;
}

export const DateCard: React.FC<DateCardProps> = ({
  formattedDate,
  courts,
  bookedSlots,
  selectedSlots,
  onToggleSlot
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Date Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5" />
          <div>
            <div className="text-lg font-bold">{formattedDate.day}</div>
            <div className="text-sm opacity-90">{formattedDate.date} {formattedDate.month}</div>
          </div>
        </div>
      </div>

      {/* Courts */}
      <div className="p-4 space-y-4">
        {courts.map((court) => (
          <CourtSlots
            key={court}
            court={court}
            date={formattedDate.full}
            bookedSlots={bookedSlots}
            selectedSlots={selectedSlots}
            onToggleSlot={onToggleSlot}
          />
        ))}
      </div>
    </div>
  );
};