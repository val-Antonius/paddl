// File: src/components/public/sections/CourtsSection.tsx
'use client';

import { useRef } from 'react';
import { Container, Heading, Section, Button } from '../ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { useInView } from '@/hooks';
import { Court } from '@/types';
import Link from 'next/link';

interface CourtsSectionProps {
  title?: string;
  courts: Court[];
}

export function CourtsSection({
  title = 'LAPANGAN KAMI',
  courts
}: CourtsSectionProps) {
  return (
    <Section variant="light" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="2xl">
        <Heading as="h2" size="xl" className="mb-12 text-center md:mb-16">
          {title}
        </Heading>

        <div className="space-y-16 md:space-y-24">
          {courts.map((court, index) => (
            <CourtCard key={court.id} court={court} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

interface CourtCardProps {
  court: Court;
  index: number;
}

function CourtCard({ court, index }: CourtCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView({ elementRef: cardRef, threshold: 0.2 });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={`grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 ${
        isEven ? '' : 'md:grid-flow-dense'
      }`}
    >
      {/* Image */}
      <motion.div
        className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${
          isEven ? '' : 'md:col-start-2'
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={court.imageUrl}
          alt={court.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Overlay Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-moss-green px-4 py-2">
          <p className="text-sm font-bold uppercase tracking-wide text-ivory">
            Premium
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className={`flex flex-col justify-center ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Heading as="h3" size="md" className="mb-4">
            {court.name}
          </Heading>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 flex items-start gap-2 text-gray-600"
        >
          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-moss-green" />
          <div>
            <p className="font-bold text-black">{court.location}</p>
            <p className="text-sm">{court.address}</p>
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 flex items-center gap-2 text-gray-600"
        >
          <Clock className="h-5 w-5 text-moss-green" />
          <p className="font-semibold">{court.availability}</p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6 leading-relaxed text-gray-700"
        >
          {court.description}
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 grid grid-cols-2 gap-3"
        >
          {court.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-moss-green" />
              <span className="text-sm font-medium text-gray-700">{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <Button variant="primary" size="md" asChild>
            <Link href="#booking">Book Now</Link>
          </Button>
          
          {court.mapUrl && (
            <Button variant="outline" size="md" asChild>
              <a href={court.mapUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-2 h-4 w-4" />
                View Map
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}