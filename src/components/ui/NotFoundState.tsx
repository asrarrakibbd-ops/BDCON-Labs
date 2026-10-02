import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from '../../hooks/useRouter';

export interface NotFoundStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  title,
  description,
  className,
}) => {
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const displayTitle = title || t('states.notFoundTitle');
  const displayDescription = description || t('states.notFoundDescription');

  return (
    <div
      role="region"
      aria-label="Not Found Notice"
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-16 text-center max-w-xl mx-auto',
        className
      )}
    >
      <div className="w-16 h-16 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)] mb-6">
        <Compass className="w-8 h-8" aria-hidden="true" />
      </div>
      <h2 className="type-h2 text-[var(--text-primary)] mb-2">
        {displayTitle}
      </h2>
      <p className="type-body text-[var(--text-secondary)] mb-8">
        {displayDescription}
      </p>
      <Button
        variant="primary"
        onClick={() => navigate('/')}
        leftIcon={<ArrowLeft className="w-4 h-4" />}
      >
        {t('common.backToHome')}
      </Button>
    </div>
  );
};
