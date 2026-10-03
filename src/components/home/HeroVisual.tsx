import React from 'react';
import { 
  Calculator, 
  Building2, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Wifi, 
  Battery, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface HeroVisualProps {
  className?: string;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative w-full max-w-[560px] mx-auto lg:max-w-none select-none py-4 sm:py-6',
        className
      )}
      aria-label="BDCON Labs software product workspace showcase"
      role="img"
    >
      {/* Ambient Brand Backlight Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[260px] sm:h-[320px] bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative">
        {/* =========================================================================
         * LAYER 1 (Back-Left): CivilDesk — Institutional Engineering Platform
         * (CUSTOM SOFTWARE)
         * ========================================================================= */}
        <div 
          className="absolute -top-3 sm:-top-5 -left-1 sm:-left-3 w-[78%] sm:w-[70%] rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/95 shadow-sm opacity-85 dark:opacity-75 transform -translate-y-1 scale-[0.98] origin-top-left pointer-events-none transition-all duration-300 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 border-b border-[var(--border-color)] bg-[var(--bg-canvas)]/60 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--border-strong)] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[var(--border-strong)] opacity-40" />
              <span className="w-2 h-2 rounded-full bg-[var(--border-strong)] opacity-30" />
              <div className="flex items-center gap-1 ml-1 text-[var(--text-secondary)] font-medium">
                <ShieldCheck className="w-3 h-3 text-[var(--color-brand)]" />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-tight">CivilDesk</span>
                <span className="text-[var(--text-muted)] text-[9px] hidden sm:inline">• cdesk.xyz</span>
              </div>
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              CUSTOM SOFTWARE
            </span>
          </div>

          {/* Peek Interface Content */}
          <div className="p-2.5 sm:p-3 space-y-1.5 font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)]">
            <div className="flex items-center justify-between pb-1 border-b border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)] font-semibold">Institutional Engineering Portal</span>
              <span className="text-[var(--color-success)] text-[9px]">● Active</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[9px] text-[var(--text-muted)]">
              <div className="p-1 rounded bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)]">
                <span className="block text-[8px] text-[var(--text-muted)]">SYSTEM</span>
                <span className="text-[var(--text-primary)] font-medium">Structural Audit</span>
              </div>
              <div className="p-1 rounded bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)]">
                <span className="block text-[8px] text-[var(--text-muted)]">DEPLOYMENT</span>
                <span className="text-[var(--text-primary)] font-medium">Govt / Banking</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
         * LAYER 2 (Center-Front Main Stage): SalaryBD & BuildEst BD Workspace
         * (WEB APPLICATIONS)
         * ========================================================================= */}
        <div className="relative z-10 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-lg overflow-hidden transition-all duration-300">
          {/* Main Workspace Browser Chrome & Product Tab Switcher */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
            {/* Window Dots & Tab Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 dark:bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 dark:bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 dark:bg-emerald-500/60" />
              </div>

              {/* Active Tab: SalaryBD */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs">
                <div className="w-3.5 h-3.5 rounded bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[9px]">
                  ৳
                </div>
                <span className="font-semibold text-xs text-[var(--text-primary)] tracking-tight">
                  SalaryBD
                </span>
                <span className="text-[10px] text-[var(--text-muted)] hidden md:inline font-bangla-sans">
                  (বেতন নির্ধারণ)
                </span>
              </div>

              {/* Secondary Tab: BuildEst BD */}
              <div className="hidden xs:flex items-center gap-1.5 px-2 py-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors text-xs">
                <Layers className="w-3 h-3 text-[var(--color-brand)]" />
                <span className="font-medium text-[11px]">BuildEst BD</span>
              </div>
            </div>

            {/* Subtle Label */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand-muted)] font-medium">
                WEB APPLICATIONS
              </span>
            </div>
          </div>

          {/* Sub-header Bar: Workflow Selection */}
          <div className="px-3.5 sm:px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bangla-sans font-medium text-[var(--text-secondary)] text-[11px] sm:text-xs">
                জাতীয় বেতন স্কেল ২০২৬ • পে ডিটারমিনেশন
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)]">
              <span>Grade 09</span>
              <ChevronDown className="w-2.5 h-2.5 text-[var(--text-muted)]" />
            </div>
          </div>

          {/* Calculator Interface & Computation Grid */}
          <div className="p-3.5 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Left Column: Structured Input Fields */}
            <div className="sm:col-span-7 space-y-2">
              {/* Row 1: Basic Pay */}
              <div className="p-2 sm:p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/70 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] sm:text-[11px] text-[var(--text-muted)] font-bangla-sans">
                    মূল বেতন (Basic Pay)
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] font-mono">
                    ৳ ২২,০০০
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-1.5 py-0.5 rounded">
                  Scale: 9
                </span>
              </div>

              {/* Row 2: Allowances (House Rent & Medical) */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/40">
                  <span className="block text-[9px] sm:text-[10px] text-[var(--text-muted)] font-bangla-sans">
                    বাড়ি ভাড়া (৪৫%)
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-primary)] font-mono">
                    ৳ ৯,৯০০
                  </span>
                </div>
                <div className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/40">
                  <span className="block text-[9px] sm:text-[10px] text-[var(--text-muted)] font-bangla-sans">
                    চিকিৎসা ভাতা
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-primary)] font-mono">
                    ৳ ১,৫০০
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Structured Output Card */}
            <div className="sm:col-span-5 rounded-lg border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 sm:p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bangla-sans text-emerald-800 dark:text-emerald-300 font-medium">
                <span>নীট প্রদেয় বেতন</span>
                <span className="text-[9px] font-mono uppercase tracking-wider bg-emerald-500/10 px-1 rounded">
                  NET
                </span>
              </div>
              <div className="font-mono text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                ৳ ৩১,২০০
              </div>
              <div className="pt-1 border-t border-emerald-500/20 text-[9px] sm:text-[10px] text-[var(--text-muted)] space-y-0.5 font-mono">
                <div className="flex justify-between">
                  <span>মোট বেতন:</span>
                  <span className="text-[var(--text-secondary)]">৳ ৩৩,৪০০</span>
                </div>
                <div className="flex justify-between">
                  <span>জিপিএফ কর্তন:</span>
                  <span className="text-rose-500/90">- ৳ ২,২০০</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar: System Status */}
          <div className="px-3.5 sm:px-4 py-2 bg-[var(--bg-surface-subtle)]/70 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5 font-medium text-[var(--text-secondary)]">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span className="font-bangla-sans">সরকারি নিয়মমাফিক নির্ভুল হিসাব</span>
            </div>
            <span className="font-mono text-[9px] text-[var(--text-muted)]">
              salarybd.online
            </span>
          </div>
        </div>

        {/* =========================================================================
         * LAYER 3 (Front-Right / Floating Mobile App): Civil Estimator BD
         * (MOBILE APPS)
         * ========================================================================= */}
        <div 
          className="hidden xs:block absolute -bottom-3 sm:-bottom-5 -right-2 sm:-right-4 w-[45%] sm:w-[40%] max-w-[210px] rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] shadow-xl z-20 overflow-hidden transform hover:-translate-y-0.5 transition-transform duration-200"
          aria-label="Civil Estimator BD mobile app preview"
        >
          {/* Mobile Status Bar */}
          <div className="flex items-center justify-between px-2.5 py-1 bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] text-[8px] font-mono text-[var(--text-muted)]">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Mobile App Header */}
          <div className="px-2.5 py-1.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-[var(--color-brand)]" />
              <span className="font-bold text-[10px] text-[var(--text-primary)] tracking-tight">
                Civil Estimator
              </span>
            </div>
            <span className="text-[7.5px] font-mono font-medium px-1 py-0.2 rounded bg-[var(--color-brand-subtle)] text-[var(--color-brand)]">
              MOBILE
            </span>
          </div>

          {/* Mobile Content Takeoff List */}
          <div className="p-2 space-y-1 font-mono text-[8.5px] text-[var(--text-muted)] bg-[var(--bg-surface-subtle)]/50">
            <div className="p-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[var(--text-secondary)] font-medium">Concrete M20</span>
              <span className="text-[var(--color-brand)] font-semibold">12.5 m³</span>
            </div>
            <div className="p-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[var(--text-secondary)] font-medium">Brickwork 1:4</span>
              <span className="text-[var(--text-primary)] font-semibold">1,450 pcs</span>
            </div>
            <div className="p-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[var(--text-secondary)] font-medium">Steel Rebar</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">850 kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
