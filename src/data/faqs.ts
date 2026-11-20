import type { FaqItem } from '../types/content';

/**
 * 9 Verified Corkboard FAQ Items
 * 
 * Features the 3 primary homepage sparkle questions
 * and 6 extended questions for the dedicated /faq corkboard.
 */
export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    category: 'health',
    isSparkle: true
  },
  {
    id: 'faq-2',
    question: 'Can I meet a puppy before I decide?',
    answer: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
    category: 'process',
    isSparkle: true
  },
  {
    id: 'faq-3',
    question: 'Can I take my puppy home the same day?',
    answer: 'Local puppies are available immediately, so you can take your puppy home the same day once adoption agreements and vet clearances are verified.',
    category: 'process',
    isSparkle: true
  },
  {
    id: 'faq-4',
    question: 'How does Korean Teacup import work?',
    answer: 'We partner directly with certified ethical breeders in Seoul. Once you choose your puppy, we handle flight reservations, Korean Kennel Club export papers, UAE MOCCAE import permits, and VIP flight nanny transport directly to Dubai.',
    category: 'process',
    isSparkle: false
  },
  {
    id: 'faq-5',
    question: 'What breeds do you specialize in?',
    answer: 'We specialize in designer teacup and miniature breeds: Maltipoo, Korean Teacup Poodle, Toy Poodle, Pomeranian, Cavapoo, and Imperial Shih Tzu.',
    category: 'general',
    isSparkle: false
  },
  {
    id: 'faq-6',
    question: 'Do you deliver across the UAE?',
    answer: 'Yes! We provide safe, air-conditioned door-to-door white-glove delivery across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.',
    category: 'process',
    isSparkle: false
  },
  {
    id: 'faq-7',
    question: 'Are TeddyPups hypoallergenic and low shedding?',
    answer: 'Yes. Breeds like Maltipoos, Poodles, and Cavapoos are widely celebrated for having hair rather than fur, making them non-shedding and ideal for allergy-sensitive households.',
    category: 'health',
    isSparkle: false
  },
  {
    id: 'faq-8',
    question: 'What health guarantee do you provide?',
    answer: 'Every TeddyPups puppy is backed by a full comprehensive congenital health warranty, complete veterinary vaccination passport, and 24/7 post-adoption care guidance.',
    category: 'health',
    isSparkle: false
  },
  {
    id: 'faq-9',
    question: 'What should I prepare before bringing puppy home?',
    answer: 'We supply a complete puppy starter kit with premium food, playpen recommendations, chew toys, and pee pads. Our team walks you through puppy-proofing your apartment or villa.',
    category: 'general',
    isSparkle: false
  }
];
