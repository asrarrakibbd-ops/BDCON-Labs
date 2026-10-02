// ==============================================================================
// BDCON Labs — Admin Portfolio Overview (/admin/portfolio)
// Stage 16B: Accessible, responsive administrative view of case studies
// ==============================================================================

import React, { useEffect, useState } from 'react';
import { FolderKanban, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getPortfolioProjects } from '../../data/portfolio';
import { PortfolioProject } from '../../types/portfolio';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';

export const AdminPortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getPortfolioProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Portfolio — BDCON Labs Admin';
    loadProjects();
  }, []);

  return (
    <AdminLayout
      title="Portfolio Case Studies"
      subtitle="Case studies and engineering projects stored in public.portfolio_projects."
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Portfolio' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
          <span>Total Case Studies: <strong className="text-[var(--text-primary)]">{projects.length}</strong></span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadProjects}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
            className="min-h-[44px]"
            aria-label="Refresh portfolio projects list"
          >
            Refresh
          </Button>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading portfolio case studies...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-sm text-[var(--text-primary)] font-sans block">{p.title}</span>
                        <span className="text-xs text-[var(--text-secondary)] font-mono uppercase">{p.category}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                        {p.status || 'in-development'}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {p.shortDescription}
                    </p>

                    {p.technologies && p.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2">
                      <Link
                        to={`/portfolio/${p.slug}`}
                        className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] text-xs text-[var(--color-brand)] font-semibold transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                        aria-label={`View case study for ${p.title}`}
                      >
                        <span>View Public Case Study</span>
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
                      <th scope="col" className="py-3 px-4">Technologies</th>
                      <th scope="col" className="py-3 px-4">Status</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-bold text-sm text-[var(--text-primary)] font-sans">{p.title}</span>
                            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">{p.shortDescription}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-secondary)] uppercase">
                          {p.category}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {p.technologies?.map((tech) => (
                              <span key={tech} className="px-1.5 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[10px] text-[var(--text-secondary)]">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            {p.status || 'in-development'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/portfolio/${p.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px] px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                            aria-label={`View public page for ${p.title}`}
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
