// File: src/lib/constants/facilities.ts
import { Court, Facility, FAQItem } from '@/types';

export const COURTS: Court[] = [
  {
    id: 'court-bsd',
    name: 'BSD Court',
    location: 'BSD City, Tangerang',
    address: 'Jl. BSD Grand Boulevard, BSD City, Tangerang Selatan 15345',
    description: 'Lapangan premium di kawasan BSD dengan fasilitas lengkap dan akses mudah. Dilengkapi dengan sistem pencahayaan LED profesional untuk bermain hingga malam hari.',
    features: [
      '2 lapangan standar FIP',
      'Pencahayaan LED Premium',
      'Locker Room & Shower',
      'Cafeteria',
      'Parking Area',
      'Pro Shop'
    ],
    imageUrl: '/images/courts/bsd-court.jpg',
    mapUrl: 'https://maps.google.com/?q=BSD+City',
    availability: 'Buka 07:00 - 22:00'
  },
  {
    id: 'court-pik',
    name: 'PIK Court',
    location: 'Pantai Indah Kapuk, Jakarta',
    address: 'Jl. Pantai Indah Utara, PIK, Jakarta Utara 14460',
    description: 'Lokasi strategis di PIK dengan view modern dan fasilitas premium. Perfect untuk member yang tinggal di Jakarta Utara.',
    features: [
      '2 lapangan standar FIP',
      'AC Lounge Area',
      'Premium Locker Room',
      'Juice Bar',
      'Equipment Rental',
      'WiFi Area'
    ],
    imageUrl: '/images/courts/pik-court.jpg',
    mapUrl: 'https://maps.google.com/?q=PIK+Jakarta',
    availability: 'Buka 07:00 - 22:00'
  },
  {
    id: 'court-kemang',
    name: 'Kemang Court',
    location: 'Kemang, Jakarta Selatan',
    address: 'Jl. Kemang Raya No. 88, Kemang, Jakarta Selatan 12730',
    description: 'Venue eksklusif di jantung Kemang dengan atmosphere premium. Ideal untuk member yang mencari pengalaman padel kelas atas.',
    features: [
      '2 lapangan standar FIP',
      'VIP Lounge',
      'Spa & Wellness Center',
      'Restaurant',
      'Personal Training Studio',
      'Valet Parking'
    ],
    imageUrl: '/images/courts/kemang-court.jpg',
    mapUrl: 'https://maps.google.com/?q=Kemang+Jakarta',
    availability: 'Buka 06:00 - 23:00'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Certified Instructors',
    icon: '👨‍🏫',
    description: 'Pelatih bersertifikat internasional dengan pengalaman bertahun-tahun'
  },
  {
    id: 'fac-2',
    name: 'Safety First',
    icon: '🛡️',
    description: 'Protokol keselamatan ketat dan peralatan safety berkualitas tinggi'
  },
  {
    id: 'fac-3',
    name: 'Personalized Coaching',
    icon: '🎯',
    description: 'Program latihan disesuaikan dengan level dan tujuan individual'
  },
  {
    id: 'fac-4',
    name: 'Premium Equipment',
    icon: '🏸',
    description: 'Raket dan bola berkualitas premium tersedia untuk rental'
  },
  {
    id: 'fac-5',
    name: 'Modern Facilities',
    icon: '🏢',
    description: 'Fasilitas modern dengan locker room, shower, dan lounge area'
  },
  {
    id: 'fac-6',
    name: 'Community Events',
    icon: '🎉',
    description: 'Turnamen dan social events rutin untuk membangun komunitas'
  }
];

