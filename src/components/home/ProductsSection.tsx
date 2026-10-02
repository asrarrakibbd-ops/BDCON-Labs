import React, { useEffect, useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FeaturedProduct } from '../products/FeaturedProduct';
import { ProductCard } from '../products/ProductCard';
import { EmptyState } from '../ui/EmptyState';
import { Product } from '../../types/product';
import { getProducts } from '../../data/products';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export interface ProductsSectionProps {
  products?: Product[];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products: initialProducts,
}) => {
  const { t, isBangla } = useTranslation();
  const [products, setProducts] = useState<Product[]>(initialProducts || []);

  useEffect(() => {
    if (!initialProducts) {
      getProducts().then((data) => {
        setProducts(data);
      });
    } else {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const featuredProduct = products.find((p) => p.featured) || products[0];
  const otherProducts = products.filter((p) => p.id !== featuredProduct?.id);
  const hasProducts = products.length > 0;

  return (
    <Section spacing="xl" surface="subtle" borderBottom id="products-section" className="relative">
      <Container size="2xl">
        <div className="space-y-10 sm:space-y-12">
          {/* Section Introduction Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[var(--border-color)]">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                  {t('productsPreview.eyebrow')}
                </span>
              </div>

              <h2 className={`type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance ${isBangla ? 'font-bangla-serif' : ''}`}>
                {t('productsPreview.heading')}
              </h2>

              <p className={`type-body-large text-[var(--text-secondary)] leading-relaxed text-balance ${isBangla ? 'font-bangla-sans' : ''}`}>
                {t('productsPreview.description')}
              </p>
            </div>

            <div className="shrink-0 pb-1">
              <Link to="/products" className="inline-block">
                <Button
                  variant="outline"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('productsPreview.cta')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Genuine Products Layout or Empty State */}
          {hasProducts ? (
            <div className="space-y-10">
              {/* Highlighted Lead Product Showcase */}
              {featuredProduct && (
                <div className="space-y-4">
                  <div className={`flex items-center justify-between text-xs text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2 ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    <span className="uppercase tracking-wider">{t('productsPreview.featuredBadge')}</span>
                    <span>{t('productsPreview.statusActive')}</span>
                  </div>
                  <FeaturedProduct product={featuredProduct} />
                </div>
              )}

              {/* Secondary Grid for other products if catalog expands */}
              {otherProducts.length > 0 && (
                <div className="space-y-6 pt-4 border-t border-[var(--border-color)]">
                  <h3 className="type-h3 text-[var(--text-primary)] font-bold">
                    {t('productsPreview.additionalTools')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {otherProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              title={t('states.emptyTitle')}
              description={t('states.emptyDescription')}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};
