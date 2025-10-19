// File: src/app/(public)/gallery/page.tsx
import {
  HeroSection,
  GallerySection,
  TestimonialSection,
  FooterSection,
} from '@/components/public/sections';
import { FloatingCTA } from '@/components/public/ui';
import { GALLERY_ITEMS, TESTIMONIALS } from '@/lib/constants/gallery';

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="MENGAPA\\nKAMI?"
        subtitle="PENGALAMAN PREMIUM"
      />

      <GallerySection 
        title="GALERI KAMI"
        items={GALLERY_ITEMS}
      />

      <TestimonialSection
        title="KATA MEREKA"
        testimonials={TESTIMONIALS}
      />

      <FooterSection />

      <FloatingCTA 
        text="BOOKING TRIAL CLASS"
        href="#booking"
      />
    </main>
  );
}

// Alternative: With Carousel Testimonials
// File: src/app/(public)/why-us/page.tsx (alternative version)
/*
import {
  HeroSection,
  GallerySection,
  TestimonialCarousel,
  FooterSection,
} from '@/components/public/sections';
import { FloatingCTA } from '@/components/public/ui';
import { GALLERY_ITEMS, TESTIMONIALS } from '@/lib/constants';

export default function WhyUsPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="MENGAPA\\nKAMI?"
        subtitle="BEST IN CLASS"
      />

      <GallerySection 
        title="MOMEN BERHARGA"
        items={GALLERY_ITEMS}
      />

      <TestimonialCarousel
        title="TESTIMONI"
        testimonials={TESTIMONIALS}
      />

      <FooterSection />

      <FloatingCTA />
    </main>
  );
}
*/