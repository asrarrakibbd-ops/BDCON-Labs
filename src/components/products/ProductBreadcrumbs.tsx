import React from 'react';
import { Breadcrumbs } from '../navigation/Breadcrumbs';

export interface ProductBreadcrumbsProps {
  productName: string;
  className?: string;
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({
  productName,
  className,
}) => {
  return (
    <Breadcrumbs
      variant="inline"
      currentTitle={productName}
      className={className}
      showBack={true}
      backHref="/products"
    />
  );
};
