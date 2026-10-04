// ==============================================================================
// BDCON Labs — Admin Writing Service
// Handles CRUD operations for essays & blog entries
// ==============================================================================

import { WritingEntry } from '../../types/writing';
import { WRITING_DATA } from '../writing';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';

const LOCAL_STORAGE_KEY = 'bdcon_admin_writing';

function getLocalWriting(): WritingEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) return WRITING_DATA;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : WRITING_DATA;
  } catch {
    return WRITING_DATA;
  }
}

function saveLocalWriting(list: WritingEntry[]) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function getAdminWriting(): Promise<WritingEntry[]> {
  try {
    const res = await fetch('/api/admin/writing', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        saveLocalWriting(json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await (supabase.from('writing_entries') as any)
        .select('*')
        .order('published_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // fallback
    }
  }

  return getLocalWriting();
}

export async function createAdminWriting(entry: Partial<WritingEntry>): Promise<WritingEntry> {
  const id = entry.id || `essay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const slug = entry.slug || id;
  const newEntry: WritingEntry = {
    id,
    slug,
    title: entry.title || '',
    subtitle: entry.subtitle || '',
    excerpt: entry.excerpt || '',
    content: entry.content || '',
    coverImage: entry.coverImage || '',
    category: entry.category || 'দার্শনিক ও চিন্তন',
    publishedAt: entry.publishedAt || new Date().toISOString().split('T')[0],
    readingTime: entry.readingTime || '৫ মিনিট পাঠ',
    readingTimeMinutes: entry.readingTimeMinutes || 5,
    featured: entry.featured ?? false,
    author: entry.author || 'রাকিব আসরার',
    language: entry.language || 'bn',
    tags: entry.tags || [],
  };

  const list = getLocalWriting();
  list.unshift(newEntry);
  saveLocalWriting(list);

  try {
    const res = await fetch('/api/admin/writing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
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
      await (supabase.from('writing_entries') as any).insert([{
        id: newEntry.id,
        slug: newEntry.slug,
        title: newEntry.title,
        subtitle: newEntry.subtitle,
        excerpt: newEntry.excerpt,
        content: newEntry.content,
        category: newEntry.category,
        author: newEntry.author,
        published_at: newEntry.publishedAt,
        reading_time_text: newEntry.readingTime,
      }]);
    } catch {
      // ignore
    }
  }

  return newEntry;
}

export async function updateAdminWriting(id: string, updates: Partial<WritingEntry>): Promise<WritingEntry | null> {
  const list = getLocalWriting();
  const idx = list.findIndex(e => String(e.id) === String(id) || String(e.slug) === String(id));
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalWriting(list);
  }

  try {
    const res = await fetch(`/api/admin/writing/${id}`, {
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
      await (supabase.from('writing_entries') as any)
        .update({
          ...(updates.title && { title: updates.title }),
          ...(updates.subtitle !== undefined && { subtitle: updates.subtitle }),
          ...(updates.excerpt !== undefined && { excerpt: updates.excerpt }),
          ...(updates.content !== undefined && { content: updates.content }),
          ...(updates.category && { category: updates.category }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  return idx !== -1 ? list[idx] : null;
}

export async function deleteAdminWriting(id: string): Promise<boolean> {
  const list = getLocalWriting();
  const filtered = list.filter(e => String(e.id) !== String(id) && String(e.slug) !== String(id));
  saveLocalWriting(filtered);

  try {
    await fetch(`/api/admin/writing/${id}`, { method: 'DELETE' });
  } catch {
    // ignore
  }

  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('writing_entries') as any).delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  return true;
}
