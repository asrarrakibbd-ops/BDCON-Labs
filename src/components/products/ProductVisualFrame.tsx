import React from 'react';
import { Layers, Compass, Ruler, Calculator, ShieldCheck, Binary, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Product } from '../../types/product';

export interface ProductVisualFrameProps {
  product: Product;
  className?: string;
}

export const ProductVisualFrame: React.FC<ProductVisualFrameProps> = ({
  product,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between shadow-xs select-none group hover:border-[var(--border-strong)] transition-all duration-300',
        className
      )}
      role="img"
      aria-label={`${product.name} interface preview frame`}
    >
      {/* Precision CAD Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Subtle brand glow behind center mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-brand)]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top Application Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-5 py-3 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-40" />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)] ml-2 hidden sm:inline">
            buildest.bd / workspace / v1.0
          </span>
          <span className="font-mono text-[11px] text-[var(--text-muted)] ml-2 sm:hidden">
            buildest.bd
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-[var(--text-muted)] hidden sm:inline">ENGINE: TAKEOFF</span>
          <span className="text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-2.5 py-0.5 rounded font-semibold border border-[var(--color-brand-muted)]">
            ESTIMATION ACTIVE
          </span>
        </div>
      </div>

      {/* Center Technical Blueprint & Architecture Representation */}
      <div className="relative z-10 flex-1 p-5 sm:p-6 flex flex-col justify-center items-center text-center space-y-4">
        {/* Geometric CAD Logo Emblem */}
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] shadow-xs flex items-center justify-center text-[var(--color-brand)] group-hover:border-[var(--color-brand)] transition-colors">
            <Ruler className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-brand)] border-2 border-[var(--bg-surface)] animate-ping" />
        </div>

        <div className="space-y-1 max-w-sm">
          <h4 className="type-h3 text-[var(--text-primary)] font-bold tracking-tight">
            {product.name}
          </h4>
          <p className="type-caption text-[var(--text-muted)] font-mono text-xs">
            Building Estimation &amp; Quantity Surveying System
          </p>
        </div>

        {/* Technical Capability Modules */}
        <div className="flex flex-wrap justify-center gap-2 pt-1 max-w-md">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] shadow-2xs">
            <Calculator className="w-3.5 h-3.5 text-[var(--color-brand)]" />
            <span>BOQ Engine</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[var(--color-brand)]" />
            <span>Quantity Surveying</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[var(--color-brand)]" />
            <span>Material Takeoff</span>
          </div>
        </div>
      </div>

      {/* Frame Status Sub-Bar */}
      <div className="relative z-10 px-4 sm:px-5 py-2.5 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand)]" />
          <span className="font-medium text-[var(--text-secondary)]">PROPRIETARY SOFTWARE</span>
        </div>
        <span className="text-[10px] text-[var(--text-muted)]">
          WEB • ANDROID
        </span>
      </div>
    </div>
  );
};
