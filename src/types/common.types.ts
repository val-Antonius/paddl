// File: src/lib/types/common.types.ts
export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

export interface Location {
  id: string;
  name: string;
  address?: string;
}