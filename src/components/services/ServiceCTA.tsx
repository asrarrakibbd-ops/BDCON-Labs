import React from 'react';
import { ArrowRight, Code } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';

export const ServiceCTA: React.FC = () => {
  return (
    <Section spacing="lg" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="p-8 sm:p-12 lg:p-14 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-4xl mx-auto shadow-xs space-y-6">
          <div className="space-y-3">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              COLLABORATE WITH BDCON LABS
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Have a software idea?
            </h2>
            <p className="type-body text-[var(--text-secondary)] max-w-xl mx-auto text-balance">
              Tell us what you&apos;re trying to build, and we&apos;ll help turn the requirement into a clear digital solution.
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

            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                as="span"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                General Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
