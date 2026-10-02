import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { STANDARD_PROCESS_STEPS } from '../../data/services';

export const ServiceProcess: React.FC = () => {
  return (
    <Section spacing="lg" surface="canvas" borderBottom id="how-we-work">
      <Container size="2xl">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="max-w-2xl space-y-2">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              DEVELOPMENT LIFECYCLE
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              How We Work
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              A disciplined, phased engineering approach designed to maintain clarity from initial requirement scoping through deployment.
            </p>
          </div>

          {/* Sequential Timeline: Desktop grid (3 cols x 2 rows or 6 cols), Mobile vertical stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {STANDARD_PROCESS_STEPS.map((step) => {
              const formattedNumber = String(step.stepNumber).padStart(2, '0');
              return (
                <div
                  key={step.stepNumber}
                  className="relative p-6 sm:p-7 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3 shadow-2xs hover:border-[var(--border-strong)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[var(--color-brand)]">
                      {formattedNumber}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
                      PHASE {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
                    {step.title}
                  </h3>

                  <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
