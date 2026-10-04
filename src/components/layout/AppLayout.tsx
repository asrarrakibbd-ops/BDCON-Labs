import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors overflow-x-hidden selection:bg-[var(--color-brand-muted)] selection:text-[var(--color-brand)]">
      {/* Accessible skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[var(--color-brand)] text-white text-xs font-semibold rounded-md shadow-lg outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand)]"
      >
        Skip to main content
      </a>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 w-full flex flex-col"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};
