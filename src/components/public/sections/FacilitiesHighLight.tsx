// File: src/components/public/sections/FacilitiesHighlight.tsx
'use client';

import { useRef } from 'react';
import { Container, Heading, Section } from '../ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from '@/hooks';

interface FacilitiesHighlightProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  features?: Array<{ icon: string; name: string; description: string }>;
}

export function FacilitiesHighlight({
  title = 'Mengapa Memilih Kami?',
  subtitle = 'Karena Anda layak mendapatkan lebih dari sekedar pelajaran, Anda layak mendapatkan perjalanan padel yang tak terlupakan.',
  imageUrl = '/images/facilities-highlight.jpg',
  features = [
    {
      icon: '👨‍🏫',
      name: 'Certified Instructors',
      description: 'Pelatih bersertifikat dengan pengalaman internasional'
    },
    {
      icon: '🛡️',
      name: 'Safety First',
      description: 'Protokol keselamatan dan equipment premium'
    },
    {
      icon: '🎯',
      name: 'Personalized Coaching',
      description: 'Program disesuaikan dengan level individual'
    }
  ]
}: FacilitiesHighlightProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView({ elementRef: sectionRef, threshold: 0.2 });

  return (
    <Section variant="light" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="2xl">
        <div ref={sectionRef} className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] overflow-hidden rounded-3xl"
          >
            <Image
              src={imageUrl}
              alt="Facilities"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <Heading as="h2" size="lg" className="mb-6">
                {title}
              </Heading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 text-lg leading-relaxed text-gray-600"
            >
              {subtitle}
            </motion.p>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-4xl">{feature.icon}</span>
                  <div>
                    <h4 className="mb-1 text-lg font-black text-black">
                      {feature.name}
                    </h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}