import React from 'react';
import { PortfolioCategory } from '../../types/portfolio';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/useTranslation';

export interface PortfolioFilterProps {
  activeCategory: PortfolioCategory;
  onSelectCategory: (cat: PortfolioCategory) => void;
  className?: string;
}

interface FilterOption {
  key: PortfolioCategory;
  labelEn: string;
  labelBn: string;
}

const CATEGORY_OPTIONS: FilterOption[] = [
  { key: 'all', labelEn: 'All Work', labelBn: 'সব প্রজেক্ট' },
  { key: 'product', labelEn: 'Products', labelBn: 'প্রোডাক্টস' },
  { key: 'web-application', labelEn: 'Web Applications', labelBn: 'ওয়েব অ্যাপ্লিকেশন' },
  { key: 'mobile-application', labelEn: 'Mobile Apps', labelBn: 'মোবাইল অ্যাপ' },
  { key: 'custom-software', labelEn: 'Custom Software', labelBn: 'কাস্টম সফটওয়্যার' },
  { key: 'website', labelEn: 'Websites', labelBn: 'ওয়েবসাইট' },
  { key: 'experiment', labelEn: 'Experiments', labelBn: 'গবেষণা ও এক্সপেরিমেন্ট' },
];

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  activeCategory,
  onSelectCategory,
  className,
}) => {
  const { isBangla } = useTranslation();

  return (
    <nav
      aria-label="Filter portfolio by category"
      className={cn(
        'w-full flex items-center overflow-x-auto no-scrollbar py-1 gap-1.5 sm:gap-2',
        className
      )}
    >
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs">
        {CATEGORY_OPTIONS.map((opt) => {
          const isActive = activeCategory === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectCategory(opt.key)}
              aria-pressed={isActive}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer select-none',
                isActive
                  ? 'bg-[var(--color-brand)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]'
              )}
            >
              {isBangla ? opt.labelBn : opt.labelEn}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
