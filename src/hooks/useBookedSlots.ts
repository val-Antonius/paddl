import { useState, useEffect } from 'react';
import type { BookedSlot } from '@/types';

export const useBookedSlots = (startDate: string, endDate: string) => {
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/bookings/check-availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate, endDate })
        });

        // Try to parse JSON, but be defensive in case the response is empty/non-JSON
        const text = await response.text();
        let result: any = null;
        try {
          result = text ? JSON.parse(text) : null;
        } catch (parseErr) {
          // If parsing fails, include the raw text in the error
          throw new Error(`Invalid JSON response: ${text}`);
        }

        if (!response.ok || !result?.success) {
          throw new Error(result?.error || `Failed to fetch booked slots (status ${response.status})`);
        }

        setBookedSlots(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching booked slots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSlots();
  }, [startDate, endDate]);

  return { bookedSlots, loading, error };
};