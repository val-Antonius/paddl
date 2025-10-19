// File: src/hooks/useInView.ts
'use client';

import { useEffect, useState, RefObject } from 'react';

interface UseInViewProps {
  // elementRef.current can be null before mount, so accept nullable HTMLElement
  elementRef: RefObject<HTMLElement | null>;
  threshold?: number;
  once?: boolean;
}

export function useInView({
  elementRef,
  threshold = 0.1,
  once = true
}: UseInViewProps) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, threshold, once]);

  return isInView;
}