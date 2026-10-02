import React from 'react';
import { ArrowRight, Globe, Smartphone, Mail, Sparkles } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Product } from '../../types/product';
import { Link } from '../../lib/router';

export interface ProductCTASectionProps {
  product: Product;
}

export const ProductCTASection: React.FC<ProductCTASectionProps> = ({ product }) => {
  const hasLiveWeb = Boolean(product.websiteUrl && product.websiteUrl.trim());
  const hasLiveAndroid = Boolean(product.androidUrl && product.androidUrl.trim());

  return (
    <Section spacing="lg" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="p-8 sm:p-12 lg:p-14 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-4xl mx-auto shadow-sm space-y-6">
          <div className="space-y-3">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              NEXT STEPS
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Ready to explore {product.name}?
            </h2>
            <p className="type-body text-[var(--text-secondary)] max-w-xl mx-auto text-balance">
              Empower your construction estimation workflows with deterministic precision and rapid BOQ generation.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            {hasLiveWeb && (
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${product.name} Web App (opens in new tab)`}
              >
                <Button as="span" variant="primary" size="lg" leftIcon={<Globe className="w-4 h-4" />}>
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
                <Button as="span" variant="secondary" size="lg" leftIcon={<Smartphone className="w-4 h-4" />}>
                  Download Android
                </Button>
              </a>
            )}

            {!hasLiveWeb && !hasLiveAndroid && (
              <Link to="/contact">
                <Button as="span" variant="primary" size="lg" leftIcon={<Mail className="w-4 h-4" />}>
                  Contact BDCON Labs
                </Button>
              </Link>
            )}

            <Link to="/start-project">
              <Button as="span" variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start a Custom Project
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
