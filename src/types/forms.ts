/**
 * Form Data Types
 * 
 * Type definitions for the puppy enquiry postcard
 * and the Mad-Libs contact letter form.
 */

export interface EnquiryFormData {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  message: string;
  puppyName?: string;
}

export interface ContactLetterData {
  name: string;
  contact: string;
  preferredBreed: string;
  message: string;
}

