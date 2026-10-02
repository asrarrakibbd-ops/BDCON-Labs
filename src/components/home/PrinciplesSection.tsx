import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { useTranslation } from '../../hooks/useTranslation';

export const PrinciplesSection: React.FC = () => {
  const { t, isBangla } = useTranslation();

  const principles = [
    {
      index: '01',
      title: t('principles.practicalTitle'),
      description: t('principles.practicalDesc'),
    },
    {
      index: '02',
      title: t('principles.usefulTitle'),
      description: t('principles.usefulDesc'),
    },
    {
      index: '03',
      title: t('principles.simpleTitle'),
      description: t('principles.simpleDesc'),
    },
    {
      index: '04',
      title: t('principles.continuousTitle'),
      description: t('principles.continuousDesc'),
    },
  ];

  return (
    <Section spacing="xl" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
              <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('principles.eyebrow')}
              </span>
            </div>
            <h2 className={`type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance ${isBangla ? 'font-bangla-serif' : ''}`}>
              {t('principles.heading')}
            </h2>
          </div>

          {/* Minimal Editorial Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-color)]">
            {principles.map((p, idx) => (
              <div
                key={p.index}
                className={`pt-6 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} space-y-3 group`}
              >
                {/* Clean Numerical Index */}
                <div className="font-mono text-xs font-bold text-[var(--color-brand)] tracking-wider">
                  {p.index}
                </div>

                {/* Principle Title */}
                <h3 className={`text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors ${isBangla ? 'font-bangla-serif' : ''}`}>
                  {p.title}
                </h3>

                {/* Principle Description */}
                <p className={`type-body-small text-[var(--text-secondary)] leading-relaxed ${isBangla ? 'font-bangla-sans' : ''}`}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
