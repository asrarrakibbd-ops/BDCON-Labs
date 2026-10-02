// ==============================================================================
// BDCON Labs — Author Profile Data Access Service
// Stage 12B: Dynamic author fetching with static fallback
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../client';
import { AuthorProfile, AuthorSocialLink } from '../../../types/author';
import { AUTHOR_PROFILE } from '../../../data/author';
import { Database } from '../types';
import { cachedQuery } from '../../cache';

type AuthorRow = Database['public']['Tables']['author_profiles']['Row'];

export function mapRowToAuthorProfile(row: AuthorRow): AuthorProfile {
  return {
    name: row.name,
    displayName: row.display_name || row.name,
    legalName: row.legal_name || row.name,
    role: row.role || 'লেখক · কথাসাহিত্যিক · ক্রিয়েটর',
    tagline: row.tagline || '',
    shortBio: row.short_bio || '',
    biography: row.biography || '',
    profileImage: row.profile_image_url || '/images/rakib-asrar/author/portrait.jpg',
    education: row.education || '',
    profession: row.profession || '',
    birthDate: row.birth_date || '',
    birthPlace: row.birth_place || '',
    literaryInterests: row.literary_interests || [],
    socialLinks: (row.social_links as any) || [],
    contactEmail: row.contact_email || 'rakibasrarbd@gmail.com',
    contactPhone: row.contact_phone || '+৮৮০ ১৩৪৪৮৩০৪০৪',
    contactAddress: row.contact_address || '',
    timeline: (row.timeline as any) || [],
    testimonials: (row.testimonials as any) || [],
  };
}

export async function getAuthorProfileService(): Promise<AuthorProfile> {
  return cachedQuery('author:profile', async () => {
    if (!isSupabaseConfigured()) {
      return AUTHOR_PROFILE;
    }

    try {
      const { data, error } = await supabase
        .from('author_profiles')
        .select('*')
        .eq('is_primary', true)
        .maybeSingle();

      if (error || !data) {
        return AUTHOR_PROFILE;
      }

      const mapped = mapRowToAuthorProfile(data);
      if ((!mapped.timeline || mapped.timeline.length === 0) && AUTHOR_PROFILE.timeline) {
        mapped.timeline = AUTHOR_PROFILE.timeline;
      }
      if ((!mapped.testimonials || mapped.testimonials.length === 0) && AUTHOR_PROFILE.testimonials) {
        mapped.testimonials = AUTHOR_PROFILE.testimonials;
      }
      return mapped;
    } catch {
      return AUTHOR_PROFILE;
    }
  });
}

export async function getAuthorSocialLinksService(): Promise<AuthorSocialLink[]> {
  const profile = await getAuthorProfileService();
  return profile.socialLinks || [];
}
