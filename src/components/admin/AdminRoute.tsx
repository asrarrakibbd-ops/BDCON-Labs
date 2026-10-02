// ==============================================================================
// BDCON Labs — Admin Route Authorization Guard
// Stage 14: Protects private administrative views against unauthorized access
// ==============================================================================

import React, { useEffect, ReactNode } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useRouter } from '../../lib/router';
import { ShieldAlert, Loader2 } from 'lucide-react';

export interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAdmin, isLoading } = useAdminAuth();
  const { navigate, path } = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || !isAdmin) {
        // Redirect unauthorized users to login page
        navigate('/admin/login', { replace: true });
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  // Loading state prevents flashing private content before session verification
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs max-w-sm w-full mx-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/20 flex items-center justify-center text-[var(--color-brand)]">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="type-h3 text-sm font-bold uppercase tracking-wider font-mono text-[var(--text-primary)]">
              BDCON Labs Security
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Verifying administrative session &amp; role credentials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated or not authorized, render nothing while redirect occurs
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-canvas)]">
        <div className="text-center space-y-2 p-6">
          <ShieldAlert className="w-8 h-8 text-[var(--color-brand)] mx-auto animate-pulse" />
          <p className="text-xs font-mono text-[var(--text-muted)]">
            Redirecting to administrative authentication...
          </p>
        </div>
      </div>
    );
  }

  // Authorized Administrator
  return <>{children}</>;
};
