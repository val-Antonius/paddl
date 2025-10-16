// File: src/hooks/useScheduleNavigation.ts
'use client';

import { useState, useCallback } from 'react';
import { DAYS } from '@/lib/constants';

export function useScheduleNavigation(initialDay: string = 'Senin') {
  const [currentDayIndex, setCurrentDayIndex] = useState(() => {
    const index = DAYS.indexOf(initialDay as typeof DAYS[number]);
    return index !== -1 ? index : 0;
  });

  const currentDay = DAYS[currentDayIndex];

  const goToNextDay = useCallback(() => {
    setCurrentDayIndex((prev) => (prev + 1) % DAYS.length);
  }, []);

  const goToPrevDay = useCallback(() => {
    setCurrentDayIndex((prev) => (prev - 1 + DAYS.length) % DAYS.length);
  }, []);

  const goToDay = useCallback((day: string) => {
    const index = DAYS.indexOf(day as typeof DAYS[number]);
    if (index !== -1) {
      setCurrentDayIndex(index);
    }
  }, []);

  return {
    currentDay,
    currentDayIndex,
    goToNextDay,
    goToPrevDay,
    goToDay
  };
}