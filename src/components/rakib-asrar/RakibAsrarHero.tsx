import React from 'react';
import { ArrowRight, BookOpen, Feather } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { AUTHOR_PROFILE, AuthorProfile } from '../../data/author';

export interface RakibAsrarHeroProps {
  profile?: AuthorProfile;
}

export const RakibAsrarHero: React.FC<RakibAsrarHeroProps> = ({
  profile = AUTHOR_PROFILE,
}) => {
  return (
    <Section spacing="xl" surface="canvas" borderBottom className="relative overflow-hidden">
      {/* Background Soft Editorial Watermark Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(var(--border-strong) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Author Narrative & Identity */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Literary Monogram Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs">
              <Feather className="w-3.5 h-3.5 text-[var(--color-brand)]" aria-hidden="true" />
              <span className="type-caption font-bold tracking-wider uppercase text-[var(--text-primary)] font-bangla-sans text-[11px]">
                রাকিব আসরার · সাহিত্য ও সৃষ্টিশীলতা
              </span>
            </div>

            {/* Dual Language Heading with Serif Accent */}
            <div className="space-y-2">
              <h1 className="font-bangla-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.2]">
                {profile.name}
              </h1>
              <p className="font-bangla-sans text-lg sm:text-xl font-medium text-[var(--color-brand)]">
                {profile.role}
              </p>
            </div>

            {/* Actual Author Tagline from Existing Source */}
            <div className="p-4 rounded-xl border-l-3 border-[var(--color-brand)] bg-[var(--bg-surface-subtle)] font-bangla-serif italic text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
              &ldquo;{profile.tagline}&rdquo;
            </div>

            {/* Authentic Introduction Copy */}
            <p className="type-body-large font-bangla-sans text-[var(--text-secondary)] leading-relaxed text-balance">
              {profile.shortBio}
            </p>

            {/* Action Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link to="/rakib-asrar/books">
                <Button as="span" variant="primary" size="lg" leftIcon={<BookOpen className="w-4 h-4" />}>
                  বইসমূহ
                </Button>
              </Link>

              <Link to="/rakib-asrar/writing">
                <Button as="span" variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  লেখালেখি
                </Button>
              </Link>

              <Link to="/rakib-asrar/about">
                <Button as="span" variant="ghost" size="lg">
                  পরিচিতি
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Genuine Author Portrait Image */}
          <div className="lg:col-span-5 w-full">
            <div className="relative max-w-[380px] mx-auto rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 sm:p-4 shadow-sm select-none">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
                <img
                  src={profile.profileImage}
                  alt="রাকিব আসরার - লেখক ও কথাসাহিত্যিক"
                  loading="eager"
                  className="w-full h-full object-cover object-top filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                  <p className="font-bangla-serif text-lg font-bold drop-shadow-sm">
                    {profile.name}
                  </p>
                  <p className="text-xs font-mono text-white/80 drop-shadow-sm">
                    {profile.profession}
                  </p>
                </div>
              </div>

              {/* Bottom Quote Snippet */}
              <div className="pt-3 px-2 text-center">
                <p className="font-bangla-serif text-xs sm:text-sm text-[var(--text-secondary)]">
                  উপন্যাস ও গল্পগ্রন্থের রচয়িতা · অমর একুশে বইমেলা
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
