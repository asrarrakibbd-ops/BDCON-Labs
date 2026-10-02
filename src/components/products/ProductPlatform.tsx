import React from 'react';
import { Globe, Smartphone, Monitor, Apple } from 'lucide-react';
import { ProductPlatform as PlatformType } from '../../types/product';
import { cn } from '../../lib/utils';

export interface ProductPlatformProps {
  platforms: PlatformType[];
  className?: string;
  variant?: 'inline' | 'badges';
}

const PLATFORM_CONFIG: Record<
  PlatformType,
  { label: string; icon: React.FC<{ className?: string }> }
> = {
  web: { label: 'Web App', icon: Globe },
  android: { label: 'Android', icon: Smartphone },
  ios: { label: 'iOS', icon: Apple },
  desktop: { label: 'Desktop', icon: Monitor },
};

export const ProductPlatform: React.FC<ProductPlatformProps> = ({
  platforms,
  className,
  variant = 'inline',
}) => {
  if (!platforms || platforms.length === 0) return null;

  if (variant === 'badges') {
    return (
      <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
        {platforms.map((p) => {
          const item = PLATFORM_CONFIG[p];
          if (!item) return null;
          const Icon = item.icon;
          return (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]"
            >
              <Icon className="w-3 h-3 text-[var(--color-brand)]" aria-hidden="true" />
              <span>{item.label}</span>
            </span>
          );
        })}
      </div>
    );
  }

  // Minimal inline zero-pill layout with subtle separator middots
  return (
    <div
      className={cn(
        'inline-flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-secondary)]',
        className
      )}
      aria-label="Supported Platforms"
    >
      {platforms.map((p, idx) => {
        const item = PLATFORM_CONFIG[p];
        if (!item) return null;
        const Icon = item.icon;
        return (
          <React.Fragment key={p}>
            {idx > 0 && <span className="text-[var(--text-muted)] select-none">•</span>}
            <span className="inline-flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 text-[var(--color-brand)]" aria-hidden="true" />
              <span>{item.label}</span>
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};
