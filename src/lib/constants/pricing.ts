// File: src/lib/constants/pricing.ts
import { PricingData, PricingTab } from '../../types';

export const PRICING_TABS: PricingTab[] = [
  { id: 'hourly', label: 'Per Jam' },
  { id: 'coaching', label: 'Coaching Mingguan' },
  { id: 'membership', label: 'Membership' }
];

export const PRICING_DATA: PricingData = {
  hourly: [
    {
      label: 'PAGI',
      sublabel: '07:00 - 12:00',
      price: '150K/jam',
      details: 'Akses lapangan premium • Fasilitas lengkap',
      cta: 'BOOKING SEKARANG'
    },
    {
      label: 'SIANG',
      sublabel: '12:00 - 17:00',
      price: '200K/jam',
      details: 'Akses lapangan premium • Fasilitas lengkap',
      cta: 'BOOKING SEKARANG'
    },
    {
      label: 'MALAM',
      sublabel: '17:00 - 22:00',
      price: '250K/jam',
      details: 'Akses lapangan premium • Pencahayaan LED profesional',
      cta: 'BOOKING SEKARANG'
    }
  ],
  coaching: [
    {
      label: 'BASIC',
      sublabel: '2x/minggu',
      price: '1.2JT/bulan',
      details: '8 sesi per bulan • Pelatih bersertifikat • Evaluasi progress',
      cta: 'DAFTAR SEKARANG'
    },
    {
      label: 'INTENSIVE',
      sublabel: '3x/minggu',
      price: '1.8JT/bulan',
      details: '12 sesi per bulan • Program khusus • Video analysis',
      cta: 'DAFTAR SEKARANG',
      featured: true
    },
    {
      label: 'ELITE',
      sublabel: '5x/minggu',
      price: '2.8JT/bulan',
      details: '20 sesi per bulan • Pelatih senior • Nutrition plan',
      cta: 'DAFTAR SEKARANG'
    }
  ],
  membership: [
    {
      label: 'INFO',
      details: 'Member mendapat diskon hingga 30% untuk semua layanan, prioritas booking, akses ke turnamen eksklusif, dan berbagai benefit menarik lainnya.',
      cta: 'DAFTAR MEMBERSHIP',
      featured: true
    }
  ]
};