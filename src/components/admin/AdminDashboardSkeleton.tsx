import React from 'react';

/**
 * AdminDashboardSkeleton
 * Visually consistent skeleton screen that mimics the exact layout of the Admin Dashboard
 * (Header, Sidebar, KPI Metrics, and Inbound Activity tables) for a smooth perceived load.
 */
export const AdminDashboardSkeleton: React.FC = () => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] animate-pulse"
      aria-busy="true"
      aria-label="Loading Admin Console"
    >
      {/* 1. Header Bar Skeleton */}
      <header className="h-16 w-full border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-4 sm:px-6 flex items-center justify-between shrink-0">
        {/* Left: Brand Identity Placeholder */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
          <div className="space-y-1.5 hidden sm:block">
            <div className="h-3.5 w-24 rounded bg-[var(--bg-surface-subtle)]" />
            <div className="h-2.5 w-16 rounded bg-[var(--bg-surface-subtle)]" />
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-16 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
          <div className="h-8 w-24 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] hidden sm:block" />
          <div className="h-8 w-32 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] hidden lg:block" />
          <div className="h-8 w-18 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
        </div>
      </header>

      {/* 2. Body: Sidebar + Main Content Skeleton */}
      <div className="flex-1 flex overflow-hidden w-full">
        {/* Desktop Sidebar Skeleton */}
        <aside 
          className="hidden md:flex w-60 border-r border-[var(--border-color)] bg-[var(--bg-surface)] flex-col shrink-0 p-3 space-y-4"
          aria-hidden="true"
        >
          {/* Section Eyebrow */}
          <div className="px-3 pt-2">
            <div className="h-2.5 w-28 rounded bg-[var(--bg-surface-subtle)]" />
          </div>

          {/* Navigation Items (8 placeholders) */}
          <div className="space-y-1.5 flex-1">
            <div className="h-9 w-full rounded-lg bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/20" />
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className="h-9 w-full rounded-lg bg-[var(--bg-surface-subtle)]/70 flex items-center px-3 gap-2.5"
              >
                <div className="w-4 h-4 rounded bg-[var(--border-color)] shrink-0" />
                <div 
                  className="h-3 rounded bg-[var(--border-color)]" 
                  style={{ width: `${60 + (i * 9) % 35}%` }} 
                />
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[var(--border-color)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[var(--bg-surface-subtle)]" />
              <div className="h-3 w-28 rounded bg-[var(--bg-surface-subtle)]" />
            </div>
            <div className="h-2 w-36 rounded bg-[var(--bg-surface-subtle)]/60" />
          </div>
        </aside>

        {/* Main Content Workspace Skeleton */}
        <main className="flex-1 min-w-0 overflow-y-auto p-3.5 sm:p-6 lg:p-8 space-y-6">
          {/* Breadcrumb & Title Area */}
          <div className="space-y-2 pb-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-12 rounded bg-[var(--bg-surface-subtle)]" />
              <div className="h-2.5 w-2.5 rounded bg-[var(--bg-surface-subtle)]" />
              <div className="h-2.5 w-16 rounded bg-[var(--bg-surface-subtle)]" />
            </div>
            <div className="h-7 w-48 sm:w-64 rounded-md bg-[var(--bg-surface-subtle)]" />
            <div className="h-3.5 w-72 sm:w-96 rounded bg-[var(--bg-surface-subtle)]/70" />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[var(--bg-surface-subtle)]" />
              <div className="h-3 w-32 rounded bg-[var(--bg-surface-subtle)]" />
            </div>
            <div className="h-8 w-28 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
          </div>

          {/* 4 Metric / KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 rounded bg-[var(--bg-surface-subtle)]" />
                  <div className="w-4 h-4 rounded bg-[var(--bg-surface-subtle)]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="h-8 w-14 rounded bg-[var(--bg-surface-subtle)]" />
                  {i < 2 && <div className="h-4 w-10 rounded bg-amber-500/15" />}
                </div>
                <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                  <div className="h-2.5 w-18 rounded bg-[var(--bg-surface-subtle)]" />
                  <div className="h-2.5 w-6 rounded bg-[var(--bg-surface-subtle)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Two Lower Activity Panels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Panel 1: Recent Inquiries */}
            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[var(--bg-surface-subtle)]" />
                  <div className="h-4 w-36 rounded bg-[var(--bg-surface-subtle)]" />
                </div>
                <div className="h-3 w-16 rounded bg-[var(--bg-surface-subtle)]" />
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div 
                    key={j} 
                    className="p-3 rounded-lg border border-[var(--border-color)]/60 bg-[var(--bg-surface-subtle)]/40 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-3/4 rounded bg-[var(--bg-surface-subtle)]" />
                      <div className="h-2.5 w-1/2 rounded bg-[var(--bg-surface-subtle)]/70" />
                    </div>
                    <div className="h-5 w-16 rounded-full bg-[var(--bg-surface-subtle)] shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2: Recent Contact Messages */}
            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[var(--bg-surface-subtle)]" />
                  <div className="h-4 w-36 rounded bg-[var(--bg-surface-subtle)]" />
                </div>
                <div className="h-3 w-16 rounded bg-[var(--bg-surface-subtle)]" />
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, k) => (
                  <div 
                    key={k} 
                    className="p-3 rounded-lg border border-[var(--border-color)]/60 bg-[var(--bg-surface-subtle)]/40 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-2/3 rounded bg-[var(--bg-surface-subtle)]" />
                      <div className="h-2.5 w-4/5 rounded bg-[var(--bg-surface-subtle)]/70" />
                    </div>
                    <div className="h-5 w-14 rounded-full bg-[var(--bg-surface-subtle)] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
