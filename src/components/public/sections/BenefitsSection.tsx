// File: src/components/public/sections/BenefitsSection.tsx
'use client';

import { useState } from 'react';
import { Container, Heading, Section } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks';
import { Benefit } from '@/types/benefits.types';

interface BenefitsSectionProps {
  title?: string;
  benefits: Benefit[];
}

export function BenefitsSection({
  title = 'KEUNGGULAN KAMI',
  benefits
}: BenefitsSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const toggleBenefit = (id: string) => {
    if (isMobile) {
      setOpenId(openId === id ? null : id);
    }
  };

  return (
    <Section variant="dark" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="xl">
        <Heading as="h2" size="xl" className="mb-12 text-center md:mb-16">
          {title}
        </Heading>

        <div className="space-y-0">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={benefit.id}
              benefit={benefit}
              isOpen={openId === benefit.id}
              onToggle={() => toggleBenefit(benefit.id)}
              isLast={index === benefits.length - 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

interface BenefitItemProps {
  benefit: Benefit;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function BenefitItem({ benefit, isOpen, onToggle, isLast }: BenefitItemProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={`group border-t-2 border-moss-green ${isLast ? 'border-b-2' : ''}`}
      whileHover={!isMobile ? { paddingLeft: '1rem' } : undefined}
    >
      {/* Header */}
      <div
        className="flex cursor-pointer items-center justify-between py-6 transition-all md:py-10"
        onClick={onToggle}
      >
        <h3 className="text-xl font-black uppercase text-ivory md:text-3xl lg:text-4xl">
          {benefit.title}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="h-8 w-8 text-ivory md:h-10 md:w-10" />
        </motion.div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? { height: 0, opacity: 0 } : false}
            animate={
              isMobile
                ? { height: 'auto', opacity: 1 }
                : { height: 'auto', opacity: 1 }
            }
            exit={isMobile ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-8 md:grid-cols-2 md:gap-12 md:pb-12">
              <p className="text-sm leading-relaxed text-ivory md:text-base lg:text-lg">
                {benefit.description}
              </p>

              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={benefit.imageUrl}
                  alt={benefit.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}