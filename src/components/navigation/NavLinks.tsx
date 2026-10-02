import React from 'react';
import { Link, useRouter } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../lib/utils';

export interface NavLinksProps {
  onItemClick?: () => void;
  vertical?: boolean;
  className?: string;
}

export const MAIN_NAV_ITEMS = [
  { key: 'products', path: '/products' },
  { key: 'services', path: '/services' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'about', path: '/about' },
  { key: 'blog', path: '/blog' },
  { key: 'rakibAsrar', path: '/rakib-asrar' },
  { key: 'contact', path: '/contact' },
] as const;

export const NavLinks: React.FC<NavLinksProps> = ({
  onItemClick,
  vertical = false,
  className,
}) => {
  const { t } = useTranslation();
  const { path } = useRouter();

  return (
    <nav
      className={cn(
        vertical
          ? 'flex flex-col space-y-1.5'
          : 'flex items-center gap-1 lg:gap-1.5',
        className
      )}
      aria-label="Main Navigation"
    >
      {MAIN_NAV_ITEMS.map((item) => {
        // Deep route active check (e.g. /products/sample-slug or /rakib-asrar/books)
        const isActive = path === item.path || path.startsWith(`${item.path}/`);
        const label = t(`nav.${item.key}`);

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={cn(
              'type-navigation whitespace-nowrap transition-all duration-150 relative select-none',
              vertical
                ? 'flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium min-h-[44px]'
                : 'px-3 py-1.5 rounded-md text-sm',
              isActive
                ? vertical
                  ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold border border-[var(--border-color)]'
                  : 'text-[var(--text-primary)] font-semibold bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] shadow-2xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]/70'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <span>{label}</span>
            {isActive && (
              <span
                className={cn(
                  'bg-[var(--color-brand)] rounded-full',
                  vertical ? 'w-1.5 h-1.5' : 'hidden'
                )}
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
