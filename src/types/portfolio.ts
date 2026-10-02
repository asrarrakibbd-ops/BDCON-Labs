export type PortfolioCategory =
  | 'all'
  | 'product'
  | 'web-application'
  | 'mobile-application'
  | 'website'
  | 'custom-software'
  | 'experiment';

export type PortfolioPlatform = 'web' | 'android' | 'ios' | 'desktop';

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: 'product' | 'web-application' | 'mobile-application' | 'website' | 'custom-software' | 'experiment';
  projectType?: string;
  logo?: string;
  coverImage?: string;
  screenshots?: string[];
  technologies?: string[];
  platforms?: PortfolioPlatform[];
  featured?: boolean;
  clientName?: string;
  clientVisible?: boolean;
  year?: number;
  challenge?: string;
  solution?: string;
  outcome?: string;
  keyFeatures?: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  status?: 'live' | 'in-development' | 'archived';
  order?: number;
  displayOrder?: number;
  seo?: {
    title?: string;
    description?: string;
  };
}
