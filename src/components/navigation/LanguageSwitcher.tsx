import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../lib/utils';

export interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  compact = false,
  className,
}) => {
  const { locale, setLocale, isBangla } = useTranslation();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        'inline-flex items-center p-0.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-xs font-medium',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={!isBangla}
        className={cn(
          'px-2 py-1 rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap',
          !isBangla
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs font-semibold'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('bn')}
        aria-pressed={isBangla}
        className={cn(
          'px-2 py-1 rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap',
          isBangla
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs font-semibold'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        )}
      >
        বাংলা
      </button>
      {!compact && (
        <Languages className="w-3.5 h-3.5 mx-1.5 text-[var(--text-muted)] pointer-events-none" aria-hidden="true" />
      )}
    </div>
  );
};
