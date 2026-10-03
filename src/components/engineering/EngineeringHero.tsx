import React from 'react';
import { ArrowRight, Compass, Layers, ShieldCheck, ChevronDown } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';
import { EngineeringDrawingVisual } from './EngineeringDrawingVisual';

export const EngineeringHero: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section 
      spacing="xl" 
      className="relative overflow-hidden pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-20 border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-canvas)] via-[var(--bg-surface)] to-[var(--bg-canvas)]"
    >
      {/* Background Technical Grid Accents */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      {/* Subtle Atmospheric Gradient for Engineering Tone (Deep Blue / Slate) */}
      <div 
        className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-sky-500/10 dark:bg-sky-500/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Eyebrow, Headline, Supporting Copy, and Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
            
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-sky-600 dark:bg-sky-400 rotate-45 inline-block shrink-0" />
              <span className={`text-xs uppercase tracking-widest text-[var(--color-brand)] font-semibold ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('engineeringLanding.hero.eyebrow', 'BDCON ENGINEERING LTD')}
              </span>
              <span className="hidden sm:inline-block text-[var(--border-color)]">/</span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-[var(--text-muted)] tracking-wider">
                CIVIL CONSULTANCY
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              className={`text-[var(--text-primary)] font-bold text-balance ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.25] text-3xl sm:text-4xl lg:text-5xl' 
                  : 'type-display tracking-tight text-3xl sm:text-4xl lg:text-[46px] leading-[1.12]'
              }`}
            >
              {t('engineeringLanding.hero.headline', 'Civil Engineering Consultancy')}
            </h1>

            {/* Supporting Copy */}
            <p 
              className={`text-[var(--text-secondary)] font-normal text-balance max-w-xl text-base sm:text-lg ${
                isBangla ? 'font-bangla-sans leading-relaxed' : 'type-body leading-relaxed'
              }`}
            >
              {t(
                'engineeringLanding.hero.description', 
                'Building design, engineering drawings, estimation and construction consultancy for practical, buildable solutions.'
              )}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/engineering/contact">
                <Button 
                  as="span"
                  variant="primary" 
                  size="lg"
                  className={`w-full sm:w-auto shadow-sm ${isBangla ? 'font-bangla-sans' : ''}`}
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  {t('engineeringLanding.hero.discussProject', 'Discuss Your Project')}
                </Button>
              </Link>

              <a href="#services">
                <Button 
                  as="span"
                  variant="secondary" 
                  size="lg"
                  className={`w-full sm:w-auto ${isBangla ? 'font-bangla-sans' : ''}`}
                  rightIcon={<ChevronDown className="w-4 h-4 ml-1" />}
                >
                  {t('engineeringLanding.hero.exploreServices', 'Explore Our Services')}
                </Button>
              </a>
            </div>

            {/* Trust and Engineering Discipline Micro-notes */}
            <div className="pt-2 sm:pt-4 border-t border-[var(--border-color)]/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className={isBangla ? 'font-bangla-sans' : 'font-mono'}>
                  {isBangla ? 'কোডসম্মত ও নিরাপদ ডিজাইন' : 'BNBC & ACI Code Compliant'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className={isBangla ? 'font-bangla-sans' : 'font-mono'}>
                  {isBangla ? 'নির্ভুল পরিমাপ ও প্রাক্কলন' : 'Itemized BOQ & Accurate Estimation'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Engineering Drawing & Blueprint Visual */}
          <div className="lg:col-span-6 w-full flex items-center justify-center pt-4 lg:pt-0">
            <EngineeringDrawingVisual />
          </div>

        </div>
      </Container>
    </Section>
  );
};
