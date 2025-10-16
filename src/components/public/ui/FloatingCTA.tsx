// File: src/components/public/ui/FloatingCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export interface FloatingCTAProps {
  text?: string;
  href?: string;
  hideAfterScroll?: number;
}

export function FloatingCTA({
  text = 'BOOKING TRIAL CLASS',
  href = '#booking',
  hideAfterScroll
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!hideAfterScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled < hideAfterScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideAfterScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
        >
          <Link
            href={href}
            className="group relative inline-flex items-center justify-center overflow-hidden"
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-moss-green transition-all duration-300 group-hover:bg-moss-dark" />
            
            {/* Border Effect */}
            <div className="absolute inset-0 border-2 border-moss-dark" />
            
            {/* Shadow Effect */}
            <div className="absolute bottom-0 right-0 h-full w-full translate-x-[4px] translate-y-[4px] bg-moss-dark transition-all duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px]" />
            
            {/* Button Content */}
            <span className="relative z-10 px-8 py-4 text-sm font-black uppercase tracking-wider text-ivory transition-all duration-300 group-hover:scale-105 md:px-12 md:py-5 md:text-base">
              {text}
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}