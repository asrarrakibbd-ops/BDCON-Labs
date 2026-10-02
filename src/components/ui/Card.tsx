import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type CardVariant = 'standard' | 'elevated' | 'interactive' | 'dark' | 'highlight';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  elevated?: boolean;
  hoverable?: boolean;
  padded?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'standard',
  elevated = false,
  hoverable = false,
  padded = true,
  children,
  ...props
}, ref) => {
  const isInteractive = hoverable || variant === 'interactive';
  const isElevated = elevated || variant === 'elevated';

  const variantClasses: Record<CardVariant, string> = {
    standard: 'bg-[var(--bg-surface)] border-[var(--border-color)]',
    elevated: 'bg-[var(--bg-surface-elevated)] border-[var(--border-color)] shadow-xs',
    interactive: 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--color-brand)]/50 hover:shadow-xs transition-all duration-200 cursor-pointer',
    dark: 'bg-[var(--bg-surface-subtle)] border-[var(--border-color)] text-[var(--text-primary)]',
    highlight: 'bg-[var(--bg-surface)] border-[var(--color-brand-muted)] shadow-xs relative overflow-hidden',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border text-[var(--text-primary)] transition-all duration-200',
        variantClasses[variant],
        isElevated && 'shadow-xs',
        isInteractive && 'hover:border-[var(--border-strong)]',
        padded && 'p-5 sm:p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex flex-col gap-1.5 pb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn('type-h4 text-[var(--text-primary)] font-bold tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn('type-body-small text-[var(--text-secondary)] leading-relaxed', className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('space-y-4', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex items-center justify-between pt-4 mt-4 border-t border-[var(--border-color)]', className)} {...props}>
    {children}
  </div>
);
