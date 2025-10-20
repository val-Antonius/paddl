// File: src/components/public/sections/HeroSection.tsx
'use client';

import { Container, Heading } from '../ui';
import { motion } from 'framer-motion';
import { MessageCircle, Pause } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  navLinks?: Array<{ label: string; href: string }>;
}

export function HeroSection({
  title,
  subtitle
}: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-moss-green to-moss-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,#f5f1e8_35px,#f5f1e8_37px)]" />
      </div>

      {/* Navigation
      <nav className="absolute left-0 right-0 top-0 z-50 px-5 py-8 md:px-[5%]">
        <div className="flex items-center justify-between">
          <div className="flex gap-8 md:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-black uppercase tracking-widest text-ivory transition-all hover:-translate-y-0.5 hover:text-cream md:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-xs font-black uppercase text-ivory transition-all hover:text-cream md:text-sm">
              EN
            </button>
            <button className="text-ivory transition-all hover:scale-110 hover:text-cream">
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-5">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="mb-4 text-7xl font-black uppercase leading-[0.95] tracking-tighter text-ivory drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] md:text-9xl lg:text-[12rem]">
              {title.split('\\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="text-xl font-black uppercase tracking-[0.15em] text-cream md:text-2xl lg:text-3xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Pause Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-[8%] right-[5%] z-20 flex h-14 w-14 items-center justify-center rounded-full bg-ivory shadow-lg transition-colors hover:bg-cream md:h-16 md:w-16"
        aria-label="Pause"
      >
        <Pause className="h-5 w-5 text-moss-green md:h-6 md:w-6" />
      </motion.button>
    </section>
  );
}