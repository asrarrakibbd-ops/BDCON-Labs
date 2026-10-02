// ==============================================================================
// BDCON Labs — Site Settings Data Access Service
// Stage 12A: Supabase integration with seamless local fallback
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { SiteSettings } from '../../../types/settings';
import { SITE_SETTINGS } from '../../../data';
import { Database } from '../types';

type SettingsRow = Database['public']['Tables']['site_settings']['Row'];

export function mapRowToSettings(row: SettingsRow): SiteSettings {
  return {
    companyName: row.company_name,
    tagline: row.tagline,
    coreMessage: row.core_message || SITE_SETTINGS.coreMessage,
    defaultLocale: (row.default_locale as any) || 'en',
    defaultTheme: (row.default_theme as any) || 'system',
    contactEmailPlaceholder: row.contact_email || SITE_SETTINGS.contactEmailPlaceholder,
    copyrightYear: new Date().getFullYear(),
  };
}

export async function getSiteSettingsService(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    return SITE_SETTINGS;
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'default')
      .maybeSingle();

    if (error || !data) {
      return SITE_SETTINGS;
    }

    return mapRowToSettings(data);
  } catch {
    return SITE_SETTINGS;
  }
}
