// ==============================================================================
// BDCON Labs — Schema.org JSON-LD Builders (Stage 15)
// Produces validated structured data for search engine rich results
// ==============================================================================

import { SITE_CONFIG, getCanonicalUrl } from '../config/site';
import { Product } from '../types/product';
import { Service } from '../types/service';
import { PortfolioProject } from '../types/portfolio';
import { Book } from '../types/book';
import { WritingEntry } from '../types/writing';
import { AuthorProfile } from '../types/author';

/**
 * Organization Schema for BDCON Labs
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.canonicalOrigin,
    logo: `${SITE_CONFIG.canonicalOrigin}/images/og-default.svg`,
    description: SITE_CONFIG.description,
    foundingLocation: {
      '@type': 'Place',
      name: 'Dhaka, Bangladesh',
    },
    sameAs: [
      SITE_CONFIG.social.github,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.contact.email,
      contactType: 'customer service',
    },
  };
}

/**
 * SoftwareApplication Schema for Products (e.g. BuildEst BD)
 */
export function buildSoftwareApplicationSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    headline: product.tagline || product.name,
    description: product.shortDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: product.platforms ? product.platforms.join(', ') : 'Web, Android',
    url: getCanonicalUrl(`/products/${product.slug}`),
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalOrigin,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
    },
    featureList: product.features,
  };
}

/**
 * Service / ProfessionalService Schema
 */
export function buildServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalOrigin,
    },
    url: getCanonicalUrl(`/services/${service.slug}`),
    category: service.category,
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
  };
}

/**
 * CreativeWork / CaseStudy Schema for Portfolio
 */
export function buildCaseStudySchema(project: PortfolioProject) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.shortDescription,
    description: project.description,
    url: getCanonicalUrl(`/portfolio/${project.slug}`),
    creator: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    dateCreated: project.year ? `${project.year}` : undefined,
    keywords: project.technologies?.join(', '),
  };
}

/**
 * Book Schema for Published Books by Rakib Asrar
 */
export function buildBookSchema(book: Book) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    alternateName: book.subtitle,
    author: {
      '@type': 'Person',
      name: book.author || SITE_CONFIG.author.name,
      url: getCanonicalUrl('/rakib-asrar'),
    },
    datePublished: `${book.publicationYear}`,
    publisher: {
      '@type': 'Organization',
      name: book.publisher,
    },
    numberOfPages: book.pages,
    inLanguage: book.language === 'bn' ? 'bn' : 'en',
    genre: book.genre,
    image: book.coverImage ? `${SITE_CONFIG.canonicalOrigin}${book.coverImage}` : undefined,
    url: getCanonicalUrl(`/rakib-asrar/books/${book.slug}`),
    offers: book.purchaseUrl ? {
      '@type': 'Offer',
      price: `${book.price}`,
      priceCurrency: 'BDT',
      availability: book.availability === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: book.purchaseUrl,
    } : undefined,
  };
}

/**
 * Article Schema for Essays & Writing
 */
export function buildArticleSchema(entry: WritingEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.excerpt,
    articleBody: entry.content,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
      url: getCanonicalUrl('/rakib-asrar'),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalOrigin,
    },
    inLanguage: entry.language === 'bn' ? 'bn' : 'en',
    image: entry.coverImage ? `${SITE_CONFIG.canonicalOrigin}${entry.coverImage}` : undefined,
    url: getCanonicalUrl(`/rakib-asrar/writing/${entry.slug}`),
  };
}

/**
 * Person Schema for Rakib Asrar
 */
export function buildPersonSchema(profile: AuthorProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.displayName,
    jobTitle: profile.role,
    description: profile.shortBio || profile.biography,
    url: getCanonicalUrl('/rakib-asrar'),
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalOrigin,
    },
    image: profile.profileImage
      ? (profile.profileImage.startsWith('http')
          ? profile.profileImage
          : `${SITE_CONFIG.canonicalOrigin}${profile.profileImage}`)
      : undefined,
  };
}
