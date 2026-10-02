import React, { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { useTranslation } from '../../hooks/useTranslation';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('states.emptyTitle');
  const displayDescription = description || t('states.emptyDescription');

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface-subtle)]',
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] mb-4 shadow-2xs">
        {icon || <Inbox className="w-6 h-6" aria-hidden="true" />}
      </div>
      <h3 className="type-h4 text-[var(--text-primary)] mb-1">
        {displayTitle}
      </h3>
      <p className="type-body-small text-[var(--text-muted)] max-w-md mb-6">
        {displayDescription}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
