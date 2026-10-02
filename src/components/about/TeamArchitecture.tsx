import React from 'react';
import { Terminal, Users, Cpu, ShieldCheck } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';

export const TeamArchitecture: React.FC = () => {
  return (
    <Section spacing="xl" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: People & Engineering Practice */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
              <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                ENGINEERING PRACTICE
              </span>
            </div>

            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance">
              Product-Focused Engineering
            </h2>

            <p className="type-body text-[var(--text-secondary)] leading-relaxed">
              BDCON Labs is structured around focused product engineering and pragmatic software architecture. We believe high-impact digital solutions come from deep focus on real workflows, clean code, and disciplined execution rather than oversized, bureaucratic teams.
            </p>

            <p className="type-body-small text-[var(--text-muted)] leading-relaxed">
              Every system is built with high standards of type safety, maintainability, and direct communication throughout the development cycle.
            </p>
          </div>

          {/* Right Column: Architectural Matrix */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
                <Terminal className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                <span>TECHNOLOGY SELECTION DISCIPLINE</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] space-y-1">
                  <span className="text-xs font-bold text-[var(--text-primary)] block">
                    Modern, Proven Tech Stacks
                  </span>
                  <p className="type-caption text-[var(--text-secondary)]">
                    We engineer using React, TypeScript, Vite, Tailwind CSS, and structured data layers—selected for performance, rapid rendering, and long-term stability.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] space-y-1">
                  <span className="text-xs font-bold text-[var(--text-primary)] block">
                    Zero Artificial Bloat
                  </span>
                  <p className="type-caption text-[var(--text-secondary)]">
                    We avoid unnecessary dependencies, bloated frameworks, and superficial decorations that slow down runtime performance or complicate future maintenance.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" />
                <span>Architected for long-term production reliability</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
