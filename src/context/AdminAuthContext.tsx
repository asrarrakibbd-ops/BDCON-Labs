// ==============================================================================
// BDCON Labs — Admin Authentication & Authorization Context
// Stage 14: Private admin auth with primary admin credentials & Supabase Auth
// ==============================================================================

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase/client';

export type AdminRole = 'admin' | 'super_admin' | 'editor';

export const PRIMARY_ADMIN_EMAIL = 'rakibcuetce40@gmail.com';
export const PRIMARY_ADMIN_PASSWORD = '106102';

const ADMIN_STORAGE_USER_KEY = 'bdcon_labs_admin_auth_user';
const ADMIN_STORAGE_ROLE_KEY = 'bdcon_labs_admin_auth_role';

export interface AdminAuthContextType {
  user: User | null;
  session: Session | null;
  role: AdminRole | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

function createMockAdminUser(email: string): User {
  return {
    id: 'admin-rakib-cuetce40',
    app_metadata: { provider: 'email', role: 'super_admin' },
    user_metadata: { name: 'Engr. Rakib Asrar', role: 'super_admin', email },
    aud: 'authenticated',
    confirmation_sent_at: '',
    recovery_sent_at: '',
    email_change_sent_at: '',
    new_email: '',
    invited_at: '',
    action_link: '',
    email,
    phone: '',
    created_at: '2024-01-01T00:00:00.000Z',
    confirmed_at: '2024-01-01T00:00:00.000Z',
    email_confirmed_at: '2024-01-01T00:00:00.000Z',
    phone_confirmed_at: '',
    last_sign_in_at: new Date().toISOString(),
    role: 'authenticated',
    updated_at: new Date().toISOString(),
  };
}

function createMockAdminSession(user: User): Session {
  return {
    access_token: 'admin-bdcon-token-' + Date.now(),
    token_type: 'bearer',
    expires_in: 3600 * 24 * 7,
    refresh_token: 'admin-bdcon-refresh-token',
    user,
    expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 7,
  };
}

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to verify admin role against Supabase admin_roles table
  const fetchRoleForUser = async (userId: string): Promise<AdminRole | null> => {
    try {
      if (!isSupabaseConfigured()) {
        return null;
      }
      const { data, error } = await (supabase.from('admin_roles') as any)
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !data) {
        return null;
      }

      const roleStr = data.role as AdminRole;
      if (['admin', 'super_admin', 'editor'].includes(roleStr)) {
        return roleStr;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Initialize auth state and listen for session updates
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      // 1. Check local persisted admin session first
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const storedUser = localStorage.getItem(ADMIN_STORAGE_USER_KEY);
          const storedRole = localStorage.getItem(ADMIN_STORAGE_ROLE_KEY) as AdminRole | null;
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as User;
            if (
              parsedUser?.email &&
              parsedUser.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()
            ) {
              if (isMounted) {
                setUser(parsedUser);
                setRole(storedRole || 'super_admin');
                setSession(createMockAdminSession(parsedUser));
                setIsLoading(false);
              }
              return;
            }
          }
        }
      } catch (e) {
        console.warn('Error reading stored admin session:', e);
      }

      // 2. If no valid local admin session and Supabase is not configured
      if (!isSupabaseConfigured()) {
        if (isMounted) setIsLoading(false);
        return;
      }

      // 3. Fallback to Supabase session check
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          if (initialSession?.user) {
            const userRole = await fetchRoleForUser(initialSession.user.id);
            if (isMounted) setRole(userRole);
          } else {
            setRole(null);
          }
        }
      } catch (err) {
        console.error('Admin Auth initialization error:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    initAuth();

    // Subscribe to Supabase auth state changes if configured
    let subscription: { unsubscribe: () => void } | null = null;
    if (isSupabaseConfigured()) {
      const authListener = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          if (!isMounted) return;

          // Do not overwrite primary admin session if active
          try {
            const stored = localStorage.getItem(ADMIN_STORAGE_USER_KEY);
            if (stored) {
              const u = JSON.parse(stored);
              if (u?.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
                return;
              }
            }
          } catch {
            // ignore
          }

          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (currentSession?.user) {
            const userRole = await fetchRoleForUser(currentSession.user.id);
            if (isMounted) setRole(userRole);
          } else {
            setRole(null);
          }

          setIsLoading(false);
        }
      );
      subscription = authListener.data.subscription;
    }

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const refreshRole = async () => {
    if (user) {
      if (user.email && user.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
        setRole('super_admin');
        return;
      }
      const currentRole = await fetchRoleForUser(user.id);
      setRole(currentRole);
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim();
    const normalizedEmail = trimmedEmail.toLowerCase();

    // 1. Direct validation for designated primary administrator credentials
    if (normalizedEmail === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      if (password === PRIMARY_ADMIN_PASSWORD) {
        const adminUser = createMockAdminUser(PRIMARY_ADMIN_EMAIL);
        const adminSession = createMockAdminSession(adminUser);

        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(ADMIN_STORAGE_USER_KEY, JSON.stringify(adminUser));
            localStorage.setItem(ADMIN_STORAGE_ROLE_KEY, 'super_admin');
          }
        } catch (e) {
          console.warn('Unable to persist admin session in localStorage:', e);
        }

        setUser(adminUser);
        setSession(adminSession);
        setRole('super_admin');
        return { success: true };
      } else {
        return {
          success: false,
          error: 'ভুল ইমেইল অথবা পাসওয়ার্ড প্রদান করা হয়েছে। অনুগ্রহ করে যাচাই করে আবার চেষ্টা করুন। (Invalid credentials)',
        };
      }
    }

    // 2. Fallback to Supabase authentication if configured
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'ভুল ইমেইল অথবা পাসওয়ার্ড প্রদান করা হয়েছে। অনুগ্রহ করে যাচাই করে আবার চেষ্টা করুন। (Invalid credentials)',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message === 'Invalid login credentials' 
            ? 'Invalid email or password.'
            : error.message,
        };
      }

      if (!data.user) {
        return { success: false, error: 'Sign in failed. No user was returned.' };
      }

      // Check if user has an authorized role in admin_roles
      const userRole = await fetchRoleForUser(data.user.id);
      if (!userRole) {
        await supabase.auth.signOut();
        setRole(null);
        setUser(null);
        setSession(null);
        return {
          success: false,
          error: 'Access denied. This account does not possess administrative privileges.',
        };
      }

      setUser(data.user);
      setSession(data.session);
      setRole(userRole);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'An unexpected authentication error occurred. Please try again.',
      };
    }
  };

  const signOut = async () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(ADMIN_STORAGE_USER_KEY);
        localStorage.removeItem(ADMIN_STORAGE_ROLE_KEY);
      }
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    } finally {
      setUser(null);
      setSession(null);
      setRole(null);
    }
  };

  const isAdmin = Boolean(role && ['admin', 'super_admin', 'editor'].includes(role));

  const value = useMemo(
    () => ({
      user,
      session,
      role,
      isAdmin,
      isLoading,
      signIn,
      signOut,
      refreshRole,
    }),
    [user, session, role, isAdmin, isLoading]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
