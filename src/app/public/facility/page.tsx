// File: src/app/(public)/facilities/page.tsx
import {
  HeroSection,
  CourtsSection,
  FacilitiesHighlight,
  FAQSection,
  FooterSection,
} from '@/components/public/sections';
import { FloatingCTA } from '@/components/public/ui';
import { COURTS, FACILITIES, FAQS } from '@/lib/constants/facilities';

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="FASILITAS\\nKAMI"
        subtitle="PREMIUM EXPERIENCE"
      />

      <CourtsSection 
        title="LAPANGAN KAMI"
        courts={COURTS}
      />

      <FacilitiesHighlight
        title="Mengapa Memilih Kami?"
        subtitle="Karena Anda layak mendapatkan lebih dari sekedar pelajaran, Anda layak mendapatkan perjalanan padel yang tak terlupakan. Dengan metode terbukti, peralatan modern, dan kecintaan pada olahraga, kami akan membantu Anda menangkap wave, mendapatkan kepercayaan diri, dan merasa di rumah di dalam air."
        features={[
          {
            icon: '👨‍🏫',
            name: 'Certified Instructors',
            description: 'Pelatih bersertifikat internasional dengan pengalaman bertahun-tahun'
          },
          {
            icon: '🛡️',
            name: 'Safety First',
            description: 'Protokol keselamatan ketat dan peralatan safety berkualitas tinggi'
          },
          {
            icon: '🎯',
            name: 'Personalized Coaching',
            description: 'Program latihan disesuaikan dengan level dan tujuan individual Anda'
          }
        ]}
      />

      <FAQSection
        title="Ada Pertanyaan?"
        subtitle="Semua yang perlu Anda ketahui sebelum Anda ambil raket dan terjun ke lapangan."
        faqs={FAQS}
        showCategories={true}
      />

      <FooterSection />

      <FloatingCTA 
        text="BOOKING TRIAL CLASS"
        href="#booking"
      />
    </main>
  );
}