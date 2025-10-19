// File: src/app/(public)/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}

