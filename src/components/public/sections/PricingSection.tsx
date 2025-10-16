// File: src/components/public/sections/PricingSection.tsx
'use client';

import { Card, Container, Heading, Section, Button } from '../ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePricingTab } from '@/hooks';
import { PRICING_TABS, PRICING_DATA } from '@/lib/constants/pricing';
import { PricingCard } from '@/types';

interface PricingSectionProps {
  title?: string;
}

export function PricingSection({ title = 'HARGA' }: PricingSectionProps) {
  const { activeTab, changeTab, isActive } = usePricingTab();
  const currentCards = PRICING_DATA[activeTab];

  return (
    <Section variant="dark" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="xl">
        <Heading as="h2" size="xl" className="mb-12 text-center md:mb-16">
          {title}
        </Heading>

        {/* Tabs */}
        <div className="mb-12 flex justify-center md:mb-16">
          <div className="inline-flex flex-col overflow-hidden rounded-lg border-2 border-moss-green md:flex-row">
            {PRICING_TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-wide transition-all md:px-10 md:py-4 md:text-sm ${
                  isActive(tab.id)
                    ? 'bg-moss-green text-ivory'
                    : 'bg-transparent text-ivory hover:bg-moss-green/30'
                } ${index > 0 ? 'border-t-2 border-moss-green md:border-l-2 md:border-t-0' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {currentCards.map((card) => (
            <PricingCardItem key={card.label} card={card} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

interface PricingCardItemProps {
  card: PricingCard;
}

function PricingCardItem({ card }: PricingCardItemProps) {
  return (
    <Card featured={card.featured} className="flex flex-col text-center">
      {/* Label */}
      <Heading
        as="h3"
        size="md"
        className={card.featured ? 'text-ivory' : 'text-moss-green'}
      >
        {card.label}
      </Heading>

      {/* Sublabel */}
      {card.sublabel && (
        <Heading
          as="h4"
          size="sm"
          className={`mt-2 ${card.featured ? 'text-ivory' : 'text-moss-green'}`}
        >
          {card.sublabel}
        </Heading>
      )}

      {/* Price */}
      {card.price && (
        <div className="my-6 text-3xl font-black text-ivory md:text-4xl">
          {card.price}
        </div>
      )}

      {/* Details */}
      <p className="mb-8 flex-1 text-base leading-relaxed text-cream">
        {card.details}
      </p>

      {/* CTA */}
      <Button
        variant={card.featured ? 'secondary' : 'primary'}
        size="md"
        className="w-full"
        asChild
      >
        <Link href="#booking">{card.cta}</Link>
      </Button>
    </Card>
  );
}


