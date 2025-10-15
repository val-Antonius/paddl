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