// File: src/components/public/sections/TestimonialSection.tsx
'use client';

import { useRef } from 'react';
import { Container, Heading, Section } from '../ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { useInView } from '@/hooks';
import { Testimonial } from '@/types';

interface TestimonialSectionProps {
  title?: string;
  testimonials: Testimonial[];
}

export function TestimonialSection({
  title = 'KATA MEREKA',
  testimonials
}: TestimonialSectionProps) {
  return (
    <Section variant="light" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="2xl">
        <Heading as="h2" size="xl" className="mb-12 text-center md:mb-16">
          {title}
        </Heading>

        {/* Masonry/Bento Grid for Testimonials */}
        <div className="grid auto-rows-auto grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView({ elementRef: cardRef, threshold: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  // Variant styles
  const variantStyles = {
    light: {
      bg: 'bg-white',
      text: 'text-black',
      quoteColor: 'text-moss-green',
      nameColor: 'text-gray-600'
    },
    dark: {
      bg: 'bg-moss-green',
      text: 'text-ivory',
      quoteColor: 'text-cream',
      nameColor: 'text-cream'
    },
    'image-bg': {
      bg: 'bg-black',
      text: 'text-white',
      quoteColor: 'text-cream',
      nameColor: 'text-cream'
    }
  };

  const style = variantStyles[testimonial.variant || 'light'];

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl ${style.bg} p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl md:p-8`}
    >
      {/* Background Image for image-bg variant */}
      {testimonial.variant === 'image-bg' && (
        <>
          <div className="absolute inset-0">
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              fill
              className="object-cover opacity-40"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Quote Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="mb-4"
        >
          <Quote className={`h-8 w-8 md:h-10 md:w-10 ${style.quoteColor}`} />
        </motion.div>

        {/* Quote Text */}
        <p className={`mb-6 text-base leading-relaxed md:text-lg ${style.text}`}>
          {testimonial.quote}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {/* Avatar - only for light/dark variants */}
          {testimonial.variant !== 'image-bg' && (
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full md:h-14 md:w-14">
              <Image
                src={testimonial.imageUrl}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div>
            <p className={`font-bold ${style.text}`}>{testimonial.name}</p>
            <p className={`text-sm ${style.nameColor}`}>
              {testimonial.location}{' '}
              <span className="font-mono text-xs">{testimonial.country}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <motion.div
        className="absolute inset-0 border-2 border-moss-green opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderRadius: '1rem' }}
      />
    </motion.div>
  );
}