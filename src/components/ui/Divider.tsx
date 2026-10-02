import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  label,
  orientation = 'horizontal',
  className,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block h-full w-[1px] bg-[var(--border-color)] self-stretch', className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn('relative flex items-center my-6', className)}
        {...props}
      >
        <div className="flex-grow border-t border-[var(--border-color)]" />
        <span className="flex-shrink mx-4 type-caption text-[var(--text-muted)] font-medium">
          {label}
        </span>
        <div className="flex-grow border-t border-[var(--border-color)]" />
      </div>
    );
  }

  return (
    <hr
      className={cn('w-full border-0 border-t border-[var(--border-color)] my-4', className)}
      {...props}
    />
  );
};
