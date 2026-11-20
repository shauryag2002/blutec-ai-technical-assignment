import type { NavItem } from '../types/content';

/**
 * Global Navigation & Contact Configuration
 */
export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Puppies', href: '/puppies' },
  { label: 'Happy families', href: '/happy-families' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Visit & contact', href: '/contact' }
];

export const FOOTER_EXPLORE_LINKS: NavItem[] = [
  { label: 'Available puppies', href: '/puppies' },
  { label: 'Gone home', href: '/gone-home' },
  { label: 'Happy families', href: '/happy-families' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Delivery & collection', href: '/how-it-works#delivery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Visit & contact', href: '/contact' }
];

export const CONTACT_DETAILS = {
  whatsappDisplay: '+971 50 000 0000',
  whatsappUrl: "https://wa.me/919898124987?text=Hi%20TeddyPups%20U.A.E.%2C%20I'd%20like%20to%20enquire%20about%20a%20puppy.",
  email: 'info@instabizweb.com',
  address: 'Downtown Dubai, United Arab Emirates',
  showroomHours: 'Daily 10:00 AM – 9:00 PM (By Appointment)',
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instabizweb.com/' },
    { label: 'TikTok', href: 'https://www.instabizweb.com/' },
    { label: 'Facebook', href: 'https://www.instabizweb.com/' }
  ]
};
