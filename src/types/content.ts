/**
 * Content & Presentation Types
 * 
 * Data models for testimonials, polaroids, FAQ items,
 * boarding passes, and navigation links.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: 'health' | 'process' | 'general';
  isSparkle?: boolean;
}

export interface FamilyMoment {
  id: string;
  clientName: string;
  location: string;
  quote?: string;
  puppyName?: string;
  image: string;
  caption: string;
  washiColor?: string;
  tiltDeg?: number;
}

export interface AdoptedTicket {
  id: string;
  slug: string;
  puppyName: string;
  breed: string;
  origin: string;
  destination: string;
  adoptedDate: string;
  flightNo?: string;
  image: string;
  quote?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

