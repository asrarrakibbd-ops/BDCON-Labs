import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const ProductsPreviewTransition: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section spacing="lg" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[var(--color-brand)]">
              <Layers className="w-4 h-4" />
              <span className={`type-caption font-semibold tracking-wider uppercase ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('productsPreview.eyebrow')}
              </span>
            </div>

            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance">
              {t('productsPreview.heading')}
            </h2>

            <p className="type-body text-[var(--text-secondary)] leading-relaxed text-balance">
              {t('productsPreview.description')}
            </p>
          </div>

          <div className="shrink-0 pt-2 md:pt-0">
            <Link to="/products">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t('productsPreview.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
