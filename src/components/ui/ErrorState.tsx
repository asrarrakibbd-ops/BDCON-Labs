import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { useTranslation } from '../../hooks/useTranslation';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  onRetry,
  className,
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('states.errorTitle');
  const displayDescription = description || t('states.errorDescription');

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] text-[var(--text-primary)]',
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-[var(--bg-surface)] border border-[var(--color-error-border)] flex items-center justify-center text-[var(--color-error)] mb-4">
        <AlertTriangle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="type-h4 text-[var(--text-primary)] mb-1">
        {displayTitle}
      </h3>
      <p className="type-body-small text-[var(--text-secondary)] max-w-md mb-6">
        {displayDescription}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          {t('common.retry')}
        </Button>
      )}
    </div>
  );
};
