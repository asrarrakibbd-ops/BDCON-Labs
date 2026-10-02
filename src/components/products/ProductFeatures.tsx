import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Product } from '../../types/product';

export interface ProductFeaturesProps {
  product: Product;
}

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({ product }) => {
  const features = product.detailedFeatures || 
    (product.features ? product.features.map((f, i) => ({ id: `feat-${i}`, title: f, description: '' })) : []);

  if (features.length === 0) return null;

  return (
    <Section spacing="lg" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div className="max-w-2xl space-y-2">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              SPECIFICATIONS
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Key Capabilities &amp; Features
            </h2>
          </div>

          {/* Minimal Editorial Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((item, idx) => {
              const formattedIndex = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-7 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3 shadow-2xs hover:border-[var(--border-strong)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[var(--color-brand)]">
                      {formattedIndex}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
