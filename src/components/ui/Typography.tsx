import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Display: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h1 className={cn('type-display', className)} {...props}>{children}</h1>
);

export const H1: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h1 className={cn('type-h1', className)} {...props}>{children}</h1>
);

export const H2: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h2 className={cn('type-h2', className)} {...props}>{children}</h2>
);

export const H3: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={cn('type-h3', className)} {...props}>{children}</h3>
);

export const H4: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h4 className={cn('type-h4', className)} {...props}>{children}</h4>
);

export const TextLarge: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('type-body-large', className)} {...props}>{children}</p>
);

export const Text: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('type-body', className)} {...props}>{children}</p>
);

export const TextSmall: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('type-body-small', className)} {...props}>{children}</p>
);

export const Caption: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ className, children, ...props }) => (
  <span className={cn('type-caption', className)} {...props}>{children}</span>
);
