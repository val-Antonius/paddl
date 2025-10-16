// File: src/lib/constants/benefits.ts
import { Benefit } from '@/types/benefits.types';

export const BENEFITS_DATA: Benefit[] = [
  {
    id: 'standard-court',
    title: 'LAPANGAN STANDAR INTERNASIONAL',
    description: 'Setiap lapangan dirancang sesuai regulasi FIP (Federación Internacional de Pádel). Permukaan premium dengan sistem drainase optimal memastikan performa konsisten dalam segala kondisi. Pencahayaan LED profesional mendukung permainan hingga malam hari. Fasilitas locker room, shower, dan area istirahat melengkapi pengalaman bermain Anda.',
    imageUrl: '/img/public/padel-court.jpeg'
  },
  {
    id: 'booking-system',
    title: 'SISTEM BOOKING TERINTEGRASI',
    description: 'Platform digital yang memudahkan pemesanan lapangan 24/7. Cek ketersediaan real-time, pilih waktu favorit, dan bayar langsung melalui berbagai metode pembayaran. Notifikasi otomatis, riwayat booking tersimpan rapi, dan sistem poin reward untuk setiap transaksi. Kelola jadwal bermain dalam satu genggaman.',
    imageUrl: '/img/public/booking-system.jpeg'
  },
  {
    id: 'membership-promo',
    title: 'PROMO EKSKLUSIF MEMBERSHIP',
    description: 'Member mendapat prioritas booking, diskon hingga 30% untuk sesi latihan, dan akses gratis ke workshop bulanan. Program referral dengan benefit menarik, trial class gratis untuk teman baru, serta kesempatan ikut turnamen eksklusif. Investasi terbaik untuk meningkatkan skill dan membangun komunitas.',
    imageUrl: '/img/public/membership.jpeg'
  }
];