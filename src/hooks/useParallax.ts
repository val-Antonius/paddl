// File: src/hooks/useParallax.ts
'use client';

import { useEffect, useState, RefObject } from 'react';

interface UseParallaxProps {
  // elementRef.current can be null before mount, so accept nullable HTMLElement
  elementRef: RefObject<HTMLElement | null>;
  speed?: number;
}

export function useParallax({ elementRef, speed = 0.5 }: UseParallaxProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const parallax = (scrolled - elementTop) * speed;
        setOffset(parallax);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef, speed]);

  return offset;
}