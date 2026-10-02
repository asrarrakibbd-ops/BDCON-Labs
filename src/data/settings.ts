// ==============================================================================
// BDCON Labs — Site Settings Data Access Facade
// Stage 14: Centralized query interface for system settings
// ==============================================================================

import { getSiteSettingsService } from '../lib/supabase/services/settings';
import { SiteSettings } from '../types/settings';
import { SITE_SETTINGS } from './index';

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await getSiteSettingsService();
  } catch {
    return SITE_SETTINGS;
  }
}

export { SITE_SETTINGS };
export type { SiteSettings };
