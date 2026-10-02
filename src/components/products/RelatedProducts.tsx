import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/products';

export interface RelatedProductsProps {
  currentProductSlug: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductSlug }) => {
  // Filter other genuine products from the repository
  const related = PRODUCTS_DATA.filter((p) => p.slug !== currentProductSlug);

  // Rule: If no other genuine products exist, cleanly hide this section!
  if (related.length === 0) {
    return null;
  }

  return (
    <Section spacing="lg" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              MORE PRODUCTS
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Other Software by BDCON Labs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
