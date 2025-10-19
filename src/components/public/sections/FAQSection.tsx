// File: src/components/public/sections/FAQSection.tsx
'use client';

import { useState, useRef } from 'react';
import { Container, Heading, Section } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useInView } from '@/hooks';
import type { FAQItem } from '@/types';
import { FAQ_CATEGORIES } from '@/lib/constants/facilities';

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  showCategories?: boolean;
}

export function FAQSection({
  title = 'Ada Pertanyaan?',
  subtitle = 'Semua yang perlu Anda ketahui sebelum Anda ambil raket dan terjun ke lapangan.',
  faqs,
  showCategories = true
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView({ elementRef: sectionRef, threshold: 0.1 });

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

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
                <span className="ml-4 italic text-moss-light">Questions?</span>
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

          {/* Category Filter */}
          {showCategories && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 flex flex-wrap justify-center gap-3"
            >
              {FAQ_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wide transition-all ${
                    activeCategory === category.id
                      ? 'bg-moss-green text-ivory'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* FAQ List */}
          <div className="mx-auto max-w-4xl space-y-4">
            <AnimatePresence mode="wait">
              {filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={index}
                  isOpen={openId === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                  isInView={isInView}
                />
              ))}
            </AnimatePresence>

            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-gray-500"
              >
                <p className="text-lg">Tidak ada FAQ untuk kategori ini.</p>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

interface FAQItemProps {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}

function FAQItem({ faq, index, isOpen, onToggle, isInView }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white transition-all hover:border-moss-green"
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-gray-50 md:p-8"
      >
        <h3 className="text-lg font-bold text-black md:text-xl">
          {faq.question}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss-green text-ivory md:h-12 md:w-12">
            <Plus className="h-6 w-6" />
          </div>
        </motion.div>
      </button>

      {/* Answer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-gray-100 px-6 py-6 md:px-8 md:py-8">
              <p className="leading-relaxed text-gray-700">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}