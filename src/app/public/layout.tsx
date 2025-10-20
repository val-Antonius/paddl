// File: src/app/(public)/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation, MobileNavigation } from '@/components/public/ui';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jakarta Padel Club - Premium Padel Courts',
  description: 'Lapangan padel premium dengan standar internasional di Jakarta. Booking sekarang!',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{/* Desktop Navigation */}
        <div className="hidden md:block">
          <Navigation />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNavigation />
        </div>

        {/* Main Content */}
        {children}
        </body>
    </html>
  );
}

