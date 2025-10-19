// File: src/components/public/sections/GallerySection.tsx
'use client';

import { useRef } from 'react';
import { Container, Heading, Section } from '../ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { useParallax, useInView } from '@/hooks';
import { GalleryItem } from '@/types';

interface GallerySectionProps {
  title?: string;
  items: GalleryItem[];
}

export function GallerySection({
  title = 'GALERI KAMI',
  items
}: GallerySectionProps) {
  return (
    <Section variant="light" className="py-16 md:py-24 lg:py-32">
      <Container maxWidth="2xl">
        <Heading as="h2" size="xl" className="mb-12 text-center md:mb-16">
          {title}
        </Heading>

        {/* Bento Grid */}
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[250px] md:grid-cols-4 md:gap-6 lg:auto-rows-[300px]">
          {items.map((item, index) => (
            <GalleryGridItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

interface GalleryGridItemProps {
  item: GalleryItem;
  index: number;
}

function GalleryGridItem({ item, index }: GalleryGridItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView({ elementRef: itemRef, threshold: 0.2 });
  const parallaxOffset = useParallax({ elementRef: itemRef, speed: 0.3 });

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2 md:col-span-2 md:row-span-1',
    large: 'col-span-2 row-span-2',
    wide: 'col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2'
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      ref={itemRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={`group relative overflow-hidden rounded-2xl ${sizeClasses[item.size]}`}
    >
      {item.type === 'image' && (
        <ImageItem src={item.src!} alt={item.alt!} parallaxOffset={parallaxOffset} />
      )}

      {item.type === 'video' && (
        <VideoItem src={item.src!} />
      )}

      {item.type === 'shape' && (
        <ShapeItem shape={item.shape!} color={item.color!} />
      )}
    </motion.div>
  );
}

interface ImageItemProps {
  src: string;
  alt: string;
  parallaxOffset: number;
}

function ImageItem({ src, alt, parallaxOffset }: ImageItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-moss-green/10">
      {/* Parallax Image */}
      <motion.div
        className="h-full w-full"
        style={{ y: parallaxOffset }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </motion.div>

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-moss-green/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Reveal Effect */}
      <motion.div
        className="absolute inset-0 bg-ivory"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}

interface VideoItemProps {
  src: string;
}

function VideoItem({ src }: VideoItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <video
        src={src}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
      />

      {/* Play Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 group-hover:bg-black/60">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-ivory/90 md:h-20 md:w-20"
        >
          <Play className="h-8 w-8 fill-moss-green text-moss-green md:h-10 md:w-10" />
        </motion.div>
      </div>
    </div>
  );
}

interface ShapeItemProps {
  shape: 'circle' | 'square' | 'blob';
  color: string;
}

function ShapeItem({ shape, color }: ShapeItemProps) {
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-2xl',
    blob: 'rounded-[40%_60%_70%_30%/50%_60%_40%_50%]'
  };

  return (
    <motion.div
      className={`h-full w-full ${shapeClasses[shape]}`}
      style={{ backgroundColor: color }}
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Optional: Add pattern or texture */}
      <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/10" />
    </motion.div>
  );
}