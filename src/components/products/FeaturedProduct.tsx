import React from 'react';
import { ArrowRight, ExternalLink, Check, Smartphone, Globe, Calculator, Ruler, Compass, Building2 } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductPlatform } from './ProductPlatform';
import { ProductStatusBadge } from './ProductStatusBadge';
import { ProductVisualFrame } from './ProductVisualFrame';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/useTranslation';

export interface FeaturedProductProps {
  product: Product;
  className?: string;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  product,
  className,
}) => {
  const { isBangla } = useTranslation();
  const detailPath = `/products/${product.slug}`;
  const liveWeb = product.liveUrl || product.websiteUrl;
  const liveAndroid = product.playStoreUrl || product.androidUrl;

  const getProductIcon = () => {
    const s = product.slug.toLowerCase();
    if (s.includes('salary')) return <Calculator className="w-5 h-5" />;
    if (s.includes('cdesk') || s.includes('civildesk')) return <Building2 className="w-5 h-5" />;
    if (s.includes('estimator')) return <Compass className="w-5 h-5" />;
    return <Ruler className="w-5 h-5" />;
  };

  return (
    <article
      className={cn(
        'rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:border-[var(--border-strong)] relative overflow-hidden',
        className
      )}
      aria-labelledby={`featured-product-heading-${product.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Product Narrative, Capabilities & Action Triggers */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Row: Category & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="type-caption font-bold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
              {product.category}
            </span>
            <ProductStatusBadge status={product.status} />
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--color-brand)] shadow-2xs shrink-0" aria-hidden="true">
                {getProductIcon()}
              </div>
              <h3
                id={`featured-product-heading-${product.id}`}
                className="type-h2 text-[var(--text-primary)] font-bold tracking-tight"
              >
                {product.name}
              </h3>
            </div>

            {product.tagline && (
              <p className="type-body text-[var(--color-brand)] font-medium">
                {product.tagline}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="type-body text-[var(--text-secondary)] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Capabilities List */}
          {product.features && product.features.length > 0 && (
            <div className="pt-1 space-y-2.5">
              <span className="type-caption font-mono uppercase tracking-wider text-[var(--text-muted)] text-[11px] block">
                {isBangla ? 'মূল ফিচারসমূহ' : 'Core System Modules'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {product.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platform Indicators */}
          <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-4">
            <span className="type-caption font-mono uppercase text-[11px] text-[var(--text-muted)]">
              {isBangla ? 'সাপোর্টেড প্ল্যাটফর্ম' : 'Supported Platforms'}
            </span>
            <ProductPlatform platforms={product.platforms} variant="inline" />
          </div>

          {/* Smart CTA Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Main Product Route CTA */}
            <Link to={detailPath} className="inline-block">
              <Button
                as="span"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isBangla ? 'বিস্তারিত দেখুন' : 'View Product Details'}
              </Button>
            </Link>

            {/* Optional Live External Web App URL */}
            {liveWeb && (
              <a
                href={liveWeb}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${product.name} Web App (opens in new tab)`}
                className="inline-block"
              >
                <Button
                  as="span"
                  variant="outline"
                  size="md"
                  leftIcon={<Globe className="w-4 h-4" />}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  {isBangla ? 'লাইভ ওয়েব অ্যাপ' : 'Open Web App'}
                </Button>
              </a>
            )}

            {/* Optional Live Android APK / Play Store URL */}
            {liveAndroid && (
              <a
                href={liveAndroid}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${product.name} Android APK (opens in new tab)`}
                className="inline-block"
              >
                <Button
                  as="span"
                  variant="outline"
                  size="md"
                  leftIcon={<Smartphone className="w-4 h-4" />}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  {isBangla ? 'অ্যান্ড্রয়েড অ্যাপ' : 'Download Android'}
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Large Technical Product Interface Visual */}
        <div className="lg:col-span-6 w-full">
          <ProductVisualFrame product={product} size="lg" />
        </div>
      </div>
    </article>
  );
};
