import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from '../../hooks/useTranslation';
import { ThemeMode } from '../../types/settings';
import { cn } from '../../lib/utils';

export interface ThemeToggleProps {
  variant?: 'segmented' | 'simple';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'simple',
  className,
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  if (variant === 'simple') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t('theme.toggleLabel')}
        className={cn(
          'inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] transition-colors cursor-pointer',
          className
        )}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 text-sky-400" aria-hidden="true" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" aria-hidden="true" />
        )}
      </button>
    );
  }

  // 3-way segmented control: Light, Dark, System
  const options: { mode: ThemeMode; icon: typeof Sun; labelKey: string }[] = [
    { mode: 'light', icon: Sun, labelKey: 'theme.light' },
    { mode: 'dark', icon: Moon, labelKey: 'theme.dark' },
    { mode: 'system', icon: Monitor, labelKey: 'theme.system' },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Color scheme selector"
      className={cn(
        'inline-flex items-center p-0.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]',
        className
      )}
    >
      {options.map(({ mode, icon: Icon, labelKey }) => {
        const isActive = theme === mode;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(mode)}
            title={t(labelKey)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap',
              isActive
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            )}
          >
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t(labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
};
