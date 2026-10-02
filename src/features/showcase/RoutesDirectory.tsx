import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Shield, User, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Link } from '../../lib/router';
import { ALL_ROUTES } from '../../pages/routes';

export const RoutesDirectory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'public' | 'author' | 'admin'>('all');

  const filteredRoutes = ALL_ROUTES.filter((r) => {
    if (filter === 'all') return true;
    return r.category === filter;
  });

  return (
    <Card padded>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
              <CardTitle>Architecture Routing Table</CardTitle>
            </div>
            <CardDescription>
              All 25+ routes specified in Stage 1 architecture. Click any route to inspect its placeholder contract.
            </CardDescription>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-2xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              All ({ALL_ROUTES.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('public')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === 'public'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-2xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Public
            </button>
            <button
              type="button"
              onClick={() => setFilter('author')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === 'author'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-2xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Rakib Asrar
            </button>
            <button
              type="button"
              onClick={() => setFilter('admin')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === 'admin'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-2xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredRoutes.map((route) => {
            // For parametric routes, supply sample param for clicking
            const targetPath = route.isParametric
              ? route.path.replace(':slug', 'preview-entry')
              : route.path;

            const icon =
              route.category === 'admin' ? (
                <Shield className="w-3.5 h-3.5 text-[var(--color-warning)]" />
              ) : route.category === 'author' ? (
                <User className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              );

            return (
              <Link
                key={route.path}
                to={targetPath}
                className="group p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {icon}
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                        {route.path}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--color-brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="type-caption text-[var(--text-secondary)] font-medium mb-1">
                    {route.name}
                  </p>
                  <p className="type-caption text-[var(--text-muted)] text-[11px] line-clamp-2">
                    {route.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                  <Badge
                    variant={
                      route.category === 'admin'
                        ? 'warning'
                        : route.category === 'author'
                        ? 'brand'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {route.category}
                  </Badge>
                  {route.isParametric && (
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      Dynamic Slug
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
