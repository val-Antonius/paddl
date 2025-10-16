// File: src/hooks/useScrollAnimation.ts
'use client';

import { useEffect, useState, RefObject } from 'react';

interface UseScrollAnimationProps {
  // Accept a nullable HTMLElement ref so callers using useRef<HTMLDivElement>(null)
  // are compatible with this hook's parameter type.
  elementRef: RefObject<HTMLElement | null>;
  minScale?: number;
  maxScale?: number;
}

export function useScrollAnimation({
  elementRef,
  minScale = 0.7,
  maxScale = 1.2
}: UseScrollAnimationProps) {
  const [scale, setScale] = useState(minScale);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const section = element.closest('section');
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;

      const scrollProgress =
        (scrollPosition - sectionTop + window.innerHeight) /
        (sectionHeight + window.innerHeight);

      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const newScale = minScale + clampedProgress * (maxScale - minScale);

      setScale(newScale);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef, minScale, maxScale]);

  return scale;
}