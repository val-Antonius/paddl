// Public site types
export * from './common.types';
export * from './benefits.types';
export * from './pricing.types';
export * from './schedule.types';
export * from './gallery.types';
export * from './facilities.types';

// Member site types
export interface Slot {
  date: string;
  court: string;
  time: string;
  session: 'day' | 'night';
  price: number;
}

export interface BookedSlot {
  date: string;
  court: string;
  time: string;
  session: 'day' | 'night';
}

export interface FormattedDate {
  day: string;
  date: number;
  month: string;
  full: string;
}

export interface UserInfo {
  name: string;
  memberId: string;
}