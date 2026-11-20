/**
 * Puppy and Catalogue Domain Types
 * 
 * Defines standard shapes for puppies, breed categories,
 * location collections, and filter states used across the app.
 */

export type Breed =
  | 'maltipoo'
  | 'pomeranian'
  | 'poodle'
  | 'cavapoo'
  | 'shih-tzu';

export type Gender = 'boy' | 'girl' | 'boy & girl';

export type LocationCollection = 'dubai' | 'korean-teacup' | 'imported';

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  breed: string;
  breedType: Breed;
  gender: Gender;
  age: string;
  collection: LocationCollection;
  image: string;
  secondaryImages?: string[];
  hasVideo: boolean;
  videoUrl?: string;
  isAvailable: boolean;
  description: string;
  traits: string[];
  weight?: string;
  color?: string;
  origin: string;
  healthChecklist: string[];
}

export interface FilterState {
  collection: string; // 'all' | 'dubai' | 'korean-teacup' | 'imported'
  breed: string;      // 'all' | Breed
  gender: string;     // 'all' | 'boys' | 'girls'
}

