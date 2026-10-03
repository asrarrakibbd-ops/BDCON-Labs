import { RouteConfig } from '../types/navigation';

export const ALL_ROUTES: RouteConfig[] = [
  // Public core routes
  {
    path: '/',
    name: 'Foundation & Overview',
    category: 'public',
    description: 'Stage 1 architecture status, design system tokens, typography, and foundational components.',
  },
  {
    path: '/products',
    name: 'Software Products',
    category: 'public',
    description: 'Catalog of proprietary software products and digital tools built by BDCON Labs.',
  },
  {
    path: '/products/:slug',
    name: 'Product Details',
    category: 'public',
    description: 'Comprehensive product architecture, features, release notes, and documentation.',
    isParametric: true,
  },
  {
    path: '/services',
    name: 'Client Services',
    category: 'public',
    description: 'High-leverage engineering, architecture consulting, and product development services.',
  },
  {
    path: '/services/:slug',
    name: 'Service Details',
    category: 'public',
    description: 'Detailed service scope, deliverables, technical process, and engagement model.',
    isParametric: true,
  },
  {
    path: '/engineering',
    name: 'BDCON Engineering Ltd',
    category: 'public',
    description: 'Civil engineering consultancy, building design, drawings, estimation, and construction advisory.',
  },
  {
    path: '/engineering/services',
    name: 'Engineering Services',
    category: 'public',
    description: 'Catalog of civil engineering, building design, technical drawing, estimation and construction services.',
  },
  {
    path: '/engineering/services/:slug',
    name: 'Engineering Service Details',
    category: 'public',
    description: 'Specific engineering service scope, deliverables, and project workflow.',
    isParametric: true,
  },
  {
    path: '/engineering/projects',
    name: 'Engineering Projects',
    category: 'public',
    description: 'Selected civil engineering, structural design, and construction consultancy projects.',
  },
  {
    path: '/engineering/projects/:slug',
    name: 'Engineering Project Details',
    category: 'public',
    description: 'Detailed civil engineering case study, drawing sheets, and project deliverables.',
    isParametric: true,
  },
  {
    path: '/engineering/contact',
    name: 'Engineering Inquiry & Contact',
    category: 'public',
    description: 'Direct inquiry and project intake channel for civil engineering, design, and estimation consultancy.',
  },
  {
    path: '/portfolio',
    name: 'Client Portfolio',
    category: 'public',
    description: 'Case studies of software systems and client outcomes built by BDCON Labs.',
  },
  {
    path: '/about',
    name: 'About BDCON Labs',
    category: 'public',
    description: 'Company mission, engineering philosophy, founders, and core principles.',
  },
  {
    path: '/blog',
    name: 'Insights & Blog',
    category: 'public',
    description: 'Technical articles, architectural deep-dives, and digital product essays.',
  },
  {
    path: '/blog/:slug',
    name: 'Blog Post',
    category: 'public',
    description: 'Single article reading view with editorial layout.',
    isParametric: true,
  },
  {
    path: '/contact',
    name: 'Contact',
    category: 'public',
    description: 'Direct inquiry channel and communications dispatch.',
  },
  {
    path: '/start-project',
    name: 'Start a Project',
    category: 'public',
    description: 'Project request intake flow for prospective clients and partners.',
  },

  // Rakib Asrar author & personal brand routes
  {
    path: '/rakib-asrar',
    name: 'Rakib Asrar (Hub)',
    category: 'author',
    description: 'Author overview, published works, key ideas, and personal brand hub.',
  },
  {
    path: '/rakib-asrar/about',
    name: 'Rakib Asrar — About',
    category: 'author',
    description: 'Biography, background, and intellectual interests of Rakib Asrar.',
  },
  {
    path: '/rakib-asrar/books',
    name: 'Rakib Asrar — Books',
    category: 'author',
    description: 'Published books, upcoming manuscripts, and reader purchase options.',
  },
  {
    path: '/rakib-asrar/books/:slug',
    name: 'Book Detail View',
    category: 'author',
    description: 'Individual book synopsis, table of contents, excerpts, and editions.',
    isParametric: true,
  },
  {
    path: '/rakib-asrar/writing',
    name: 'Rakib Asrar — Writing',
    category: 'author',
    description: 'Selected essays, newsletters, and long-form written pieces.',
  },
  {
    path: '/rakib-asrar/writing/:slug',
    name: 'Essay / Writing Detail View',
    category: 'author',
    description: 'Long-form editorial reading view with responsive typography and sizing.',
    isParametric: true,
  },

  // Future Admin Routes (Reserved Architecture)
  {
    path: '/admin',
    name: 'Admin Dashboard',
    category: 'admin',
    description: 'Operational overview, analytics status, and management center.',
  },
  {
    path: '/admin/products',
    name: 'Admin — Products',
    category: 'admin',
    description: 'Product catalog management, versions, releases, and documentation.',
  },
  {
    path: '/admin/services',
    name: 'Admin — Services',
    category: 'admin',
    description: 'Service package configuration, pricing, and process definitions.',
  },
  {
    path: '/admin/portfolio',
    name: 'Admin — Portfolio',
    category: 'admin',
    description: 'Case study authoring, metric updates, and client showcase management.',
  },
  {
    path: '/admin/blog',
    name: 'Admin — Blog CMS',
    category: 'admin',
    description: 'Editorial article management, drafts, publishing, and taxonomy.',
  },
  {
    path: '/admin/books',
    name: 'Admin — Books',
    category: 'admin',
    description: 'Book catalog management, edition tracking, and links.',
  },
  {
    path: '/admin/project-requests',
    name: 'Admin — Project Requests',
    category: 'admin',
    description: 'Inbound client leads, project proposals, and status pipeline.',
  },
  {
    path: '/admin/messages',
    name: 'Admin — Messages',
    category: 'admin',
    description: 'Inbound contact inquiries and communication history.',
  },
  {
    path: '/admin/settings',
    name: 'Admin — Settings',
    category: 'admin',
    description: 'Global site configuration, feature flags, and administrative controls.',
  },
];
