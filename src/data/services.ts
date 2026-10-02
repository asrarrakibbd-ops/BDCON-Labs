import { Service, ServiceApproachStep } from '../types/service';

export const STANDARD_PROCESS_STEPS: ServiceApproachStep[] = [
  {
    stepNumber: 1,
    title: 'Understand',
    description: 'We first understand the problem, users, operational workflows, and business requirements.',
  },
  {
    stepNumber: 2,
    title: 'Plan',
    description: 'We define the technical scope, information hierarchy, data flow, and product structure.',
  },
  {
    stepNumber: 3,
    title: 'Design',
    description: 'We design the user experience and responsive interface with typographic clarity and precision.',
  },
  {
    stepNumber: 4,
    title: 'Build',
    description: 'We develop clean, type-safe frontend and backend functionality following modular standards.',
  },
  {
    stepNumber: 5,
    title: 'Test',
    description: 'We rigorously verify the product across relevant viewports, screen resolutions, and edge cases.',
  },
  {
    stepNumber: 6,
    title: 'Improve',
    description: 'We refine and iterate the solution based on real user feedback and practical operational needs.',
  },
];

export const WHY_US_PRINCIPLES = [
  {
    title: 'Product Thinking',
    description: 'We approach software as a unified product, not just a fragmented checklist of features.',
  },
  {
    title: 'Practical Solutions',
    description: 'We focus on solving the actual problem rather than adding unnecessary architectural complexity.',
  },
  {
    title: 'Clear Communication',
    description: 'Project requirements, scope boundaries, and development priorities remain transparent throughout.',
  },
  {
    title: 'Continuous Improvement',
    description: 'Digital solutions evolve and stay effective through steady testing, feedback, and iteration.',
  },
];

