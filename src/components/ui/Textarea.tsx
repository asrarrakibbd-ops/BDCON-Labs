import React, { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  helperText,
  error,
  id,
  rows = 4,
  disabled,
  ...props
}, ref) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={cn(
          'w-full px-3 py-2 text-sm rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)] placeholder:text-[var(--text-muted)] transition-colors duration-150 resize-y',
          'focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--focus-ring)]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-surface-subtle)]',
          error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-border)]',
          className
        )}
        {...props}
      />
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

Textarea.displayName = 'Textarea';
