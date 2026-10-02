import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { WHY_US_PRINCIPLES } from '../../data/services';

export const WhyUsSection: React.FC = () => {
  return (
    <Section spacing="lg" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-2xl space-y-2">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              COLLABORATION PHILOSOPHY
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Why Build With BDCON Labs
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              We pair product craftsmanship with dedicated engineering discipline to ensure digital solutions deliver genuine utility.
            </p>
          </div>

          {/* Minimal 4-column principles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-color)]">
            {WHY_US_PRINCIPLES.map((principle, idx) => (
              <div
                key={principle.title}
                className={`pt-6 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} space-y-3`}
              >
                <div className="font-mono text-xs font-semibold text-[var(--color-brand)]">
                  0{idx + 1}
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  {principle.title}
                </h3>

                <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
