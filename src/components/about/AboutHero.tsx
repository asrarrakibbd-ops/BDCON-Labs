import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const AboutHero: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="canvas" borderBottom className="relative overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(var(--tech-grid-color) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Ambient Glow */}
      <div
        className="absolute -top-32 right-0 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none opacity-50 dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--color-brand-glow) 0%, transparent 70%)',
        }}
      />

      <Container size="2xl" className="relative z-10">
        <div className="max-w-3xl space-y-6 text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
            <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
              {isBangla ? 'আমাদের পরিচিতি' : 'ABOUT BDCON LABS'}
            </span>
          </div>

          {/* Heading */}
          <h1 className={`type-display text-[var(--text-primary)] font-bold tracking-tight text-balance ${isBangla ? 'font-bangla-serif' : ''}`}>
            {isBangla
              ? 'বাস্তব জীবনের প্রয়োজনে তৈরি টেকসই সফটওয়্যার।'
              : 'Building software around real-world needs.'}
          </h1>

          {/* Supporting Copy */}
          <p className="type-body-large text-[var(--text-secondary)] leading-relaxed text-balance">
            {isBangla
              ? 'BDCON Labs একটি উদ্দেশ্যনিষ্ঠ সফটওয়্যার ও ডিজিটাল প্রোডাক্ট স্টুডিও। পেশাজীবী, ব্যবসা এবং বিভিন্ন প্রতিষ্ঠানের কাজের জটিলতা কমাতে আমরা তৈরি করি গতিশীল সফটওয়্যার, আধুনিক ওয়েব অ্যাপ্লিকেশন ও কাস্টম প্রযুক্তি সমাধান।'
              : 'BDCON Labs is a software studio that builds practical digital products, web applications, mobile tools and custom software solutions. We focus on solving genuine operational challenges through disciplined software engineering and thoughtful design.'}
          </p>

          {/* CTA Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <Link to="/products">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {isBangla ? 'প্রোডাক্টসমূহ দেখুন' : 'Explore Our Products'}
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg">
                {isBangla ? 'সার্ভিসসমূহ দেখুন' : 'View Services'}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
