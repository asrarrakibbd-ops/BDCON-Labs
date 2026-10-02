export type ThemeMode = 'light' | 'dark' | 'system';
export type Locale = 'en' | 'bn';

export interface SiteSettings {
  companyName: string;
  tagline: string;
  coreMessage: string;
  defaultLocale: Locale;
  defaultTheme: ThemeMode;
  contactEmailPlaceholder: string;
  copyrightYear: number;
}
