import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { TimeSlotButton } from './TimeSlotButton';
import { DAY_SLOTS, NIGHT_SLOTS, PRICES } from '@/lib/constants';
import type { Slot, BookedSlot } from '@/types';

interface CourtSlotsProps {
  court: string;
  date: string;
  bookedSlots: BookedSlot[];
  selectedSlots: Slot[];
  onToggleSlot: (slot: Slot) => void;
}

export const CourtSlots: React.FC<CourtSlotsProps> = ({
  court,
  date,
  bookedSlots,
  selectedSlots,
  onToggleSlot
}) => {
  const isSlotBooked = (time: string, session: 'day' | 'night') => {
    return bookedSlots.some(
      slot => slot.date === date && slot.court === court && 
              slot.time === time && slot.session === session
    );
  };

  const isSlotSelected = (time: string, session: 'day' | 'night') => {
    return selectedSlots.some(
      slot => slot.date === date && slot.court === court && 
              slot.time === time && slot.session === session
    );
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Court Name */}
      <div className="bg-gray-50 px-4 py-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-indigo-600" />
        <span className="font-semibold text-gray-800">{court}</span>
      </div>

      {/* Day Session */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-yellow-100 p-1 rounded">
            <Clock className="w-4 h-4 text-yellow-600" />
          </div>
          <span className="font-medium text-gray-700">Siang (08:00 - 17:00)</span>
          <span className="text-sm text-gray-500 ml-auto">Rp {PRICES.day.toLocaleString('id-ID')}/jam</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DAY_SLOTS.map((time) => (
            <TimeSlotButton
              key={time}
              time={time}
              isBooked={isSlotBooked(time, 'day')}
              isSelected={isSlotSelected(time, 'day')}
              onToggle={() => !isSlotBooked(time, 'day') && onToggleSlot({
                date,
                court,
                time,
                session: 'day',
                price: PRICES.day
              })}
            />
          ))}
        </div>
      </div>

      {/* Night Session */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-indigo-100 p-1 rounded">
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="font-medium text-gray-700">Malam (18:00 - 23:00)</span>
          <span className="text-sm text-gray-500 ml-auto">Rp {PRICES.night.toLocaleString('id-ID')}/jam</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {NIGHT_SLOTS.map((time) => (
            <TimeSlotButton
              key={time}
              time={time}
              isBooked={isSlotBooked(time, 'night')}
              isSelected={isSlotSelected(time, 'night')}
              onToggle={() => !isSlotBooked(time, 'night') && onToggleSlot({
                date,
                court,
                time,
                session: 'night',
                price: PRICES.night
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};