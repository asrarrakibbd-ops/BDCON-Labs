import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  clean?: boolean; // If true, removes horizontal padding
}

export const Container: React.FC<ContainerProps> = ({
  size = '2xl',
  clean = false,
  className,
  children,
  ...props
}) => {
  const sizeStyles: Record<ContainerSize, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-[1400px]',
    full: 'max-w-full',
  };

  const paddingStyles = clean ? '' : 'px-4 sm:px-6 lg:px-8';

  return (
    <div
      className={cn('w-full mx-auto', sizeStyles[size], paddingStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};
