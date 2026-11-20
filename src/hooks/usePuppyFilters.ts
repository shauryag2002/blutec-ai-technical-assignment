import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import type { Puppy } from '../types/puppy';

/**
 * usePuppyFilters Hook
 * 
 * Synchronizes puppy catalogue filter state (collection, breed, gender)
 * with URL search query parameters so users can share and bookmark filtered views.
 */
export function usePuppyFilters(puppies: Puppy[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const collection = searchParams.get('collection') || 'all';
  const breed = searchParams.get('breed') || 'all';
  const gender = searchParams.get('gender') || 'all';

  const setCollection = (val: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val === 'all') next.delete('collection');
      else next.set('collection', val);
      return next;
    });
  };

  const setBreed = (val: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val === 'all') next.delete('breed');
      else next.set('breed', val);
      return next;
    });
  };

  const setGender = (val: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val === 'all') next.delete('gender');
      else next.set('gender', val);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = collection !== 'all' || breed !== 'all' || gender !== 'all';

  const filteredPuppies = useMemo(() => {
    return puppies.filter((pup) => {
      // Collection filter
      if (collection !== 'all') {
        if (collection === 'dubai' && pup.collection !== 'dubai') return false;
        if (collection === 'korean-teacup' && pup.collection !== 'korean-teacup') return false;
        if (collection === 'imported' && pup.collection === 'dubai') return false;
      }

      // Breed filter
      if (breed !== 'all') {
        if (pup.breedType !== breed) return false;
      }

      // Gender filter
      if (gender !== 'all') {
        if (gender === 'boys' && pup.gender !== 'boy' && pup.gender !== 'boy & girl') return false;
        if (gender === 'girls' && pup.gender !== 'girl' && pup.gender !== 'boy & girl') return false;
      }

      return true;
    });
  }, [puppies, collection, breed, gender]);

  return {
    collection,
    breed,
    gender,
    setCollection,
    setBreed,
    setGender,
    clearFilters,
    hasActiveFilters,
    filteredPuppies
  };
}
