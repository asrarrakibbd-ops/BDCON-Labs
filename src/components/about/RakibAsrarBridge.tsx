import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const RakibAsrarBridge: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <Section spacing="lg" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)] shadow-2xs shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </div>

            <div className="space-y-1 max-w-xl">
              <span className={`type-caption uppercase tracking-wider text-[var(--color-brand)] text-[10px] font-bold block ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'সৃজনশীল প্রকাশনা' : 'CREATIVE & AUTHOR HUB'}
              </span>
              <h3 className="font-bangla-serif text-lg sm:text-xl text-[var(--text-primary)] font-bold tracking-tight">
                {isBangla ? 'রাকিব আসরার · সাহিত্য ও গ্রন্থাবলী' : 'Rakib Asrar — Writing & Books'}
              </h3>
              <p className="type-body-small font-bangla-sans text-[var(--text-secondary)] leading-relaxed">
                {isBangla
                  ? 'BDCON Labs-এর পাশাপাশি যুক্ত রয়েছে কথাসাহিত্যিক রাকিব আসরারের সাহিত্য, চিন্তন ও প্রকাশিত গ্রন্থসমূহ।'
                  : 'BDCON Labs also connects with the creative writing, literature, books, and long-form publications of Rakib Asrar.'}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Link to="/rakib-asrar">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                {isBangla ? 'সাহিত্য ও লেখালেখি দেখুন' : 'Explore Rakib Asrar'}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
