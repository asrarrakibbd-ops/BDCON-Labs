import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/useTranslation';

export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  size = 'md',
  fullHeight = false,
  className,
}) => {
  const { t } = useTranslation();
  const displayMessage = message || t('common.loading');

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        fullHeight ? 'min-h-[360px]' : 'py-12',
        className
      )}
    >
      <Loader2
        className={cn('animate-spin text-[var(--color-brand)] mb-3', sizeClasses[size])}
        aria-hidden="true"
      />
      <p className="type-body-small text-[var(--text-secondary)] font-medium">
        {displayMessage}
      </p>
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
};
