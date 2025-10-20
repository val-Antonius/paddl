// File: src/components/public/ui/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useScrollDirection } from '@/hooks';

interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  links?: NavLink[];
  logo?: string;
}

export function Navigation({
  links = [
    { label: 'Home', href: '/' },
    { label: 'Courts', href: '/facilities' },
    { label: 'Why Us', href: '/gallery' },
    { label: 'Contact', href: '#contact' }
  ],
  logo = 'JAKARTA PADEL'
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide when scrolling down, show when scrolling up
  const shouldShow = scrollDirection === 'up' || window.scrollY < 100;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.header
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed left-0 right-0 top-0 z-50"
        >
          <div className="flex justify-center px-4 py-4 md:py-6">
            {/* Glass Effect Container */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative overflow-hidden rounded-full border transition-all duration-300 ${
                isScrolled
                  ? 'border-moss-green/20 bg-ivory/80 shadow-lg backdrop-blur-xl'
                  : 'border-white/20 bg-white/10 backdrop-blur-md'
              }`}
            >
              <div className="flex items-center gap-1 px-2 py-2 md:gap-2 md:px-3">
                {/* Logo/Brand */}
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-black uppercase tracking-wider text-moss-green transition-colors hover:text-moss-dark md:px-6 md:text-base"
                >
                  {logo}
                </Link>

                {/* Divider */}
                <div className="h-6 w-px bg-moss-green/20" />

                {/* Navigation Links */}
                <div className="flex items-center gap-1 md:gap-2">
                  {links.map((link, index) => {
                    const isActive = pathname === link.href;
                    
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="relative px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors md:px-6 md:text-base"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Hover/Active Background Slider */}
                        {(hoveredIndex === index || isActive) && (
                          <motion.div
                            layoutId="navSlider"
                            className={`absolute inset-0 rounded-full ${
                              isActive
                                ? 'bg-moss-green'
                                : 'bg-moss-green/10'
                            }`}
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30
                            }}
                          />
                        )}

                        {/* Link Text */}
                        <span
                          className={`relative z-10 ${
                            isActive
                              ? 'text-ivory'
                              : hoveredIndex === index
                              ? 'text-moss-green'
                              : 'text-gray-700'
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-moss-green/20" />

                {/* Contact Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-moss-green px-4 py-2 text-sm font-bold uppercase text-ivory transition-colors hover:bg-moss-dark md:px-6"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden md:inline">Contact</span>
                </motion.a>
              </div>
            </motion.nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
