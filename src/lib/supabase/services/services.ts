// ==============================================================================
// BDCON Labs — Services Data Access Service
// Stage 12B: Dynamic fetching with relational approach & deliverables support
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { Service } from '../../../types/service';
import { SERVICES_DATA } from '../../../data/services';
import { Database } from '../types';
import { cachedQuery } from '../../cache';

type ServiceRow = Database['public']['Tables']['services']['Row'];

export function mapRowToService(row: ServiceRow): Service {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.short_description,
    description: row.description,
    icon: row.icon as any,
    category: row.category || undefined,
    features: row.features || [],
    useCases: row.use_cases || [],
    approach: (row.approach as any) || [],
    deliverables: (row.deliverables as any) || [],
    published: row.published,
    featured: row.featured,
    metaTitle: row.meta_title || undefined,
    metaDescription: row.meta_description || undefined,
    order: row.sort_order,
  };
}

export async function getServicesService(): Promise<Service[]> {
  return cachedQuery('services:all', async () => {
    if (!isSupabaseConfigured()) {
      return SERVICES_DATA;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return SERVICES_DATA;
      }

      return (data as ServiceRow[]).map(mapRowToService);
    } catch {
      return SERVICES_DATA;
    }
  });
}

export async function getFeaturedServicesService(): Promise<Service[]> {
  const all = await getServicesService();
  return all.filter((s) => s.featured);
}

export async function getServiceBySlugService(slug: string): Promise<Service | null> {
  return cachedQuery(`service:${slug}`, async () => {
    const localService = SERVICES_DATA.find((s) => s.slug === slug) || null;

    if (!isSupabaseConfigured()) {
      return localService;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error || !data) {
        return localService;
      }

      const mapped = mapRowToService(data as ServiceRow);
      // If database row approach/deliverables are empty, inherit from local data if available
      if ((!mapped.approach || mapped.approach.length === 0) && localService?.approach) {
        mapped.approach = localService.approach;
      }
      if ((!mapped.deliverables || mapped.deliverables.length === 0) && localService?.deliverables) {
        mapped.deliverables = localService.deliverables;
      }
      return mapped;
    } catch {
      return localService;
    }
  });
}
