// File: src/components/public/sections/TestimonialCarousel.tsx
'use client';

import { useState } from 'react';
import { Container, Heading, Section } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCarouselProps {
  title?: string;
  testimonials: Testimonial[];
}

export function TestimonialCarousel({
  title = 'KATA MEREKA',
  testimonials
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Section variant="dark" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="xl">
        <Heading as="h2" size="xl" className="mb-12 text-center text-ivory md:mb-16">
          {title}
        </Heading>

        <div className="relative">
          {/* Main Card */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-ivory p-8 shadow-2xl md:p-12 lg:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {/* Quote Icon */}
                <Quote className="mb-6 h-12 w-12 text-moss-green md:h-16 md:w-16" />

                {/* Quote */}
                <p className="mb-8 text-2xl font-bold leading-relaxed text-black md:text-3xl lg:text-4xl">
                  {currentTestimonial.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:w-20">
                    <Image
                      src={currentTestimonial.imageUrl}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-black text-black md:text-2xl">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-base text-gray-600 md:text-lg">
                      {currentTestimonial.location}{' '}
                      <span className="font-mono text-sm">{currentTestimonial.country}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={goToPrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-moss-green text-moss-green transition-all hover:bg-moss-green hover:text-ivory md:h-14 md:w-14"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-moss-green'
                        : 'bg-moss-green/30 hover:bg-moss-green/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-moss-green text-moss-green transition-all hover:bg-moss-green hover:text-ivory md:h-14 md:w-14"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}