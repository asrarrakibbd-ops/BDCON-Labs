// ==============================================================================
// BDCON Labs — Admin Products Service
// Handles CRUD operations for proprietary software products
// ==============================================================================

import { Product, ProductPlatform, ProductStatus } from '../../types/product';
import { PRODUCTS_DATA } from '../products';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';

const LOCAL_STORAGE_KEY = 'bdcon_admin_products';

function getLocalProducts(): Product[] {
  if (typeof window === 'undefined' || !window.localStorage) return PRODUCTS_DATA;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : PRODUCTS_DATA;
  } catch {
    return PRODUCTS_DATA;
  }
}

function saveLocalProducts(list: Product[]) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function getAdminProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/admin/products', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        saveLocalProducts(json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await (supabase.from('products') as any)
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // fallback
    }
  }

  return getLocalProducts();
}

export async function createAdminProduct(product: Partial<Product>): Promise<Product> {
  const id = product.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const slug = product.slug || id;
  const newProduct: Product = {
    id,
    slug,
    name: product.name || '',
    tagline: product.tagline || '',
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    category: product.category || 'Financial & Payroll Tools',
    platforms: (product.platforms as ProductPlatform[]) || ['web'],
    status: (product.status as ProductStatus) || 'available',
    featured: product.featured ?? true,
    websiteUrl: product.websiteUrl || product.liveUrl || '',
    liveUrl: product.liveUrl || product.websiteUrl || '',
    playStoreUrl: product.playStoreUrl || product.androidUrl || '',
    androidUrl: product.androidUrl || product.playStoreUrl || '',
    features: product.features || [],
    screenshotUrl: product.screenshotUrl || (product as any).coverImage || '',
    coverImage: (product as any).coverImage || product.screenshotUrl || '',
    logo: product.logo || '',
    logoUrl: product.logoUrl || '',
  };

  const list = getLocalProducts();
  list.unshift(newProduct);
  saveLocalProducts(list);

  try {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
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
      await (supabase.from('products') as any).insert([{
        id: newProduct.id,
        slug: newProduct.slug,
        title: newProduct.name,
        name: newProduct.name,
        short_description: newProduct.shortDescription,
        description: newProduct.description,
        category: newProduct.category,
        platforms: newProduct.platforms,
        status: newProduct.status,
      }]);
    } catch {
      // ignore
    }
  }

  return newProduct;
}

export async function updateAdminProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const list = getLocalProducts();
  const idx = list.findIndex(p => String(p.id) === String(id) || String(p.slug) === String(id));
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalProducts(list);
  }

  try {
    const res = await fetch(`/api/admin/products/${id}`, {
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
      await (supabase.from('products') as any)
        .update({
          ...(updates.name && { name: updates.name, title: updates.name }),
          ...(updates.shortDescription !== undefined && { short_description: updates.shortDescription }),
          ...(updates.category && { category: updates.category }),
          ...(updates.status && { status: updates.status }),
          ...(updates.platforms && { platforms: updates.platforms }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  return idx !== -1 ? list[idx] : null;
}

export async function deleteAdminProduct(id: string): Promise<boolean> {
  const list = getLocalProducts();
  const filtered = list.filter(p => String(p.id) !== String(id) && String(p.slug) !== String(id));
  saveLocalProducts(filtered);

  try {
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
  } catch {
    // ignore
  }

  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('products') as any).delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  return true;
}
