import type { AdoptedTicket } from '../types/content';

/**
 * Gone Home Boarding Pass Archive
 * 
 * Recreates the perforated "one ticket home" airline boarding pass
 * aesthetic for puppies happily adopted into their forever families.
 */
export const GONE_HOME_PUPPIES: AdoptedTicket[] = [
  {
    id: 'ticket-1',
    slug: 'maltipoo-oliver',
    puppyName: 'Oliver',
    breed: 'Maltipoo',
    origin: 'SEOUL, KOREA (ICN)',
    destination: 'DUBAI, UAE (DXB)',
    flightNo: 'TP-702',
    adoptedDate: '12 Jan 2026',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    quote: 'Sleeping happily with his big sister!'
  },
  {
    id: 'ticket-2',
    slug: 'poodle-mimi',
    puppyName: 'Mimi',
    breed: 'Teacup Poodle',
    origin: 'DOWNTOWN SHOWROOM',
    destination: 'PALM JUMEIRAH, UAE',
    flightNo: 'VIP-01',
    adoptedDate: '28 Jan 2026',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    quote: 'The sweetest cuddlebug in Dubai.'
  },
  {
    id: 'ticket-3',
    slug: 'pomeranian-mochi',
    puppyName: 'Mochi',
    breed: 'Teacup Pomeranian',
    origin: 'SEOUL, KOREA (ICN)',
    destination: 'ABU DHABI, UAE',
    flightNo: 'TP-814',
    adoptedDate: '04 Feb 2026',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
    quote: 'Living his best beach life!'
  },
  {
    id: 'ticket-4',
    slug: 'cavapoo-waffles',
    puppyName: 'Waffles',
    breed: 'Cavapoo',
    origin: 'DOWNTOWN SHOWROOM',
    destination: 'DUBAI HILLS, UAE',
    flightNo: 'VIP-08',
    adoptedDate: '14 Feb 2026',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
    quote: 'The kids adore him endlessly.'
  }
];
