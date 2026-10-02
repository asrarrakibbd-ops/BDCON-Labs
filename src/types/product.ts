export type ProductPlatform = 'web' | 'android' | 'ios' | 'desktop';

export type ProductStatus = 'available' | 'coming_soon' | 'in_development';

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
}

export interface ProductScreenshot {
  id: string;
  url: string;
  title?: string;
  caption?: string;
}

export interface ProductFAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProductPricingPlan {
  id: string;
  name: string;
  price: string;
  period?: 'month' | 'year' | 'one-time';
  description?: string;
  features: string[];
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  shortDescription: string;
  description: string;
  category: string;
  platforms: ProductPlatform[];
  status: ProductStatus;
  featured: boolean;
  type?: string;
  platform?: ProductPlatform | string;
  logo?: string;
  logoUrl?: string;
  screenshotUrl?: string;
  websiteUrl?: string;
  liveUrl?: string;
  androidUrl?: string;
  playStoreUrl?: string;
  iosUrl?: string;
  features?: string[];
  detailedFeatures?: ProductFeature[];
  problem?: string;
  solution?: string;
  whoIsItFor?: string[];
  screenshots?: ProductScreenshot[];
  faqs?: ProductFAQItem[];
  pricingPlans?: ProductPricingPlan[];
  metaTitle?: string;
  metaDescription?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  order?: number;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}
