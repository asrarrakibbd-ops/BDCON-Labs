import React from 'react';
import { ArrowRight, Globe, Smartphone, Mail, Ruler, ExternalLink } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductPlatform } from './ProductPlatform';
import { ProductStatusBadge } from './ProductStatusBadge';
import { ProductVisualFrame } from './ProductVisualFrame';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';

export interface ProductHeroProps {
  product: Product;
  className?: string;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ product, className }) => {
  const hasLiveWeb = Boolean(product.websiteUrl && product.websiteUrl.trim());
  const hasLiveAndroid = Boolean(product.androidUrl && product.androidUrl.trim());

  return (
    <header className={cn('w-full py-8 sm:py-12 lg:py-16 bg-[var(--bg-canvas)] border-b border-[var(--border-color)] transition-colors', className)}>
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Identity, Narrative, Meta & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top row: Category tag & Status */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
                {product.category}
              </span>
              <ProductStatusBadge status={product.status} />
            </div>

            {/* Product Title & Tagline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0" aria-hidden="true">
                  <Ruler className="w-5 h-5" />
                </div>
                <h1 className="type-h1 text-[var(--text-primary)] font-bold tracking-tight">
                  {product.name}
                </h1>
              </div>

              {product.tagline && (
                <p className="type-body-large text-[var(--color-brand)] font-medium">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Product Summary */}
            <p className="type-body text-[var(--text-secondary)] leading-relaxed max-w-xl text-balance">
              {product.shortDescription}
            </p>

            {/* Platforms row */}
            <div className="pt-2 flex items-center gap-3">
              <span className="type-caption font-mono uppercase text-[11px] text-[var(--text-muted)]">
                Platforms:
              </span>
              <ProductPlatform platforms={product.platforms} variant="inline" />
            </div>

            {/* Action CTAs (Strictly honoring available URLs) */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {hasLiveWeb && (
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${product.name} Web App (opens in new tab)`}
                >
                  <Button as="span" variant="primary" size="lg" leftIcon={<Globe className="w-4 h-4" />} rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Open Web App
                  </Button>
                </a>
              )}

              {hasLiveAndroid && (
                <a
                  href={product.androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${product.name} Android APK (opens in new tab)`}
                >
                  <Button as="span" variant="secondary" size="lg" leftIcon={<Smartphone className="w-4 h-4" />} rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Download Android
                  </Button>
                </a>
              )}

              {/* If no external live URLs are deployed yet, show Contact / Project Inquiry */}
              {!hasLiveWeb && !hasLiveAndroid && (
                <Link to="/contact">
                  <Button as="span" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Inquire About {product.name}
                  </Button>
                </Link>
              )}

              <Link to="/start-project">
                <Button as="span" variant="outline" size="lg">
                  Start a Custom Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Large Technical Product Visual */}
          <div className="lg:col-span-6 w-full">
            <ProductVisualFrame product={product} />
          </div>
        </div>
      </Container>
    </header>
  );
};
