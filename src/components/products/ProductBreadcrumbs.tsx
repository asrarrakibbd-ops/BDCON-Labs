import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';

export interface ProductBreadcrumbsProps {
  productName: string;
  className?: string;
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({
  productName,
  className,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center justify-between gap-4 text-xs', className)}
    >
      {/* Breadcrumb Hierarchy */}
      <ol className="flex items-center gap-1.5 sm:gap-2 text-[var(--text-muted)] truncate">
        <li>
          <Link
            to="/"
            className="hover:text-[var(--text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-brand)] rounded"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0 text-[var(--border-strong)]">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li>
          <Link
            to="/products"
            className="hover:text-[var(--text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-brand)] rounded"
          >
            Products
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0 text-[var(--border-strong)]">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="font-semibold text-[var(--text-primary)] truncate" aria-current="page">
          {productName}
        </li>
      </ol>

      {/* Back to Products quick link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--color-brand)] transition-colors shrink-0 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">All Products</span>
      </Link>
    </nav>
  );
};