export const FAQS: FAQItem[] = [
  // General
  {
    id: 'faq-1',
    category: 'general',
    question: 'Apakah saya perlu pengalaman bermain padel sebelumnya?',
    answer: 'Tidak sama sekali! Kami menerima pemain dari semua level, termasuk pemula yang belum pernah bermain padel. Instruktur kami akan memulai dari dasar dan menyesuaikan pace dengan kemampuan Anda.'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Apa yang harus saya bawa ke sesi latihan?',
    answer: 'Cukup bawa pakaian olahraga yang nyaman, sepatu olahraga, handuk, dan botol minum. Raket dan bola sudah kami sediakan. Jika Anda memiliki raket sendiri, silakan bawa!'
  },
  {
    id: 'faq-3',
    category: 'general',
    question: 'Apakah aman untuk anak-anak?',
    answer: 'Sangat aman! Kami memiliki program khusus untuk anak-anak dengan instruktur yang terlatih. Semua sesi menggunakan peralatan yang sesuai dengan usia dan tinggi anak, dengan protokol keselamatan yang ketat.'
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'Berapa lama durasi sesi latihan?',
    answer: 'Sesi standar berlangsung 60-90 menit. Untuk coaching intensif, kami menawarkan sesi 2 jam. Durasi dapat disesuaikan dengan kebutuhan dan paket yang Anda pilih.'
  },
  
  // Coaching
  {
    id: 'faq-5',
    category: 'coaching',
    question: 'Apa itu Coaching Session?',
    answer: 'Coaching Session adalah program latihan terstruktur dengan pelatih bersertifikat. Tersedia dalam format private (1-on-1), semi-private (2-3 orang), atau group (4-6 orang). Setiap sesi fokus pada teknik, strategi, dan improvement berkelanjutan dengan video analysis dan feedback personal.'
  },
  {
    id: 'faq-6',
    category: 'coaching',
    question: 'Berapa biaya private coaching?',
    answer: 'Private coaching mulai dari 500K per sesi (60 menit). Kami juga menawarkan paket bulanan dengan harga lebih hemat. Hubungi kami untuk konsultasi gratis dan rekomendasi program yang sesuai.'
  },
  {
    id: 'faq-7',
    category: 'coaching',
    question: 'Apakah ada program untuk pemain advanced?',
    answer: 'Tentu! Kami memiliki Advanced Training Program dengan fokus pada competitive play, tournament preparation, dan advanced tactics. Program ini dipimpin oleh head coach kami yang memiliki pengalaman bertanding internasional.'
  },

  // Events
  {
    id: 'faq-8',
    category: 'events',
    question: 'Apa itu Event/Tournament?',
    answer: 'Event adalah kompetisi padel yang kami selenggarakan rutin setiap bulan. Tersedia berbagai kategori dari Fun Match (pemula), Intermediate Tournament, hingga Pro Competition. Ini kesempatan sempurna untuk test skill, bertemu pemain lain, dan bersenang-senang!'
  },
  {
    id: 'faq-9',
    category: 'events',
    question: 'Bagaimana cara mendaftar event?',
    answer: 'Pendaftaran event dibuka 2 minggu sebelum tanggal event melalui website atau aplikasi kami. Member mendapat prioritas pendaftaran dan diskon biaya registrasi. Check kalender event kami untuk jadwal terbaru!'
  },
  {
    id: 'faq-10',
    category: 'events',
    question: 'Apakah ada social events?',
    answer: 'Ya! Kami mengadakan social padel events setiap minggu seperti Friday Night Mix, Sunday Social Play, dan themed tournaments. Ini cara yang fun untuk bermain sambil networking dengan komunitas padel Jakarta.'
  },

  // Booking
  {
    id: 'faq-11',
    category: 'booking',
    question: 'Apa itu Open Play/Regular Booking?',
    answer: 'Open Play adalah booking lapangan untuk bermain bebas tanpa coaching. Anda bisa booking per jam dan bermain dengan teman atau partner. Sistem booking online 24/7 memudahkan Anda reserve lapangan sesuai jadwal yang tersedia.'
  },
  {
    id: 'faq-12',
    category: 'booking',
    question: 'Bagaimana cara booking lapangan?',
    answer: 'Booking sangat mudah! Login ke website/app kami, pilih lokasi dan waktu, lalu bayar online. Anda akan dapat konfirmasi instant via email dan WhatsApp. Member mendapat akses early booking dan harga spesial.'
  },
  {
    id: 'faq-13',
    category: 'booking',
    question: 'Apakah bisa cancel booking?',
    answer: 'Ya, Anda bisa cancel atau reschedule booking hingga 24 jam sebelum waktu bermain untuk full refund. Cancel kurang dari 24 jam akan dikenakan biaya 50%. No-show tanpa pemberitahuan akan dikenakan full charge.'
  },
  {
    id: 'faq-14',
    category: 'booking',
    question: 'Apakah tersedia membership?',
    answer: 'Yes! Kami menawarkan Monthly, Quarterly, dan Annual Membership dengan berbagai benefit: priority booking, discounts up to 30%, free trial classes, exclusive tournaments, dan banyak lagi. Hubungi kami untuk detail paket membership.'
  }
];

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'general', label: 'Umum' },
  { id: 'coaching', label: 'Coaching' },
  { id: 'events', label: 'Events' },
  { id: 'booking', label: 'Booking' }
] as const;