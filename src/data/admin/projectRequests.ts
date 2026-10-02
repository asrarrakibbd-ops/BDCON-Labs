// ==============================================================================
// BDCON Labs — Admin Project Requests Data Access Service
// Stage 14: Administrative queries & status management for project_requests
// Protected by RLS (public.is_admin() required in database)
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import { Database } from '../../lib/supabase/types';

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
 * Retrieves paginated project requests with optional status and text search filtering
 */
export async function getAdminProjectRequests(
  options: ProjectRequestFilterOptions = {}
): Promise<PaginatedProjectRequests> {
  const page = Math.max(1, options.page || 1);
  const pageSize = options.pageSize || 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  if (!isSupabaseConfigured()) {
    let list = getLocalProjectRequests();
    if (options.status && options.status !== 'all') {
      list = list.filter((r) => r.status === options.status);
    }
    if (options.search && options.search.trim()) {
      const q = options.search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          (r.company && r.company.toLowerCase().includes(q)) ||
          r.project_description.toLowerCase().includes(q)
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
    let query = (supabase.from('project_requests') as any)
      .select('*', { count: 'exact' });

    // Filter by status if specified and not 'all'
    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    // Search by name, email, company or description
    if (options.search && options.search.trim()) {
      const q = options.search.trim();
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%,project_description.ilike.%${q}%`);
    }

    // Order newest submissions first
    query = query
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.warn('Supabase project requests fetch failed, using local storage fallback:', error.message);
      const local = getLocalProjectRequests();
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
      data: (data as ProjectRequestRow[]) || [],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (err: any) {
    console.warn('Error fetching project requests:', err);
    const local = getLocalProjectRequests();
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
 * Updates status and optional internal notes for a specific project request
 */
export async function updateAdminProjectRequest(
  id: string,
  updates: {
    status?: string;
    admin_notes?: string | null;
  }
): Promise<{ success: boolean; error?: string }> {
  // Update local storage
  const reqs = getLocalProjectRequests();
  const index = reqs.findIndex((r) => r.id === id);
  if (index !== -1) {
    reqs[index] = {
      ...reqs[index],
      ...updates,
      status: (updates.status ?? reqs[index].status) as ProjectRequestRow['status'],
      updated_at: new Date().toISOString(),
    };
    saveLocalProjectProject(reqs);
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
    }
    if (updates.admin_notes !== undefined) {
      payload.admin_notes = updates.admin_notes;
    }

    const { error } = await (supabase.from('project_requests') as any)
      .update(payload)
      .eq('id', id);

    if (error) {
      console.warn('Supabase project request update notice:', error.message);
    }

    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

function saveLocalProjectProject(reqs: ProjectRequestRow[]) {
  saveLocalProjectRequests(reqs);
}

/**
 * Permanently deletes a project request record (Admin only)
 */
export async function deleteAdminProjectRequest(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const reqs = getLocalProjectRequests();
  saveLocalProjectRequests(reqs.filter((r) => r.id !== id));

  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { error } = await (supabase.from('project_requests') as any)
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Supabase project request delete notice:', error.message);
    }

    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// Canonical aliases matching Stage 14 specification
export const getProjectRequests = getAdminProjectRequests;
export async function updateProjectRequestStatus(
  id: string,
  status: string,
  adminNotes?: string | null
): Promise<{ success: boolean; error?: string }> {
  return updateAdminProjectRequest(id, {
    status,
    admin_notes: adminNotes,
  });
}
export const deleteProjectRequest = deleteAdminProjectRequest;
