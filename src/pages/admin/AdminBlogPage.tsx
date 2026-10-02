// ==============================================================================
// BDCON Labs — Admin Writing & Essays Overview (/admin/blog)
// Stage 16B: Accessible, responsive administrative view of essays & articles
// ==============================================================================

import React, { useEffect, useState } from 'react';
import { FileText, ExternalLink, RefreshCw, Loader2, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getWritingEntries } from '../../data/writing';
import { WritingEntry } from '../../types/writing';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';

export const AdminBlogPage: React.FC = () => {
  const [entries, setEntries] = useState<WritingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    setLoading(true);
    const data = await getWritingEntries();
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Writing & Essays — BDCON Labs Admin';
    loadEntries();
  }, []);

  return (
    <AdminLayout
      title="Writing & Essays Management"
      subtitle="Reflective, philosophical and technical essays stored in public.writing_entries."
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Writing & Blog' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
          <span>Total Essays: <strong className="text-[var(--text-primary)]">{entries.length}</strong></span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadEntries}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
            className="min-h-[44px]"
            aria-label="Refresh essays list"
          >
            Refresh
          </Button>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading essays directory...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-base text-[var(--text-primary)] font-bangla-serif block leading-snug">
                          {entry.title}
                        </span>
                        {entry.subtitle && (
                          <p className="text-xs text-[var(--text-secondary)] font-bangla-sans leading-relaxed">
                            {entry.subtitle}
                          </p>
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bangla-sans font-bold uppercase bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand-muted)] shrink-0">
                        {entry.category || 'চিন্তন'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bangla-sans text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{entry.readingTime || `${entry.readingTimeMinutes || 5} মিনিট পাঠ`}</span>
                      </span>
                      <span>·</span>
                      <span>{entry.publishedAt || '2026'}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/rakib-asrar/writing/${entry.slug}`}
                        className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] text-xs text-[var(--color-brand)] font-semibold transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                        aria-label={`Read essay ${entry.title}`}
                      >
                        <span>View Public Essay</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (>= 768px) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-[10px] uppercase text-[var(--text-muted)] font-semibold">
                    <tr>
                      <th scope="col" className="py-3 px-4">Title</th>
                      <th scope="col" className="py-3 px-4">Category</th>
                      <th scope="col" className="py-3 px-4">Reading Time</th>
                      <th scope="col" className="py-3 px-4">Published Date</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif leading-snug">{entry.title}</span>
                            {entry.subtitle && (
                              <p className="text-[11px] text-[var(--text-muted)] font-bangla-sans line-clamp-1 leading-normal">{entry.subtitle}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-secondary)] font-bangla-sans">
                          {entry.category || 'চিন্তন'}
                        </td>
                        <td className="py-3.5 px-4 font-bangla-sans text-[var(--text-secondary)]">
                          {entry.readingTime || `${entry.readingTimeMinutes || 5} মিনিট পাঠ`}
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-muted)]">
                          {entry.publishedAt || '2026'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/rakib-asrar/writing/${entry.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px] px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                            aria-label={`Read essay ${entry.title}`}
                          >
                            <span>View Public</span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
