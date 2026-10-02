import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { WritingEntry } from '../../types/writing';
import { useRouter } from '../../lib/router';
import { cn } from '../../lib/utils';

export interface WritingCardProps {
  entry: WritingEntry;
  onRead?: (entry: WritingEntry) => void;
  className?: string;
}

export const WritingCard: React.FC<WritingCardProps> = ({ entry, onRead, className }) => {
  const { navigate } = useRouter();

  const handleClick = () => {
    if (onRead) {
      onRead(entry);
    } else {
      navigate(`/rakib-asrar/writing/${entry.slug}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`প্রবন্ধ পাঠ করুন: ${entry.title}`}
      aria-labelledby={`writing-card-title-${entry.id}`}
      className={cn(
        'group p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs hover:border-[var(--border-strong)] transition-all flex flex-col justify-between space-y-5 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]',
        className
      )}
    >
      <div className="space-y-3.5">
        {/* Meta Bar: Category, Reading Time, Language */}
        <div className="flex items-center justify-between text-[11px] font-bangla-sans text-[var(--text-muted)]">
          <span className="uppercase tracking-wider font-semibold text-[var(--color-brand)]">
            {entry.category || 'প্রবন্ধ ও চিন্তন'}
          </span>
          <div className="flex items-center gap-2">
            {entry.readingTime && (
              <span className="flex items-center gap-1 font-bangla-sans">
                <Clock className="w-3 h-3 text-[var(--text-muted)]" aria-hidden="true" />
                <span>{entry.readingTime}</span>
              </span>
            )}
            {entry.language && (
              <span className="uppercase px-1.5 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[10px]">
                {entry.language}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3
            id={`writing-card-title-${entry.id}`}
            className="font-bangla-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors leading-[1.4] tracking-tight"
          >
            {entry.title}
          </h3>
          {entry.subtitle && (
            <p className="font-bangla-sans text-xs sm:text-sm text-[var(--color-brand)] font-medium leading-[1.6]">
              {entry.subtitle}
            </p>
          )}
        </div>

        {/* Excerpt with refined Bangla line-height and letter-spacing */}
        {entry.excerpt && (
          <p className="type-bangla-excerpt text-[var(--text-secondary)] leading-[1.85] line-clamp-3">
            {entry.excerpt}
          </p>
        )}
      </div>

      {/* Date & Trigger */}
      <div className="pt-3.5 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
        {entry.publishedAt ? (
          <span className="text-[var(--text-muted)] font-bangla-sans text-xs flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            <span>{entry.publishedAt}</span>
          </span>
        ) : <span />}

        <span className="inline-flex items-center gap-1.5 font-bold font-bangla-sans text-xs text-[var(--color-brand)] group-hover:translate-x-1 transition-transform">
          <span>সম্পূর্ণ পাঠ করুন</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
};
