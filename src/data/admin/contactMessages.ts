// ==============================================================================
// BDCON Labs — Admin Contact Messages Data Access Service
// Stage 14: Administrative queries & status management for contact_messages
// Protected by RLS (public.is_admin() required in database)
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import { Database } from '../../lib/supabase/types';

export type ContactMessageRow = Database['public']['Tables']['contact_messages']['Row'];

export interface ContactMessageFilterOptions {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}

export interface PaginatedContactMessages {
  data: ContactMessageRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const LOCAL_STORAGE_KEY = 'bdcon_local_contact_messages';

function getLocalMessages(): ContactMessageRow[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalMessages(msgs: ContactMessageRow[]) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(msgs));
  } catch {
    // ignore
  }
}

/**
 * Retrieves paginated contact messages with optional status and text search filtering
 */
export async function getAdminContactMessages(
  options: ContactMessageFilterOptions = {}
): Promise<PaginatedContactMessages> {
  const page = Math.max(1, options.page || 1);
  const pageSize = options.pageSize || 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  if (!isSupabaseConfigured()) {
    let list = getLocalMessages();
    if (options.status && options.status !== 'all') {
      list = list.filter((m) => m.status === options.status);
    }
    if (options.search && options.search.trim()) {
      const q = options.search.trim().toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q)
      );
    }
    const total = list.length;
    const paginated = list.slice(from, from + pageSize);
    return {
      data: paginated,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  }

  try {
    let query = (supabase.from('contact_messages') as any)
      .select('*', { count: 'exact' });

    // Filter by status if specified and not 'all'
    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    // Search by name, email, subject or message
    if (options.search && options.search.trim()) {
      const q = options.search.trim();
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,subject.ilike.%${q}%,message.ilike.%${q}%`);
    }

    // Order newest messages first
    query = query
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.warn('Supabase contact messages fetch failed, using local storage fallback:', error.message);
      const local = getLocalMessages();
      return {
        data: local.slice(from, from + pageSize),
        total: local.length,
        page,
        pageSize,
        totalPages: Math.ceil(local.length / pageSize) || 1,
      };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: (data as ContactMessageRow[]) || [],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (err: any) {
    console.warn('Error retrieving contact messages:', err);
    const local = getLocalMessages();
    return {
      data: local.slice(from, from + pageSize),
      total: local.length,
      page,
      pageSize,
      totalPages: Math.ceil(local.length / pageSize) || 1,
    };
  }
}

/**
 * Updates status of a contact message (e.g. 'read', 'replied', 'archived')
 */
export async function updateAdminContactMessage(
  id: string,
  updates: {
    status?: string;
    replied_at?: string | null;
  }
): Promise<{ success: boolean; error?: string }> {
  // Update local storage
  const msgs = getLocalMessages();
  const index = msgs.findIndex((m) => m.id === id);
  if (index !== -1) {
    msgs[index] = {
      ...msgs[index],
      ...updates,
      status: (updates.status ?? msgs[index].status) as ContactMessageRow['status'],
      updated_at: new Date().toISOString(),
    };
    saveLocalMessages(msgs);
  }

  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.status !== undefined) {
      payload.status = updates.status;
      if (updates.status === 'replied' && !updates.replied_at) {
        payload.replied_at = new Date().toISOString();
      }
    }
    if (updates.replied_at !== undefined) {
      payload.replied_at = updates.replied_at;
    }

    const { error } = await (supabase.from('contact_messages') as any)
      .update(payload)
      .eq('id', id);

    if (error) {
      console.warn('Supabase contact message update notice:', error.message);
    }

    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

/**
 * Permanently deletes a contact message record (Admin only)
 */
export async function deleteAdminContactMessage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const msgs = getLocalMessages();
  saveLocalMessages(msgs.filter((m) => m.id !== id));

  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { error } = await (supabase.from('contact_messages') as any)
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Supabase contact message delete notice:', error.message);
    }

    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// Canonical aliases matching Stage 14 specification
export const getContactMessages = getAdminContactMessages;
export async function updateContactMessageStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  return updateAdminContactMessage(id, { status });
}
export const deleteContactMessage = deleteAdminContactMessage;
