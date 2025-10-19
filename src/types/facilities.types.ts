// File: src/lib/types/facilities.types.ts
export interface Court {
  id: string;
  name: string;
  location: string;
  address: string;
  description: string;
  features: string[];
  imageUrl: string;
  mapUrl?: string;
  availability?: string;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'coaching' | 'events' | 'booking';
  question: string;
  answer: string;
}