// ==============================================================================
// BDCON Labs — Books Data Access Service
// Stage 12B: Dynamic fetching with purchase links and static fallback
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { Book } from '../../../types/book';
import { BOOKS_DATA, getBookBySlug as getLocalBookBySlug } from '../../../data/books';
import { Database } from '../types';
import { cachedQuery } from '../../cache';

type BookRow = Database['public']['Tables']['books']['Row'];

export function mapRowToBook(row: BookRow): Book {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || undefined,
    author: row.author,
    description: row.description || undefined,
    excerpt: row.excerpt || undefined,
    coverImage: row.cover_image_url || undefined,
    coverImageUrl: row.cover_image_url || undefined,
    genre: row.genre || undefined,
    language: (row.language as any) || 'bn',
    publicationYear: row.publication_year || undefined,
    publishedYear: row.publication_year || undefined,
    publisher: row.publisher || undefined,
    isbn: row.isbn || undefined,
    pages: row.pages || undefined,
    price: row.price ? Number(row.price) : undefined,
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    stockCount: row.stock_count || 0,
    availability: row.availability as any,
    purchaseUrl: row.purchase_url || undefined,
    purchaseLinks: (row.purchase_links as any) || [],
    tableOfContents: row.table_of_contents || [],
    featured: row.featured,
    order: row.sort_order,
    sourceUrl: row.source_url || undefined,
    seo: {
      title: row.seo_title || undefined,
      description: row.seo_description || undefined,
    },
  };
}

export async function getBooksService(): Promise<Book[]> {
  return cachedQuery('books:all', async () => {
    if (!isSupabaseConfigured()) {
      return BOOKS_DATA;
    }

    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .neq('availability', 'unavailable')
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return BOOKS_DATA;
      }

      return (data as BookRow[]).map(mapRowToBook);
    } catch {
      return BOOKS_DATA;
    }
  });
}

export async function getFeaturedBooksService(): Promise<Book[]> {
  const all = await getBooksService();
  return all.filter((b) => b.featured);
}

export async function getBookBySlugService(slug: string): Promise<Book | null> {
  return cachedQuery(`book:${slug}`, async () => {
    const local = await getLocalBookBySlug(slug);

    if (!isSupabaseConfigured()) {
      return local;
    }

    try {
      const decoded = decodeURIComponent(slug).toLowerCase().trim();
      // Support english slug and bengali title lookup
      let query = supabase.from('books').select('*');
      if (decoded === 'পরজীবী' || decoded === 'porojibi') {
        query = query.or('slug.eq.porojibi,title.ilike.%পরজীবী%');
      } else if (decoded === 'তিলের-ছায়া' || decoded === 'তিলের_ছায়া' || decoded === 'tiler-chaya') {
        query = query.or('slug.eq.tiler-chaya,title.ilike.%তিলের ছায়া%');
      } else {
        query = query.eq('slug', decoded);
      }

      const { data, error } = await query.maybeSingle();

      if (error || !data) {
        return local;
      }

      return mapRowToBook(data as BookRow);
    } catch {
      return local;
    }
  });
}
