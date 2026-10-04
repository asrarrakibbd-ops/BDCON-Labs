// ==============================================================================
// BDCON Labs — Admin Dashboard (/admin)
// Stage 14: Real database counts, inquiry alerts, and operational overview
// ==============================================================================

import React, { useEffect, useState, useCallback } from 'react';
import { 
  ClipboardList, 
  MessageSquare, 
  Layers, 
  Wrench, 
  FolderKanban, 
  BookMarked, 
  FileText, 
  ArrowRight, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Bell
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getAdminDashboardStats, AdminDashboardStats } from '../../data/admin/stats';
import { getAdminProjectRequests, ProjectRequestRow } from '../../data/admin/projectRequests';
import { getAdminContactMessages, ContactMessageRow } from '../../data/admin/contactMessages';
import { subscribeInquiryUpdates } from '../../lib/events/inquirySync';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const AdminDashboardPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentRequests, setRecentRequests] = useState<ProjectRequestRow[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveToast, setLiveToast] = useState<string | null>(null);

  const loadData = useCallback(async (showSpinner = true) => {
    try {
      if (showSpinner) setLoading(true);
      setError(null);
      const [statsRes, projectsRes, messagesRes] = await Promise.all([
        getAdminDashboardStats(),
        getAdminProjectRequests({ page: 1, pageSize: 5 }),
        getAdminContactMessages({ page: 1, pageSize: 5 }),
      ]);
      setStats(statsRes);
      setRecentRequests(projectsRes.data);
      setRecentMessages(messagesRes.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load dashboard metrics.');
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Dashboard — BDCON Labs Admin';
    loadData(true);
  }, [loadData]);

  // Real-time synchronization subscription and active auto-poll
  useEffect(() => {
    const unsubscribe = subscribeInquiryUpdates((event) => {
      // Trigger instant background update as soon as any inquiry is created/updated
      loadData(false);
      setLiveToast(
        isBangla
          ? (event.type === 'project' ? '🔔 নতুন প্রজেক্ট রিকোয়েস্ট এসেছে!' : '🔔 নতুন মেসেজ এসেছে!')
          : (event.type === 'project' ? '🔔 New project request received!' : '🔔 New message received!')
      );
      setTimeout(() => setLiveToast(null), 6000);
    });

    // 5-second fast background poll when window is visible for cross-device sync
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        loadData(false);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadData, isBangla]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">{isBangla ? 'নতুন' : 'NEW'}</span>;
      case 'reviewing':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">{isBangla ? 'পর্যালোচনাধীন' : 'REVIEWING'}</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">{isBangla ? 'যোগাযোগকৃত' : 'CONTACTED'}</span>;
      case 'read':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">{isBangla ? 'পঠিত' : 'READ'}</span>;
      case 'replied':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">{isBangla ? 'উত্তর প্রেরিত' : 'REPLIED'}</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">{isBangla ? 'চলমান' : 'IN PROGRESS'}</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">{isBangla ? 'সম্পন্ন' : 'COMPLETED'}</span>;
      case 'archived':
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">{isBangla && status === 'archived' ? 'আর্কাইভকৃত' : status}</span>;
    }
  };

  return (
    <AdminLayout
      title={isBangla ? 'অ্যাডমিন ড্যাশবোর্ড · ওভারভিউ' : 'System Overview'}
      subtitle={isBangla ? 'প্রজেক্ট রিকোয়েস্ট, ক্লায়েন্ট ইনকোয়ারি ও সফটওয়্যার কনটেন্টের সার্বিক তথ্য।' : 'Operational monitoring, inbound communications, and published content metrics.'}
      breadcrumbs={[{ label: isBangla ? 'অ্যাডমিন' : 'Admin' }, { label: isBangla ? 'ড্যাশবোর্ড' : 'Dashboard' }]}
    >
      <div className="space-y-8">
        {/* Real-time Toast Notification */}
        {liveToast && (
          <div 
            role="status"
            className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-emerald-500 shrink-0 animate-bounce" aria-hidden="true" />
              <span>{liveToast}</span>
            </div>
            <button 
              onClick={() => setLiveToast(null)} 
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline px-2 py-1 rounded"
            >
              {isBangla ? 'বন্ধ করুন' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* Refresh & Live Sync action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">
              {isBangla ? 'লাইভ সিঙ্ক সক্রিয় (রিয়েল-টাইম)' : 'Live Sync Active (Real-Time)'}
            </span>
            <span className="text-[var(--text-muted)] text-[11px] hidden sm:inline">
              · {isBangla ? 'নতুন সাবমিশন সাথে সাথে আপডেট হবে' : 'Inquiries update instantly'}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => loadData(true)}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
            className="min-h-[40px]"
            aria-label="Refresh operational metrics"
          >
            {isBangla ? 'রিফ্রেশ করুন' : 'Refresh Data'}
          </Button>
        </div>

        {/* Error banner if load failed */}
        {error && (
          <div 
            role="alert"
            className="p-4 rounded-xl border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] text-[var(--color-error)] text-xs flex items-center justify-between gap-3 flex-wrap"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => loadData(true)} className="min-h-[40px]">
              {isBangla ? 'আবার চেষ্টা করুন' : 'Retry'}
            </Button>
          </div>
        )}

        {/* 1. Core Summary Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* New Project Requests */}
          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className={`text-xs font-semibold uppercase ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'প্রজেক্ট রিকোয়েস্ট' : 'Project Inquiries'}
              </span>
              <ClipboardList className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                {stats?.newProjectRequests ?? 0}
              </span>
              <span className="text-xs font-mono text-amber-500 font-semibold uppercase">
                {isBangla ? 'নতুন' : 'New'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] pt-1 border-t border-[var(--border-color)] flex items-center justify-between">
              <span>{isBangla ? 'মোট জমা হয়েছে' : 'Total Received'}</span>
              <span className="font-semibold text-[var(--text-primary)]">{stats?.totalProjectRequests ?? 0}</span>
            </div>
          </div>

          {/* New Contact Messages */}
          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className={`text-xs font-semibold uppercase ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'ক্লায়েন্ট মেসেজ' : 'Contact Messages'}
              </span>
              <MessageSquare className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                {stats?.newContactMessages ?? 0}
              </span>
              <span className="text-xs font-mono text-amber-500 font-semibold uppercase">
                {isBangla ? 'নতুন' : 'New'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] pt-1 border-t border-[var(--border-color)] flex items-center justify-between">
              <span>{isBangla ? 'মোট মেসেজ' : 'Total Received'}</span>
              <span className="font-semibold text-[var(--text-primary)]">{stats?.totalContactMessages ?? 0}</span>
            </div>
          </div>

          {/* Active Products */}
          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className={`text-xs font-semibold uppercase ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'সফটওয়্যার প্রোডাক্টস' : 'Products'}
              </span>
              <Layers className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                {stats?.totalProducts ?? 0}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {isBangla ? 'ক্যাটালগ' : 'Catalog'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] pt-1 border-t border-[var(--border-color)] flex items-center justify-between">
              <span>{isBangla ? 'ফ্ল্যাগশিপ প্রোডাক্ট' : 'Primary'}</span>
              <span className="font-semibold text-[var(--text-primary)]">BuildEst BD</span>
            </div>
          </div>

          {/* Published Services & Content */}
          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className={`text-xs font-semibold uppercase ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'অ্যাক্টিভ সার্ভিসসমূহ' : 'Published Services'}
              </span>
              <Wrench className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                {stats?.totalServices ?? 0}
              </span>
              <span className="text-xs font-mono text-emerald-500 font-semibold">
                {isBangla ? 'লাইভ' : 'Live'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] pt-1 border-t border-[var(--border-color)] flex items-center justify-between">
              <span>{isBangla ? 'কেস স্টাডিজ' : 'Case Studies'}</span>
              <span className="font-semibold text-[var(--text-primary)]">{stats?.totalPortfolio ?? 0}</span>
            </div>
          </div>
        </div>

        {/* 2. Inbound Communications Dual Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Project Requests */}
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[var(--color-brand)]" />
                <h2 className="text-sm font-bold text-[var(--text-primary)]">
                  {isBangla ? 'সর্বশেষ প্রজেক্ট রিকোয়েস্ট' : 'Latest Project Requests'}
                </h2>
              </div>
              <Link
                to="/admin/project-requests"
                className="text-xs text-[var(--color-brand)] hover:underline inline-flex items-center gap-1 font-semibold min-h-[44px] py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded"
                aria-label={`View all ${stats?.totalProjectRequests ?? 0} project requests`}
              >
                <span>{isBangla ? `সবগুলো দেখুন (${stats?.totalProjectRequests ?? 0})` : `View All (${stats?.totalProjectRequests ?? 0})`}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-2 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-lg bg-[var(--bg-surface-subtle)]" />
                ))}
              </div>
            ) : recentRequests.length > 0 ? (
              <div className="divide-y divide-[var(--border-color)]">
                {recentRequests.map((req) => (
                  <div key={req.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--text-primary)]">{req.name}</span>
                        {getStatusBadge(req.status)}
                      </div>
                      <p className="text-[var(--text-secondary)] font-mono text-[11px]">
                        {req.project_scope} · {req.budget_range}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                        {req.project_description}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                      {new Date(req.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[var(--text-muted)] space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto opacity-40 text-emerald-500" />
                <p>{isBangla ? 'এখনো কোনো প্রজেক্ট রিকোয়েস্ট জমা পড়েনি।' : 'No project requests received yet.'}</p>
              </div>
            )}
          </div>

          {/* Recent Contact Messages */}
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--color-brand)]" />
                <h2 className="text-sm font-bold text-[var(--text-primary)]">
                  {isBangla ? 'সর্বশেষ মেসেজ ও ইনকোয়ারি' : 'Latest Contact Messages'}
                </h2>
              </div>
              <Link
                to="/admin/messages"
                className="text-xs text-[var(--color-brand)] hover:underline inline-flex items-center gap-1 font-semibold min-h-[44px] py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded"
                aria-label={`View all ${stats?.totalContactMessages ?? 0} contact messages`}
              >
                <span>{isBangla ? `সবগুলো দেখুন (${stats?.totalContactMessages ?? 0})` : `View All (${stats?.totalContactMessages ?? 0})`}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-2 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-lg bg-[var(--bg-surface-subtle)]" />
                ))}
              </div>
            ) : recentMessages.length > 0 ? (
              <div className="divide-y divide-[var(--border-color)]">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--text-primary)]">{msg.name}</span>
                        {getStatusBadge(msg.status)}
                      </div>
                      <p className="text-[var(--text-primary)] font-medium text-[11px]">
                        {msg.subject}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                        {msg.message}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[var(--text-muted)] space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto opacity-40 text-emerald-500" />
                <p>{isBangla ? 'ইনবক্সে কোনো নতুন মেসেজ নেই।' : 'No contact messages received yet.'}</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Content Inventory Snapshot */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4 shadow-2xs">
          <h2 className={`text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
            {isBangla ? 'লাইভ প্রোডাক্ট ও কনটেন্ট ওভারভিউ' : 'PUBLISHED CONTENT SUMMARY'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
            <Link
              to="/admin/products"
              className="p-3.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            >
              <span>{isBangla ? 'প্রোডাক্টস' : 'Products'} ({stats?.totalProducts ?? 0})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
            <Link
              to="/admin/portfolio"
              className="p-3.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            >
              <span>{isBangla ? 'পোর্টফোলিও' : 'Portfolio'} ({stats?.totalPortfolio ?? 0})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
            <Link
              to="/admin/services"
              className="p-3.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            >
              <span>{isBangla ? 'সার্ভিসেস' : 'Services'} ({stats?.totalServices ?? 0})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
            <Link
              to="/admin/blog"
              className="p-3.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            >
              <span>{isBangla ? 'প্রবন্ধ ও ব্লগ' : 'Essays'} ({stats?.totalWriting ?? 0})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
            <Link
              to="/admin/books"
              className="p-3.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            >
              <span>{isBangla ? 'বইসমূহ' : 'Books'} ({stats?.totalBooks ?? 0})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
