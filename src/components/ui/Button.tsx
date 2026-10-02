import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'danger' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: 'button' | 'span';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  type = 'button',
  as = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium type-button transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98] cursor-pointer tracking-tight';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-8.5 px-3 text-xs gap-1.5 min-w-[34px]',
    md: 'h-10 px-4 text-sm gap-2 min-w-[40px]',
    lg: 'h-11.5 px-5.5 text-base gap-2.5 min-w-[46px]',
  };

  const isDestructive = variant === 'danger' || variant === 'destructive';

  const variantStyles: Record<string, string> = {
    primary: 'bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] focus-visible:ring-[var(--color-brand)] shadow-xs hover:shadow-sm hover:shadow-[var(--color-brand-glow)] border border-transparent font-semibold',
    secondary: 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] hover:bg-[var(--border-color)] border border-[var(--border-color)] focus-visible:ring-[var(--border-strong)] font-medium',
    outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-surface-subtle)] hover:border-[var(--border-strong)] focus-visible:ring-[var(--color-brand)] font-medium',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] focus-visible:ring-[var(--border-strong)] font-medium',
    icon: 'p-2 bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] border border-transparent hover:border-[var(--border-color)] rounded-lg',
    danger: 'bg-[var(--color-error)] text-white hover:opacity-90 focus-visible:ring-[var(--color-error)] shadow-xs font-semibold',
    destructive: 'bg-[var(--color-error)] text-white hover:opacity-90 focus-visible:ring-[var(--color-error)] shadow-xs font-semibold',
  };

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children && <span className="inline-block">{children}</span>}
      {!isLoading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  if (as === 'span') {
    return (
      <span
        className={cn(baseStyles, sizeStyles[size], variantStyles[isDestructive ? 'destructive' : variant], className)}
      >
        {content}
      </span>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, sizeStyles[size], variantStyles[isDestructive ? 'destructive' : variant], className)}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
