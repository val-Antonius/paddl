// File: src/app/(public)/page.tsx
import { 
  HeroSection,
  IntroSection,
  TaglineSection,
  BenefitsSection,
  ScheduleSection,
  PricingSection,
  FooterSection
 } from '@/components/public/sections'
import { FloatingCTA } from '@/components/public/ui';
import { BENEFITS_DATA } from '@/lib/constants/benefits';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="PaddL"
        subtitle="Book your court. Smash your game."
      />

      <IntroSection
        text="SESI LATIHAN KELOMPOK 🎾 PELATIH YANG MENYESUAIKAN KEBUTUHAN ANDA 💪 +150 KELAS BERBEDA PER MINGGU 📅 DI 6 LAPANGAN 🏟️ DI 3 KOTA."
      />

      <TaglineSection
        title="FOLLOW\\nTHE\\nMARK"
        subtitle="LEAVE\\nYOURS"
        imageUrl="/img/public/player.jpeg"
      />

      <BenefitsSection benefits={BENEFITS_DATA} />

      <ScheduleSection />

      <PricingSection />

      <FooterSection />

      {/* Floating CTA Button - Always visible */}
      <FloatingCTA 
        text="BOOKING TRIAL CLASS"
        href="#booking"
      />
    </main>
  );
}