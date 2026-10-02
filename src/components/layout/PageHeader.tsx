import React, { ReactNode } from 'react';
import { Container } from './Container';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export interface PageHeaderProps {
  eyebrow?: string;
  badge?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  cta?: ReactNode;
  align?: 'left' | 'center';
  borderBottom?: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  badge,
  title,
  description,
  cta,
  align = 'left',
  borderBottom = true,
  className,
}) => {
  const isCentered = align === 'center';

  return (
    <header
      className={cn(
        'w-full py-10 sm:py-14 lg:py-16 bg-[var(--bg-canvas)] transition-colors',
        borderBottom && 'border-b border-[var(--border-color)]',
        className
      )}
    >
      <Container size="2xl">
        <div
          className={cn(
            'flex flex-col gap-4',
            isCentered ? 'items-center text-center max-w-3xl mx-auto' : 'max-w-4xl'
          )}
        >
          {/* Eyebrow / Category Badge */}
          {(eyebrow || badge) && (
            <div className={cn('flex items-center gap-2.5', isCentered && 'justify-center')}>
              {badge ? (
                <Badge variant="brand" size="sm">
                  {badge}
                </Badge>
              ) : null}
              {eyebrow ? (
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
                  {eyebrow}
                </span>
              ) : null}
            </div>
          )}

          {/* Title */}
          <div className="space-y-3">
            {typeof title === 'string' ? (
              <h1 className="type-h1 text-[var(--text-primary)] font-bold tracking-tight text-balance">
                {title}
              </h1>
            ) : (
              title
            )}

            {/* Description */}
            {description && (
              <div className="type-body-large text-[var(--text-secondary)] leading-relaxed max-w-3xl text-balance">
                {description}
              </div>
            )}
          </div>

          {/* Optional Action CTA */}
          {cta && (
            <div className={cn('pt-2 flex flex-wrap items-center gap-3', isCentered && 'justify-center')}>
              {cta}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
