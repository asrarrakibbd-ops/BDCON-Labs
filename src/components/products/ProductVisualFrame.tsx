import React from 'react';
import { Product } from '../../types/product';
import { ProjectShowcaseVisual } from '../common/ProjectShowcaseVisual';

export interface ProductVisualFrameProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductVisualFrame: React.FC<ProductVisualFrameProps> = ({
  product,
  className,
  size = 'md',
}) => {
  return (
    <ProjectShowcaseVisual
      slug={product.slug}
      title={product.name}
      subtitle={product.tagline}
      category={product.category}
      technologies={product.platforms}
      size={size}
      className={className}
    />
  );
};
