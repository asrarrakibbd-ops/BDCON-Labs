// ==============================================================================
// BDCON Engineering Ltd — Engineering Enquiries Service (/engineering/contact)
// Strict Compliance with E4 & Supabase Security Architecture
// - INSERT-only for public anonymous visitors
// - Client-side boundary validation & Anti-spam honeypot
// - Zero exposure of service_role keys
// - Safe fallback to local storage if endpoint is not injected
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';

type EngineeringInquiryInsert = Database['public']['Tables']['engineering_inquiries']['Insert'];

export interface EngineeringInquiryInput {
  name: string;
  email: string;
  phone: string;
  project_location: string;
  project_type: string;
  building_area?: string | null;
  required_service: string;
  description: string;
  preferred_contact: 'email' | 'phone' | 'whatsapp' | string;
  /** Hidden honeypot field to trap automated spam bots */
  honeypot?: string;
}

export interface EngineeringInquiryResult {
  success: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEngineeringInquiry(
  input: EngineeringInquiryInput
): Promise<EngineeringInquiryResult> {
  // 1. Anti-Spam Honeypot Trap
  if (input.honeypot && input.honeypot.trim().length > 0) {
    // Silently return success to bot without saving to database
    return { success: true };
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const project_location = input.project_location.trim();
  const project_type = input.project_type.trim();
  const building_area = input.building_area ? input.building_area.trim() : null;
  const required_service = input.required_service.trim();
  const description = input.description.trim();
  const preferred_contact = input.preferred_contact.trim() || 'email';

  // 2. Client-side Boundary Validation
  if (name.length < 2 || name.length > 100) {
    return { success: false, error: 'Name must be between 2 and 100 characters.' };
  }

  if (email.length < 5 || email.length > 150 || !EMAIL_REGEX.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (phone.length < 3 || phone.length > 30) {
    return { success: false, error: 'Please enter a valid phone or WhatsApp number (up to 30 characters).' };
  }

  if (project_location.length < 2 || project_location.length > 150) {
    return { success: false, error: 'Project location must be between 2 and 150 characters.' };
  }

  if (!project_type) {
    return { success: false, error: 'Please select a project type.' };
  }

  if (building_area && building_area.length > 100) {
    return { success: false, error: 'Approximate building area cannot exceed 100 characters.' };
  }

  if (!required_service) {
    return { success: false, error: 'Please select a required engineering service.' };
  }

  if (description.length < 10 || description.length > 3000) {
    return { success: false, error: 'Project description must be between 10 and 3,000 characters.' };
  }

  // 3. Prepare payload for Insertion
  const insertPayload: EngineeringInquiryInsert = {
    name,
    email,
    phone,
    project_location,
    project_type,
    building_area,
    required_service,
    description,
    preferred_contact,
    status: 'new',
  };

  // 4. Fallback if Supabase is not yet configured or offline
  if (!isSupabaseConfigured()) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('bdcon_local_engineering_inquiries');
        const list = stored ? JSON.parse(stored) : [];
        const newRecord = {
          ...insertPayload,
          id: 'eng-inq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          admin_notes: null,
        };
        list.unshift(newRecord);
        localStorage.setItem('bdcon_local_engineering_inquiries', JSON.stringify(list));
      }
      return { success: true };
    } catch {
      return { success: true };
    }
  }

  // 5. Submit to Supabase engineering_inquiries table
  try {
    // Pure INSERT without .select() adhering to INSERT-only RLS policy
    const { error } = await (supabase.from('engineering_inquiries') as any)
      .insert([insertPayload]);

    if (error) {
      console.error('Engineering inquiry submission failure:', error.message);
      return {
        success: false,
        error: "We couldn't submit your engineering inquiry right now. Please try again or reach out directly.",
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Network failure submitting engineering inquiry:', err?.message || err);
    return {
      success: false,
      error: "Network error occurred while submitting your inquiry. Please check your internet connection and try again.",
    };
  }
}
