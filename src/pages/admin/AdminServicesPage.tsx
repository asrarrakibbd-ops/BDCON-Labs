// ==============================================================================
// BDCON Labs — Admin Services Overview (/admin/services)
// Stage 16B: Accessible, responsive administrative view of engineering offerings
// ==============================================================================

import React, { useEffect, useState } from 'react';
import { Wrench, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getServices } from '../../data/services';
import { Service } from '../../types/service';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Services — BDCON Labs Admin';
    loadServices();
  }, []);

  return (
    <AdminLayout
      title="Services Management"
      subtitle="Engineering and consulting offerings stored in public.services."
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Services' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
          <span>Total Services: <strong className="text-[var(--text-primary)]">{services.length}</strong></span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadServices}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
            className="min-h-[44px]"
            aria-label="Refresh services list"
          >
            Refresh
          </Button>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading services catalog...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {services.map((s) => (
                  <div key={s.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-sm text-[var(--text-primary)] font-sans block">{s.name}</span>
                        <span className="text-xs text-[var(--text-secondary)] font-mono">{s.category || 'Core'}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        PUBLISHED
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {s.shortDescription}
                    </p>

                    <div className="pt-2">
                      <Link
                        to={`/services/${s.slug}`}
                        className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] text-xs text-[var(--color-brand)] font-semibold transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                        aria-label={`View public presentation for service ${s.name}`}
                      >
                        <span>View Public Service Page</span>
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
                      <th scope="col" className="py-3 px-4">Service Domain</th>
                      <th scope="col" className="py-3 px-4">Category</th>
                      <th scope="col" className="py-3 px-4">Visibility</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {services.map((s) => (
                      <tr key={s.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-bold text-sm text-[var(--text-primary)] font-sans">{s.name}</span>
                            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">{s.shortDescription}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                          {s.category || 'Core'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            PUBLISHED
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/services/${s.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px] px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                            aria-label={`View public page for ${s.name}`}
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
