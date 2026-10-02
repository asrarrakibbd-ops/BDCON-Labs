import React from 'react';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { Book } from '../../types/book';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';

export interface BookCardProps {
  book: Book;
  className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, className }) => {
  const detailPath = `/rakib-asrar/books/${book.slug}`;

  return (
    <article
      className={cn(
        'group flex flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs hover:border-[var(--border-strong)] transition-all select-none',
        className
      )}
      aria-labelledby={`book-card-title-${book.id}`}
    >
      <div className="space-y-4">
        {/* Book Cover Container with Authentic Book Spine & Proportions */}
        <div className="relative w-full aspect-[2/3] max-w-[210px] mx-auto rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] shadow-sm flex items-center justify-center text-center">
          {book.coverImage || book.coverImageUrl ? (
            <img
              src={book.coverImage || book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="space-y-3 p-4">
              <BookOpen className="w-8 h-8 mx-auto text-[var(--color-brand)]" aria-hidden="true" />
              <div className="space-y-1">
                <p className="font-bangla-serif font-bold text-sm sm:text-base text-[var(--text-primary)] line-clamp-3">
                  {book.title}
                </p>
                <p className="font-bangla-sans text-xs text-[var(--text-muted)]">
                  {book.author}
                </p>
              </div>
            </div>
          )}

          {/* Availability Ribbon */}
          {book.availability && (
            <div className="absolute top-2.5 right-2.5">
              <span className="text-[10px] font-bangla-sans font-semibold px-2 py-0.5 rounded-full bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success-border)] shadow-2xs backdrop-blur-xs">
                মুদ্রিত কপি উপলব্ধ
              </span>
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="space-y-2 pt-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between text-[11px] font-bangla-sans text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--color-brand)]">{book.genre}</span>
            {book.publicationYear && <span>{book.publicationYear}</span>}
          </div>

          <div className="space-y-0.5">
            <h3
              id={`book-card-title-${book.id}`}
              className="font-bangla-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors tracking-tight leading-snug"
            >
              {book.title}
            </h3>

            {book.subtitle && (
              <p className="font-bangla-sans text-xs text-[var(--text-muted)] font-medium">
                {book.subtitle}
              </p>
            )}
          </div>

          {/* Pricing & Publisher Info */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 pt-1 text-xs font-bangla-sans">
            {book.price && (
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-[var(--text-primary)] text-sm">
                  ৳{book.price}
                </span>
                {book.originalPrice && (
                  <span className="line-through text-[var(--text-muted)] text-xs">
                    ৳{book.originalPrice}
                  </span>
                )}
              </div>
            )}
            {book.publisher && (
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                {book.publisher}
              </span>
            )}
          </div>

          {book.description && (
            <p className="type-bangla-excerpt text-[var(--text-secondary)] line-clamp-3 leading-[1.8] pt-1">
              {book.description}
            </p>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
        <Link
          to={detailPath}
          className="inline-flex items-center gap-1.5 text-xs font-bold font-bangla-sans text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors group-hover:translate-x-1 duration-150"
        >
          <span>বিস্তারিত ও সূচিপত্র</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        {book.purchaseUrl && (
          <a
            href={book.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bangla-sans font-semibold text-[var(--color-brand)] hover:underline transition-colors flex items-center gap-1"
          >
            <span>রকমারি</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
};
