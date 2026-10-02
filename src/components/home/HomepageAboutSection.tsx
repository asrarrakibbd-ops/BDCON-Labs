import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const HomepageAboutSection: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="canvas" borderBottom id="about-summary">
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Positioning */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
              <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('aboutPreview.eyebrow')}
              </span>
            </div>

            <h2 className={`type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance ${isBangla ? 'font-bangla-serif' : ''}`}>
              {t('aboutPreview.heading')}
            </h2>

            <p className={`type-body-large text-[var(--text-secondary)] leading-relaxed text-balance ${isBangla ? 'font-bangla-sans' : ''}`}>
              {t('aboutPreview.description')}
            </p>

            <div className="pt-2">
              <Link to="/about">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t('aboutPreview.cta')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Key Commitments Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs space-y-4 select-none">
              <span className={`type-caption uppercase tracking-wider text-[var(--color-brand)] text-[10px] font-bold block ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('principles.eyebrow')}
              </span>

              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                  <span className={`font-bold text-[var(--text-primary)] text-xs block ${isBangla ? 'font-bangla-serif' : ''}`}>
                    {t('aboutPreview.craftTitle')}
                  </span>
                  <p className={`type-caption text-[var(--text-secondary)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                    {t('aboutPreview.craftDesc')}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                  <span className={`font-bold text-[var(--text-primary)] text-xs block ${isBangla ? 'font-bangla-serif' : ''}`}>
                    {t('aboutPreview.disciplineTitle')}
                  </span>
                  <p className={`type-caption text-[var(--text-secondary)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                    {t('aboutPreview.disciplineDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
