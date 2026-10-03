import React from 'react';
import { 
  Building, 
  Cpu, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { useTranslation } from '../../hooks/useTranslation';

export const EngineeringBrandIntro: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section 
      spacing="xl" 
      className="bg-[var(--bg-surface)] border-b border-[var(--border-color)] relative overflow-hidden"
    >
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Explanation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span className={`text-xs font-mono uppercase tracking-widest text-[var(--color-brand)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                {isBangla ? 'প্রতিষ্ঠান পরিচিতি' : 'PRACTICAL ENGINEERING'}
              </span>
            </div>

            <h2 
              className={`text-[var(--text-primary)] font-bold tracking-tight ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.3] text-2xl sm:text-3xl lg:text-4xl' 
                  : 'type-h1 text-2xl sm:text-3xl lg:text-4xl'
              }`}
            >
              {t(
                'engineeringLanding.brandIntro.heading', 
                'Engineering expertise for real-world projects.'
              )}
            </h2>

            <div className="space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
              <p className={isBangla ? 'font-bangla-sans' : ''}>
                {isBangla 
                  ? 'বিডিকন ইঞ্জিনিয়ারিং লিমিটেড বাস্তবমুখী সিভিল ইঞ্জিনিয়ারিং, বিল্ডিং ডিজাইন, নির্ভুল এস্টিমেশন এবং কনস্ট্রাকশন কনসালটেন্সি সেবা প্রদান করে। আমরা প্রতিটি প্রকল্পে নিরাপত্তা, স্থায়িত্ব ও নির্মাণযোগ্য বাস্তবায়নে প্রতিশ্রুতিবদ্ধ।'
                  : 'BDCON Engineering Ltd provides practical civil engineering, design, estimation, and construction-related consultancy. We focus on dependable, code-compliant, and buildable solutions for property owners, developers, and institutions.'
                }
              </p>
              <p className={isBangla ? 'font-bangla-sans' : ''}>
                {isBangla
                  ? 'আমাদের লক্ষ্য হলো এমন ইঞ্জিনিয়ারিং ড্রয়িং ও পরিকল্পনা প্রদান করা যা সাইটে কোনো জটিলতা ছাড়াই কার্যকর ও নির্ভুলভাবে বাস্তবায়ন করা যায়। প্রতিটি ড্রয়িং ও প্রাক্কলন প্রণয়নে আমরা মানসম্পন্ন ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড অনুসরণ করি।'
                  : 'Every project is approached with mathematical rigor, safety consciousness, and practical field insight—ensuring that architectural plans translate smoothly into durable physical realities without unforeseen cost escalations.'
                }
              </p>
            </div>

            {/* Core Values Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-primary)]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className={isBangla ? 'font-bangla-sans' : 'font-medium'}>
                  {isBangla ? 'সাইট-বাস্তবায়নযোগ্য ড্রয়িং' : 'Field-constructible drawings'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className={isBangla ? 'font-bangla-sans' : 'font-medium'}>
                  {isBangla ? 'স্বচ্ছ ও যাচাইযোগ্য বিওকিউ (BOQ)' : 'Transparent & verifiable BOQ'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className={isBangla ? 'font-bangla-sans' : 'font-medium'}>
                  {isBangla ? 'বিএনবিসি (BNBC) কোড নিরাপত্তা' : 'BNBC & ACI safety adherence'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className={isBangla ? 'font-bangla-sans' : 'font-medium'}>
                  {isBangla ? 'সাশ্রয়ী কাঠামোগত পরিকল্পনা' : 'Economical structural planning'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Brand Relationship Architecture */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  // {isBangla ? 'ব্র্যান্ড সম্পর্ক' : 'Brand Relationship'}
                </span>
                <span className="font-mono text-[11px] text-sky-600 dark:text-sky-400 font-medium">
                  ECOSYSTEM
                </span>
              </div>

              {/* Entity 1: BDCON Engineering Ltd (Highlighted) */}
              <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/5 dark:bg-sky-500/10 space-y-2">
                <div className="flex items-center gap-2.5 text-sky-700 dark:text-sky-300">
                  <Compass className="w-5 h-5 shrink-0" />
                  <span className="font-bold text-sm tracking-tight">
                    BDCON Engineering Ltd
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  {isBangla ? 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি' : 'Civil Engineering Consultancy'}
                </div>
                <p className={`text-xs text-[var(--text-secondary)] leading-relaxed pt-1 ${isBangla ? 'font-bangla-sans' : ''}`}>
                  {isBangla
                    ? 'বিল্ডিং ডিজাইন, স্ট্রাকচারাল ড্রয়িং, নির্ভুল এস্টিমেশন, কোয়ান্টিটি সার্ভেয়িং ও কনস্ট্রাকশন কনসালটেন্সি।'
                    : 'Building design, structural drawings, estimation, BOQ, and construction consultancy for physical structures.'
                  }
                </p>
              </div>

              {/* Relationship Connector */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[var(--text-muted)] py-1">
                <span className="h-px w-10 bg-[var(--border-color)]" />
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  {isBangla ? 'সম্পর্কিত প্রতিষ্ঠান' : 'RELATED ENTITY'}
                </span>
                <span className="h-px w-10 bg-[var(--border-color)]" />
              </div>

              {/* Entity 2: BDCON Labs */}
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
                <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
                  <Cpu className="w-5 h-5 shrink-0 text-[var(--color-brand)]" />
                  <span className="font-bold text-sm tracking-tight">
                    BDCON Labs
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  {isBangla ? 'সফটওয়্যার ও ডিজিটাল প্রোডাক্ট স্টুডিও' : 'Software, Digital Products & Technology'}
                </div>
                <p className={`text-xs text-[var(--text-secondary)] leading-relaxed pt-1 ${isBangla ? 'font-bangla-sans' : ''}`}>
                  {isBangla
                    ? 'বাস্তব সমস্যা সমাধানে ডিজিটাল টুলস, প্রকৌশল সফটওয়্যার (BuildEst BD, CivilDesk) এবং ওয়েব অ্যাপ্লিকেশন।'
                    : 'Domain-specific software tools, engineering web apps, and custom digital systems for organizations.'
                  }
                </p>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
};
