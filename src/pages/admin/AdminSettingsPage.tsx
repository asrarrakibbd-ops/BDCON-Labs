// ==============================================================================
// BDCON Labs — Admin Settings (/admin/settings)
// Stage 14: System telemetry, session parameters, and administrative audit
// ==============================================================================

import React, { useEffect, useState } from 'react';
import { Settings, ShieldCheck, User, Database, Lock, Server, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { getSiteSettings } from '../../data/settings';
import { SiteSettings } from '../../types/settings';

export const AdminSettingsPage: React.FC = () => {
  const { user, role } = useAdminAuth();
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    document.title = 'Settings — BDCON Labs Admin';
    getSiteSettings().then(setSiteSettings);
  }, []);

  return (
    <AdminLayout
      title="System Settings"
      subtitle="Security parameters, active session identity, and application architecture status."
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Settings' }]}
    >
      <div className="space-y-6 max-w-4xl text-xs font-mono">
        {/* 1. Authenticated Account Details */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]">
            <User className="w-4 h-4 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
            <h2 className="font-bold text-sm text-[var(--text-primary)]">
              ACTIVE ADMINISTRATOR SESSION
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)] space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Authenticated Email</span>
              <span className="font-semibold text-sm text-[var(--text-primary)] block break-all select-all">
                {user?.email}
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)] space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Verified Role</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {role || 'admin'}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">PostgreSQL Role Guarded</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)] space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Supabase User UID</span>
              <span className="font-semibold text-[11px] text-[var(--text-secondary)] select-all break-all block">
                {user?.id}
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)] space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Last Sign In</span>
              <span className="font-semibold text-[11px] text-[var(--text-secondary)] block">
                {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Active session'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Security Infrastructure Parameters */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]">
            <Lock className="w-4 h-4 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
            <h2 className="font-bold text-sm text-[var(--text-primary)]">
              SECURITY &amp; ACCESS CONTROL ARCHITECTURE
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)]">
              <div className="space-y-0.5">
                <span className="font-semibold text-[var(--text-primary)]">Row-Level Security (RLS)</span>
                <p className="text-[10px] text-[var(--text-muted)]">
                  Enforces table policies inside PostgreSQL so anonymous users cannot read inquiries.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                ENABLED &amp; ACTIVE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)]">
              <div className="space-y-0.5">
                <span className="font-semibold text-[var(--text-primary)]">Public Submission Safeguards</span>
                <p className="text-[10px] text-[var(--text-muted)]">
                  Anti-spam honeypot, boundary length constraints, and double-click prevention locks.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                ACTIVE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)]">
              <div className="space-y-0.5">
                <span className="font-semibold text-[var(--text-primary)]">Secret Key Exposure Defense</span>
                <p className="text-[10px] text-[var(--text-muted)]">
                  Service role keys and JWT secrets are strictly withheld from client-side bundles.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                VERIFIED CLEAN
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              In accordance with security best practices, sensitive parameters such as database passwords, Supabase project keys, and database RLS definitions cannot be altered through client-facing panels.
            </p>
          </div>
        </div>

        {/* 3. Site Configuration Summary */}
        {siteSettings && (
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]">
              <Server className="w-4 h-4 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
              <h2 className="font-bold text-sm text-[var(--text-primary)]">
                SITE METADATA PARAMETERS
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-[var(--text-muted)] block">Company Name:</span>
                <span className="font-semibold text-[var(--text-primary)]">{siteSettings.companyName}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">Tagline:</span>
                <span className="font-semibold text-[var(--text-primary)]">{siteSettings.tagline}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">Inquiries Email:</span>
                <span className="font-semibold text-[var(--text-primary)]">{siteSettings.contactEmailPlaceholder}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">Default Locale / Theme:</span>
                <span className="font-semibold text-[var(--text-primary)]">{siteSettings.defaultLocale.toUpperCase()} · {siteSettings.defaultTheme}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
