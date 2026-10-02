import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ButtonVariant, ButtonSize } from './Button';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  'aria-label': string; // Required for accessibility
  children: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  className,
  variant = 'ghost',
  size = 'md',
  'aria-label': ariaLabel,
  disabled,
  children,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer active:scale-95';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-11.5 h-11.5 text-base',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] focus-visible:ring-[var(--color-brand)] shadow-xs',
    secondary: 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] hover:bg-[var(--border-color)] border border-[var(--border-color)]',
    outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-surface-subtle)] hover:border-[var(--border-strong)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]',
    icon: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] border border-transparent hover:border-[var(--border-color)]',
    danger: 'bg-[var(--color-error)] text-white hover:opacity-90',
    destructive: 'bg-[var(--color-error)] text-white hover:opacity-90',
  };

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';
