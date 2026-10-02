import React from 'react';
import { ArrowRight, Feather } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const HomepageRakibAsrarSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section spacing="lg" surface="subtle" borderBottom id="rakib-asrar-spotlight">
      <Container size="2xl">
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] shrink-0 shadow-2xs mt-0.5">
              <Feather className="w-6 h-6 text-[var(--color-brand)]" aria-hidden="true" />
            </div>

            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[10px] font-bold">
                  {t('rakibAsrarSpotlight.eyebrow')}
                </span>
              </div>
              <h3 className="font-bangla-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                {t('rakibAsrarSpotlight.title')}
              </h3>
              <p className="type-body-small font-bangla-sans text-[var(--text-secondary)] leading-relaxed">
                {t('rakibAsrarSpotlight.description')}
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link to="/rakib-asrar" className="block sm:inline-block w-full">
              <Button
                variant="outline"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {t('rakibAsrarSpotlight.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
