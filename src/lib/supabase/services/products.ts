// ==============================================================================
// BDCON Labs — Products Data Access Service
// Stage 12B: Relational fetching (features, screenshots) with static fallback
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { Product, ProductFeature, ProductScreenshot } from '../../../types/product';
import { PRODUCTS_DATA } from '../../../data/products';
import { Database } from '../types';
import { cachedQuery } from '../../cache';

type ProductRow = Database['public']['Tables']['products']['Row'];
type FeatureRow = Database['public']['Tables']['product_features']['Row'];
type ScreenshotRow = Database['public']['Tables']['product_screenshots']['Row'];

/**
 * Transforms a Supabase database row and optional relational children to the application Product model
 */
export function mapRowToProduct(
  row: ProductRow & {
    product_features?: FeatureRow[];
    product_screenshots?: ScreenshotRow[];
  }
): Product {
  // Sort relational features by sort_order if present
  const detailedFeatures: ProductFeature[] = (row.product_features && row.product_features.length > 0)
    ? [...row.product_features]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((f) => ({
          id: f.id,
          title: f.title,
          description: f.description || '',
        }))
    : [];

  // Sort relational screenshots by sort_order if present
  const screenshots: ProductScreenshot[] = (row.product_screenshots && row.product_screenshots.length > 0)
    ? [...row.product_screenshots]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((s) => ({
          id: s.id,
          url: s.image_url,
          title: s.alt_text || undefined,
          caption: s.caption || undefined,
        }))
    : [];

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline || undefined,
    shortDescription: row.short_description,
    description: row.description,
    category: row.category,
    platforms: (row.platforms as any) || ['web'],
    status: row.status as any,
    featured: row.featured,
    logo: row.logo_url || undefined,
    logoUrl: row.logo_url || undefined,
    screenshotUrl: row.screenshot_url || undefined,
    websiteUrl: row.website_url || undefined,
    liveUrl: row.website_url || undefined,
    androidUrl: row.android_url || undefined,
    playStoreUrl: row.android_url || undefined,
    iosUrl: row.ios_url || undefined,
    problem: row.problem || undefined,
    solution: row.solution || undefined,
    whoIsItFor: row.who_is_it_for || [],
    features: row.features || [],
    detailedFeatures,
    screenshots: screenshots.length > 0 ? screenshots : undefined,
    faqs: (row.faqs as any) || [],
    pricingPlans: (row.pricing_plans as any) || [],
    metaTitle: row.meta_title || undefined,
    metaDescription: row.meta_description || undefined,
    seo: {
      title: row.meta_title || undefined,
      description: row.meta_description || undefined,
    },
    order: row.sort_order,
    displayOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Fetches all active products from Supabase with fallback to local static data
 */
export async function getProductsService(): Promise<Product[]> {
  return cachedQuery('products:all', async () => {
    if (!isSupabaseConfigured()) {
      return PRODUCTS_DATA;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .neq('status', 'archived')
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return PRODUCTS_DATA;
      }

      return (data as ProductRow[]).map((row) => mapRowToProduct(row));
    } catch {
      return PRODUCTS_DATA;
    }
  });
}

/**
 * Fetches featured products from Supabase
 */
export async function getFeaturedProductsService(): Promise<Product[]> {
  const all = await getProductsService();
  return all.filter((p) => p.featured);
}

/**
 * Fetches a product by slug from Supabase, including relational product_features & screenshots
 */
export async function getProductBySlugService(slug: string): Promise<Product | null> {
  return cachedQuery(`product:${slug}`, async () => {
    const localProduct = PRODUCTS_DATA.find((p) => p.slug === slug) || null;

    if (!isSupabaseConfigured()) {
      return localProduct;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_features (*),
          product_screenshots (*)
        `)
        .eq('slug', slug)
        .neq('status', 'archived')
        .maybeSingle();

      if (error || !data) {
        return localProduct;
      }

      const mapped = mapRowToProduct(data as any);
      if ((!mapped.detailedFeatures || mapped.detailedFeatures.length === 0) && localProduct?.detailedFeatures) {
        mapped.detailedFeatures = localProduct.detailedFeatures;
      }
      return mapped;
    } catch {
      return localProduct;
    }
  });
}
