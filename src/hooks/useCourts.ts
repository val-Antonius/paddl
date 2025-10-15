import { useState, useEffect } from 'react';

interface Court {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
}

export const useCourts = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/courts');
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to fetch courts');
        }

        setCourts(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching courts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  return { courts, loading, error };
};