// ==============================================================================
// BDCON Labs — Dynamic Breadcrumb Navigation Component
// Automatically resolves path hierarchies with multilingual (EN/BN) labels,
// real data lookup for products, services & projects, and accessible Schema.org microdata.
// ==============================================================================

import React, { useMemo } from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { useRouter, Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';
import { Container } from '../layout/Container';
import { cn } from '../../lib/utils';

// Static Data Repositories for entity slug resolution
import { PRODUCTS_DATA } from '../../data/products';
import { SERVICES_DATA } from '../../data/services';
import { PORTFOLIO_PROJECTS } from '../../data/portfolio';
import { ENGINEERING_SERVICES } from '../../data/engineeringServices';
import { ENGINEERING_PROJECTS } from '../../data/engineeringProjects';
import { BOOKS_DATA } from '../../data/books';
import { WRITING_DATA } from '../../data/writing';

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  /**
   * Optional manual override of breadcrumb items.
   * If not provided, items are dynamically generated from the current router path.
   */
  items?: BreadcrumbCrumb[];

  /**
   * Optional title override for the terminal (current) crumb.
   */
  currentTitle?: string;

  /**
   * Visual presentation variant:
   * - 'bar': Full-width horizontal bar with subtle bottom border, canvas background, and Container wrapping.
   * - 'inline': Just the `<nav>` component, suitable for embedding inside headers or hero sections.
   * Default: 'bar'
   */
  variant?: 'bar' | 'inline';

  /**
   * Whether to include the Home link as the first crumb.
   * Default: true
   */
  showHome?: boolean;

  /**
   * Whether to display a quick "Back to [Parent]" link on the right.
   * Defaults to true on detail pages (3 or more segments), false otherwise.
   */
  showBack?: boolean;

  /**
   * Optional custom URL for the quick back link.
   */
  backHref?: string;

  /**
   * Optional custom label for the quick back link.
   */
  backLabel?: string;

  /**
   * Container size when variant is 'bar'.
   * Default: '2xl'
   */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Extra classes for the outer wrapper.
   */
  className?: string;

  /**
   * Extra classes for the inner `<nav>` element.
   */
  navClassName?: string;
}

/**
 * Maps known URL path segments to localized names
 */
const SEGMENT_LABELS: Record<string, { en: string; bn: string }> = {
  products: { en: 'Products', bn: 'প্রোডাক্টস' },
  services: { en: 'Services', bn: 'সার্ভিসেস' },
  portfolio: { en: 'Portfolio', bn: 'পোর্টফোলিও' },
  engineering: { en: 'Engineering', bn: 'ইঞ্জিনিয়ারিং' },
  projects: { en: 'Projects', bn: 'প্রজেক্টসমূহ' },
  'rakib-asrar': { en: 'Rakib Asrar', bn: 'রাকিব আসরার' },
  books: { en: 'Books', bn: 'প্রকাশিত বই' },
  writing: { en: 'Writing & Essays', bn: 'প্রবন্ধ ও চিন্তন' },
  about: { en: 'About', bn: 'পরিচিতি' },
  contact: { en: 'Contact', bn: 'যোগাযোগ' },
  'start-project': { en: 'Start Project', bn: 'প্রজেক্ট শুরু করুন' },
  home: { en: 'Home', bn: 'হোম' },
  admin: { en: 'Admin', bn: 'অ্যাডমিন' },
};

/**
 * Resolves a dynamic slug (e.g. 'salary-bd', 'web-development') to an actual entity title.
 */
