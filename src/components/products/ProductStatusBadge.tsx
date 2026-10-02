import React from 'react';
import { ProductStatus } from '../../types/product';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/useTranslation';

export interface ProductStatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  ProductStatus,
  { labelEn: string; labelBn: string; dotClass: string; badgeClass: string }
> = {
  available: {
    labelEn: 'Available',
    labelBn: 'ব্যবহারযোগ্য',
    dotClass: 'bg-[var(--color-success)]',
    badgeClass: 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success-border)]',
  },
  coming_soon: {
    labelEn: 'Coming Soon',
    labelBn: 'শীঘ্রই আসছে',
    dotClass: 'bg-[var(--color-brand)]',
    badgeClass: 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border-[var(--color-brand-muted)]',
  },
  in_development: {
    labelEn: 'In Development',
    labelBn: 'উন্নয়ন চলছে',
    dotClass: 'bg-[var(--color-warning)]',
    badgeClass: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)] border-[var(--color-warning-border)]',
  },
};

export const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({
  status,
  className,
}) => {
  const { isBangla } = useTranslation();
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.in_development;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        isBangla ? 'font-bangla-sans' : 'font-mono',
        config.badgeClass,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', config.dotClass)} aria-hidden="true" />
      <span>{isBangla ? config.labelBn : config.labelEn}</span>
    </span>
  );
};
