import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';

export const NotFoundPage: React.FC = () => {
  const { isBangla, t } = useTranslation();

  return (
    <Section spacing="xl" surface="canvas" className="flex-1 flex items-center justify-center">
      <SEO
        title={isBangla ? '৪০৪ — পেজটি খুঁজে পাওয়া যায়নি | BDCON Labs' : '404 — Page Not Found | BDCON Labs'}
        description={
          isBangla
            ? 'আপনি যে পেজটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা ঠিকানাটি সঠিক নয়।'
            : 'The page you requested could not be located. It may have moved or the route was mistyped.'
        }
        noindex={true}
      />
      <Container size="md">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-5">
          <div className={`text-sm font-semibold tracking-wider uppercase text-[var(--color-brand)] bg-[var(--color-brand-subtle)] border border-[var(--color-brand-muted)] px-3 py-1 rounded-md ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
            {isBangla ? 'ত্রুটি ৪০৪' : 'Error 404'}
          </div>

          <h1 className="type-h1 text-[var(--text-primary)] font-bold">
            {isBangla ? 'পেজটি খুঁজে পাওয়া যায়নি' : "This page doesn't exist."}
          </h1>

          <p className="type-body text-[var(--text-secondary)]">
            {isBangla
              ? 'আপনি যে পেজটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা লিংকটি সঠিক নয়।'
              : 'The page you requested could not be located. It may have moved or the route was mistyped.'}
          </p>

          <div className="pt-2">
            <Link to="/">
              <Button
                variant="primary"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {t('common.backToHome')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
