import React from 'react';
import { 
  Building2, 
  DraftingCompass, 
  Calculator, 
  FileSpreadsheet, 
  HardHat, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';
import { ENGINEERING_SERVICES } from '../../data/engineeringServices';
import { EngineeringServiceIcon } from './EngineeringServiceIcon';

export const EngineeringServicesPreview: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section 
      id="services" 
      spacing="xl" 
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-color)]"
    >
      <Container size="2xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span className={`text-xs font-mono uppercase tracking-widest text-[var(--color-brand)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                {isBangla ? 'সেবা তালিকা' : 'CORE DISCIPLINES'}
              </span>
            </div>

            <h2 
              className={`text-[var(--text-primary)] font-bold tracking-tight mb-4 ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.3] text-2xl sm:text-3xl lg:text-4xl' 
                  : 'type-h1 text-2xl sm:text-3xl lg:text-4xl'
              }`}
            >
              {t('engineeringLanding.services.heading', 'Engineering Services')}
            </h2>

            <p 
              className={`text-[var(--text-secondary)] text-base sm:text-lg ${
                isBangla ? 'font-bangla-sans leading-relaxed' : 'type-body'
              }`}
            >
              {t(
                'engineeringLanding.services.subheading', 
                'Core civil engineering and construction consulting disciplines engineered for precision, economy, and buildability.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link to="/engineering/services">
              <Button 
                as="span" 
                variant="secondary" 
                size="md"
                className={isBangla ? 'font-bangla-sans' : ''}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                {isBangla ? 'সকল সেবাসমূহ দেখুন' : 'Explore All Services'}
              </Button>
            </Link>
          </div>
        </div>

        {/* 6 Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ENGINEERING_SERVICES.map((item) => {
            const title = isBangla ? item.titleBn : item.titleEn;
            const description = isBangla ? item.shortDescBn : item.shortDescEn;
            const deliverables = isBangla ? item.deliverablesBn : item.deliverablesEn;

            return (
              <Link
                key={item.slug}
                to={`/engineering/services/${item.slug}`}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-sky-500/50 hover:shadow-lg transition-all duration-200"
              >
                {/* Card Top: Number Index & Technical Icon */}
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)] mb-5">
                    <span className="font-mono text-xs text-[var(--text-muted)] font-medium">
                      // {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-105 group-hover:border-sky-500/40 transition-transform">
                      <EngineeringServiceIcon name={item.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className={`text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors ${
                      isBangla ? 'font-bangla-serif tracking-normal' : ''
                    }`}
                  >
                    {title}
                  </h3>

                  {/* Description */}
                  <p 
                    className={`text-sm text-[var(--text-secondary)] leading-relaxed mb-6 ${
                      isBangla ? 'font-bangla-sans' : ''
                    }`}
                  >
                    {description}
                  </p>
                </div>

                {/* Card Bottom: Scope Checklist & Click Prompt */}
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                    {isBangla ? 'প্রধান আউটপুট:' : 'Key deliverables:'}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] mb-4">
                    {deliverables.slice(0, 3).map((scope, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="text-sky-500 font-mono text-[11px] select-none leading-relaxed">›</span>
                        <span className={`line-clamp-1 ${isBangla ? 'font-bangla-sans' : ''}`}>{scope}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:text-sky-500 transition-colors pt-1">
                    <span className={isBangla ? 'font-bangla-sans' : ''}>
                      {isBangla ? 'বিস্তারিত বিবরণ দেখুন' : 'Explore Service Scope'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </Container>
    </Section>
  );
};
