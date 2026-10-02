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
  const fallbackStats: AdminDashboardStats = {
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

  // Read local submissions if any exist in browser storage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const storedMsgs = localStorage.getItem('bdcon_local_contact_messages');
      if (storedMsgs) {
        const msgs = JSON.parse(storedMsgs);
        if (Array.isArray(msgs)) {
          fallbackStats.totalContactMessages = msgs.length;
          fallbackStats.newContactMessages = msgs.filter((m: any) => m.status === 'new').length;
        }
      }
      const storedReqs = localStorage.getItem('bdcon_local_project_requests');
      if (storedReqs) {
        const reqs = JSON.parse(storedReqs);
        if (Array.isArray(reqs)) {
          fallbackStats.totalProjectRequests = reqs.length;
          fallbackStats.newProjectRequests = reqs.filter((r: any) => r.status === 'new').length;
        }
      }
    } catch {
      // ignore
    }
  }

  if (!isSupabaseConfigured()) {
    return fallbackStats;
  }

  try {
    const [
      newProjectsRes,
      totalProjectsRes,
      newMessagesRes,
      totalMessagesRes,
      productsRes,
      servicesRes,
      portfolioRes,
      booksRes,
      writingRes,
    ] = await Promise.all([
      (supabase.from('project_requests') as any).select('id', { count: 'exact', head: true }).eq('status', 'new'),
      (supabase.from('project_requests') as any).select('id', { count: 'exact', head: true }),
      (supabase.from('contact_messages') as any).select('id', { count: 'exact', head: true }).eq('status', 'new'),
      (supabase.from('contact_messages') as any).select('id', { count: 'exact', head: true }),
      (supabase.from('products') as any).select('id', { count: 'exact', head: true }),
      (supabase.from('services') as any).select('id', { count: 'exact', head: true }).eq('published', true),
      (supabase.from('portfolio_projects') as any).select('id', { count: 'exact', head: true }),
      (supabase.from('books') as any).select('id', { count: 'exact', head: true }),
      (supabase.from('writing_entries') as any).select('id', { count: 'exact', head: true }),
    ]);

    return {
      newProjectRequests: newProjectsRes.count ?? fallbackStats.newProjectRequests,
      totalProjectRequests: totalProjectsRes.count ?? fallbackStats.totalProjectRequests,
      newContactMessages: newMessagesRes.count ?? fallbackStats.newContactMessages,
      totalContactMessages: totalMessagesRes.count ?? fallbackStats.totalContactMessages,
      totalProducts: (productsRes.count && productsRes.count > 0) ? productsRes.count : fallbackStats.totalProducts,
      totalServices: (servicesRes.count && servicesRes.count > 0) ? servicesRes.count : fallbackStats.totalServices,
      totalPortfolio: (portfolioRes.count && portfolioRes.count > 0) ? portfolioRes.count : fallbackStats.totalPortfolio,
      totalBooks: (booksRes.count && booksRes.count > 0) ? booksRes.count : fallbackStats.totalBooks,
      totalWriting: (writingRes.count && writingRes.count > 0) ? writingRes.count : fallbackStats.totalWriting,
    };
  } catch (err) {
    console.warn('Using baseline admin stats:', err);
    return fallbackStats;
  }
}
