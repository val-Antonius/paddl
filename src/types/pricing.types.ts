// File: src/lib/types/pricing.types.ts
export type PricingCategory = 'hourly' | 'coaching' | 'membership';

export interface PricingCard {
  label: string;
  sublabel?: string;
  price?: string;
  details: string;
  cta: string;
  featured?: boolean;
}

export interface PricingTab {
  id: PricingCategory;
  label: string;
}

export interface PricingData {
  [key: string]: PricingCard[];
}