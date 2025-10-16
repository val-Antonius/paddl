// File: src/lib/constants/navigation.ts
import { NavLink } from '../../types';

export const NAV_LINKS: NavLink[] = [
  { label: 'LAPANGAN', href: '#lapangan' },
  { label: 'KOTA', href: '#kota' }
];

export const FOOTER_LINKS = {
  locations: [
    { label: 'BSD', href: '#bsd' },
    { label: 'PIK', href: '#pik' },
    { label: 'Kemang', href: '#kemang' }
  ],
  programs: [
    { label: 'Open Play', href: '#open-play' },
    { label: 'Coaching', href: '#coaching' },
    { label: 'Tournament', href: '#tournament' },
    { label: 'Membership', href: '#membership' }
  ],
  about: [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Pelatih', href: '#coaches' },
    { label: 'Fasilitas', href: '#facilities' },
    { label: 'Kontak', href: '#contact' }
  ]
};