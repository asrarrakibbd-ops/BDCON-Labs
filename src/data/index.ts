/**
 * BDCON Labs Data Layer Architecture
 * 
 * Provides an abstracted repository contract so future stages can switch
 * from local development configuration to Supabase / remote databases
 * without altering UI components.
 */

import { Product } from '../types/product';
import { Service } from '../types/service';
import { PortfolioProject } from '../types/portfolio';
import { BlogPost } from '../types/blog';
import { Book } from '../types/book';
import { ProjectRequest } from '../types/projectRequest';
import { ContactMessage } from '../types/contact';
import { SiteSettings } from '../types/settings';
import { PRODUCTS_DATA, getProducts, getProductBySlug } from './products';
import { SERVICES_DATA, getServices, getServiceBySlug } from './services';
import { PORTFOLIO_PROJECTS, getPortfolioProjects, getPortfolioProjectBySlug } from './portfolio';
import { COMPANY_CONTACT_INFO, getContactInfo, submitContactMessage } from './contact';
import { BOOKS_DATA, getBooks, getBookBySlug } from './books';
import { WRITING_DATA, getWritingEntries, getWritingBySlug } from './writing';

export * from './products';
export * from './services';
export * from './portfolio';
export * from './contact';
export * from './books';
export * from './writing';
export * from './author';

export const SITE_SETTINGS: SiteSettings = {
  companyName: 'BDCON Labs',
  tagline: 'Software & Digital Products',
  coreMessage: 'We build software that solves real problems.',
  defaultLocale: 'en',
  defaultTheme: 'system',
  contactEmailPlaceholder: 'contact@bdconlabs.com',
  copyrightYear: 2026,
};

export interface DataRepository {
  products: {
    getAll: () => Promise<Product[]>;
    getBySlug: (slug: string) => Promise<Product | null>;
  };
  services: {
    getAll: () => Promise<Service[]>;
    getBySlug: (slug: string) => Promise<Service | null>;
  };
  portfolio: {
    getAll: () => Promise<PortfolioProject[]>;
    getBySlug: (slug: string) => Promise<PortfolioProject | null>;
  };
  blog: {
    getAll: () => Promise<BlogPost[]>;
    getBySlug: (slug: string) => Promise<BlogPost | null>;
  };
  books: {
    getAll: () => Promise<Book[]>;
    getBySlug: (slug: string) => Promise<Book | null>;
  };
  projectRequests: {
    submit: (req: Omit<ProjectRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<boolean>;
  };
  contact: {
    submit: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<boolean>;
  };
}

export const repository: DataRepository = {
  products: {
    getAll: getProducts,
    getBySlug: getProductBySlug,
  },
  services: {
    getAll: getServices,
    getBySlug: getServiceBySlug,
  },
  portfolio: {
    getAll: getPortfolioProjects,
    getBySlug: getPortfolioProjectBySlug,
  },
  blog: {
    getAll: async () => [],
    getBySlug: async () => null,
  },
  books: {
    getAll: getBooks,
    getBySlug: getBookBySlug,
  },
  projectRequests: {
    submit: async () => true,
  },
  contact: {
    submit: async (msg) => {
      const res = await submitContactMessage(msg);
      return res.success;
    },
  },
};
