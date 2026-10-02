import React from 'react';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';

export interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className, showTagline = false }) => {
  return (
    <Link
      to="/"
      className={cn(
        'group inline-flex items-center gap-3 text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-lg p-1',
        className
      )}
      aria-label="BDCON Labs Homepage"
    >
      {/* Precision Geometric Software Mark */}
      <div className="relative w-8 h-8 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] flex items-center justify-center shadow-xs overflow-hidden shrink-0 group-hover:border-[var(--color-brand)] transition-colors">
        {/* Subtle internal gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/20 via-transparent to-transparent opacity-80" />
        
        {/* Vector Emblem: Layered Software / CAD Geometric Nodes */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4.5 h-4.5 text-[var(--color-brand)] relative z-10 transition-transform duration-200 group-hover:scale-105"
          aria-hidden="true"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col select-none">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-extrabold tracking-tight text-base sm:text-[17px] text-[var(--text-primary)]">
            BDCON
          </span>
          <span className="font-mono text-xs font-bold text-[var(--color-brand)] tracking-wider">
            LABS
          </span>
        </div>
        {showTagline && (
          <span className="type-caption text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase mt-1">
            Software &amp; Digital Products
          </span>
        )}
      </div>
    </Link>
  );
};
