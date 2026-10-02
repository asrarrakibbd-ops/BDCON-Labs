// ==============================================================================
// BDCON Labs — Writing & Essays Data Access Service
// Stage 12B: Dynamic fetching with slug resolution and static fallback
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { WritingEntry } from '../../../types/writing';
import { WRITING_DATA, getWritingBySlug as getLocalWritingBySlug } from '../../../data/writing';
import { Database } from '../types';
import { cachedQuery } from '../../cache';

type WritingRow = Database['public']['Tables']['writing_entries']['Row'];

export function mapRowToWritingEntry(row: WritingRow): WritingEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || undefined,
    excerpt: row.excerpt || undefined,
    content: row.content || undefined,
    coverImage: row.cover_image_url || undefined,
    category: row.category || undefined,
    publishedAt: row.published_at ? new Date(row.published_at).toLocaleDateString() : undefined,
    readingTime: row.reading_time_text || `${row.reading_time_minutes} মিনিট পাঠ`,
    readingTimeMinutes: row.reading_time_minutes,
    featured: row.featured,
    language: (row.language as any) || 'bn',
    tags: row.tags || [],
    sourceUrl: row.source_url || undefined,
    seo: {
      title: row.seo_title || undefined,
      description: row.seo_description || undefined,
    },
  };
}

export async function getWritingEntriesService(): Promise<WritingEntry[]> {
  return cachedQuery('writing:all', async () => {
    if (!isSupabaseConfigured()) {
      return WRITING_DATA;
    }

    try {
      const { data, error } = await supabase
        .from('writing_entries')
        .select('*')
        .order('published_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return WRITING_DATA;
      }

      return (data as WritingRow[]).map(mapRowToWritingEntry);
    } catch {
      return WRITING_DATA;
    }
  });
}

export async function getFeaturedWritingService(): Promise<WritingEntry[]> {
  const all = await getWritingEntriesService();
  return all.filter((w) => w.featured);
}

export async function getWritingBySlugService(slug: string): Promise<WritingEntry | null> {
  return cachedQuery(`writing:${slug}`, async () => {
    const local = await getLocalWritingBySlug(slug);

    if (!isSupabaseConfigured()) {
      return local;
    }

    try {
      const decoded = decodeURIComponent(slug).toLowerCase().trim();

      // Map common slug variations or aliases
      let targetSlug = decoded;
      if (decoded.includes('জ্ঞান') || decoded.includes('gyan')) {
        targetSlug = 'gyan-bibhrom-o-sotter-sondhan';
      } else if (decoded.includes('নক্ষত্র') || decoded.includes('nokkhotro')) {
        targetSlug = 'mrito-nokkhotrer-bari';
      } else if (decoded.includes('আদর্শ') || decoded.includes('adorsho')) {
        targetSlug = 'adorsho-bonam-manush';
      } else if (decoded.includes('পড়তে') || decoded.includes('porte') || decoded.includes('boi-keno')) {
        targetSlug = 'manush-boi-keno-porte-chay-na';
      } else if (decoded.includes('syler') || decoded.includes('be-like')) {
        targetSlug = 'be-like-syler';
      }

      const { data, error } = await supabase
        .from('writing_entries')
        .select('*')
        .or(`slug.eq.${targetSlug},slug.eq.${decoded}`)
        .maybeSingle();

      if (error || !data) {
        return local;
      }

      return mapRowToWritingEntry(data as WritingRow);
    } catch {
      return local;
    }
  });
}
