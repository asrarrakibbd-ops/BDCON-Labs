import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { Container, ContainerSize } from '../layout/Container';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  surface?: 'canvas' | 'surface' | 'subtle';
  borderTop?: boolean;
  borderBottom?: boolean;
  containerSize?: ContainerSize;
  containerClean?: boolean;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  spacing = 'md',
  surface = 'canvas',
  borderTop = false,
  borderBottom = false,
  containerSize,
  containerClean = false,
  containerClassName,
  className,
  children,
  ...props
}) => {
  const spacingStyles: Record<SectionSpacing, string> = {
    none: 'py-0',
    sm: 'py-8 sm:py-10 md:py-12',
    md: 'py-12 sm:py-16 md:py-20',
    lg: 'py-16 sm:py-20 md:py-28',
    xl: 'py-20 sm:py-28 md:py-36',
  };

  const surfaceStyles: Record<string, string> = {
    canvas: 'bg-[var(--bg-canvas)]',
    surface: 'bg-[var(--bg-surface)]',
    subtle: 'bg-[var(--bg-surface-subtle)]',
  };

  const content = containerSize ? (
    <Container size={containerSize} clean={containerClean} className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <section
      className={cn(
        'w-full relative transition-colors',
        spacingStyles[spacing],
        surfaceStyles[surface],
        borderTop && 'border-t border-[var(--border-color)]',
        borderBottom && 'border-b border-[var(--border-color)]',
        className
      )}
      {...props}
    >
      {content}
    </section>
  );
};
