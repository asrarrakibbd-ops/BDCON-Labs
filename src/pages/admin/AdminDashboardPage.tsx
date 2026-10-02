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
  ExternalLink
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getAdminDashboardStats, AdminDashboardStats } from '../../data/admin/stats';
import { getAdminProjectRequests, ProjectRequestRow } from '../../data/admin/projectRequests';
import { getAdminContactMessages, ContactMessageRow } from '../../data/admin/contactMessages';
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

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Dashboard — BDCON Labs Admin';
    loadData();
  }, [loadData]);

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
        {/* Refresh action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <Clock className="w-4 h-4 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
            <span>{isBangla ? 'রিয়েল-টাইম ডাটাবেজ সিঙ্ক' : 'Real-time database sync'}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
            className="min-h-[44px]"
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
            <Button variant="ghost" size="sm" onClick={loadData} className="min-h-[40px]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <Link
              to="/admin/products"
              className="p-3.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            >
              <span>{isBangla ? 'সফটওয়্যার প্রোডাক্টস' : 'Products'} ({stats?.totalProducts ?? 0})</span>
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
              <span>{isBangla ? 'প্রবন্ধ ও চিন্তন' : 'Essays'} ({stats?.totalWriting ?? 0})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
            <Link
              to="/admin/books"
              className="p-3.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            >
              <span>{isBangla ? 'প্রকাশিত বইসমূহ' : 'Books'} ({stats?.totalBooks ?? 0})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
