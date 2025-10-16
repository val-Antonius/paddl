// File: src/components/public/sections/ScheduleSection.tsx
'use client';

import { Container, Heading, Section } from '../ui';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScheduleNavigation } from '@/hooks';
import { SCHEDULE_DATA, LOCATIONS, ACTIVITY_COLORS, LEGEND_ITEMS } from '@/lib/constants/schedule';
import { ActivityType } from '@/types';

interface ScheduleSectionProps {
  title?: string;
}

export function ScheduleSection({ title = 'JADWAL MINGGU INI' }: ScheduleSectionProps) {
  const { currentDay, goToNextDay, goToPrevDay } = useScheduleNavigation();
  const scheduleData = SCHEDULE_DATA[currentDay] || SCHEDULE_DATA['Senin'];

  const getActivityClass = (activity: string): ActivityType => {
    if (activity === '—' || activity === '') return 'empty';
    if (activity.includes('Open')) return 'Open';
    if (activity.includes('CF') && !activity.includes('Hybrid')) return 'CF';
    if (activity.includes('Hybrid')) return 'Hybrid';
    return 'Open';
  };

  return (
    <Section variant="dark" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="2xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <Heading as="h2" size="lg" className="mb-8 text-ivory md:mb-12">
            {title}
          </Heading>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <button
              onClick={goToPrevDay}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-moss-green text-ivory transition-all hover:scale-110 hover:bg-moss-green md:h-12 md:w-12"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <motion.div
              key={currentDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-w-[150px] md:min-w-[200px]"
            >
              <h3 className="text-2xl font-black uppercase text-ivory md:text-3xl lg:text-4xl">
                {currentDay}
              </h3>
            </motion.div>

            <button
              onClick={goToNextDay}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-moss-green text-ivory transition-all hover:scale-110 hover:bg-moss-green md:h-12 md:w-12"
              aria-label="Next day"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Locations */}
          <div className="mt-6 flex justify-center gap-4 md:mt-8 md:gap-8">
            {LOCATIONS.map((location) => (
              <span
                key={location}
                className="text-xs font-bold uppercase tracking-widest text-cream md:text-sm lg:text-base"
              >
                {location}
              </span>
            ))}
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto rounded-lg border-2 border-moss-green bg-black/80">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-moss-green">
                <th className="border border-moss-dark px-3 py-4 text-left text-sm font-black uppercase text-ivory md:px-4 md:py-6 md:text-base">
                  Waktu
                </th>
                {LOCATIONS.map((location) => (
                  <th
                    key={location}
                    className="border border-moss-dark px-3 py-4 text-center text-sm font-black uppercase text-ivory md:px-4 md:py-6 md:text-base"
                  >
                    {location}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="transition-colors hover:bg-moss-green/10"
                >
                  <td className="border border-moss-green px-3 py-3 text-xs font-bold text-cream md:px-4 md:py-5 md:text-sm">
                    {row[0]}
                  </td>
                  {row.slice(1).map((cell, cellIndex) => {
                    const activityType = getActivityClass(cell);
                    return (
                      <td
                        key={cellIndex}
                        className={`border border-moss-green px-3 py-3 text-center text-xs font-semibold uppercase md:px-4 md:py-5 md:text-sm ${ACTIVITY_COLORS[activityType]}`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:mt-12 md:gap-8">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full md:h-4 md:w-4"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-bold uppercase tracking-wide text-ivory md:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}