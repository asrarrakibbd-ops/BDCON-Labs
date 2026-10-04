// ==============================================================================
// BDCON Labs — Private Admin Application Shell
// Stage 16B: Dedicated administrative navigation, header, and content workspace
// ==============================================================================

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  MessageSquare, 
  Layers, 
  Wrench, 
  FolderKanban, 
  FileText, 
  BookMarked, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  User as UserIcon,
  ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useRouter, Link } from '../../lib/router';
import { Button } from '../ui/Button';
import { SEO } from '../common/SEO';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSwitcher } from '../navigation/LanguageSwitcher';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs,
}) => {
  const { user, role, signOut } = useAdminAuth();
  const { isBangla } = useTranslation();
  const { path, navigate } = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { label: isBangla ? 'ড্যাশবোর্ড' : 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: isBangla ? 'প্রজেক্ট রিকোয়েস্ট' : 'Project Requests', path: '/admin/project-requests', icon: ClipboardList },
    { label: isBangla ? 'মেসেজ ও ইনকোয়ারি' : 'Contact Messages', path: '/admin/messages', icon: MessageSquare },
    { label: isBangla ? 'প্রোডাক্টস' : 'Products', path: '/admin/products', icon: Layers },
    { label: isBangla ? 'সার্ভিসেস' : 'Services', path: '/admin/services', icon: Wrench },
    { label: isBangla ? 'পোর্টফোলিও' : 'Portfolio', path: '/admin/portfolio', icon: FolderKanban },
    { label: isBangla ? 'প্রবন্ধ ও ব্লগ' : 'Writing & Blog', path: '/admin/blog', icon: FileText },
    { label: isBangla ? 'প্রকাশিত বই' : 'Books', path: '/admin/books', icon: BookMarked },
    { label: isBangla ? 'সেটিংস' : 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const isActive = (itemPath: string) => {
    if (itemPath === '/admin') {
      return path === '/admin';
    }
    return path.startsWith(itemPath);
  };

  // Keyboard and Focus Trap for Mobile Drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          hamburgerButtonRef.current?.focus();
          return;
        }

        if (e.key === 'Tab' && mobileDrawerRef.current) {
          const focusable = mobileDrawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]'
          );
          if (focusable.length === 0) return;

          const firstEl = focusable[0];
          const lastEl = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col antialiased selection:bg-[var(--color-brand-muted)] selection:text-[var(--color-brand)]">
      <SEO
        title={title ? `${title} — BDCON Labs Admin` : 'Admin Workspace — BDCON Labs'}
        description="Administrative management workspace."
        canonicalPath={path}
        noindex={true}
      />

      {/* Accessible Skip Link for Keyboard Navigation */}
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[var(--color-brand)] text-white text-xs font-semibold rounded-md shadow-lg outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand)] font-mono"
      >
        Skip to administrative content
      </a>

      {/* 1. Global Admin Topbar */}
      <header className="sticky top-0 z-30 h-14 sm:h-16 border-b border-[var(--border-color)] bg-[var(--bg-surface)]/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile hamburger button */}
          <button
            ref={hamburgerButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="admin-mobile-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>

          {/* Admin Identity Logo */}
          <Link 
            to="/admin" 
            className="flex items-center gap-2 sm:gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-lg p-1 min-h-[44px]"
            aria-label="BDCON Labs Admin Dashboard"
          >
            <span className="w-8 h-8 rounded-lg bg-[var(--color-brand)] text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs shrink-0" aria-hidden="true">
              BD
            </span>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-[var(--text-primary)] font-mono">
                BDCON LABS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-strong)] text-[var(--color-brand)] font-semibold uppercase tracking-wider">
                ADMIN
              </span>
            </div>
          </Link>
        </div>

        {/* Right actions: Language Switcher + User chip + Public Site link + Logout */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs font-mono">
          <LanguageSwitcher compact />

          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] min-h-[44px]"
            aria-label="Return to public BDCON Labs website"
          >
            <span>{isBangla ? 'মূল ওয়েবসাইট' : 'Public Site'}</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          {/* User Role Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand)]" aria-hidden="true" />
            <span className="text-[var(--text-primary)] font-semibold truncate max-w-[140px]" title={user?.email || ''}>
              {user?.email}
            </span>
            <span className="text-[10px] uppercase font-bold text-[var(--color-brand)]">
              {role || 'admin'}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            leftIcon={<LogOut className="w-3.5 h-3.5" />}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--color-error)] min-h-[44px] min-w-[44px] px-2.5 sm:px-3"
            aria-label="Log out of administrative session"
          >
            <span className="hidden sm:inline">{isBangla ? 'লগআউট' : 'Logout'}</span>
          </Button>
        </div>
      </header>

      {/* 2. Admin Body (Sidebar + Main Workspace) */}
      <div className="flex-1 flex overflow-hidden w-full max-w-full">
        {/* Desktop Sidebar */}
        <aside 
          aria-label="Administrative navigation sidebar" 
          className="hidden md:flex w-60 border-r border-[var(--border-color)] bg-[var(--bg-surface)] flex-col shrink-0"
        >
          <div className="flex-1 p-3 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              {isBangla ? 'অ্যাডমিন কন্ট্রোল প্যানেল' : 'MANAGEMENT WORKSPACE'}
            </div>
            <nav aria-label="Admin Navigation Items" className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors select-none min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] ${
                      active
                        ? 'bg-[var(--color-brand)] text-white font-semibold shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)] space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-primary)]">
              <UserIcon className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
              <span className="truncate" title={user?.email || ''}>{user?.email}</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">
              RLS Policy Enforcement Active
            </p>
          </div>
        </aside>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div 
            id="admin-mobile-drawer"
            className="fixed inset-0 z-40 md:hidden flex"
            role="dialog"
            aria-modal="true"
            aria-label="Administrative navigation menu"
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
              onClick={() => {
                setMobileMenuOpen(false);
                hamburgerButtonRef.current?.focus();
              }}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <div 
              ref={mobileDrawerRef}
              className="relative w-72 max-w-[85vw] bg-[var(--bg-surface)] border-r border-[var(--border-color)] h-full flex flex-col p-4 z-50 shadow-2xl animate-in slide-in-from-left duration-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                <span className="text-xs font-mono font-bold uppercase text-[var(--color-brand)]">
                  {isBangla ? 'অ্যাডমিন নেভিগেশন' : 'ADMIN NAVIGATION'}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    hamburgerButtonRef.current?.focus();
                  }}
                  className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile Admin Navigation" className="flex-1 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-medium transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] ${
                        active
                          ? 'bg-[var(--color-brand)] text-white font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs text-[var(--text-secondary)] py-2.5 px-3 rounded-lg hover:bg-[var(--bg-surface-subtle)] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                >
                  <span>{isBangla ? 'মূল ওয়েবসাইটে ফিরে যান' : 'Return to Public Site'}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--color-error)] font-semibold flex items-center justify-center gap-2 min-h-[44px] cursor-pointer hover:bg-[var(--color-error-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-error)]"
                  aria-label="Log out of administrative session"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  <span>{isBangla ? 'লগআউট' : 'Logout'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Workspace */}
        <main 
          id="admin-main-content" 
          tabIndex={-1} 
          className="flex-1 min-w-0 max-w-full overflow-y-auto overflow-x-hidden p-3.5 sm:p-6 lg:p-8 space-y-6 focus:outline-none"
        >
          {/* Breadcrumbs & Section Title if provided */}
          {(title || breadcrumbs) && (
            <div className="space-y-1 pb-4 border-b border-[var(--border-color)]">
              {breadcrumbs && breadcrumbs.length > 0 && (
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)] flex-wrap">
                  {breadcrumbs.map((bc, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <ChevronRight className="w-3 h-3 text-[var(--border-strong)] shrink-0" aria-hidden="true" />}
                      {bc.href ? (
                        <Link 
                          to={bc.href} 
                          className="hover:text-[var(--text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-brand)] rounded px-1"
                        >
                          {bc.label}
                        </Link>
                      ) : (
                        <span className="text-[var(--text-primary)] font-semibold px-1" aria-current="page">
                          {bc.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}

              {title && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] font-mono">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Child View with smooth Framer Motion transition */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={path}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
