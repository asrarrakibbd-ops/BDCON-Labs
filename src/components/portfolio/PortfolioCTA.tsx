import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';

export const PortfolioCTA: React.FC = () => {
  return (
    <Section spacing="xl" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="p-8 sm:p-12 lg:p-14 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-4xl mx-auto shadow-xs space-y-6">
          <div className="space-y-3">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
              ENGINEERING COLLABORATION
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Have a software idea or operational requirement?
            </h2>
            <p className="type-body text-[var(--text-secondary)] max-w-xl mx-auto text-balance">
              Whether you need a custom web application, field mobile tool, or full-scale software product, BDCON Labs engineers practical digital solutions tailored to your operational needs.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/start-project" className="w-full sm:w-auto">
              <Button
                as="span"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start a Project
              </Button>
            </Link>

            <Link to="/services" className="w-full sm:w-auto">
              <Button
                as="span"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
