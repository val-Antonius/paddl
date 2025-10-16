// File: src/components/public/sections/IntroSection.tsx
'use client';

import { Container, Heading, Section } from '../ui';
import { motion } from 'framer-motion';

interface IntroSectionProps {
  icons?: string[];
  text: string;
}

export function IntroSection({
  icons = ['🎯', '🏋️', '📋', '🏆'],
  text
}: IntroSectionProps) {
  return (
    <Section variant="light" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="xl">
        <div className="text-center">
          {/* Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-wrap justify-center gap-6 md:mb-12 md:gap-8"
          >
            {icons.map((icon, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-4xl grayscale filter md:text-5xl lg:text-6xl"
              >
                {icon}
              </motion.span>
            ))}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-5xl"
          >
            <h2 className="text-2xl font-black uppercase leading-tight text-black md:text-4xl lg:text-5xl">
              {text}
            </h2>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}