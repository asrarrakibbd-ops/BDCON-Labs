// ==============================================================================
// BDCON Labs — Contact Messages Data Access Service (/contact)
// Stage 13: Production public submission to Supabase contact_messages table
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';

type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert'];

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  /** Hidden honeypot field to trap automated spam bots */
  honeypot?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates input and submits a new contact inquiry to Supabase contact_messages.
 * Strictly adheres to INSERT-only permissions for public/anonymous visitors.
 */
export async function submitContactMessage(
  input: ContactMessageInput
): Promise<ContactSubmissionResult> {
  // 1. Anti-Spam Honeypot Check: reject if hidden bot field is populated
  if (input.honeypot && input.honeypot.trim().length > 0) {
    // Silently return success to bot without saving to database
    return { success: true };
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone ? input.phone.trim() : null;
  const subject = input.subject.trim();
  const message = input.message.trim();

  // 2. Client-side Input Validation & Boundary Checks
  if (name.length < 2 || name.length > 100) {
    return { success: false, error: 'Name must be between 2 and 100 characters.' };
  }

  if (email.length < 5 || email.length > 150 || !EMAIL_REGEX.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (phone && phone.length > 30) {
    return { success: false, error: 'Phone number cannot exceed 30 characters.' };
  }

  if (subject.length < 2 || subject.length > 150) {
    return { success: false, error: 'Subject must be between 2 and 150 characters.' };
  }

  if (message.length < 10 || message.length > 3000) {
    return { success: false, error: 'Message must be between 10 and 3,000 characters.' };
  }

  // 3. Supabase Integration or Local Browser Storage
  const insertPayload: ContactMessageInsert = {
    name,
    email,
    phone,
    subject,
    message,
    status: 'new',
  };

  if (!isSupabaseConfigured()) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('bdcon_local_contact_messages');
        const msgs = stored ? JSON.parse(stored) : [];
        const newMsg = {
          ...insertPayload,
          id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          replied_at: null,
        };
        msgs.unshift(newMsg);
        localStorage.setItem('bdcon_local_contact_messages', JSON.stringify(msgs));
      }
      return { success: true };
    } catch (e) {
      return { success: true };
    }
  }

  try {
    // Notice: We perform a pure INSERT without .select() because public users have INSERT-only RLS
    const { error } = await (supabase.from('contact_messages') as any)
      .insert([insertPayload]);

    if (error) {
      console.error('Supabase contact submission failure:', error.message);
      return {
        success: false,
        error: "We couldn't submit your message right now. Please try again.",
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Network failure submitting contact message:', err?.message || err);
    return {
      success: false,
      error: "We couldn't submit your message right now due to a network issue. Please check your connection and try again.",
    };
  }
}

// Backwards-compatible alias for existing imports
export const submitContactMessageService = submitContactMessage;
