// ==============================================================================
// BDCON Labs — Admin Services Service
// Handles CRUD operations for service offerings
// ==============================================================================

import { Service } from '../../types/service';
import { SERVICES_DATA } from '../services';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';

const LOCAL_STORAGE_KEY = 'bdcon_admin_services';

function getLocalServices(): Service[] {
  if (typeof window === 'undefined' || !window.localStorage) return SERVICES_DATA;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : SERVICES_DATA;
  } catch {
    return SERVICES_DATA;
  }
}

function saveLocalServices(list: Service[]) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function getAdminServices(): Promise<Service[]> {
  try {
    const res = await fetch('/api/admin/services', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        saveLocalServices(json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await (supabase.from('services') as any)
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // fallback
    }
  }

  return getLocalServices();
}

export async function createAdminService(service: Partial<Service>): Promise<Service> {
  const id = service.id || `srv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const slug = service.slug || id;
  const newService: Service = {
    id,
    slug,
    name: service.name || '',
    category: service.category || 'Applications',
    shortDescription: service.shortDescription || '',
    description: service.description || '',
    icon: service.icon || 'code',
    features: service.features || [],
    useCases: service.useCases || [],
    published: service.published ?? true,
    featured: service.featured ?? true,
    order: service.order ?? 0,
  };

  const list = getLocalServices();
  list.unshift(newService);
  saveLocalServices(list);

  try {
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // ignore
  }

  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('services') as any).insert([{
        id: newService.id,
        slug: newService.slug,
        title: newService.name,
        name: newService.name,
        short_description: newService.shortDescription,
        description: newService.description,
        icon: newService.icon,
        category: newService.category,
        published: newService.published,
      }]);
    } catch {
      // ignore
    }
  }

  return newService;
}

export async function updateAdminService(id: string, updates: Partial<Service>): Promise<Service | null> {
  const list = getLocalServices();
  const idx = list.findIndex(s => String(s.id) === String(id) || String(s.slug) === String(id));
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalServices(list);
  }

  try {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // ignore
  }

  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('services') as any)
        .update({
          ...(updates.name && { name: updates.name, title: updates.name }),
          ...(updates.shortDescription !== undefined && { short_description: updates.shortDescription }),
          ...(updates.category && { category: updates.category }),
          ...(updates.published !== undefined && { published: updates.published }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  return idx !== -1 ? list[idx] : null;
}

export async function deleteAdminService(id: string): Promise<boolean> {
  const list = getLocalServices();
  const filtered = list.filter(s => String(s.id) !== String(id) && String(s.slug) !== String(id));
  saveLocalServices(filtered);

  try {
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
  } catch {
    // ignore
  }

  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('services') as any).delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  return true;
}
