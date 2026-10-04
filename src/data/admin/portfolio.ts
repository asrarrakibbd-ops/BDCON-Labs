// ==============================================================================
// BDCON Labs — Admin Portfolio Service
// Handles CRUD operations for portfolio case studies & projects
// ==============================================================================

import { PortfolioProject } from '../../types/portfolio';
import { PORTFOLIO_PROJECTS } from '../portfolio';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';

const LOCAL_STORAGE_KEY = 'bdcon_admin_portfolio';

function getLocalPortfolio(): PortfolioProject[] {
  if (typeof window === 'undefined' || !window.localStorage) return PORTFOLIO_PROJECTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : PORTFOLIO_PROJECTS;
  } catch {
    return PORTFOLIO_PROJECTS;
  }
}

function saveLocalPortfolio(list: PortfolioProject[]) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function getAdminPortfolio(): Promise<PortfolioProject[]> {
  try {
    const res = await fetch('/api/admin/portfolio', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        saveLocalPortfolio(json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await (supabase.from('portfolio_projects') as any)
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // fallback
    }
  }

  return getLocalPortfolio();
}

export async function createAdminPortfolio(project: Partial<PortfolioProject>): Promise<PortfolioProject> {
  const id = project.id || `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const slug = project.slug || id;
  const newProject: PortfolioProject = {
    id,
    slug,
    title: project.title || '',
    shortDescription: project.shortDescription || '',
    description: project.description || '',
    category: project.category || 'web-application',
    technologies: project.technologies || ['React', 'TypeScript', 'Tailwind CSS'],
    platforms: project.platforms || ['web'],
    status: project.status || 'live',
    featured: project.featured ?? true,
    year: project.year || new Date().getFullYear(),
    liveUrl: project.liveUrl || '',
    repositoryUrl: project.repositoryUrl || '',
    coverImage: project.coverImage || '',
  };

  const list = getLocalPortfolio();
  list.unshift(newProject);
  saveLocalPortfolio(list);

  try {
    const res = await fetch('/api/admin/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
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
      await (supabase.from('portfolio_projects') as any).insert([{
        id: newProject.id,
        slug: newProject.slug,
        title: newProject.title,
        short_description: newProject.shortDescription,
        description: newProject.description,
        category: newProject.category,
        technologies: newProject.technologies,
        platforms: newProject.platforms,
        status: newProject.status,
        live_url: newProject.liveUrl,
      }]);
    } catch {
      // ignore
    }
  }

  return newProject;
}

export async function updateAdminPortfolio(id: string, updates: Partial<PortfolioProject>): Promise<PortfolioProject | null> {
  const list = getLocalPortfolio();
  const idx = list.findIndex(p => String(p.id) === String(id) || String(p.slug) === String(id));
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalPortfolio(list);
  }

  try {
    const res = await fetch(`/api/admin/portfolio/${id}`, {
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
      await (supabase.from('portfolio_projects') as any)
        .update({
          ...(updates.title && { title: updates.title }),
          ...(updates.shortDescription !== undefined && { short_description: updates.shortDescription }),
          ...(updates.category && { category: updates.category }),
          ...(updates.status && { status: updates.status }),
          ...(updates.liveUrl !== undefined && { live_url: updates.liveUrl }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  return idx !== -1 ? list[idx] : null;
}

export async function deleteAdminPortfolio(id: string): Promise<boolean> {
  const list = getLocalPortfolio();
  const filtered = list.filter(p => String(p.id) !== String(id) && String(p.slug) !== String(id));
  saveLocalPortfolio(filtered);

  try {
    await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
  } catch {
    // ignore
  }

  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('portfolio_projects') as any).delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  return true;
}
