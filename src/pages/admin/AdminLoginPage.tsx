// ==============================================================================
// BDCON Labs — Admin Login Page (/admin/login)
// Stage 14: Secure administrative authentication portal
// Typography: Dignified Noto Serif Bengali headings paired with Hind Siliguri UI
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  ArrowLeft, 
  KeyRound, 
  CheckCircle2,
  Shield
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useRouter, Link } from '../../lib/router';
import { Button } from '../../components/ui/Button';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import { SEO } from '../../components/common/SEO';
import { useTranslation } from '../../hooks/useTranslation';

export const AdminLoginPage: React.FC = () => {
  const { user, isAdmin, isLoading, signIn } = useAdminAuth();
  const { navigate } = useRouter();
  const { isBangla } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password flow state
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const errorAlertRef = React.useRef<HTMLDivElement>(null);

  // If already authenticated and verified as admin, redirect to dashboard
  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    document.title = isBangla 
      ? 'প্রশাসনিক প্রবেশ — বিডিকন ল্যাবস' 
      : 'Admin Sign In — BDCON Labs';
  }, [isBangla]);

  useEffect(() => {
    if (errorMessage && errorAlertRef.current) {
      errorAlertRef.current.focus();
    }
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !password) {
      setErrorMessage(
        isBangla
          ? 'অনুগ্রহ করে অ্যাডমিন ইমেইল এবং পাসওয়ার্ড দুটোই প্রদান করুন।'
          : 'Please enter both email and password.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await signIn(email.trim(), password);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMessage(
        result.error ||
          (isBangla
            ? 'ভুল ইমেইল অথবা পাসওয়ার্ড প্রদান করা হয়েছে। অনুগ্রহ করে যাচাই করে আবার চেষ্টা করুন।'
            : 'Invalid credentials. Please verify and try again.')
      );
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMessage(
        isBangla
          ? 'অনুগ্রহ করে আপনার অ্যাডমিন ইমেইল ঠিকানা প্রদান করুন।'
          : 'Please enter your administrator email address.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Secure response: Never disclose account existence or passwords
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.resetPasswordForEmail(trimmed, {
          redirectTo: window.location.origin + '/admin/login',
        });
      } catch {
        // Suppress errors to avoid timing attacks or user enumeration
      }
    }

    setResetSent(true);
    setResetMessage(
      isBangla
        ? 'যদি এই ইমেইলটি অনুমোদিত অ্যাডমিন হিসেবে নিবন্ধিত থাকে, তবে প্রয়োজনীয় নির্দেশনাবলী পাঠানো হয়েছে।'
        : 'If an authorized administrative account exists for this address, instructions have been dispatched.'
    );
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-canvas)] p-4 sm:p-6 antialiased selection:bg-[var(--color-brand-muted)] selection:text-[var(--color-brand)]">
      <SEO
        title={isBangla ? 'প্রশাসনিক প্রবেশ — বিডিকন ল্যাবস' : 'Admin Sign In — BDCON Labs'}
        description="Authorized administrative access portal for BDCON Labs."
        canonicalPath="/admin/login"
        noindex={true}
      />

      {/* Top utility bar: Return link & restriction status */}
      <div className="w-full max-w-md mb-4 sm:mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bangla-sans text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors min-h-[44px] py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-md"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{isBangla ? 'মূল ওয়েবসাইটে ফিরে যান' : 'Return to Public Site'}</span>
        </Link>
        <span className="inline-flex items-center gap-1 text-[11px] font-bangla-sans text-[var(--text-muted)] px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)]">
          <Shield className="w-3 h-3 text-[var(--color-brand)]" aria-hidden="true" />
          <span>{isBangla ? 'সংরক্ষিত অ্যাডমিন প্যানেল' : 'RESTRICTED ACCESS'}</span>
        </span>
      </div>

      {/* Main Administrative Card */}
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-sm space-y-6">
        {/* Brand Header with Noto Serif Bengali and Hind Siliguri */}
        <div className="space-y-2.5 text-center">
          <div 
            className="w-12 h-12 rounded-xl bg-[var(--color-brand)] text-white mx-auto flex items-center justify-center font-mono font-bold text-base shadow-xs" 
            aria-hidden="true"
          >
            BD
          </div>
          <div className="space-y-1">
            <h1 className="font-bangla-serif text-2xl sm:text-[26px] font-bold tracking-tight text-[var(--text-primary)] leading-snug">
              {isBangla ? 'বিডিকন ল্যাবস অ্যাডমিন' : 'BDCON LABS ADMIN'}
            </h1>
            <p className="font-bangla-sans text-xs text-[var(--text-secondary)] leading-relaxed">
              {isForgotPasswordMode
                ? (isBangla ? 'প্রশাসনিক পাসওয়ার্ড পুনরুদ্ধার ব্যবস্থা' : 'Request administrator password recovery.')
                : (isBangla ? 'অনুমোদিত প্রশাসনিক তথ্য প্রদান করে প্রবেশ করুন' : 'Authorized management credentials required.')}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div 
            ref={errorAlertRef}
            tabIndex={-1}
            id="admin-login-error"
            role="alert"
            className="p-3.5 rounded-xl border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] text-[var(--color-error)] text-xs flex items-start gap-2.5 animate-in fade-in focus:outline-none"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-0.5 font-bangla-sans">
              <p className="font-semibold">{errorMessage}</p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                {isBangla 
                  ? 'সঠিক তথ্য প্রদান করে পুনরায় চেষ্টা করুন।'
                  : 'Access is restricted to authorized administrators.'}
              </p>
            </div>
          </div>
        )}

        {/* Password Reset Sent Notice */}
        {resetSent && (
          <div
            role="status"
            className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5 animate-in fade-in"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1 font-bangla-sans">
              <p className="font-semibold">
                {isBangla ? 'বার্তা প্রেরিত হয়েছে' : 'Instructions dispatched'}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                {resetMessage}
              </p>
            </div>
          </div>
        )}

        {/* Form View: Forgot Password Mode vs Standard Sign In Mode */}
        {isForgotPasswordMode ? (
          <form onSubmit={handleForgotPassword} noValidate className="space-y-4 font-bangla-sans">
            <div className="space-y-1.5">
              <label htmlFor="reset-email" className="text-xs font-semibold text-[var(--text-primary)] block">
                {isBangla ? 'অ্যাডমিন ইমেইল' : 'Administrator Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                <input
                  id="reset-email"
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  disabled={isSubmitting}
                  value={email}
                  aria-invalid={!!errorMessage}
                  aria-describedby={errorMessage ? 'admin-login-error' : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder={isBangla ? 'ইমেইল অ্যাড্রেস লিখুন' : 'admin@bdconlabs.com'}
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] transition-colors font-bangla-sans disabled:opacity-60 min-h-[44px]"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                leftIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                className="w-full min-h-[44px] font-bangla-sans font-semibold text-sm"
              >
                {isSubmitting 
                  ? (isBangla ? 'প্রেরণ করা হচ্ছে...' : 'Sending Instructions...') 
                  : (isBangla ? 'পাসওয়ার্ড পুনরুদ্ধারের আবেদন' : 'Send Password Reset Email')}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setIsForgotPasswordMode(false);
                  setErrorMessage(null);
                  setResetSent(false);
                }}
                className="w-full text-center text-xs font-bangla-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-h-[44px] py-2 transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
              >
                {isBangla ? '← লগইনে ফিরে যান' : '← Back to Administrator Sign In'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 font-bangla-sans">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="text-xs font-semibold text-[var(--text-primary)] block">
                {isBangla ? 'অ্যাডমিন ইমেইল' : 'Administrator Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  disabled={isSubmitting}
                  value={email}
                  aria-invalid={!!errorMessage}
                  aria-describedby={errorMessage ? 'admin-login-error' : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder={isBangla ? 'ইমেইল অ্যাড্রেস লিখুন' : 'admin@bdconlabs.com'}
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] transition-colors font-bangla-sans disabled:opacity-60 min-h-[44px]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="admin-password" className="text-xs font-semibold text-[var(--text-primary)] block">
                  {isBangla ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPasswordMode(true);
                    setErrorMessage(null);
                  }}
                  className="text-[11px] font-bangla-sans text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors cursor-pointer min-h-[44px] inline-flex items-center px-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                >
                  {isBangla ? 'পাসওয়ার্ড মনে নেই?' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  value={password}
                  aria-invalid={!!errorMessage}
                  aria-describedby={errorMessage ? 'admin-login-error' : undefined}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] transition-colors font-mono disabled:opacity-60 min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                leftIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                className="w-full min-h-[44px] font-bangla-sans font-semibold text-sm"
              >
                {isSubmitting 
                  ? (isBangla ? 'যাচাই করা হচ্ছে...' : 'Authenticating...') 
                  : (isBangla ? 'অ্যাডমিন প্যানেলে প্রবেশ করুন' : 'Sign In to Admin')}
              </Button>
            </div>
          </form>
        )}

        {/* Security Badge Footer */}
        <div className="pt-3 border-t border-[var(--border-color)] text-center space-y-1 font-bangla-sans">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            {isBangla ? 'সুরক্ষিত অ্যাডমিন পোর্টাল — বিডিকন ল্যাবস' : 'Protected by BDCON Labs Access Security.'}
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            {isBangla ? 'অননুমোদিত প্রবেশাধিকার কঠোরভাবে নিষিদ্ধ ও নজরদারিকৃত।' : 'Unauthorized access attempts are monitored and recorded.'}
          </p>
        </div>
      </div>
    </div>
  );
};
