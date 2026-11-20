import { useState, useMemo } from 'react';
import type { FaqItem } from '../types/content';

/**
 * useFaqSearch Hook
 * 
 * Manages live search filtering and expanded card state for the corkboard FAQ.
 */
export function useFaqSearch(faqs: FaqItem[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;
    const query = searchTerm.toLowerCase();
    return faqs.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [faqs, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    openId,
    toggleCard,
    filteredFaqs,
    totalCount: faqs.length,
    matchCount: filteredFaqs.length
  };
}