function resolveEntityTitle(slug: string, fullPathPrefix: string, isBangla: boolean): string | null {
  // 1. Products
  if (fullPathPrefix.startsWith('/products')) {
    const staticProd = PRODUCTS_DATA.find((p) => p.slug === slug || p.id === slug);
    if (staticProd) return staticProd.name;

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('bdcon_admin_products');
        if (raw) {
          const list = JSON.parse(raw);
          const found = list.find((p: any) => p.slug === slug || p.id === slug);
          if (found?.name) return found.name;
        }
      } catch {
        // ignore
      }
    }
  }

  // 2. Services
  if (fullPathPrefix.startsWith('/services')) {
    const staticSrv = SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
    if (staticSrv) return staticSrv.name;

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('bdcon_admin_services');
        if (raw) {
          const list = JSON.parse(raw);
          const found = list.find((s: any) => s.slug === slug || s.id === slug);
          if (found?.name) return found.name;
        }
      } catch {
        // ignore
      }
    }
  }

  // 3. Portfolio
  if (fullPathPrefix.startsWith('/portfolio')) {
    const staticPort = PORTFOLIO_PROJECTS.find((p) => p.slug === slug || p.id === slug);
    if (staticPort) return staticPort.title;

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('bdcon_admin_portfolio');
        if (raw) {
          const list = JSON.parse(raw);
          const found = list.find((p: any) => p.slug === slug || p.id === slug);
          if (found?.title) return found.title;
        }
      } catch {
        // ignore
      }
    }
  }

  // 4. Engineering Services
  if (fullPathPrefix.startsWith('/engineering/services')) {
    const srv = ENGINEERING_SERVICES.find((s) => s.slug === slug);
    if (srv) {
      return isBangla && srv.titleBn ? srv.titleBn : srv.titleEn;
    }
  }

  // 5. Engineering Projects
  if (fullPathPrefix.startsWith('/engineering/projects')) {
    const proj = ENGINEERING_PROJECTS.find((p) => p.slug === slug);
    if (proj) {
      return isBangla && proj.titleBn ? proj.titleBn : proj.titleEn;
    }
  }

  // 6. Rakib Asrar Books
  if (fullPathPrefix.startsWith('/rakib-asrar/books')) {
    const book = BOOKS_DATA.find((b) => b.slug === slug || b.id === slug);
    if (book) return book.title;

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('bdcon_admin_books');
        if (raw) {
          const list = JSON.parse(raw);
          const found = list.find((b: any) => b.slug === slug || b.id === slug);
          if (found?.title) return found.title;
        }
      } catch {
        // ignore
      }
    }
  }

  // 7. Rakib Asrar Writing
  if (fullPathPrefix.startsWith('/rakib-asrar/writing')) {
    const essay = WRITING_DATA.find((w) => w.slug === slug || w.id === slug);
    if (essay) return essay.title;

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('bdcon_admin_writing');
        if (raw) {
          const list = JSON.parse(raw);
          const found = list.find((w: any) => w.slug === slug || w.id === slug);
          if (found?.title) return found.title;
        }
      } catch {
        // ignore
      }
    }
  }

  return null;
}

/**
 * Formats an unknown slug into clean Title Case
 */