export const CORE_CAPABILITIES = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Vite', category: 'Build Engine' },
  { name: 'Tailwind CSS', category: 'Design Architecture' },
  { name: 'Supabase', category: 'Data & Backend' },
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-web-development',
    name: 'Website Development',
    slug: 'web-development',
    shortDescription: 'Modern, responsive websites designed for businesses, organizations, products and personal brands.',
    description: 'BDCON Labs engineers high-performance, responsive websites engineered with clean typography, fast load times, and intuitive information architecture. We build tailored web presence solutions that clearly communicate value and represent organizations with precision.',
    icon: 'globe',
    category: 'Web Presence',
    features: [
      'High-speed rendering & performance optimization',
      'Semantic structure with standard SEO best practices',
      'Mobile-first responsive layouts across all screen sizes',
      'Scalable content and modular component architecture',
      'Accessible, high-contrast UI elements',
    ],
    useCases: [
      'Business websites',
      'Corporate websites',
      'Landing pages',
      'Portfolio websites',
      'Content-driven websites',
      'E-commerce foundations',
    ],
    published: true,
    featured: true,
    metaTitle: 'Website Development Services — BDCON Labs',
    metaDescription: 'Modern, responsive website development for businesses, organizations, and digital products by BDCON Labs.',
    order: 1,
  },
  {
    id: 'srv-web-app-development',
    name: 'Web Application Development',
    slug: 'web-application-development',
    shortDescription: 'Functional web applications designed around specific workflows, users and business requirements.',
    description: 'We design and develop reactive web applications that streamline operational bottlenecks. From internal management tools to client-facing web portals, our engineering focuses on type safety, modular frontend architectures, and responsive data flows.',
    icon: 'layout-dashboard',
    category: 'Applications',
    features: [
      'Stateful reactivity with client-side cache management',
      'Custom dashboard layouts and analytical views',
      'Type-safe data interactions and schema validation',
      'Role-based user permissions and access control',
      'High-density data tables and filtering routines',
    ],
    useCases: [
      'Dashboards',
      'Management systems',
      'Customer portals',
      'Internal operational tools',
      'SaaS web products',
      'Workflow automation apps',
    ],
    published: true,
    featured: true,
    metaTitle: 'Web Application Development — BDCON Labs',
    metaDescription: 'Functional web applications designed around specific workflows, users, and business requirements by BDCON Labs.',
    order: 2,
  },
  {
    id: 'srv-mobile-app-development',
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    shortDescription: 'Mobile applications designed for practical user experiences and real-world use cases.',
    description: 'BDCON Labs builds focused mobile applications designed to perform reliably in daily real-world operations. We specialize in Android and cross-platform mobile solutions with efficient memory usage, offline-ready reliability, and clean interaction design.',
    icon: 'smartphone',
    category: 'Mobile',
    features: [
      'Efficient resource consumption and responsive performance',
      'Offline-ready local data caching and synchronization',
      'Ergonomic mobile-first touch interfaces',
      'Device hardware integration (camera, storage, geolocation)',
      'Structured application release and update pipelines',
    ],
    useCases: [
      'Android applications',
      'Cross-platform applications',
      'Utility applications',
      'Business mobile tools',
      'Field calculation apps',
    ],
    published: true,
    featured: true,
    metaTitle: 'Mobile App Development — BDCON Labs',
    metaDescription: 'Practical mobile applications designed for real-world user workflows and Android systems by BDCON Labs.',
    order: 3,
  },
  {
    id: 'srv-custom-software',
    name: 'Custom Software',
    slug: 'custom-software',
    shortDescription: 'Software built around the unique processes, requirements and challenges of an organization.',
    description: "Off-the-shelf software often forces businesses to compromise their natural workflows. BDCON Labs architects custom software tools purpose-built to fit your organization's exact calculation logic, automation routines, and data management pipelines.",
    icon: 'code',
    category: 'Custom Systems',
    features: [
      'Custom business logic and calculation engines',
      'Automated data processing and repetitive task reduction',
      'Third-party system integrations via structured APIs',
      'Tailored administrative panels and operational control',
      'Clean codebase engineered for long-term maintainability',
    ],
    useCases: [
      'Management systems',
      'Workflow automation',
      'Industry-specific tools',
      'Data-driven applications',
      'Internal business software',
    ],
    published: true,
    featured: true,
    metaTitle: 'Custom Software Development — BDCON Labs',
    metaDescription: 'Bespoke software engineered around your unique business processes and domain requirements by BDCON Labs.',
    order: 4,
  },
  {
    id: 'srv-ui-ux',
    name: 'UI/UX Design',
    slug: 'ui-ux',
    shortDescription: 'Clear, responsive interfaces designed to make digital products easier to understand and use.',
    description: 'We craft cohesive design systems and user interfaces that prioritize clarity over superficial decoration. Our design methodology is rooted in information hierarchy, typographic balance, spatial math, and intuitive user ergonomics.',
    icon: 'palette',
    category: 'Interface Design',
    features: [
      'Scalable design token architecture (color, typography, space)',
      'Reusable component specifications and states',
      'Responsive spatial math across mobile and desktop',
      'High-contrast accessible color combinations (WCAG AA)',
      'Predictable interaction states (hover, active, focus, disabled)',
    ],
    useCases: [
      'Information architecture',
      'Responsive web layouts',
      'Data-dense dashboards',
      'Mobile interfaces',
      'Product design systems',
    ],
    published: true,
    featured: true,
    metaTitle: 'UI/UX Design Services — BDCON Labs',
    metaDescription: 'Clear, responsive interfaces and structured design systems crafted for software products by BDCON Labs.',
    order: 5,
  },
  {
    id: 'srv-software-consultation',
    name: 'Software Consultation',
    slug: 'software-consultation',
    shortDescription: 'Practical guidance for turning a software idea, manual workflow or business requirement into a clear digital solution.',
    description: 'Before writing code, technical clarity is essential. BDCON Labs works alongside founders, executives, and department leads to evaluate technical feasibility, define minimal viable scopes, and architect sustainable development roadmaps.',
    icon: 'message-square',
    category: 'Consulting & Strategy',
    features: [
      'Technical feasibility and operational complexity analysis',
      'Requirement scoping and pragmatic MVP definition',
      'System architecture blueprinting and data modeling',
      'Technology stack evaluation and selection',
      'Phased implementation timelines and risk mitigation',
    ],
    useCases: [
      'Product planning',
      'Feature planning',
      'Technical architecture',
      'Workflow digitization',
      'MVP planning & scoping',
    ],
    published: true,
    featured: true,
    metaTitle: 'Software Consultation — BDCON Labs',
    metaDescription: 'Pragmatic technical guidance and architecture consultation for software products by BDCON Labs.',
    order: 6,
  },
];

import { getServicesService, getServiceBySlugService } from '../lib/supabase/services/services';

export async function getServices(): Promise<Service[]> {
  return getServicesService();
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return getServiceBySlugService(slug);
}
