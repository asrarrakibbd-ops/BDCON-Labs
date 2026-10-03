import { Locale } from '../types/settings';

export interface TranslationDictionary {
  common: {
    brandName: string;
    tagline: string;
    coreMessage: string;
    stage1Badge: string;
    allRightsReserved: string;
    loading: string;
    retry: string;
    backToHome: string;
    learnMore: string;
    viewDetails: string;
    explore: string;
    close: string;
    menu: string;
    theme: string;
    language: string;
    stage1Architecture: string;
    placeholderNote: string;
  };
  nav: {
    products: string;
    services: string;
    portfolio: string;
    about: string;
    blog: string;
    rakibAsrar: string;
    contact: string;
    startProject: string;
    engineering: string;
  };
  footer: {
    solutions: string;
    company: string;
    authorSection: string;
    books: string;
    writing: string;
    privacyPolicy: string;
    termsOfService: string;
    builtWithPrecision: string;
    tagline: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
    toggleLabel: string;
  };
  states: {
    emptyTitle: string;
    emptyDescription: string;
    errorTitle: string;
    errorDescription: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    exploreProducts: string;
    startProject: string;
    microCopy: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    description: string;
    exploreLink: string;
  };
  principles: {
    eyebrow: string;
    heading: string;
    practicalTitle: string;
    practicalDesc: string;
    usefulTitle: string;
    usefulDesc: string;
    simpleTitle: string;
    simpleDesc: string;
    continuousTitle: string;
    continuousDesc: string;
  };
  productsPreview: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: string;
    featuredBadge: string;
    statusActive: string;
    additionalTools: string;
  };
  servicesPreview: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: string;
    exploreAll: string;
    subtext: string;
  };
  portfolioPreview: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: string;
  };
  aboutPreview: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: string;
    craftTitle: string;
    craftDesc: string;
    disciplineTitle: string;
    disciplineDesc: string;
  };
  contactCta: {
    eyebrow: string;
    heading: string;
    description: string;
    startProject: string;
    contactUs: string;
  };
  rakibAsrarSpotlight: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  engineeringLanding: {
    hero: {
      eyebrow: string;
      headline: string;
      description: string;
      discussProject: string;
      exploreServices: string;
      blueprintTag: string;
      planType: string;
    };
    services: {
      heading: string;
      subheading: string;
      items: {
        title: string;
        description: string;
        scope: string[];
      }[];
    };
    brandIntro: {
      heading: string;
      paragraphs: string[];
      labsRelationTitle: string;
      labsRelationText: string;
      engineeringPositionTitle: string;
      engineeringPositionText: string;
    };
    cta: {
      heading: string;
      description: string;
      button: string;
      secondaryButton: string;
    };
  };
}

export type TranslationKey = string;

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
  isBangla: boolean;
}