function formatSlugFallback(slug: string): string {
  return slug
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items: propItems,
  currentTitle,
  variant = 'bar',
  showHome = true,
  showBack,
  backHref: propBackHref,
  backLabel: propBackLabel,
  containerSize = '2xl',
  className,
  navClassName,
}) => {
  const { path } = useRouter();
  const { isBangla } = useTranslation();

  // Root homepage does not display breadcrumbs
  if (path === '/' && !propItems) {
    return null;
  }

  // Derive dynamic breadcrumbs from router path
  const crumbs = useMemo<BreadcrumbCrumb[]>(() => {
    if (propItems && propItems.length > 0) {
      return propItems;
    }

    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return [];

    const result: BreadcrumbCrumb[] = [];

    if (showHome) {
      result.push({
        label: isBangla ? SEGMENT_LABELS.home.bn : SEGMENT_LABELS.home.en,
        href: '/',
      });
    }

    let accumulatedPath = '';

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      accumulatedPath += `/${seg}`;
      const isTerminal = i === segments.length - 1;

      let label: string;

      if (isTerminal && currentTitle) {
        label = currentTitle;
      } else if (SEGMENT_LABELS[seg]) {
        label = isBangla ? SEGMENT_LABELS[seg].bn : SEGMENT_LABELS[seg].en;
      } else {
        // Attempt entity title lookup based on accumulated path
        const resolved = resolveEntityTitle(seg, accumulatedPath, isBangla);
        label = resolved || formatSlugFallback(seg);
      }

      result.push({
        label,
        href: isTerminal ? undefined : accumulatedPath,
        isCurrent: isTerminal,
      });
    }

    return result;
  }, [propItems, path, isBangla, showHome, currentTitle]);

  if (crumbs.length === 0) {
    return null;
  }

  // Determine back link target and label
  const shouldShowBack = showBack ?? (crumbs.length >= 3);
  let resolvedBackHref = propBackHref;
  let resolvedBackLabel = propBackLabel;

  if (shouldShowBack && !resolvedBackHref) {
    // Immediate parent crumb
    const parentCrumb = crumbs[crumbs.length - 2];
    if (parentCrumb?.href) {
      resolvedBackHref = parentCrumb.href;
    }
  }

  if (shouldShowBack && !resolvedBackLabel && resolvedBackHref) {
    const parentCrumb = crumbs[crumbs.length - 2];
    if (resolvedBackHref === '/products') {
      resolvedBackLabel = isBangla ? 'সকল প্রোডাক্ট' : 'All Products';
    } else if (resolvedBackHref === '/services') {
      resolvedBackLabel = isBangla ? 'সকল সার্ভিস' : 'All Services';
    } else if (resolvedBackHref === '/portfolio') {
      resolvedBackLabel = isBangla ? 'সকল কাজ' : 'All Work';
    } else if (resolvedBackHref === '/engineering') {
      resolvedBackLabel = isBangla ? 'ইঞ্জিনিয়ারিং' : 'BDCON Engineering';
    } else if (resolvedBackHref === '/engineering/services') {
      resolvedBackLabel = isBangla ? 'ইঞ্জিনিয়ারিং সার্ভিসেস' : 'Engineering Services';
    } else if (resolvedBackHref === '/engineering/projects') {
      resolvedBackLabel = isBangla ? 'ইঞ্জিনিয়ারিং প্রজেক্টস' : 'Engineering Projects';
    } else if (resolvedBackHref === '/rakib-asrar') {
      resolvedBackLabel = isBangla ? 'রাকিব আসরার' : 'Rakib Asrar';
    } else if (resolvedBackHref.includes('/books')) {
      resolvedBackLabel = isBangla ? 'সকল বই' : 'All Books';
    } else if (resolvedBackHref.includes('/writing')) {
      resolvedBackLabel = isBangla ? 'সকল প্রবন্ধ' : 'All Essays';
    } else if (parentCrumb?.label) {
      resolvedBackLabel = isBangla ? `${parentCrumb.label}-এ ফিরুন` : `Back to ${parentCrumb.label}`;
    } else {
      resolvedBackLabel = isBangla ? 'পেছনে যান' : 'Back';
    }
  }

  const navContent = (
    <nav
      aria-label={isBangla ? 'ব্রেডক্রাম্ব নেভিগেশন' : 'Breadcrumb'}
      className={cn(
        'flex items-center justify-between gap-4 text-xs font-mono select-none',
        navClassName
      )}
    >
      {/* 1. Ordered Breadcrumb Crumb List */}
      <ol 
        className="flex items-center gap-1.5 sm:gap-2 text-[var(--text-muted)] truncate flex-wrap"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {crumbs.map((crumb, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === crumbs.length - 1;

          return (
            <li
              key={crumb.href || idx}
              className="flex items-center gap-1.5 sm:gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {/* Separator icon (not before first item) */}
              {!isFirst && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-[var(--border-strong)] shrink-0 opacity-70"
                  aria-hidden="true"
                />
              )}

              {isLast || !crumb.href ? (
                <span
                  className="font-semibold text-[var(--text-primary)] truncate max-w-[160px] sm:max-w-xs md:max-w-md font-sans"
                  aria-current="page"
                  itemProp="name"
                  title={crumb.label}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.href}
                  className="hover:text-[var(--text-primary)] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-brand)] rounded flex items-center gap-1 font-sans"
                  itemProp="item"
                >
                  {isFirst && showHome && (
                    <Home className="w-3 h-3 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
                  )}
                  <span itemProp="name">{crumb.label}</span>
                </Link>
              )}

              <meta itemProp="position" content={String(idx + 1)} />
            </li>
          );
        })}
      </ol>

      {/* 2. Quick Back Link */}
      {shouldShowBack && resolvedBackHref && (
        <Link
          to={resolvedBackHref}
          className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--color-brand)] transition-colors shrink-0 font-medium font-sans text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-brand)] rounded px-1"
          aria-label={resolvedBackLabel}
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">{resolvedBackLabel}</span>
        </Link>
      )}
    </nav>
  );

  if (variant === 'inline') {
    return <div className={className}>{navContent}</div>;
  }

  return (
    <div
      className={cn(
        'w-full bg-[var(--bg-canvas)] border-b border-[var(--border-color)] py-2.5 sm:py-3 transition-colors',
        className
      )}
    >
      <Container size={containerSize}>
        {navContent}
      </Container>
    </div>
  );
};
