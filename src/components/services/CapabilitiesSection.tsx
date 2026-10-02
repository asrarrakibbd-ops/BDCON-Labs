import React from 'react';
import { Layers, Terminal, CheckCircle2 } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { CORE_CAPABILITIES } from '../../data/services';

export const CapabilitiesSection: React.FC = () => {
  return (
    <Section spacing="lg" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Capability Context Statement */}
          <div className="lg:col-span-6 space-y-4">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              TECHNICAL FOUNDATION
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Modern, Maintainable Technology Stacks
            </h2>
            <p className="type-body text-[var(--text-secondary)] leading-relaxed">
              We select established, high-performance web and mobile technologies engineered for long-term stability, type safety, and maintainable software architecture. Stacks are tailored to specific project requirements.
            </p>
          </div>

          {/* Right: Technical Badges Matrix */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
                <Terminal className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                <span>PRIMARY ARCHITECTURAL TOOLING</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CORE_CAPABILITIES.map((cap) => (
                  <div
                    key={cap.name}
                    className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-[var(--text-primary)]">
                        {cap.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                    </div>
                    <span className="type-caption font-mono text-[11px] text-[var(--text-muted)] block">
                      {cap.category}
                    </span>
                  </div>
                ))}
              </div>

              <p className="type-caption text-[11px] text-[var(--text-muted)]">
                Tailored engineering architectures chosen according to project scale, security constraints, and operational demands.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
