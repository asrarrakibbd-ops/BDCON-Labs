// ==============================================================================
// BDCON Labs — Universal SEO & Social Metadata Component (Stage 15)
// Compliant with applet-seo skill: Dynamic OpenGraph, Twitter cards, JSON-LD,
// canonical URL normalization, and privacy-first pageview dispatching.
// ==============================================================================

import React, { useEffect } from 'react';
import { SITE_CONFIG, getCanonicalUrl, formatMetaDescription } from '../../config/site';
import { pageView } from '../../lib/analytics';
import { useTranslation } from '../../hooks/useTranslation';

export type OgType = 'website' | 'article' | 'book' | 'profile';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: OgType;
  ogImage?: string;
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

  // Format formatted branded title
  const fullTitle = title 
    ? (title.includes('BDCON Labs') ? title : `${title} — BDCON Labs`)
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  const cleanDescription = formatMetaDescription(description);
  const canonicalUrl = getCanonicalUrl(canonicalPath);

  // Resolve absolute OpenGraph image URL
  const resolvedOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.canonicalOrigin}${ogImage}`)
    : `${SITE_CONFIG.canonicalOrigin}${SITE_CONFIG.defaultOgImage}`;

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

    // Helper to set or create meta tag
    const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Primary Meta Description
    setMeta('name', 'description', cleanDescription);

    // 3. Robots Indexing Control
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large');
    }

    // 4. Canonical URL Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. OpenGraph Tags
    setMeta('property', 'og:site_name', SITE_CONFIG.name);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', cleanDescription);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', resolvedOgImage);
    setMeta('property', 'og:locale', lang === 'bn' ? 'bn_BD' : 'en_US');

    if (publishedTime) {
      setMeta('property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      setMeta('property', 'article:modified_time', modifiedTime);
    }
    if (author) {
      setMeta('property', 'article:author', author);
    }

    // 6. Twitter / X Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', cleanDescription);
    setMeta('name', 'twitter:image', resolvedOgImage);

    // 7. Structured Data (JSON-LD)
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

    // 8. Dispatch privacy-preserving page view
    pageView(canonicalPath, fullTitle);

    return () => {
      // Clean up structured data on unmount if appropriate
    };
  }, [
    fullTitle,
    cleanDescription,
    canonicalUrl,
    ogType,
    resolvedOgImage,
    noindex,
    publishedTime,
    modifiedTime,
    author,
    lang,
    jsonLd,
    breadcrumbs,
    canonicalPath,
  ]);

  return null;
};
