import React from 'react';
import { Layers, Cpu, Code2, CheckCircle2, GitBranch, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export const HeroVisual: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-[560px] mx-auto lg:max-w-none flex items-center justify-center select-none',
        className
      )}
      aria-label="BDCON Labs software engineering visual composition"
      role="img"
    >
      {/* Background Backplate with Precision Coordinate Lines */}
      <div
        className="absolute inset-0 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/80 overflow-hidden shadow-xs"
        style={{
          backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      >
        {/* Soft internal brand glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--color-brand)]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary Elevated Engineering Window */}
      <div className="relative z-10 w-[92%] sm:w-[90%] rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-md overflow-hidden transition-all duration-300 hover:border-[var(--border-strong)]">
        {/* Window Chrome / Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-40" />
            <span className="font-mono text-[11px] text-[var(--text-muted)] ml-2">
              bdcon.architecture.workspace
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-2 py-0.5 rounded border border-[var(--color-brand-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
            <span>CORE // STABLE</span>
          </div>
        </div>

        {/* Interior Architecture Grid */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Top Nodes Row: Software Pipeline */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  NODE 01
                </span>
                <Code2 className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)]">
                Proprietary Products
              </p>
              <p className="type-caption text-[11px] text-[var(--text-muted)]">
                e.g. BuildEst BD &amp; domain tools
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  NODE 02
                </span>
                <Layers className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)]">
                Client Solutions
              </p>
              <p className="type-caption text-[11px] text-[var(--text-muted)]">
                Tailored web &amp; mobile software
              </p>
            </div>
          </div>

          {/* Connected Flow Indicator */}
          <div className="p-3.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] font-mono text-[11px] text-[var(--text-secondary)] space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pb-1 border-b border-[var(--border-color)]/60">
              <div className="flex items-center gap-1.5">
                <GitBranch className="w-3 h-3 text-[var(--color-brand)]" />
                <span>EXECUTION PIPELINE</span>
              </div>
              <span className="text-[var(--color-brand)] font-semibold">100% TYPE-SAFE</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-[var(--text-muted)]">Requirements</span>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
              <span className="text-[var(--color-brand)] font-semibold">Architecture</span>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
              <span className="text-[var(--text-primary)] font-semibold">Production</span>
            </div>
          </div>

          {/* Sub-bar: Telemetry Badges */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
              <span className="font-medium text-[var(--text-secondary)]">
                Engineered for Reliability
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">
              BUILD: DETERMINISTIC
            </span>
          </div>
        </div>
      </div>

      {/* Floating Accent Capsule (Top-Right) */}
      <div className="hidden xs:flex absolute -top-3 sm:-top-4 right-1 sm:-right-4 z-20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-md text-xs font-semibold text-[var(--text-primary)] items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--color-brand)]" aria-hidden="true" />
        <span className="font-mono text-[10px] sm:text-[11px]">Software Products</span>
      </div>

      {/* Floating Accent Capsule (Bottom-Left) */}
      <div className="hidden xs:flex absolute -bottom-3 sm:-bottom-4 left-1 sm:-left-4 z-20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-md text-xs font-semibold text-[var(--text-primary)] items-center gap-2">
        <Cpu className="w-3.5 h-3.5 text-[var(--color-brand)]" aria-hidden="true" />
        <span className="font-mono text-[10px] sm:text-[11px]">Custom Digital Systems</span>
      </div>
    </div>
  );
};
