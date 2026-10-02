// ==============================================================================
// BDCON Labs — Admin Books Overview (/admin/books)
// Stage 16B: Accessible, responsive administrative view of books & publications
// ==============================================================================

import React, { useEffect, useState } from 'react';
import { BookMarked, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getBooks } from '../../data/books';
import { Book } from '../../types/book';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';

export const AdminBooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    setLoading(true);
    const data = await getBooks();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Books — BDCON Labs Admin';
    loadBooks();
  }, []);

  return (
    <AdminLayout
      title="Books & Publications"
      subtitle="Published literary works stored in public.books."
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Books' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
          <span>Total Publications: <strong className="text-[var(--text-primary)]">{books.length}</strong></span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadBooks}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
            className="min-h-[44px]"
            aria-label="Refresh publications list"
          >
            Refresh
          </Button>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading books catalog...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {books.map((b) => (
                  <div key={b.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-base text-[var(--text-primary)] font-bangla-serif block leading-snug">
                          {b.title}
                        </span>
                        {b.subtitle && (
                          <p className="text-xs text-[var(--text-secondary)] font-bangla-sans leading-normal">
                            {b.subtitle}
                          </p>
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bangla-sans font-bold uppercase bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand-muted)] shrink-0">
                        {b.genre || 'কথাসাহিত্য'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bangla-sans text-[var(--text-secondary)]">
                      <span>{b.publisher} ({b.publishedYear || b.publicationYear})</span>
                      <span className="font-bold text-sm text-[var(--text-primary)]">৳{b.price}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/rakib-asrar/books/${b.slug}`}
                        className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] text-xs text-[var(--color-brand)] font-semibold transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                        aria-label={`View book details for ${b.title}`}
                      >
                        <span>View Public Book Page</span>
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
                      <th scope="col" className="py-3 px-4">Genre</th>
                      <th scope="col" className="py-3 px-4">Publisher &amp; Year</th>
                      <th scope="col" className="py-3 px-4">Price</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {books.map((b) => (
                      <tr key={b.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif leading-snug">{b.title}</span>
                            {b.subtitle && (
                              <p className="text-[11px] text-[var(--text-muted)] font-bangla-sans line-clamp-1 leading-normal">{b.subtitle}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bangla-sans text-[var(--text-secondary)]">
                          {b.genre || 'কথাসাহিত্য'}
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                          {b.publisher} ({b.publishedYear || b.publicationYear})
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[var(--text-primary)]">
                          ৳{b.price}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/rakib-asrar/books/${b.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px] px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                            aria-label={`View book details for ${b.title}`}
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
