// File: src/components/public/ui/MobileNavigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useScrollDirection } from '@/hooks';

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavigationProps {
  links?: NavLink[];
  logo?: string;
}

export function MobileNavigation({
  links = [
    { label: 'Home', href: '/' },
    { label: 'Courts', href: '/facilities' },
    { label: 'Why Us', href: '/gallery' },
    { label: 'Contact', href: '#contact' }
  ],
  logo = 'JP'
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const shouldShow = scrollDirection === 'up' || window.scrollY < 100;

  return (
    <>
      <AnimatePresence>
        {shouldShow && (
          <motion.header
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 right-0 top-0 z-50 md:hidden"
          >
            <div className="flex justify-center px-4 py-4">
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`flex w-full max-w-md items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 ${
                  isScrolled
                    ? 'border-moss-green/20 bg-ivory/80 shadow-lg backdrop-blur-xl'
                    : 'border-white/20 bg-white/10 backdrop-blur-md'
                }`}
              >
                {/* Logo */}
                <Link
                  href="/"
                  className="text-lg font-black uppercase tracking-wider text-moss-green"
                  onClick={() => setIsOpen(false)}
                >
                  {logo}
                </Link>

                {/* Menu Toggle */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-moss-green text-ivory transition-colors hover:bg-moss-dark"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.nav>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-[80%] max-w-sm bg-ivory shadow-2xl md:hidden"
            >
              <div className="flex h-full flex-col p-8">
                {/* Logo */}
                <div className="mb-12">
                  <h2 className="text-2xl font-black uppercase text-moss-green">
                    Jakarta Padel
                  </h2>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {links.map((link, index) => {
                    const isActive = pathname === link.href;
                    
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`block rounded-2xl px-6 py-4 text-lg font-bold uppercase tracking-wide transition-all ${
                            isActive
                              ? 'bg-moss-green text-ivory'
                              : 'text-gray-700 hover:bg-moss-green/10 hover:text-moss-green'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Contact Button */}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 rounded-full bg-moss-green px-8 py-4 text-base font-bold uppercase text-ivory"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}