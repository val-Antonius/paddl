// Alternative: Two Column FAQ Layout
// File: src/components/public/sections/FAQTwoColumn.tsx
'use client';

import { useState, useRef } from 'react';
import { Container, Heading, Section } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useInView } from '@/hooks';
import type { FAQItem } from '@/types';

interface FAQTwoColumnProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export function FAQTwoColumn({
  title = 'Frequently Asked Questions',
  subtitle = 'Got questions? We have answers.',
  faqs
}: FAQTwoColumnProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView({ elementRef: sectionRef, threshold: 0.1 });

  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midPoint);
  const rightColumn = faqs.slice(midPoint);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section variant="light" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="2xl">
        <div ref={sectionRef}>
          {/* Header */}
          <div className="mb-12 text-center md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <Heading as="h2" size="xl" className="mb-6">
                {title}
              </Heading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-3xl text-lg text-gray-600"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Two Column Grid */}
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              {leftColumn.map((faq, index) => (
                <FAQCard
                  key={faq.id}
                  faq={faq}
                  index={index}
                  isOpen={openId === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {rightColumn.map((faq, index) => (
                <FAQCard
                  key={faq.id}
                  faq={faq}
                  index={index + midPoint}
                  isOpen={openId === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

interface FAQCardProps {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}

function FAQCard({ faq, index, isOpen, onToggle, isInView }: FAQCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white transition-all hover:border-moss-green"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-gray-50"
      >
        <h3 className="text-base font-bold text-black md:text-lg">
          {faq.question}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-green text-ivory">
            <Plus className="h-5 w-5" />
          </div>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-gray-100 px-6 py-6">
              <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}