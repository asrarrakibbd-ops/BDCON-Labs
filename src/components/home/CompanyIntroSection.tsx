import React from 'react';
import { ArrowRight, Code } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const CompanyIntroSection: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="subtle" borderBottom className="relative">
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Eyebrow and Strong Editorial Title */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
              <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('intro.eyebrow')}
              </span>
            </div>

            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance">
              {t('intro.heading')}
            </h2>
          </div>

          {/* Right Column: Editorial Body & Progression Link */}
          <div className="lg:col-span-7 space-y-6 lg:pt-1">
            <p className="type-body-large text-[var(--text-secondary)] leading-relaxed text-balance">
              {t('intro.description')}
            </p>

            <div className="pt-2">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors select-none"
              >
                <span>{t('intro.exploreLink')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
