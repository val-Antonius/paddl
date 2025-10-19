// File: src/lib/constants/gallery.ts
import { GalleryItem, Testimonial } from '@/types';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'img-1',
    type: 'image',
    src: '/images/gallery/player-1.jpg',
    alt: 'Padel player in action',
    size: 'large'
  },
  {
    id: 'shape-1',
    type: 'shape',
    shape: 'circle',
    color: '#2d3e2e',
    size: 'small'
  },
  {
    id: 'img-2',
    type: 'image',
    src: '/images/gallery/court-1.jpg',
    alt: 'Premium padel court',
    size: 'medium'
  },
  {
    id: 'video-1',
    type: 'video',
    src: '/videos/highlights.mp4',
    size: 'wide'
  },
  {
    id: 'img-3',
    type: 'image',
    src: '/images/gallery/match-1.jpg',
    alt: 'Padel match',
    size: 'tall'
  },
  {
    id: 'shape-2',
    type: 'shape',
    shape: 'blob',
    color: '#4a5f4b',
    size: 'small'
  },
  {
    id: 'img-4',
    type: 'image',
    src: '/images/gallery/training-1.jpg',
    alt: 'Training session',
    size: 'medium'
  },
  {
    id: 'img-5',
    type: 'image',
    src: '/images/gallery/community-1.jpg',
    alt: 'Padel community',
    size: 'large'
  },
  {
    id: 'shape-3',
    type: 'shape',
    shape: 'square',
    color: '#d4c5a0',
    size: 'small'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Diego',
    location: 'Jakarta',
    country: 'ID',
    quote: 'Tidak pernah saya bayangkan padel bisa seseru ini sampai saya bertemu dengan instruktur-instruktur yang sabar membimbing.',
    imageUrl: '/images/testimonials/diego.jpg',
    variant: 'light'
  },
  {
    id: 'test-2',
    name: 'Sofia',
    location: 'Surabaya',
    country: 'ID',
    quote: 'Dari pukulan pertama hingga rally pertama, tim membuat setiap momen benar-benar tak terlupakan.',
    imageUrl: '/images/testimonials/sofia.jpg',
    variant: 'image-bg'
  },
  {
    id: 'test-3',
    name: 'Jack',
    location: 'Bali',
    country: 'ID',
    quote: 'Saya merasa aman, didukung, dan terinspirasi sepanjang perjalanan belajar saya dengan kru yang passionate ini.',
    imageUrl: '/images/testimonials/jack.jpg',
    variant: 'light'
  },
  {
    id: 'test-4',
    name: 'Maria',
    location: 'Bandung',
    country: 'ID',
    quote: 'Energi dan kesabaran instruktur mengubah kegugupan saya menjadi kegembiraan murni bermain padel.',
    imageUrl: '/images/testimonials/maria.jpg',
    variant: 'dark'
  },
  {
    id: 'test-5',
    name: 'Emma',
    location: 'Medan',
    country: 'ID',
    quote: 'Club ini mengubah hidup saya, memberikan kepercayaan diri dan kenangan yang tak terlupakan.',
    imageUrl: '/images/testimonials/emma.jpg',
    variant: 'light'
  },
  {
    id: 'test-6',
    name: 'Ryan',
    location: 'Semarang',
    country: 'ID',
    quote: 'Para pelatih membuat belajar menjadi mudah, menyenangkan, dan menantang sambil meningkatkan kepercayaan diri saya.',
    imageUrl: '/images/testimonials/ryan.jpg',
    variant: 'dark'
  }
];