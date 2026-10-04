// ==============================================================================
// BDCON Labs — Admin Dashboard Stats Data Access Service
// Stage 14: Real database counts & application metrics for operational overview
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import { PRODUCTS_DATA } from '../products';
import { SERVICES_DATA } from '../services';
import { PORTFOLIO_PROJECTS } from '../portfolio';
import { BOOKS_DATA } from '../books';
import { WRITING_DATA } from '../writing';
import { getAdminContactMessages } from './contactMessages';
import { getAdminProjectRequests } from './projectRequests';

export interface AdminDashboardStats {
  newProjectRequests: number;
  totalProjectRequests: number;
  newContactMessages: number;
  totalContactMessages: number;
  totalProducts: number;
  totalServices: number;
  totalPortfolio: number;
  totalBooks: number;
  totalWriting: number;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const baseStats: AdminDashboardStats = {
    newProjectRequests: 0,
    totalProjectRequests: 0,
    newContactMessages: 0,
    totalContactMessages: 0,
    totalProducts: PRODUCTS_DATA.length,
    totalServices: SERVICES_DATA.length,
    totalPortfolio: PORTFOLIO_PROJECTS.length,
    totalBooks: BOOKS_DATA.length,
    totalWriting: WRITING_DATA.length,
  };

  try {
    // 1. Fetch accurate combined counts for inquiries from multi-source service
    const [messagesRes, projectsRes] = await Promise.all([
      getAdminContactMessages({ pageSize: 1000 }),
      getAdminProjectRequests({ pageSize: 1000 }),
    ]);

    baseStats.totalContactMessages = messagesRes.total;
    baseStats.newContactMessages = messagesRes.data.filter((m) => m.status === 'new').length;

    baseStats.totalProjectRequests = projectsRes.total;
    baseStats.newProjectRequests = projectsRes.data.filter((p) => p.status === 'new').length;

    // 2. Query published content counts from Supabase if configured
    if (isSupabaseConfigured()) {
      const [productsRes, servicesRes, portfolioRes, booksRes, writingRes] = await Promise.all([
        (supabase.from('products') as any).select('id', { count: 'exact', head: true }),
        (supabase.from('services') as any).select('id', { count: 'exact', head: true }).eq('published', true),
        (supabase.from('portfolio_projects') as any).select('id', { count: 'exact', head: true }),
        (supabase.from('books') as any).select('id', { count: 'exact', head: true }),
        (supabase.from('writing_entries') as any).select('id', { count: 'exact', head: true }),
      ]);

      if (productsRes.count && productsRes.count > 0) baseStats.totalProducts = productsRes.count;
      if (servicesRes.count && servicesRes.count > 0) baseStats.totalServices = servicesRes.count;
      if (portfolioRes.count && portfolioRes.count > 0) baseStats.totalPortfolio = portfolioRes.count;
      if (booksRes.count && booksRes.count > 0) baseStats.totalBooks = booksRes.count;
      if (writingRes.count && writingRes.count > 0) baseStats.totalWriting = writingRes.count;
    }

    return baseStats;
  } catch (err) {
    console.warn('Using baseline admin stats fallback:', err);
    return baseStats;
  }
}
