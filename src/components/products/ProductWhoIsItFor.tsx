import React from 'react';
import { Users, CheckCircle } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Product } from '../../types/product';

export interface ProductWhoIsItForProps {
  product: Product;
}

export const ProductWhoIsItFor: React.FC<ProductWhoIsItForProps> = ({ product }) => {
  if (!product.whoIsItFor || product.whoIsItFor.length === 0) return null;

  return (
    <Section spacing="lg" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-[var(--color-brand)]">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span className="type-caption font-semibold tracking-wider uppercase font-mono">
                TARGET AUDIENCE
              </span>
            </div>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Who is {product.name} built for?
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              Designed specifically to resolve the domain calculation and takeoff pain points of:
            </p>
          </div>

          {/* Audience Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.whoIsItFor.map((role) => (
              <div
                key={role}
                className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-subtle)] text-[var(--color-brand)] flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="font-semibold text-sm text-[var(--text-primary)]">
                  {role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
