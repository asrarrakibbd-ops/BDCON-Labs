// ==============================================================================
// BDCON Labs — Universal SEO & Social Metadata Component
// Compliant with applet-seo skill: Dynamic OpenGraph, Twitter cards, JSON-LD,
// canonical URL normalization, and privacy-first pageview dispatching.
// ==============================================================================

import React, { useEffect } from 'react';
import { SITE_CONFIG, getCanonicalUrl, formatMetaDescription } from '../../config/site';
import { pageView } from '../../lib/analytics';
import { useTranslation } from '../../hooks/useTranslation';

export type OgType = 'website' | 'article' | 'book' | 'profile';
export type TwitterCardType = 'summary' | 'summary_large_image' | 'app' | 'player';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Universal helper to update or remove an HTML <meta> tag in the document <head>.
 */
export function setHeadMeta(attrName: 'name' | 'property', attrValue: string, content?: string | null): void {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// ==============================================================================
// 1. Dedicated OpenGraph Meta Tag Component
// ==============================================================================
export interface OpenGraphMetaProps {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: OgType;
  siteName?: string;
  locale?: string;
  imageAlt?: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const OpenGraphMeta: React.FC<OpenGraphMetaProps> = ({
  title,
  description,
  url,
  image,
  type = 'website',
  siteName = SITE_CONFIG.name,
  locale = 'en_US',
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  publishedTime,
  modifiedTime,
  author,
}) => {
  useEffect(() => {
    setHeadMeta('property', 'og:site_name', siteName);
    setHeadMeta('property', 'og:type', type);
    setHeadMeta('property', 'og:title', title);
    setHeadMeta('property', 'og:description', description);
    setHeadMeta('property', 'og:url', url);
    setHeadMeta('property', 'og:image', image);
    setHeadMeta('property', 'og:image:alt', imageAlt || title);
    setHeadMeta('property', 'og:image:width', String(imageWidth));
    setHeadMeta('property', 'og:image:height', String(imageHeight));
    setHeadMeta('property', 'og:locale', locale);

    if (publishedTime) setHeadMeta('property', 'article:published_time', publishedTime);
    if (modifiedTime) setHeadMeta('property', 'article:modified_time', modifiedTime);
    if (author) setHeadMeta('property', 'article:author', author);
  }, [
    title,
    description,
    url,
    image,
    type,
    siteName,
    locale,
    imageAlt,
    imageWidth,
    imageHeight,
    publishedTime,
    modifiedTime,
    author,
  ]);

  return null;
};

// Aliases for modular imports
export const OpenGraph = OpenGraphMeta;
export const OpenGraphTags = OpenGraphMeta;

// ==============================================================================
// 2. Dedicated Twitter / X Card Meta Tag Component
// ==============================================================================
export interface TwitterCardMetaProps {
  card?: TwitterCardType;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  site?: string;
  creator?: string;
}

export const TwitterCardMeta: React.FC<TwitterCardMetaProps> = ({
  card = 'summary_large_image',
  title,
  description,
  image,
  imageAlt,
  site = '@bdconlabs',
  creator,
}) => {
  useEffect(() => {
    setHeadMeta('name', 'twitter:card', card);
    setHeadMeta('name', 'twitter:title', title);
    setHeadMeta('name', 'twitter:description', description);
    setHeadMeta('name', 'twitter:image', image);
    setHeadMeta('name', 'twitter:image:alt', imageAlt || title);
    if (site) setHeadMeta('name', 'twitter:site', site);
    if (creator) setHeadMeta('name', 'twitter:creator', creator);
  }, [card, title, description, image, imageAlt, site, creator]);

  return null;
};

// Aliases for modular imports
export const TwitterCard = TwitterCardMeta;
export const TwitterTags = TwitterCardMeta;

// ==============================================================================
// 3. Composite SEO Controller
// ==============================================================================
export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: OgType;
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: TwitterCardType;
  twitterSite?: string;
  twitterCreator?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  lang?: 'en' | 'bn';
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  breadcrumbs?: BreadcrumbItem[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogType = 'website',
  ogImage,
  ogImageAlt,
  twitterCard = 'summary_large_image',
  twitterSite = '@bdconlabs',
  twitterCreator,
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  lang,
  jsonLd,
  breadcrumbs,
}) => {
  const { locale } = useTranslation();
  const effectiveLang = lang || locale || 'en';

  // Format branded title
  const fullTitle = title 
    ? (title.includes('BDCON Labs') ? title : `${title} — BDCON Labs`)
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  const cleanDescription = formatMetaDescription(description);

  // Dynamic canonical URL resolution (uses browser location in SPA if available)
  const canonicalUrl = typeof window !== 'undefined' && window.location.origin
    ? `${window.location.origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
    : getCanonicalUrl(canonicalPath);

  // Resolve absolute OpenGraph image URL
  const resolvedOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.canonicalOrigin}${ogImage}`)
    : `${SITE_CONFIG.canonicalOrigin}${SITE_CONFIG.defaultOgImage}`;

  const resolvedOgLocale = effectiveLang === 'bn' ? 'bn_BD' : 'en_US';

  useEffect(() => {
    // 1. Update Title & Language & Theme Classes
    document.title = fullTitle;
    document.documentElement.lang = effectiveLang;
    if (effectiveLang === 'bn') {
      document.documentElement.classList.add('lang-bn');
      document.documentElement.classList.remove('lang-en');
      document.body.classList.add('lang-bn');
      document.body.classList.remove('lang-en');
    } else {
      document.documentElement.classList.add('lang-en');
      document.documentElement.classList.remove('lang-bn');
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-bn');
    }

    // 2. Primary Meta Description
    setHeadMeta('name', 'description', cleanDescription);

    // 3. Robots Indexing Control
    if (noindex) {
      setHeadMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setHeadMeta('name', 'robots', 'index, follow, max-image-preview:large');
    }

    // 4. Canonical URL Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Structured Data (JSON-LD)
    const scriptId = 'bdcon-structured-data';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    // Build combined structured data graph if provided
    const graphData: any[] = [];

    // Add breadcrumb list if present
    if (breadcrumbs && breadcrumbs.length > 0) {
      graphData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: b.name,
          item: b.url.startsWith('http') ? b.url : getCanonicalUrl(b.url),
        })),
      });
    }

    // Add passed structured data
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        graphData.push(...jsonLd);
      } else {
        graphData.push(jsonLd);
      }
    }

    if (graphData.length > 0) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(graphData.length === 1 ? graphData[0] : {
        '@context': 'https://schema.org',
        '@graph': graphData,
      });
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // 6. Dispatch privacy-preserving page view
    pageView(canonicalPath, fullTitle);
  }, [
    fullTitle,
    cleanDescription,
    canonicalUrl,
    noindex,
    effectiveLang,
    jsonLd,
    breadcrumbs,
    canonicalPath,
  ]);

  return (
    <>
      {/* Standard OpenGraph Meta Tags */}
      <OpenGraphMeta
        title={fullTitle}
        description={cleanDescription}
        url={canonicalUrl}
        image={resolvedOgImage}
        imageAlt={ogImageAlt || fullTitle}
        type={ogType}
        siteName={SITE_CONFIG.name}
        locale={resolvedOgLocale}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        author={author}
      />

      {/* Standard Twitter / X Cards Meta Tags */}
      <TwitterCardMeta
        card={twitterCard}
        title={fullTitle}
        description={cleanDescription}
        image={resolvedOgImage}
        imageAlt={ogImageAlt || fullTitle}
        site={twitterSite}
        creator={twitterCreator || author}
      />
    </>
  );
};
