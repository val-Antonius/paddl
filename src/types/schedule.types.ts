// File: src/lib/types/schedule.types.ts
export type ActivityType = 'Open' | 'CF' | 'Hybrid' | 'empty';

export interface ScheduleSlot {
  time: string;
  locations: string[];
}

export interface DaySchedule {
  day: string;
  locations: string[];
  slots: ScheduleSlot[];
}

export interface ScheduleData {
  [key: string]: string[][];
}