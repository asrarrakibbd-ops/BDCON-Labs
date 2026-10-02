import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { Link } from '../../lib/router';
import { NavLinks } from '../navigation/NavLinks';
import { LanguageSwitcher } from '../navigation/LanguageSwitcher';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { MobileMenu } from '../navigation/MobileMenu';
import { Container } from './Container';
import { BrandLogo } from './BrandLogo';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  // Scroll detection for compact header surface transition
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-200 border-b',
          isScrolled
            ? 'bg-[var(--bg-canvas)]/90 backdrop-blur-md border-[var(--border-color)] shadow-xs'
            : 'bg-[var(--bg-canvas)]/80 backdrop-blur-sm border-[var(--border-color)]/60'
        )}
      >
        <Container size="2xl">
          <div className="flex items-center justify-between h-16 sm:h-17">
            {/* Zone 1: Distinctive Brand Mark */}
            <div className="flex items-center shrink-0">
              <BrandLogo />
            </div>

            {/* Zone 2: Desktop Navigation Links */}
            <div className="hidden xl:flex items-center justify-center flex-1 px-6">
              <NavLinks />
            </div>

            {/* Zone 3: Desktop Primary CTA & Language/Theme Controls */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <LanguageSwitcher compact />
              <ThemeToggle variant="simple" />

              <Link to="/start-project">
                <Button
                  as="span"
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="ml-1"
                >
                  {t('nav.startProject')}
                </Button>
              </Link>
            </div>

            {/* Mobile Controls & Hamburger Toggle */}
            <div className="flex items-center gap-1.5 xl:hidden">
              <div className="sm:hidden flex items-center gap-1">
                <ThemeToggle variant="simple" />
              </div>

              <IconButton
                variant="ghost"
                size="md"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                onClick={() => setMobileMenuOpen(true)}
                className="min-h-[44px] min-w-[44px]"
              >
                <Menu className="w-5 h-5 text-[var(--text-primary)]" />
              </IconButton>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
