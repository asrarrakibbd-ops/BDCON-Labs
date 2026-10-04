import React from 'react';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';

export interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className, 
  showTagline = false,
  onClick 
}) => {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-lg py-1',
        className
      )}
      aria-label="BDCON Labs Homepage"
    >
      {/* BDCON Navy Wordmark — Transparent Asset */}
      <img
        src="/images/brand/bdcon-logo.svg"
        alt="BDCON"
        width={134}
        height={30}
        className="h-6 sm:h-7 w-auto object-contain select-none dark:brightness-[3.2] dark:contrast-125 transition-all"
        loading="eager"
        decoding="sync"
      />
      {showTagline && (
        <span className="sr-only">BDCON Labs — Software &amp; Digital Products</span>
      )}
    </Link>
  );
};
