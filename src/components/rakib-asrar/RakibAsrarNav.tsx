import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { Link, useRouter } from '../../lib/router';
import { cn } from '../../lib/utils';

export const RakibAsrarNav: React.FC = () => {
  const { path } = useRouter();

  const navLinks = [
    { label: 'হোম', path: '/rakib-asrar', exact: true },
    { label: 'পরিচিতি', path: '/rakib-asrar/about' },
    { label: 'বইসমূহ', path: '/rakib-asrar/books' },
    { label: 'লেখালেখি', path: '/rakib-asrar/writing' },
  ];

  return (
    <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] transition-colors select-none sticky top-16 z-30 backdrop-blur-md">
      <Container size="2xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-2.5">
          {/* Brand Monogram & Title */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <Link
              to="/rakib-asrar"
              className="inline-flex items-center gap-2.5 text-[var(--text-primary)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-lg p-0.5"
              aria-label="রাকিব আসরার প্রধান পাতা"
            >
              <div className="w-7 h-7 rounded-md bg-[var(--text-primary)] text-[var(--bg-surface)] flex items-center justify-center font-serif font-bold text-xs shadow-2xs">
                RA
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-sm tracking-tight text-[var(--text-primary)]">
                  রাকিব আসরার
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                  Rakib Asrar · Creator
                </span>
              </div>
            </Link>

            {/* Back to BDCON Labs (Quick Parent Link) */}
            <Link
              to="/"
              className="sm:hidden inline-flex items-center gap-1 text-[11px] font-mono text-[var(--color-brand)] hover:underline p-1 min-h-[36px]"
              aria-label="Return to BDCON Labs Main Site"
            >
              <span>BDCON Labs</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Nav Items */}
          <nav
            aria-label="Rakib Asrar Author Subnavigation"
            className="flex items-center justify-between sm:justify-end gap-1 overflow-x-auto no-scrollbar py-0.5"
          >
            <div className="flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = item.exact
                  ? path === item.path
                  : path === item.path || path.startsWith(`${item.path}/`);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] inline-flex items-center',
                      isActive
                        ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold border border-[var(--border-color)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Return Bridge */}
            <div className="hidden sm:flex items-center pl-3 ml-2 border-l border-[var(--border-color)]">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors p-1"
                title="Return to BDCON Labs"
                aria-label="Return to BDCON Labs Main Site"
              >
                <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                <span>BDCON Labs</span>
              </Link>
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
};
