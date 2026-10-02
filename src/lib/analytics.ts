// ==============================================================================
// BDCON Labs — Privacy-Preserving Analytics Abstraction
// Stage 15: Safe, privacy-conscious event tracking abstraction (Zero 3P overhead)
// Strictly blocks any tracking on private /admin/* routes
// ==============================================================================

export type AnalyticsEventName =
  | 'page_view'
  | 'product_view'
  | 'service_view'
  | 'portfolio_view'
  | 'project_request_started'
  | 'project_request_submitted'
  | 'contact_form_started'
  | 'contact_message_submitted'
  | 'book_view'
  | 'writing_view';

export interface AnalyticsEventPayload {
  page_view: {
    path: string;
    title?: string;
  };
  product_view: {
    slug: string;
    name: string;
  };
  service_view: {
    slug: string;
    name: string;
  };
  portfolio_view: {
    slug: string;
    title: string;
  };
  project_request_started: Record<string, never>;
  project_request_submitted: {
    projectScope: string;
    budgetRange: string;
    timeline: string;
  };
  contact_form_started: Record<string, never>;
  contact_message_submitted: {
    subject: string;
  };
  book_view: {
    slug: string;
    title: string;
  };
  writing_view: {
    slug: string;
    title: string;
  };
}

/**
 * Tracks a privacy-safe page view.
 * Excludes all administrative paths from analytics.
 */
export function pageView(path: string, title?: string): void {
  // Never track private administration routes
  if (path.startsWith('/admin')) {
    return;
  }

  trackEvent('page_view', { path, title });
}

/**
 * Dispatches an analytics event without calling any invasive 3P trackers.
 * Can be hooked into privacy-respecting platforms (e.g. self-hosted Plausible, GTM) later.
 */
export function trackEvent<E extends AnalyticsEventName>(
  eventName: E,
  payload: AnalyticsEventPayload[E]
): void {
  // If in admin route context, suppress event
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return;
  }

  // Debug logging only in explicit development debug mode
  if (typeof window !== 'undefined' && (window as any).__BDCON_DEBUG__) {
    console.debug(`[BDCON Analytics] ${eventName}:`, payload);
  }

  // Future provider extension point:
  // if (typeof window !== 'undefined' && (window as any).plausible) {
  //   (window as any).plausible(eventName, { props: payload });
  // }
}
