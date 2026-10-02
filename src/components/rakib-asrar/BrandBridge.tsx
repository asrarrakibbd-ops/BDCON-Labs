import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';

export const BrandBridge: React.FC = () => {
  return (
    <Section spacing="lg" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-subtle)] border border-[var(--color-brand-muted)] flex items-center justify-center text-[var(--color-brand)] shrink-0 mt-0.5">
              <Code2 className="w-5 h-5" aria-hidden="true" />
            </div>

            <div className="space-y-1 max-w-xl">
              <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[10px] font-bold block">
                মূল প্রতিষ্ঠান · BDCON Labs
              </span>
              <h3 className="font-bangla-serif text-lg sm:text-xl text-[var(--text-primary)] font-bold tracking-tight">
                সফটওয়্যার ও ডিজিটাল প্রোডাক্টস
              </h3>
              <p className="type-body-small font-bangla-sans text-[var(--text-secondary)] leading-relaxed">
                রাকিব আসরারের সাহিত্য ও সৃষ্টিশীল কাজের পাশাপাশি প্রযুক্তি ও ডিজিটাল প্রোডাক্ট ডেভেলপমেন্ট স্টুডিও হিসেবে কাজ করে <strong>BDCON Labs</strong>।
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Link to="/">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                BDCON Labs সম্পর্কে জানুন
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
