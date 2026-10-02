import React, { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  id,
  disabled,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-[var(--text-muted)]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full h-10 px-3 py-2 text-sm rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)] placeholder:text-[var(--text-muted)] transition-colors duration-150',
            'focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--focus-ring)]',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-surface-subtle)]',
            Boolean(leftIcon) && 'pl-10',
            Boolean(rightIcon) && 'pr-10',
            Boolean(error) && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-border)]',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center text-[var(--text-muted)]">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-[var(--color-error)] font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-[var(--text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
