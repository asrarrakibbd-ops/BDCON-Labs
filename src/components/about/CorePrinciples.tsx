import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { useTranslation } from '../../hooks/useTranslation';

export const CorePrinciples: React.FC = () => {
  const { isBangla, t } = useTranslation();

  const principles = [
    {
      num: '01',
      title: isBangla ? t('principles.practicalTitle') : 'Practical',
      subtitle: isBangla ? 'বাস্তব সমস্যার চারপাশে সমাধান।' : 'Build around actual problems.',
      desc: isBangla
        ? t('principles.practicalDesc')
        : 'We do not build software to follow fleeting buzzwords or unnecessary trends. Every line of code exists to solve a concrete task, calculation, or organizational workflow.',
    },
    {
      num: '02',
      title: isBangla ? t('principles.usefulTitle') : 'Useful',
      subtitle: isBangla ? 'প্রকৃত উপযোগিতা ও সময় সাশ্রয়।' : 'Deliver genuine, measurable value.',
      desc: isBangla
        ? t('principles.usefulDesc')
        : 'Software must earn its place on someone’s screen by doing its job exceptionally well. We measure success by whether our tools genuinely save time and effort.',
    },
    {
      num: '03',
      title: isBangla ? t('principles.simpleTitle') : 'Simple',
      subtitle: isBangla ? 'অপ্রয়োজনীয় জটিলতা পরিহার।' : 'Remove needless complexity.',
      desc: isBangla
        ? t('principles.simpleDesc')
        : 'Clarity is an engineering achievement. We design clean data architectures, intuitive user flows, and straightforward interfaces that require zero cognitive overload.',
    },
    {
      num: '04',
      title: isBangla ? t('principles.continuousTitle') : 'Continuous',
      subtitle: isBangla ? 'বাস্তব ব্যবহারের মাধ্যমে মানোন্নয়ন।' : 'Iterate through real-world usage.',
      desc: isBangla
        ? t('principles.continuousDesc')
        : 'Software is a living system. We ship disciplined releases, listen to frontline feedback from working professionals, and steadily refine our products.',
    },
  ];

  return (
    <Section spacing="xl" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
              <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'কাজের দর্শন' : 'CORE FOUNDATION'}
              </span>
            </div>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance">
              {isBangla ? 'চারটি মূল পরিচালনা নীতি' : 'The Four Operating Principles'}
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              {isBangla
                ? 'এই মূল ভিত্তিগুলো আমাদের সফটওয়্যার আর্কিটেকচার, প্রজেক্ট স্কোপিং এবং প্রোডাক্ট রোডম্যাপের প্রতিটি পদক্ষেপে দিকনির্দেশনা দেয়।'
                : 'These fundamental standards guide our architectural decisions, project scoping, and product roadmaps.'}
            </p>
          </div>

          {/* Minimal 4-Column Grid with Hairlines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-color)]">
            {principles.map((item, idx) => (
              <div
                key={item.title}
                className={`pt-6 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} space-y-3 select-none`}
              >
                <div className="font-mono text-xs font-bold text-[var(--color-brand)] tracking-wider">
                  {item.num}
                </div>

                <div className="space-y-1">
                  <h3 className="type-h3 text-[var(--text-primary)] font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="type-caption text-[var(--color-brand)] font-medium">
                    {item.subtitle}
                  </p>
                </div>

                <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
