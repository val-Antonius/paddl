// File: src/components/public/sections/TaglineSection.tsx
'use client';

import { useRef } from 'react';
import { Container, Section } from '../ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollAnimation, useIsMobile } from '@/hooks';

interface TaglineSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function TaglineSection({
  title,
  subtitle,
  imageUrl
}: TaglineSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const scale = useScrollAnimation({
    elementRef: imageRef,
    minScale: 0.7,
    maxScale: 1.2
  });

  if (isMobile) {
    // Mobile Layout - Stack vertical
    return (
      <Section variant="light" className="min-h-screen py-16">
        <Container maxWidth="2xl">
          <div className="flex flex-col gap-8">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter text-moss-green">
                {title.split('\\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </motion.div>

            {/* Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt="Player"
                fill
                className="object-cover"
              />
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter text-moss-green">
                {subtitle.split('\\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </motion.div>
          </div>
        </Container>
      </Section>
    );
  }

  // Desktop Layout - Original design with scroll animation
  return (
    <Section variant="light" className="relative min-h-screen py-20">
      <Container maxWidth="2xl" className="relative h-full">
        <div className="relative flex min-h-[80vh] items-center justify-between">
          {/* Left Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="z-10 flex-1"
          >
            <h2 className="text-7xl font-black uppercase leading-[0.95] tracking-tighter text-moss-green lg:text-8xl xl:text-9xl">
              {title.split('\\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </motion.div>

          {/* Center Image with Scroll Effect */}
          <motion.div
            ref={imageRef}
            className="relative w-[45%] max-w-[600px]"
            style={{ scale: isMobile ? 1 : scale }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={imageUrl}
                alt="Player"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Subtitle - Positioned absolute */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-[15%] right-[5%] z-10"
          >
            <h2 className="text-right text-7xl font-black uppercase leading-[0.95] tracking-tighter text-moss-green lg:text-8xl xl:text-9xl">
              {subtitle.split('\\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}