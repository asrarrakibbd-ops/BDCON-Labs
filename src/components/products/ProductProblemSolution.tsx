import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Product } from '../../types/product';

export interface ProductProblemSolutionProps {
  product: Product;
}

export const ProductProblemSolution: React.FC<ProductProblemSolutionProps> = ({ product }) => {
  if (!product.problem && !product.solution && !product.description) {
    return null;
  }

  return (
    <Section spacing="lg" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="space-y-12">
          {/* Product Overview Summary */}
          <div className="max-w-3xl space-y-4">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              PRODUCT OVERVIEW
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance">
              What is {product.name}?
            </h2>
            <p className="type-body-large text-[var(--text-secondary)] leading-relaxed text-balance">
              {product.description}
            </p>
          </div>

          {/* Problem & Solution Split Cards */}
          {(product.problem || product.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Problem Card */}
              {product.problem && (
                <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] space-y-4">
                  <div className="flex items-center gap-2.5 text-[var(--color-warning)]">
                    <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="type-caption font-bold uppercase tracking-wider font-mono">
                      The Operational Problem
                    </h3>
                  </div>
                  <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                    {product.problem}
                  </p>
                </div>
              )}

              {/* Solution Card */}
              {product.solution && (
                <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
                  <div className="flex items-center gap-2.5 text-[var(--color-success)]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="type-caption font-bold uppercase tracking-wider font-mono">
                      The Engineered Solution
                    </h3>
                  </div>
                  <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                    {product.solution}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
