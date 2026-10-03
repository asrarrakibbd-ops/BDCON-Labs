import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { HeroVisual } from './HeroVisual';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const HeroSection: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="canvas" borderBottom className="relative overflow-hidden">
      {/* Background Technical Grid & Soft Ambient Light Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(var(--tech-grid-color) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-50 dark:opacity-40"
        style={{
          background: 'radial-gradient(circle, var(--color-brand-glow) 0%, transparent 70%)',
        }}
      />

      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Core Positioning & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Technical Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
              <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('hero.eyebrow')}
              </span>
            </div>

            {/* Primary Page H1 Headline */}
            <h1 
              className={`text-[var(--text-primary)] font-bold text-balance ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.25] text-3xl sm:text-4xl lg:text-[44px]' 
                  : 'type-display tracking-tight'
              }`}
            >
              {t('hero.headline')}
            </h1>

            {/* Supporting Copy */}
            <p 
              className={`max-w-2xl text-balance leading-relaxed text-[var(--text-secondary)] ${
                isBangla 
                  ? 'font-bangla-sans text-base sm:text-lg leading-[1.7]' 
                  : 'type-body-large'
              }`}
            >
              {t('hero.description')}
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link to="/products" className="inline-block">
                <Button
                  as="span"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className={`w-full sm:w-auto ${isBangla ? 'font-bangla-sans text-[15px]' : ''}`}
                >
                  {t('hero.exploreProducts')}
                </Button>
              </Link>

              <Link to="/start-project" className="inline-block">
                <Button
                  as="span"
                  variant="outline"
                  size="lg"
                  className={`w-full sm:w-auto ${isBangla ? 'font-bangla-sans text-[15px]' : ''}`}
                >
                  {t('hero.startProject')}
                </Button>
              </Link>
            </div>

            {/* Micro-copy line */}
            <div className={`pt-2 flex items-center gap-2 text-xs text-[var(--text-muted)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
              <span className="w-1 h-1 rounded-full bg-[var(--color-brand)]" />
              <span>{t('hero.microCopy')}</span>
            </div>
          </div>

          {/* Right Column: Technical Product Visual Composition */}
          <div className="lg:col-span-5 w-full">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
};
