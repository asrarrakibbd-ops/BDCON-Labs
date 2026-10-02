// ==============================================================================
// BDCON Labs — Portfolio Data Access Service
// Stage 12B: Dynamic fetching with category sorting and static fallback
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { PortfolioProject } from '../../../types/portfolio';
import { PORTFOLIO_PROJECTS } from '../../../data/portfolio';
import { Database } from '../types';
import { cachedQuery } from '../../cache';

type PortfolioRow = Database['public']['Tables']['portfolio_projects']['Row'];

export function mapRowToPortfolioProject(row: PortfolioRow): PortfolioProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    description: row.description || undefined,
    category: row.category as any,
    projectType: row.project_type || undefined,
    logo: row.logo_url || undefined,
    coverImage: row.cover_image_url || undefined,
    screenshots: row.screenshots || [],
    technologies: row.technologies || [],
    platforms: (row.platforms as any) || ['web'],
    featured: row.featured,
    clientName: row.client_name || undefined,
    clientVisible: row.client_visible,
    year: row.year || undefined,
    challenge: row.challenge || undefined,
    solution: row.solution || undefined,
    outcome: row.outcome || undefined,
    keyFeatures: row.key_features || [],
    liveUrl: row.live_url || undefined,
    repositoryUrl: row.repository_url || undefined,
    status: row.status as any,
    order: row.sort_order,
    displayOrder: row.sort_order,
    seo: {
      title: row.seo_title || undefined,
      description: row.seo_description || undefined,
    },
  };
}

export async function getPortfolioProjectsService(): Promise<PortfolioProject[]> {
  return cachedQuery('portfolio:all', async () => {
    if (!isSupabaseConfigured()) {
      return PORTFOLIO_PROJECTS;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .neq('status', 'archived')
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return PORTFOLIO_PROJECTS;
      }

      return (data as PortfolioRow[]).map(mapRowToPortfolioProject);
    } catch {
      return PORTFOLIO_PROJECTS;
    }
  });
}

export async function getFeaturedProjectsService(): Promise<PortfolioProject[]> {
  const all = await getPortfolioProjectsService();
  return all.filter((p) => p.featured);
}

export async function getPortfolioProjectBySlugService(slug: string): Promise<PortfolioProject | null> {
  return cachedQuery(`portfolio:${slug}`, async () => {
    const localProject = PORTFOLIO_PROJECTS.find((p: PortfolioProject) => p.slug === slug) || null;

    if (!isSupabaseConfigured()) {
      return localProject;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('slug', slug)
        .neq('status', 'archived')
        .maybeSingle();

      if (error || !data) {
        return localProject;
      }

      return mapRowToPortfolioProject(data as PortfolioRow);
    } catch {
      return localProject;
    }
  });
}
