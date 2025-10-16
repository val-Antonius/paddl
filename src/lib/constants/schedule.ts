// File: src/lib/constants/schedule.ts
import { ScheduleData } from '../../types';

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'] as const;

export const LOCATIONS = ['Court north', 'Court East', 'Court West'] as const;

export const SCHEDULE_DATA: ScheduleData = {
  'Senin': [
    ['07:00', 'CF', 'CF', 'Hybrid'],
    ['08:00', 'Open', 'Hybrid', 'Open'],
    ['09:00', 'Open', 'CF', 'Open'],
    ['10:00', 'CF', 'Hybrid', 'Hybrid'],
    ['11:00', 'Hybrid', 'Open', '—'],
    ['12:00', 'Open', 'Open', '—'],
    ['13:00', 'Open', 'Hybrid', '—'],
    ['14:00', 'CF', '—', 'CF'],
    ['15:00', 'Open', '—', 'Open'],
    ['16:00', 'Open', '—', 'Open'],
    ['17:00', 'CF/Hybrid', 'Hybrid', 'Hybrid'],
    ['18:00', 'CF/Hybrid', 'CF', 'CF']
  ],
  'Selasa': [
    ['07:00', 'CF/Hybrid', 'CF', 'Hybrid'],
    ['08:00', 'CF', 'Hybrid', 'Hybrid'],
    ['09:00', 'Barbell', 'CF', 'Open'],
    ['10:00', 'CF', 'Hybrid', 'Hybrid'],
    ['11:00', 'Hybrid', 'Open', '—'],
    ['12:00', 'Open', 'Open', '—'],
    ['13:00', 'Open', 'Hybrid', '—'],
    ['14:00', 'CF/Hybrid', '—', 'CF'],
    ['15:00', 'Open', '—', 'Open'],
    ['16:00', 'Open', '—', 'Open'],
    ['17:00', 'CF/Hybrid', 'Hybrid', 'Hybrid'],
    ['18:00', 'CF/Hybrid', 'Hybrid', 'CF']
  ],
  // Add other days...
};

export const ACTIVITY_COLORS = {
  'Open': 'text-sky-400 font-semibold',      // biru lembut: refreshing & modern
  'CF': 'text-amber-400 font-bold',          // kuning keemasan: energi & fokus
  'Hybrid': 'text-emerald-400 font-semibold',// hijau stabil: keseimbangan
  'Barbell': 'text-rose-400 font-semibold',  // merah lembut: power & intensity
  'empty': 'text-zinc-600 italic'            // abu gelap: netral elegan
} as const;

export const LEGEND_ITEMS = [
  { label: 'Open Play', color: '#38bdf8' },   // Sky Blue
  { label: 'CrossFit', color: '#fbbf24' },    // Amber Gold
  { label: 'Hybrid', color: '#34d399' },      // Emerald Green
] as const;
