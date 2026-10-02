import React from 'react';
import { Compass, Eye } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { useTranslation } from '../../hooks/useTranslation';

export const MissionVision: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <Section spacing="xl" surface="canvas" borderBottom>
      <Container size="2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-subtle)] border border-[var(--color-brand-muted)] flex items-center justify-center text-[var(--color-brand)]">
                <Compass className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className={`type-caption font-bold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'আমাদের মিশন' : 'OUR MISSION'}
              </span>
            </div>

            <h3 className={`type-h3 text-[var(--text-primary)] font-bold tracking-tight ${isBangla ? 'font-bangla-serif' : ''}`}>
              {isBangla
                ? 'জটিল কাজের প্রক্রিয়াকে সহজ ও কার্যকর করা।'
                : 'Making complex tasks simpler and more useful.'}
            </h3>

            <p className={`type-body text-[var(--text-secondary)] leading-relaxed ${isBangla ? 'font-bangla-sans' : ''}`}>
              {isBangla
                ? 'পেশাজীবী ও ব্যবসায়িক প্রতিষ্ঠানের হিসাব ও কর্মপ্রবাহের জটিলতা দূর করতে এমন নির্ভরযোগ্য ডিজিটাল প্রোডাক্ট ও সফটওয়্যার তৈরি করা যা দৈনন্দিন কাজে সরাসরি গতি আনে।'
                : 'To build practical digital products and software solutions that streamline calculations, eliminate operational friction, and empower professionals and businesses with tools they can trust completely.'}
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)]">
                <Eye className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className={`type-caption font-bold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'আমাদের ভিশন' : 'OUR VISION'}
              </span>
            </div>

            <h3 className={`type-h3 text-[var(--text-primary)] font-bold tracking-tight ${isBangla ? 'font-bangla-serif' : ''}`}>
              {isBangla
                ? 'বিশেষায়িত সফটওয়্যারের একটি টেকসই ইকোসিস্টেম গড়ে তোলা।'
                : 'A durable ecosystem of specialized software.'}
            </h3>

            <p className={`type-body text-[var(--text-secondary)] leading-relaxed ${isBangla ? 'font-bangla-sans' : ''}`}>
              {isBangla
                ? 'এমন একটি প্রফেশনাল সফটওয়্যার স্টুডিও হিসেবে গড়ে ওঠা যেখানে BuildEst BD-এর মতো বিশেষায়িত ডোমেন সফটওয়্যার বাস্তব শিল্পখাতকে এগিয়ে নেবে এবং কাস্টম সফটওয়্যার ইঞ্জিনিয়ারিং সর্বোচ্চ মান বজায় রাখবে।'
                : 'To build a recognized studio known for software craftsmanship, where practical domain tools like BuildEst BD serve real industries, and where custom software engineering maintains the highest standards of reliability.'}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
