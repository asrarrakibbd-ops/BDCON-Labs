// ==============================================================================
// BDCON Labs — Central Site & SEO Configuration (Stage 15)
// Source of truth for domains, canonical URLs, social tags, and brand metadata
// ==============================================================================

export const SITE_CONFIG = {
  name: 'BDCON Labs',
  legalName: 'BDCON Labs',
  shortName: 'BDCON',
  tagline: 'Practical software products, web applications, and custom digital solutions',
  description: 'BDCON Labs builds practical software products, web applications, mobile applications and custom digital solutions for professionals, businesses and organizations.',
  domain: 'bdconlabs.com',
  canonicalOrigin: 'https://bdconlabs.com',
  defaultLocale: 'en_US',
  locales: ['en_US', 'bn_BD'],
  themeColor: '#0252cf',
  backgroundColor: '#090d16',
  
  author: {
    name: 'Rakib Asrar',
    role: 'Founder & Software Architect',
    url: 'https://bdconlabs.com/rakib-asrar',
  },
  
  contact: {
    email: 'contact@bdconlabs.com',
  },
  
  social: {
    github: 'https://github.com/bdconlabs',
    linkedin: '',
    twitter: '',
  },
  
  defaultOgImage: '/images/og-default.svg',
};

/**
 * Returns a canonical URL string given a path.
 * Normalizes trailing slashes, strips query params, and anchors to canonical domain.
 */
export function getCanonicalUrl(path: string): string {
  // Normalize path
  let cleanPath = path.split('?')[0].split('#')[0];
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  // Remove trailing slash unless it's root
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  return `${SITE_CONFIG.canonicalOrigin}${cleanPath}`;
}

/**
 * Helper to truncate and sanitize meta descriptions to between 120 and 160 characters.
 */
export function formatMetaDescription(desc?: string, fallback = SITE_CONFIG.description): string {
  if (!desc || !desc.trim()) {
    return fallback;
  }
  const clean = desc.replace(/\s+/g, ' ').trim();
  if (clean.length <= 160) {
    return clean;
  }
  return clean.slice(0, 157).trim() + '...';
}
