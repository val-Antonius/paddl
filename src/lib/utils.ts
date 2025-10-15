import { DAYS, MONTHS } from './constants';
import type { FormattedDate } from '@/types';

export const generateDates = (days: number = 7): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const formatDate = (date: Date): FormattedDate => {
  return {
    day: DAYS[date.getDay()],
    date: date.getDate(),
    month: MONTHS[date.getMonth()],
    full: date.toDateString()
  };
};

export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

