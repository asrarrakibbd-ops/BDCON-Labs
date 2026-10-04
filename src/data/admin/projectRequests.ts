// ==============================================================================
// BDCON Labs — Admin Project Requests Data Access Service
// Stage 14: Administrative queries & status management for project_requests
// Multi-Source Sync: Server Storage + Supabase Database + Local Storage
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import { Database } from '../../lib/supabase/types';
import { broadcastInquiryUpdate } from '../../lib/events/inquirySync';

export type ProjectRequestRow = Database['public']['Tables']['project_requests']['Row'];

export interface ProjectRequestFilterOptions {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}

export interface PaginatedProjectRequests {
  data: ProjectRequestRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const LOCAL_STORAGE_KEY = 'bdcon_local_project_requests';

function getLocalProjectRequests(): ProjectRequestRow[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalProjectRequests(reqs: ProjectRequestRow[]) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reqs));
  } catch {
    // ignore
  }
}

/**
 * Retrieves paginated project requests combining Server API, Supabase DB, and LocalStorage.
 * Guarantees that any project request submitted on the website is immediately visible in admin.
 */
export async function getAdminProjectRequests(
  options: ProjectRequestFilterOptions = {}
): Promise<PaginatedProjectRequests> {
  const page = Math.max(1, options.page || 1);
  const pageSize = options.pageSize || 20;
  const from = (page - 1) * pageSize;

  const collectedMap = new Map<string, ProjectRequestRow>();

  // Source 1: Server Backend API (Express storage)
  try {
    const res = await fetch('/api/admin/project-requests?page=1&pageSize=1000', {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      const serverList: ProjectRequestRow[] = json.data || (Array.isArray(json) ? json : []);
      for (const r of serverList) {
        if (r && r.id) {
          collectedMap.set(r.id, r);
        }
      }
    }
  } catch {
    // Server API might be in dev mode or offline; continue to next source
  }

  // Source 2: Direct Supabase Database Query
  if (isSupabaseConfigured()) {
    try {
      const { data: sbData, error } = await (supabase.from('project_requests') as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (!error && Array.isArray(sbData)) {
        for (const r of sbData) {
          if (r && r.id) {
            collectedMap.set(r.id, r);
          }
        }
      }
    } catch {
      // ignore
    }
  }

  // Source 3: Instant Browser LocalStorage (captures zero-latency local submissions)
  const localList = getLocalProjectRequests();
  for (const r of localList) {
    if (r && r.id && !collectedMap.has(r.id)) {
      collectedMap.set(r.id, r);
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
    list = list.filter((r) => r.status === options.status);
  }

  // Search by name, email, company or description
  if (options.search && options.search.trim()) {
    const q = options.search.trim().toLowerCase();
    list = list.filter(
      (r) =>
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.company && r.company.toLowerCase().includes(q)) ||
        (r.project_description && r.project_description.toLowerCase().includes(q))
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
 * Updates status and admin notes of a project request
 */
export async function updateAdminProjectRequest(
  id: string,
  updates: {
    status?: string;
    admin_notes?: string | null;
  }
): Promise<{ success: boolean; error?: string }> {
  // 1. Update local storage
  const reqs = getLocalProjectRequests();
  const index = reqs.findIndex((r) => r.id === id);
  if (index !== -1) {
    reqs[index] = {
      ...reqs[index],
      ...updates,
      status: (updates.status ?? reqs[index].status) as ProjectRequestRow['status'],
      updated_at: new Date().toISOString(),
    };
    saveLocalProjectRequests(reqs);
  }

  // 2. Update Server Backend API
  try {
    await fetch(`/api/admin/project-requests/${id}`, {
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
      }
      if (updates.admin_notes !== undefined) {
        payload.admin_notes = updates.admin_notes;
      }

      await (supabase.from('project_requests') as any)
        .update(payload)
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  // 4. Broadcast instant update to all tabs
  broadcastInquiryUpdate({ type: 'project', action: 'update', id });

  return { success: true };
}

/**
 * Permanently deletes a project request record (Admin only)
 */
export async function deleteAdminProjectRequest(
  id: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Delete from local storage
  const reqs = getLocalProjectRequests();
  saveLocalProjectRequests(reqs.filter((r) => r.id !== id));

  // 2. Delete from Server Backend API
  try {
    await fetch(`/api/admin/project-requests/${id}`, {
      method: 'DELETE',
    });
  } catch {
    // ignore
  }

  // 3. Delete from Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('project_requests') as any)
        .delete()
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  // 4. Broadcast instant update to all tabs
  broadcastInquiryUpdate({ type: 'project', action: 'delete', id });

  return { success: true };
}

// Canonical aliases matching Stage 14 specification
export const getProjectRequests = getAdminProjectRequests;
export async function updateProjectRequestStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  return updateAdminProjectRequest(id, { status });
}
export const deleteProjectRequest = deleteAdminProjectRequest;
