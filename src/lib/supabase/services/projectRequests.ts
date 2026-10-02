// ==============================================================================
// BDCON Labs — Project Requests Data Access Service (/start-project)
// Stage 13: Production public submission to Supabase project_requests table
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';

type ProjectRequestInsert = Database['public']['Tables']['project_requests']['Insert'];

export interface ProjectRequestInput {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  project_scope: string;
  budget_range: string;
  timeline: string;
  project_description: string;
  /** Hidden honeypot field to trap automated spam bots */
  honeypot?: string;
}

export interface ProjectSubmissionResult {
  success: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates input and submits a new project inquiry to Supabase project_requests.
 * Strictly adheres to INSERT-only permissions for public/anonymous visitors.
 */
export async function submitProjectRequest(
  input: ProjectRequestInput
): Promise<ProjectSubmissionResult> {
  // 1. Anti-Spam Honeypot Check: reject if hidden bot field is populated
  if (input.honeypot && input.honeypot.trim().length > 0) {
    // Silently return success to bot without saving to database
    return { success: true };
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone ? input.phone.trim() : null;
  const company = input.company ? input.company.trim() : null;
  const project_scope = input.project_scope.trim();
  const budget_range = input.budget_range.trim();
  const timeline = input.timeline.trim();
  const project_description = input.project_description.trim();

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

  if (company && company.length > 100) {
    return { success: false, error: 'Company name cannot exceed 100 characters.' };
  }

  if (!project_scope) {
    return { success: false, error: 'Please select a project type.' };
  }

  if (!budget_range) {
    return { success: false, error: 'Please select an estimated budget range.' };
  }

  if (!timeline) {
    return { success: false, error: 'Please specify an expected timeline.' };
  }

  if (project_description.length < 10 || project_description.length > 3000) {
    return { success: false, error: 'Project description must be between 10 and 3,000 characters.' };
  }

  // 3. Supabase Integration or Local Browser Storage
  const insertPayload: ProjectRequestInsert = {
    name,
    email,
    phone,
    company,
    project_scope,
    budget_range,
    timeline,
    project_description,
    status: 'new',
  };

  if (!isSupabaseConfigured()) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('bdcon_local_project_requests');
        const reqs = stored ? JSON.parse(stored) : [];
        const newReq = {
          ...insertPayload,
          id: 'req-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          admin_notes: null,
        };
        reqs.unshift(newReq);
        localStorage.setItem('bdcon_local_project_requests', JSON.stringify(reqs));
      }
      return { success: true };
    } catch (e) {
      return { success: true };
    }
  }

  try {
    // Notice: We perform a pure INSERT without .select() because public users have INSERT-only RLS
    const { error } = await (supabase.from('project_requests') as any)
      .insert([insertPayload]);

    if (error) {
      console.error('Supabase project request submission failure:', error.message);
      return {
        success: false,
        error: "We couldn't submit your project request right now. Please try again.",
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Network failure submitting project request:', err?.message || err);
    return {
      success: false,
      error: "We couldn't submit your project request right now due to a network issue. Please check your connection and try again.",
    };
  }
}

// Backwards-compatible alias for existing imports
export const submitProjectRequestService = submitProjectRequest;
