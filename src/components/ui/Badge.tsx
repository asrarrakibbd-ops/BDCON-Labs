import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    neutral: 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]',
    brand: 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand-muted)]',
    success: 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success-border)]',
    warning: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)] border border-[var(--color-warning-border)]',
    error: 'bg-[var(--color-error-subtle)] text-[var(--color-error)] border border-[var(--color-error-border)]',
  };

  const sizeStyles = size === 'sm' 
    ? 'px-2 py-0.5 text-[11px] leading-tight' 
    : 'px-2.5 py-1 text-xs leading-none';

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-md tracking-tight whitespace-nowrap',
        sizeStyles,
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

/**
 * Follows the Zero-Pill Constitution: clean unboxed metadata with typographic separators
 */
export interface UnboxedMetaProps extends HTMLAttributes<HTMLDivElement> {
  items: (string | React.ReactNode)[];
  separator?: string;
}

export const UnboxedMeta: React.FC<UnboxedMetaProps> = ({
  items,
  separator = '·',
  className,
  ...props
}) => {
  const validItems = items.filter(Boolean);
  if (validItems.length === 0) return null;

  return (
    <div
      className={cn('flex flex-wrap items-center gap-2 type-caption text-[var(--text-muted)]', className)}
      {...props}
    >
      {validItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span aria-hidden="true" className="opacity-40">{separator}</span>}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
};
