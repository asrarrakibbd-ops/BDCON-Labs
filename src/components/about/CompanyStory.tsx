import React from 'react';
import { Target, Layers, ShieldCheck, RefreshCw } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { useTranslation } from '../../hooks/useTranslation';

export const CompanyStory: React.FC = () => {
  const { isBangla } = useTranslation();

  const pillars = [
    {
      icon: Target,
      title: isBangla ? 'বাস্তব সমস্যাই প্রথম' : 'Problem First',
      description: isBangla
        ? 'প্রযুক্তিগত ট্রেন্ডের চেয়ে কাজের গভীর অনুধাবনকে আমরা অগ্রাধিকার দিই। কোড লেখার আগেই আমরা ব্যবহারকারীর সমস্যা ও হিসাবের জটিলতা পুঙ্খানুপুঙ্খ বিশ্লেষণ করি।'
        : 'We prioritize deep domain understanding over technology trends. Before writing code, we dissect the actual operational bottlenecks, user friction points, and computational requirements.',
    },
    {
      icon: Layers,
      title: isBangla ? 'প্রোডাক্ট মানসিকতা' : 'Product Mindset',
      description: isBangla
        ? 'নিজস্ব সফটওয়্যার হোক বা ক্লায়েন্টের বিশেষ চাহিদা—আমরা প্রতিটি কাজকে বিচ্ছিন্ন কিছু ফিচারের সমষ্টি হিসেবে না দেখে একটি সুসংহত পূর্ণাঙ্গ প্রোডাক্ট হিসেবে গড়ে তুলি।'
        : 'Whether engineering our proprietary tools or developing for clients, we approach software as a unified product rather than a disconnected checklist of tickets.',
    },
    {
      icon: ShieldCheck,
      title: isBangla ? 'নিখুঁত নির্মাণশৈলী' : 'Build Carefully',
      description: isBangla
        ? 'আমরা টাইপ-সেফটি, পরিষ্কার আর্কিটেকচার এবং দ্রুতগতির পারফরম্যান্স নিশ্চিত করি। এমন সিস্টেম নির্মাণ করি যা দীর্ঘদিন নির্ভরযোগ্যভাবে কাজ করতে সক্ষম।'
        : 'We value type safety, deterministic logic, clean architecture, and performance. We build systems that perform reliably in production and can be maintained effortlessly.',
    },
    {
      icon: RefreshCw,
      title: isBangla ? 'ধারাবাহিক উৎকর্ষ' : 'Improve Continuously',
      description: isBangla
        ? 'ব্যবহারকারীদের বাস্তব অভিজ্ঞতা ও মূল্যায়নের ওপর ভিত্তি করে আমরা নিয়মিত সফটওয়্যারের সক্ষমতা বৃদ্ধি ও মানোন্নয়ন নিশ্চিত করি।'
        : 'Digital solutions stay effective through steady refinement. We observe real-world usage, collect practical user insights, and iterate systematically.',
    },
  ];

  return (
    <Section spacing="xl" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                  {isBangla ? 'আমাদের দর্শন' : 'OUR PHILOSOPHY'}
                </span>
              </div>
              <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance">
                {isBangla ? 'সুনির্দিষ্ট লক্ষ্য ও উদ্দেশ্যভিত্তিক সফটওয়্যার নির্মাণ।' : 'Technology engineered with intention.'}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <p className="type-body-large text-[var(--text-secondary)] leading-relaxed text-balance">
                {isBangla
                  ? 'BDCON Labs একটি সুস্পষ্ট বিশ্বাস থেকে যাত্রা শুরু করেছে: সফটওয়্যারের কাজ হলো প্রাত্যহিক দায়িত্বকে আরও সহজ, দ্রুত ও নির্ভরযোগ্য করে তোলা।'
                  : 'BDCON Labs was founded around a simple conviction: software should make everyday tasks clearer, faster, and more dependable.'}
              </p>
              <p className="type-body text-[var(--text-muted)] leading-relaxed">
                {isBangla
                  ? 'অহেতুক জটিলতা পরিহার করে আমরা বাস্তব কাজের বাস্তব সমাধানে বিশ্বাস করি। প্রোডাক্ট থিংকিং ও কঠোর সফটওয়্যার ইঞ্জিনিয়ারিংয়ের মেলবন্ধনে আমরা তৈরি করি কার্যকর সমাধান।'
                  : 'Too often, digital systems are encumbered by unnecessary complexity or built to showcase flashy features rather than solve real-world problems. We balance product thinking with engineering discipline to build practical software that works.'}
              </p>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3 shadow-2xs hover:border-[var(--border-strong)] transition-colors select-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)]">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="type-h4 text-[var(--text-primary)] font-bold tracking-tight pt-1">
                    {item.title}
                  </h3>

                  <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
