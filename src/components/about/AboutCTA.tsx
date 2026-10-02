import React from 'react';
import { ArrowRight, Box } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const AboutCTA: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="p-8 sm:p-12 lg:p-14 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-4xl mx-auto shadow-xs space-y-6">
          <div className="space-y-3">
            <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
              {isBangla ? 'নতুন কোনো ভাবনা বা পরিকল্পনা?' : 'HAVE AN IDEA?'}
            </span>
            <h2 className={`type-h2 text-[var(--text-primary)] font-bold tracking-tight ${isBangla ? 'font-bangla-serif' : ''}`}>
              {isBangla ? 'একত্রে কার্যকর কিছু তৈরি করি।' : "Let's build something useful."}
            </h2>
            <p className={`type-body text-[var(--text-secondary)] max-w-xl mx-auto text-balance ${isBangla ? 'font-bangla-sans' : ''}`}>
              {isBangla
                ? 'আপনার প্রতিষ্ঠানের জন্য কাস্টম সফটওয়্যার তৈরি করতে চান কিংবা আমাদের প্রযুক্তি সমাধান নিয়ে জানতে চান—বাস্তব চাহিদাকে কার্যকর রূপ দিতে আমরা প্রস্তুত।'
                : 'Whether you are looking to collaborate on a custom software tool or want to explore our digital products, we are ready to turn real requirements into dependable digital solutions.'}
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
                {isBangla ? 'প্রজেক্ট শুরু করুন' : 'Start a Project'}
              </Button>
            </Link>

            <Link to="/products" className="w-full sm:w-auto">
              <Button
                as="span"
                variant="outline"
                size="lg"
                rightIcon={<Box className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {isBangla ? 'প্রোডাক্টসমূহ দেখুন' : 'Explore Our Products'}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
