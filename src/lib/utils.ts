/**
 * Utility functions for BDCON Labs design system
 */

export function cn(...classes: (string | number | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).map(String).join(' ');
}

export function formatDate(date: string | Date, locale: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}
