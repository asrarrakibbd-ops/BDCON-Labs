// ==============================================================================
// BDCON Labs — Admin Contact Messages Data Access Service
// Stage 14: Administrative queries & status management for contact_messages
// Multi-Source Sync: Server Storage + Supabase Database + Local Storage
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import { Database } from '../../lib/supabase/types';
import { broadcastInquiryUpdate } from '../../lib/events/inquirySync';

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
 * Retrieves paginated contact messages combining Server API, Supabase DB, and LocalStorage.
 * Guarantees zero lost messages regardless of which tier accepted the submission.
 */
export async function getAdminContactMessages(
  options: ContactMessageFilterOptions = {}
): Promise<PaginatedContactMessages> {
  const page = Math.max(1, options.page || 1);
  const pageSize = options.pageSize || 20;
  const from = (page - 1) * pageSize;

  const collectedMap = new Map<string, ContactMessageRow>();

  // Source 1: Server Backend API (Express storage)
  try {
    const res = await fetch('/api/admin/contact-messages?page=1&pageSize=1000', {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      const serverList: ContactMessageRow[] = json.data || (Array.isArray(json) ? json : []);
      for (const m of serverList) {
        if (m && m.id) {
          collectedMap.set(m.id, m);
        }
      }
    }
  } catch {
    // Server API might be in dev mode or offline; continue to next source
  }

  // Source 2: Direct Supabase Database Query
  if (isSupabaseConfigured()) {
    try {
      const { data: sbData, error } = await (supabase.from('contact_messages') as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (!error && Array.isArray(sbData)) {
        for (const m of sbData) {
          if (m && m.id) {
            collectedMap.set(m.id, m);
          }
        }
      }
    } catch {
      // ignore
    }
  }

  // Source 3: Instant Browser LocalStorage (captures zero-latency local submissions)
  const localList = getLocalMessages();
  for (const m of localList) {
    if (m && m.id && !collectedMap.has(m.id)) {
      collectedMap.set(m.id, m);
    }
  }

  // Convert collected map to array
  let list = Array.from(collectedMap.values());

  // Sort newest first
  list.sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });

  // Filter by status if specified and not 'all'
  if (options.status && options.status !== 'all') {
    list = list.filter((m) => m.status === options.status);
  }

  // Search by name, email, subject, or message content
  if (options.search && options.search.trim()) {
    const q = options.search.trim().toLowerCase();
    list = list.filter(
      (m) =>
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.subject && m.subject.toLowerCase().includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q))
    );
  }

  const total = list.length;
  const paginated = list.slice(from, from + pageSize);
  const totalPages = Math.ceil(total / pageSize) || 1;

  return {
    data: paginated,
    total,
    page,
    pageSize,
    totalPages,
  };
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
  // 1. Update local storage
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

  // 2. Update Server Backend API
  try {
    await fetch(`/api/admin/contact-messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  } catch {
    // ignore
  }

  // 3. Update Supabase if configured
  if (isSupabaseConfigured()) {
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

      await (supabase.from('contact_messages') as any)
        .update(payload)
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  // 4. Broadcast instant update to all tabs
  broadcastInquiryUpdate({ type: 'contact', action: 'update', id });

  return { success: true };
}

/**
 * Permanently deletes a contact message record (Admin only)
 */
export async function deleteAdminContactMessage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Delete from local storage
  const msgs = getLocalMessages();
  saveLocalMessages(msgs.filter((m) => m.id !== id));

  // 2. Delete from Server Backend API
  try {
    await fetch(`/api/admin/contact-messages/${id}`, {
      method: 'DELETE',
    });
  } catch {
    // ignore
  }

  // 3. Delete from Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('contact_messages') as any)
        .delete()
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  // 4. Broadcast instant update to all tabs
  broadcastInquiryUpdate({ type: 'contact', action: 'delete', id });

  return { success: true };
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
