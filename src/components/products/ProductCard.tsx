import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductPlatform } from './ProductPlatform';
import { ProductStatusBadge } from './ProductStatusBadge';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/useTranslation';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  const { isBangla } = useTranslation();
  const detailPath = `/products/${product.slug}`;

  return (
    <article
      className={cn(
        'group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs transition-all duration-200 hover:border-[var(--border-strong)] hover:shadow-sm select-none',
        className
      )}
      aria-labelledby={`product-card-title-${product.id}`}
    >
      <div className="space-y-4">
        {/* Card Header: Icon/Logo & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)] group-hover:border-[var(--color-brand)] group-hover:bg-[var(--color-brand-subtle)] transition-all duration-200">
            <Layers className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          </div>
          <ProductStatusBadge status={product.status} />
        </div>

        {/* Product Identity */}
        <div className="space-y-1">
          <span className="type-caption font-mono uppercase tracking-wider text-[var(--text-muted)] text-[10px] block">
            {product.category}
          </span>
          <h3
            id={`product-card-title-${product.id}`}
            className="type-h4 text-[var(--text-primary)] font-bold tracking-tight group-hover:text-[var(--color-brand)] transition-colors"
          >
            {product.name}
          </h3>
        </div>

        {/* Short Summary Description */}
        <p className="type-body-small text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Card Footer: Platforms & Detail CTA */}
      <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
        <ProductPlatform platforms={product.platforms} variant="inline" />

        <Link
          to={detailPath}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors group-hover:translate-x-1 duration-150"
          aria-label={isBangla ? `${product.name}-এর বিস্তারিত দেখুন` : `View details for ${product.name}`}
        >
          <span>{isBangla ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
