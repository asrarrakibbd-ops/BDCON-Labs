import React from 'react';
import { 
  Calculator, 
  Ruler, 
  Compass, 
  Smartphone, 
  BookOpen, 
  Lock, 
  Wifi, 
  Battery, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Layers, 
  FileText,
  Code2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type ProjectVisualVariant = 
  | 'calculator'
  | 'enterprise'
  | 'mobile-app'
  | 'engineering'
  | 'editorial';

export interface ProjectShowcaseVisualProps {
  slug?: string;
  variant?: ProjectVisualVariant;
  title?: string;
  subtitle?: string;
  category?: string;
  coverImage?: string;
  technologies?: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Resolves the visual variant from the project slug
 */
export function resolveProjectVariant(slug?: string, fallback?: ProjectVisualVariant): ProjectVisualVariant {
  if (fallback) return fallback;
  if (!slug) return 'engineering';
  
  const s = slug.toLowerCase();
  if (s.includes('salary')) return 'calculator';
  if (s.includes('civildesk') || s.includes('cdesk')) return 'enterprise';
  if (s.includes('civil-estimator') || s.includes('estimator')) return 'mobile-app';
  if (s.includes('buildest')) return 'engineering';
  if (s.includes('rakib') || s.includes('asrar') || s.includes('author')) return 'editorial';
  
  return 'engineering';
}

export const ProjectShowcaseVisual: React.FC<ProjectShowcaseVisualProps> = ({
  slug = '',
  variant: propVariant,
  title = '',
  subtitle = '',
  category = '',
  coverImage,
  technologies = [],
  size = 'md',
  className,
}) => {
  const variant = resolveProjectVariant(slug, propVariant);

  // If a genuine uploaded coverImage exists and is not empty
  if (coverImage && coverImage.trim()) {
    return (
      <div
        className={cn(
          'relative w-full rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] shadow-xs select-none',
          size === 'lg' ? 'aspect-[16/10]' : size === 'sm' ? 'aspect-[16/11]' : 'aspect-[16/10]',
          className
        )}
      >
        <img
          src={coverImage}
          alt={`${title} visual showcase`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  // Visual Variant 1: SalaryBD — Calculator & Financial Tool
  if (variant === 'calculator') {
    return (
      <div
        className={cn(
          'relative w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between shadow-xs select-none group-hover:border-emerald-500/50 transition-all duration-300',
          size === 'lg' ? 'aspect-[16/10]' : size === 'sm' ? 'aspect-[16/11]' : 'aspect-[16/10]',
          className
        )}
        role="img"
        aria-label="SalaryBD Calculator Interface Preview"
      >
        {/* Subtle Financial Emerald Ambient Backplate */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-emerald-500/8 via-transparent to-transparent opacity-80" />
        <div
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
            backgroundSize: size === 'lg' ? '24px 24px' : '18px 18px',
          }}
        />

        {/* Top Browser Titlebar */}
        <div className="relative z-10 flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-[10px] text-[var(--text-muted)]">
              <Lock className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
              <span>salarybd.online</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PAY ENGINE 2026</span>
          </div>
        </div>

        {/* Center Calculator Dashboard Presentation */}
        <div className="relative z-10 flex-1 p-3.5 sm:p-5 flex flex-col justify-center space-y-2.5 sm:space-y-3">
          {/* Header Row with Brand Identity */}
          <div className="flex items-center justify-between gap-2 border-b border-[var(--border-color)] pb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-emerald-500/30 bg-emerald-950/10 dark:bg-emerald-950/40 p-1 flex items-center justify-center shrink-0">
                <img
                  src="/images/projects/salarybd-logo.svg"
                  alt="SalaryBD Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to icon if logo fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-[13px] sm:text-[15px] text-[var(--text-primary)] tracking-tight leading-tight">
                  বেতন নির্ধারণ ২০২৬
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono">
                  Salary &amp; Net Take-Home Calculator
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <Calculator className="w-3.5 h-3.5" />
              <span>পে-স্কেল কাঠামো</span>
            </div>
          </div>

          {/* Calculator Breakdown Simulation Panels */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="p-2 sm:p-2.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono block">মূল বেতন</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">৳ ৪২,০০০</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono block">ভাতা সমন্বয়</span>
              <span className="text-xs sm:text-sm font-mono font-semibold text-[var(--text-secondary)]">+৳ ২০,৫০০</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-2 sm:p-2.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono block">আয়কর ও প্রভিডেন্ট ফান্ড</span>
              <span className="text-xs sm:text-sm font-mono font-semibold text-rose-500/90">-৳ ৫,২০০</span>
            </div>
          </div>

          {/* Net Result Bar */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--text-primary)]">
                নিট প্রদেয় মাসিক বেতন
              </span>
            </div>
            <span className="text-sm sm:text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">
              ৳ ৫৭,৩০০
            </span>
          </div>
        </div>

        {/* Frame Status Sub-Bar */}
        <div className="relative z-10 px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-medium">বাংলাদেশ শ্রম আইন ও পে-স্কেল কাঠামো</span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)]">
            WEB APPLICATION
          </span>
        </div>
      </div>
    );
  }

  // Visual Variant 2: CivilDesk — Enterprise & Institutional Engineering
  if (variant === 'enterprise') {
    return (
      <div
        className={cn(
          'relative w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between shadow-xs select-none group-hover:border-blue-500/50 transition-all duration-300',
          size === 'lg' ? 'aspect-[16/10]' : size === 'sm' ? 'aspect-[16/11]' : 'aspect-[16/10]',
          className
        )}
        role="img"
        aria-label="CivilDesk Enterprise Engineering Workspace Preview"
      >
        {/* Subtle Engineering Charcoal / Slate Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-15"
          style={{
            backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
            backgroundSize: size === 'lg' ? '24px 24px' : '16px 16px',
          }}
        />
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top Institutional Header Bar */}
        <div className="relative z-10 flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-40" />
            </div>
            <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-[10px] text-[var(--text-muted)]">
              <span>cdesk.xyz / bb-officials</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-semibold border border-blue-500/20">
            <Building2 className="w-3 h-3" />
            <span>BANGLADESH BANK WORKSPACE</span>
          </div>
        </div>

        {/* Center Structured Engineering Data Table */}
        <div className="relative z-10 flex-1 p-3.5 sm:p-5 flex flex-col justify-center space-y-2.5 sm:space-y-3">
          {/* Identity Header */}
          <div className="flex items-center justify-between gap-2 border-b border-[var(--border-color)] pb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-blue-500/30 bg-slate-900 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                <img
                  src="/images/projects/civildesk-icon.png"
                  alt="CivilDesk Icon"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-[13px] sm:text-[15px] text-[var(--text-primary)] tracking-tight leading-tight">
                  CivilDesk
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono">
                  PWD Schedule Rate Analysis &amp; BOQ Platform
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
              AUDIT-READY
            </span>
          </div>

          {/* Structured Data Table Simulation */}
          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] overflow-hidden font-mono text-[10px] sm:text-[11px]">
            <div className="grid grid-cols-12 px-2.5 py-1.5 bg-[var(--bg-surface)] border-b border-[var(--border-color)] text-[var(--text-muted)] font-semibold text-[9px] sm:text-[10px]">
              <span className="col-span-3">ITEM CODE</span>
              <span className="col-span-5">WORK DESCRIPTION</span>
              <span className="col-span-4 text-right">PWD RATE / UNIT</span>
            </div>
            <div className="grid grid-cols-12 px-2.5 py-1.5 border-b border-[var(--border-color)]/50 items-center">
              <span className="col-span-3 font-semibold text-blue-600 dark:text-blue-400">01.12 · RCC</span>
              <span className="col-span-5 text-[var(--text-secondary)] truncate">1:1.5:3 কলাম ঢালাই</span>
              <span className="col-span-4 text-right font-medium">৳ ৭,৮৫০ / m³</span>
            </div>
            <div className="grid grid-cols-12 px-2.5 py-1.5 items-center bg-[var(--bg-surface)]/40">
              <span className="col-span-3 font-semibold text-blue-600 dark:text-blue-400">04.05 · REBAR</span>
              <span className="col-span-5 text-[var(--text-secondary)] truncate">60-Grade Deformed Bar</span>
              <span className="col-span-4 text-right font-medium">৳ ১২৮ / kg</span>
            </div>
          </div>

          {/* Institutional Compliance Ribbon */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--text-secondary)] px-1">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>পরিমাপ শিট ও শিডিউল রেট যাচাইকরণ</span>
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)]">
              MB Book · Standardized
            </span>
          </div>
        </div>

        {/* Frame Status Sub-Bar */}
        <div className="relative z-10 px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[var(--text-secondary)]">বাংলাদেশ ব্যাংক কর্মকর্তাদের জন্য ডেভেলপকৃত</span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)]">
            ENTERPRISE WEB APP
          </span>
        </div>
      </div>
    );
  }

  // Visual Variant 3: Civil Estimator BD — Mobile Application
  if (variant === 'mobile-app') {
    return (
      <div
        className={cn(
          'relative w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between shadow-xs select-none group-hover:border-cyan-500/50 transition-all duration-300',
          size === 'lg' ? 'aspect-[16/10]' : size === 'sm' ? 'aspect-[16/11]' : 'aspect-[16/10]',
          className
        )}
        role="img"
        aria-label="Civil Estimator BD Android Mobile App Preview"
      >
        {/* Subtle Smartphone Backdrop Atmosphere */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-80" />

        {/* Top Meta Strip */}
        <div className="relative z-10 flex items-center justify-between px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)]">
            <Smartphone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Android Mobile Platform</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full font-semibold border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span>LIVE ANDROID APP</span>
          </div>
        </div>

        {/* Center: Realistic Android Phone Frame Simulation */}
        <div className="relative z-10 flex-1 p-3 sm:p-4 flex items-center justify-center">
          <div className="w-full max-w-[280px] sm:max-w-[320px] rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] shadow-sm overflow-hidden flex flex-col">
            {/* Phone Top Notch / Speaker Slit */}
            <div className="pt-1.5 pb-1 px-3 bg-[var(--bg-surface-subtle)] flex items-center justify-between border-b border-[var(--border-color)]/60 text-[9px] font-mono text-[var(--text-muted)]">
              <span>09:41</span>
              <div className="w-10 h-1 bg-[var(--border-strong)] rounded-full mx-auto" />
              <div className="flex items-center gap-1">
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Mobile App Bar */}
            <div className="px-3 py-2 bg-cyan-600 dark:bg-cyan-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-100" />
                <span className="font-bold text-xs tracking-tight">Civil Estimator BD</span>
              </div>
              <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.5 rounded">v2.4</span>
            </div>

            {/* In-App Calculator UI Screen */}
            <div className="p-2.5 sm:p-3 space-y-2 bg-[var(--bg-surface)] text-[10px]">
              <div className="flex items-center justify-between text-[var(--text-secondary)] font-medium">
                <span>কংক্রিট উপাদান (1:1.5:3)</span>
                <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400">সাইট ক্যালকুলেটর</span>
              </div>

              {/* 3 Material Badges */}
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                <div className="p-1.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
                  <span className="text-[8px] text-[var(--text-muted)] block">সিমেন্ট</span>
                  <span className="font-bold text-[10px] text-cyan-600 dark:text-cyan-400">ব্যাগ</span>
                </div>
                <div className="p-1.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
                  <span className="text-[8px] text-[var(--text-muted)] block">বালু</span>
                  <span className="font-bold text-[10px] text-[var(--text-primary)]">cft</span>
                </div>
                <div className="p-1.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
                  <span className="text-[8px] text-[var(--text-muted)] block">খোয়া</span>
                  <span className="font-bold text-[10px] text-[var(--text-primary)]">cft</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-0.5">
                <div className="w-full py-1 text-center font-semibold text-[10px] text-white bg-cyan-600 rounded-md shadow-2xs">
                  হিসাব সম্পন্ন করুন
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frame Status Sub-Bar */}
        <div className="relative z-10 px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
            <Ruler className="w-3.5 h-3.5" />
            <span className="font-medium">সাইট ও মাঠপর্যায়ের সিভিল এস্টিমেশন</span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)]">
            ANDROID APPLICATION
          </span>
        </div>
      </div>
    );
  }

  // Visual Variant 4: BuildEst BD — Construction & QS Software
  if (variant === 'engineering') {
    return (
      <div
        className={cn(
          'relative w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between shadow-xs select-none group-hover:border-[var(--color-brand)] transition-all duration-300',
          size === 'lg' ? 'aspect-[16/10]' : size === 'sm' ? 'aspect-[16/11]' : 'aspect-[16/10]',
          className
        )}
        role="img"
        aria-label="BuildEst BD Construction & Quantity Surveying Software Preview"
      >
        {/* Precision CAD Architectural Grid Backplate */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
          style={{
            backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
            backgroundSize: size === 'lg' ? '28px 28px' : '20px 20px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-brand)]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Top Browser Titlebar */}
        <div className="relative z-10 flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-40" />
            </div>
            <span className="font-mono text-[10px] text-[var(--text-muted)] ml-2">
              buildest.bd / takeoff / v1.0
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-2 py-0.5 rounded font-semibold border border-[var(--color-brand-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
            <span>BOQ &amp; TAKEOFF ENGINE</span>
          </div>
        </div>

        {/* Center Technical Blueprint & Architecture Representation */}
        <div className="relative z-10 flex-1 p-3.5 sm:p-5 flex flex-col justify-center items-center text-center space-y-3">
          <div className="relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] shadow-xs flex items-center justify-center text-[var(--color-brand)] group-hover:border-[var(--color-brand)] transition-colors">
              <Ruler className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-1 max-w-sm">
            <h4 className="type-h4 text-[var(--text-primary)] font-bold tracking-tight">
              BuildEst BD
            </h4>
            <p className="type-caption text-[var(--text-muted)] font-mono text-xs">
              Quantity Surveying &amp; BOQ Documentation
            </p>
          </div>

          {/* Capability Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-1 max-w-xs sm:max-w-sm">
            <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)] shadow-2xs">
              স্বয়ংক্রিয় BOQ
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)] shadow-2xs">
              কোয়ান্টিটি সার্ভে
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)] shadow-2xs">
              মেটেরিয়াল টেকঅফ
            </span>
          </div>
        </div>

        {/* Frame Status Sub-Bar */}
        <div className="relative z-10 px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--color-brand)]" />
            <span className="font-medium text-[var(--text-secondary)]">BDCON Labs Proprietary Software</span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)]">
            WEB &amp; ANDROID
          </span>
        </div>
      </div>
    );
  }

  // Visual Variant 5: Rakib Asrar — Editorial & Author Website
  return (
    <div
      className={cn(
        'relative w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface-elevated)] overflow-hidden flex flex-col justify-between shadow-xs select-none group-hover:border-amber-600/40 transition-all duration-300',
        size === 'lg' ? 'aspect-[16/10]' : size === 'sm' ? 'aspect-[16/11]' : 'aspect-[16/10]',
        className
      )}
      role="img"
      aria-label="Rakib Asrar Official Author Website Preview"
    >
      {/* Warm Literary Texture Background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-60" />

      {/* Top Editorial Browser Titlebar */}
      <div className="relative z-10 flex items-center justify-between px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-20" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-[10px] text-[var(--text-muted)]">
            <BookOpen className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
            <span>asrarbd.vercel.app</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-amber-800 dark:text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-semibold border border-amber-500/20">
          <span>AUTHOR &amp; ESSAYIST</span>
        </div>
      </div>

      {/* Center Editorial Showcase with Real Book Assets */}
      <div className="relative z-10 flex-1 p-3.5 sm:p-5 flex items-center justify-between gap-4">
        {/* Left Literary Description */}
        <div className="space-y-1.5 sm:space-y-2 flex-1 text-left">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold">
            <FileText className="w-3 h-3" />
            <span>সাহিত্য ও গবেষণা</span>
          </div>
          <h4 className="font-bangla-serif text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight leading-tight">
            রাকিব আসরার
          </h4>
          <p className="font-bangla-serif text-[11px] sm:text-xs text-[var(--text-secondary)] italic line-clamp-2 leading-relaxed">
            &ldquo;সাহিত্য, দর্শন ও বুদ্ধিবৃত্তিক চিন্তার নিভৃত পরিসর&rdquo;
          </p>
          <div className="pt-1 flex flex-wrap gap-1 text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)]">
            <span>• গ্রন্থসমগ্র</span>
            <span>• প্রবন্ধ আর্কাইভ</span>
          </div>
        </div>

        {/* Right: Actual Real Book Covers from Project */}
        <div className="flex items-center -space-x-4 sm:-space-x-6 shrink-0 pr-2">
          {/* Book 1: তিলের ছায়া */}
          <div className="w-16 sm:w-20 aspect-[2/3] rounded-md overflow-hidden shadow-md border border-[var(--border-color)] transform -rotate-3 transition-transform group-hover:-rotate-6 bg-[var(--bg-surface-subtle)]">
            <img
              src="/images/rakib-asrar/books/tiler-chaya.jpg"
              alt="তিলের ছায়া বইয়ের প্রচ্ছদ"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Book 2: পরজীবী */}
          <div className="w-16 sm:w-20 aspect-[2/3] rounded-md overflow-hidden shadow-lg border border-[var(--border-color)] transform rotate-3 transition-transform group-hover:rotate-6 bg-[var(--bg-surface-subtle)]">
            <img
              src="/images/rakib-asrar/books/porojibi.jpg"
              alt="পরজীবী বইয়ের প্রচ্ছদ"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Frame Status Sub-Bar */}
      <div className="relative z-10 px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="font-bangla-serif text-[11px] text-[var(--text-secondary)]">প্রকাশিত বই ও সাহিত্য রচনা</span>
        </div>
        <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)]">
          EDITORIAL WEBSITE
        </span>
      </div>
    </div>
  );
};
