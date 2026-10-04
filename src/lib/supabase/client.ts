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

const PRODUCTION_SUPABASE_URL = 'https://bwibuyvyfujdqntzgsda.supabase.co';
const PRODUCTION_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aWJ1eXZ5ZnVqZHFudHpnc2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2OTYxMjQsImV4cCI6MjEwNjI3MjEyNH0.EYKJxVZmk1UaNuWl3cdQaQvB56w4otBt25dQc8fMZ1s';

const defaultUrl = supabaseUrl || PRODUCTION_SUPABASE_URL;
const defaultKey = supabaseAnonKey || PRODUCTION_SUPABASE_ANON_KEY;

/**
 * Validates whether the Supabase client has valid endpoint and anon key configured.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    defaultUrl &&
    defaultKey &&
    defaultUrl.startsWith('https://') &&
    defaultKey.length > 20
  );
};

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
