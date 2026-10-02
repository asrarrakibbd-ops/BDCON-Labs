import React from 'react';
import { ArrowRight, Box, Wrench, Check } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const PillarsComparison: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
              <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'আমাদের কর্মপদ্ধতি' : 'OUR BUSINESS MODEL'}
              </span>
            </div>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance">
              {isBangla
                ? 'দুটি মূল স্তম্ভ: প্রোডাক্টস ও সার্ভিসেস'
                : 'Two Connected Pillars: Products & Services'}
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              {isBangla
                ? 'BDCON Labs দ্বৈত শক্তিতে কাজ করে: একদিকে আমরা নিজস্ব বিশেষায়িত সফটওয়্যার তৈরি করি, অন্যদিকে ক্লায়েন্টদের জন্য নির্দিষ্ট প্রয়োজনের ডিজিটাল সিস্টেম নির্মাণ করি।'
                : 'BDCON Labs operates with dual focus: we engineer our own specialized software products while also designing and developing tailored digital systems for clients.'}
            </p>
          </div>

          {/* 2-Column Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Pillar 1: Proprietary Products */}
            <div className="p-8 sm:p-10 rounded-2xl border border-[var(--color-brand-muted)] bg-[var(--bg-surface)] flex flex-col justify-between shadow-xs space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] border border-[var(--color-brand-muted)] flex items-center justify-center text-[var(--color-brand)]">
                    <Box className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className={`text-xs text-[var(--color-brand)] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-brand-subtle)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {isBangla ? 'স্তম্ভ ০১' : 'PILLAR 01'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="type-h3 text-[var(--text-primary)] font-bold tracking-tight">
                    {isBangla ? 'আমাদের সফটওয়্যার প্রোডাক্টস' : 'Proprietary Software Products'}
                  </h3>
                  <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                    {isBangla
                      ? 'বাস্তব পেশাগত চ্যালেঞ্জ সমাধানের জন্য আমরা নিজস্ব সফটওয়্যার উদ্ভাবন ও পরিচালনা করি, যার মধ্যে কনস্ট্রাকশন এস্টিমেশনের জন্য BuildEst BD অন্যতম।'
                      : 'We architect and maintain focused digital products designed to solve specific domain challenges, starting with building estimation and quantity surveying in construction.'}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" />
                    <span>{isBangla ? 'বিশেষায়িত ডোমেনভিত্তিক হিসাব ও পরিমাপ ইঞ্জিন' : 'Domain-specific calculation and takeoff engines'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" />
                    <span>{isBangla ? 'ব্যবহারকারীদের মতামতের ভিত্তিতে নিয়মিত ফিচার আপডেট' : 'Continuous product roadmap and user-led updates'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" />
                    <span>{isBangla ? 'মাল্টি-প্ল্যাটফর্ম সুবিধা (ওয়েব ও অ্যান্ড্রয়েড)' : 'Multi-platform accessibility (Web & Android)'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)]">
                <Link to="/products">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {isBangla ? 'প্রোডাক্টসমূহ দেখুন' : 'Explore Products'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pillar 2: Client Solutions */}
            <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between shadow-xs space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)]">
                    <Wrench className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className={`text-xs text-[var(--text-muted)] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-subtle)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {isBangla ? 'স্তম্ভ ০২' : 'PILLAR 02'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="type-h3 text-[var(--text-primary)] font-bold tracking-tight">
                    {isBangla ? 'কাস্টম সফটওয়্যার সল্যুশন' : 'Custom Client Solutions'}
                  </h3>
                  <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                    {isBangla
                      ? 'আমরা বিভিন্ন ব্যবসা, প্রতিষ্ঠান ও পেশাজীবীদের জন্য তাদের প্রয়োজনীয় কর্মপ্রবাহের সাথে মানানসই কাস্টম ওয়েবসাইট ও বিশেষায়িত সফটওয়্যার তৈরি করি।'
                      : 'We partner with businesses, startups, and organizations to engineer custom websites, workflow applications, and specialized business software tailored to real operational requirements.'}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" />
                    <span>{isBangla ? 'কাস্টম ওয়েব অ্যাপ্লিকেশন ও ইন্টারনাল ড্যাশবোর্ড' : 'Custom web applications & internal dashboards'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" />
                    <span>{isBangla ? 'মোবাইল টুলস ও আধুনিক প্রাতিষ্ঠানিক ওয়েবসাইট' : 'Mobile tools & responsive business websites'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" />
                    <span>{isBangla ? 'সুনির্দিষ্ট টেকনিক্যাল প্ল্যানিং ও সফটওয়্যার কনসালটেন্সি' : 'Structured technical scoping and consultation'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)]">
                <Link to="/services">
                  <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {isBangla ? 'সার্ভিসসমূহ দেখুন' : 'Explore Services'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
