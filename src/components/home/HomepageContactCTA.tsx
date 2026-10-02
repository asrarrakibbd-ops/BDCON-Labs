import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const HomepageContactCTA: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="subtle" borderBottom id="homepage-cta">
      <Container size="2xl">
        <div className="p-8 sm:p-12 lg:p-14 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-4xl mx-auto shadow-xs space-y-6">
          <div className="space-y-3">
            <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
              {t('contactCta.eyebrow')}
            </span>
            <h2 className={`type-h2 text-[var(--text-primary)] font-bold tracking-tight ${isBangla ? 'font-bangla-serif' : ''}`}>
              {t('contactCta.heading')}
            </h2>
            <p className={`type-body text-[var(--text-secondary)] max-w-xl mx-auto text-balance ${isBangla ? 'font-bangla-sans' : ''}`}>
              {t('contactCta.description')}
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
                {t('contactCta.startProject')}
              </Button>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                as="span"
                variant="outline"
                size="lg"
                leftIcon={<Mail className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {t('contactCta.contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
