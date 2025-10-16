// File: src/components/public/sections/FooterSection.tsx
'use client';

import { Container } from '../ui';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants/navigation';

interface FooterSectionProps {
  ctaTitle?: string;
  whatsappNumber?: string;
}

export function FooterSection({
  ctaTitle = 'ADA PERTANYAAN? KAMI SELALU SIAP MEMBANTU.',
  whatsappNumber = '6281234567890'
}: FooterSectionProps) {
  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=Halo, saya ingin bertanya tentang Jakarta Padel Club`,
      '_blank'
    );
  };

  return (
    <footer className="bg-black px-5 py-16 md:px-[5%] md:py-24">
      <Container maxWidth="xl">
        {/* CTA Section */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-3xl font-black uppercase leading-tight text-moss-green md:mb-8 md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {ctaTitle}
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={openWhatsApp}
            className="inline-flex items-center gap-3 bg-moss-green px-8 py-4 text-base font-black uppercase tracking-widest text-ivory transition-all hover:scale-105 hover:bg-moss-dark md:gap-4 md:px-12 md:py-6 md:text-lg"
          >
            HUBUNGI KAMI
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
          </motion.button>
        </div>

        {/* Links Section */}
        <div className="grid gap-8 border-t-2 border-moss-green pt-12 md:grid-cols-3 md:gap-12 md:pt-16">
          {/* Locations */}
          <div>
            <h3 className="mb-4 text-base font-black uppercase tracking-widest text-moss-green md:mb-6 md:text-lg">
              Lapangan
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {FOOTER_LINKS.locations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold uppercase tracking-wide text-ivory transition-colors hover:text-moss-green md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-base font-black uppercase tracking-widest text-moss-green md:mb-6 md:text-lg">
              Program
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold uppercase tracking-wide text-ivory transition-colors hover:text-moss-green md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 text-base font-black uppercase tracking-widest text-moss-green md:mb-6 md:text-lg">
              Tentang
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold uppercase tracking-wide text-ivory transition-colors hover:text-moss-green md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-moss-green pt-6 text-center md:mt-16 md:pt-8">
          {/* Social Links */}
          <div className="mb-4 flex justify-center gap-4 md:mb-6 md:gap-6">
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center border-2 border-moss-green text-ivory transition-all hover:scale-110 hover:bg-moss-green md:h-12 md:w-12"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4 fill-current md:h-5 md:w-5" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>

            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center border-2 border-moss-green text-ivory transition-all hover:scale-110 hover:bg-moss-green md:h-12 md:w-12"
              aria-label="TikTok"
            >
              <svg className="h-4 w-4 fill-current md:h-5 md:w-5" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs font-semibold text-gray-600 md:text-sm">
            © 2025 Jakarta Padel Club. All rights reserved.
          </p>
        </div>
      </Container>

      {/* WhatsApp Float Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-moss-green shadow-2xl transition-all hover:scale-110 hover:bg-moss-dark md:bottom-8 md:right-8 md:h-16 md:w-16"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp"
      >
        <svg className="h-7 w-7 fill-ivory md:h-8 md:w-8" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>
    </footer>
  );
}