import React, { useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { NavLinks } from './NavLinks';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Auto-focus close button
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        // Focus trap inside mobile drawer
        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), [tabindex="0"]'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-menu"
      className="fixed inset-0 z-50 xl:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 z-10"
      >
        <div className="space-y-6">
          {/* Header Bar inside Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-2 text-base font-bold tracking-tight text-[var(--text-primary)]"
            >
              <div
                className="w-7 h-7 rounded-md bg-[var(--color-brand)] text-white flex items-center justify-center font-bold text-xs shrink-0"
                aria-hidden="true"
              >
                BD
              </div>
              <span>BDCON Labs</span>
            </Link>

            <IconButton
              ref={closeButtonRef}
              variant="ghost"
              size="md"
              aria-label="Close navigation menu"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px]"
            >
              <X className="w-5 h-5 text-[var(--text-secondary)]" />
            </IconButton>
          </div>

          {/* Navigation Links List */}
          <div className="py-2">
            <NavLinks vertical onItemClick={onClose} />
          </div>
        </div>

        {/* Footer actions: Start a Project CTA, Language Switcher, Theme Switcher */}
        <div className="pt-6 border-t border-[var(--border-color)] space-y-4">
          <Link to="/start-project" onClick={onClose} className="block w-full">
            <Button
              as="span"
              variant="primary"
              size="lg"
              className="w-full justify-center min-h-[44px]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('nav.startProject')}
            </Button>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <LanguageSwitcher compact />
            <ThemeToggle variant="segmented" />
          </div>

          <p className="type-caption text-[11px] text-[var(--text-muted)] text-center pt-2 font-mono">
            Software &amp; Digital Products
          </p>
        </div>
      </div>
    </div>
  );
};
