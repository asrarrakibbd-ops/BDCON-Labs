import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductPlatform } from './ProductPlatform';
import { ProductStatusBadge } from './ProductStatusBadge';
import { ProductVisualFrame } from './ProductVisualFrame';
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
  const liveUrl = product.liveUrl || product.websiteUrl;

  return (
    <article
      className={cn(
        'group flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs transition-all duration-200 hover:border-[var(--border-strong)] hover:shadow-sm select-none',
        className
      )}
      aria-labelledby={`product-card-title-${product.id}`}
    >
      <div className="space-y-4">
        {/* Project-Specific Distinctive Visual Frame */}
        <div className="w-full overflow-hidden rounded-xl">
          <ProductVisualFrame product={product} size="sm" />
        </div>

        {/* Card Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="type-caption font-mono uppercase tracking-wider text-[var(--color-brand)] text-[10px] font-bold">
            {product.category}
          </span>
          <ProductStatusBadge status={product.status} />
        </div>

        {/* Product Identity */}
        <div className="space-y-1">
          <h3
            id={`product-card-title-${product.id}`}
            className="type-h4 text-[var(--text-primary)] font-bold tracking-tight group-hover:text-[var(--color-brand)] transition-colors"
          >
            {product.name}
          </h3>
          {product.tagline && (
            <p className="text-xs font-mono text-[var(--text-muted)] line-clamp-1">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Short Summary Description */}
        <p className="type-body-small text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Card Footer: Platforms & Contextual CTAs */}
      <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-2.5">
        <ProductPlatform platforms={product.platforms} variant="inline" />

        <div className="flex items-center gap-2 ml-auto">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors px-2 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]"
              aria-label={isBangla ? `${product.name} লাইভ সাইট ওপেন করুন` : `Open live site for ${product.name}`}
            >
              <span>{isBangla ? 'লাইভ' : 'View Live'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <Link
            to={detailPath}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors group-hover:translate-x-0.5 duration-150"
            aria-label={isBangla ? `${product.name}-এর বিস্তারিত দেখুন` : `View details for ${product.name}`}
          >
            <span>{isBangla ? 'বিস্তারিত' : 'Details'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
