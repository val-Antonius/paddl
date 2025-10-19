// File: src/lib/types/gallery.types.ts
export type MediaType = 'image' | 'video' | 'shape';

export interface GalleryItem {
  id: string;
  type: MediaType;
  src?: string;
  alt?: string;
  shape?: 'circle' | 'square' | 'blob';
  color?: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  aspectRatio?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  country: string;
  quote: string;
  imageUrl: string;
  variant?: 'light' | 'dark' | 'image-bg';
}