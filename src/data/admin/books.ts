// ==============================================================================
// BDCON Labs — Admin Books Service
// Handles CRUD operations for books & publications
// ==============================================================================

import { Book } from '../../types/book';
import { BOOKS_DATA } from '../books';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';

const LOCAL_STORAGE_KEY = 'bdcon_admin_books';

function getLocalBooks(): Book[] {
  if (typeof window === 'undefined' || !window.localStorage) return BOOKS_DATA;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : BOOKS_DATA;
  } catch {
    return BOOKS_DATA;
  }
}

function saveLocalBooks(list: Book[]) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function getAdminBooks(): Promise<Book[]> {
  try {
    const res = await fetch('/api/admin/books', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        saveLocalBooks(json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }

  // Fallback to Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await (supabase.from('books') as any)
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // fallback
    }
  }

  return getLocalBooks();
}

export async function createAdminBook(book: Partial<Book>): Promise<Book> {
  const id = book.id || `book_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const slug = book.slug || id;
  const newBook: Book = {
    id,
    slug,
    title: book.title || '',
    subtitle: book.subtitle || '',
    author: book.author || 'রাকিব আসরার',
    genre: book.genre || 'কথাসাহিত্য',
    publisher: book.publisher || '',
    publicationYear: book.publicationYear || book.publishedYear || new Date().getFullYear(),
    publishedYear: book.publishedYear || book.publicationYear || new Date().getFullYear(),
    price: book.price || 0,
    originalPrice: book.originalPrice || 0,
    stockCount: book.stockCount ?? 50,
    availability: book.availability || 'available',
    purchaseUrl: book.purchaseUrl || '',
    description: book.description || '',
    coverImage: book.coverImage || '',
    coverImageUrl: book.coverImage || '',
    featured: book.featured ?? true,
    order: book.order ?? 0,
    purchaseLinks: book.purchaseLinks || [],
  };

  // 1. Local Cache
  const list = getLocalBooks();
  list.unshift(newBook);
  saveLocalBooks(list);

  // 2. Server API
  try {
    const res = await fetch('/api/admin/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // ignore
  }

  // 3. Supabase
  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('books') as any).insert([{
        id: newBook.id,
        slug: newBook.slug,
        title: newBook.title,
        subtitle: newBook.subtitle,
        author: newBook.author,
        genre: newBook.genre,
        publisher: newBook.publisher,
        publication_year: newBook.publicationYear,
        price: newBook.price,
        original_price: newBook.originalPrice,
        stock_count: newBook.stockCount,
        availability: newBook.availability,
        purchase_url: newBook.purchaseUrl,
        description: newBook.description,
        cover_image_url: newBook.coverImage,
      }]);
    } catch {
      // ignore
    }
  }

  return newBook;
}

export async function updateAdminBook(id: string, updates: Partial<Book>): Promise<Book | null> {
  // 1. Local Cache
  const list = getLocalBooks();
  const idx = list.findIndex(b => String(b.id) === String(id) || String(b.slug) === String(id));
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalBooks(list);
  }

  // 2. Server API
  try {
    const res = await fetch(`/api/admin/books/${id}`, {
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

  // 3. Supabase
  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('books') as any)
        .update({
          ...(updates.title && { title: updates.title }),
          ...(updates.subtitle !== undefined && { subtitle: updates.subtitle }),
          ...(updates.author && { author: updates.author }),
          ...(updates.genre && { genre: updates.genre }),
          ...(updates.publisher && { publisher: updates.publisher }),
          ...(updates.price !== undefined && { price: updates.price }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.coverImage !== undefined && { cover_image_url: updates.coverImage }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  return idx !== -1 ? list[idx] : null;
}

export async function deleteAdminBook(id: string): Promise<boolean> {
  // 1. Local Cache
  const list = getLocalBooks();
  const filtered = list.filter(b => String(b.id) !== String(id) && String(b.slug) !== String(id));
  saveLocalBooks(filtered);

  // 2. Server API
  try {
    await fetch(`/api/admin/books/${id}`, { method: 'DELETE' });
  } catch {
    // ignore
  }

  // 3. Supabase
  if (isSupabaseConfigured()) {
    try {
      await (supabase.from('books') as any).delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  return true;
}
