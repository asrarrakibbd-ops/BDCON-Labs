// ==============================================================================
// BDCON Labs — Centralized Supabase Client Singleton
// Stage 12A: Safe client-side Supabase instance using Public Anon Key only.
// NEVER import or use service_role keys in this client.
// ==============================================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Retrieve public environment variables safely across browser and test runtimes
const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || (typeof process !== 'undefined' && process.env) || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Validates whether the Supabase client has valid endpoint and anon key configured.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20
  );
};

// Fallback dummy URL and anon key to prevent crashes if environment variables are not injected yet
const defaultUrl = supabaseUrl || 'https://bwibuyvyfujdqntzgsda.supabase.co';
const defaultKey = supabaseAnonKey || 'placeholder-anon-key';

/**
 * Central Supabase Client Singleton for BDCON Labs
 */
export const supabase: SupabaseClient<Database> = createClient<Database>(
  defaultUrl,
  defaultKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'x-application-name': 'bdcon-labs-web',
      },
    },
  }
);

export default supabase;
