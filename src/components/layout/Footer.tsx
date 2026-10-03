import React from 'react';
import { Link } from '../../lib/router';
import { Container } from './Container';
import { BrandLogo } from './BrandLogo';
import { LanguageSwitcher } from '../navigation/LanguageSwitcher';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { SocialLinks } from './SocialLinks';
import { useTranslation } from '../../hooks/useTranslation';

export const Footer: React.FC = () => {
  const { t, isBangla } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinksConfig = {
    github: 'https://github.com/bdconlabs',
    linkedin: '',
    twitter: '',
    email: 'contact@bdconlabs.com',
  };

  return (
    <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-color)] transition-colors mt-auto">
      <h2 className="sr-only">Site Footer and Navigation</h2>
      <Container size="2xl">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Column 1: Brand & Positioning */}
            <div className="sm:col-span-2 space-y-4">
              <BrandLogo showTagline />

              <p className="type-body-small text-[var(--text-secondary)] font-medium max-w-sm">
                {t('footer.tagline')}
              </p>

              <p className="type-caption text-[var(--text-muted)] max-w-sm leading-relaxed">
                {t('common.coreMessage')}
              </p>

              {/* Social and communication links */}
              <div className="pt-2">
                <SocialLinks links={socialLinksConfig} size="sm" />
              </div>

              {/* Utility switches in footer */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <LanguageSwitcher compact />
                <ThemeToggle variant="segmented" />
              </div>
            </div>

            {/* Column 2: Solutions */}
            <div className="space-y-3">
              <h3 className={`type-caption font-bold uppercase tracking-wider text-[var(--text-primary)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('footer.solutions')}
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    to="/products"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.products')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.services')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/engineering"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.engineering')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.portfolio')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/start-project"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0 font-semibold text-[var(--color-brand)]"
                  >
                    {t('nav.startProject')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company & Insights */}
            <div className="space-y-3">
              <h3 className={`type-caption font-bold uppercase tracking-wider text-[var(--text-primary)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('footer.company')}
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.blog')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Author & Personal Brand */}
            <div className="space-y-3">
              <h3 className={`type-caption font-bold uppercase tracking-wider text-[var(--text-primary)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {t('footer.authorSection')}
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    to="/rakib-asrar"
                    className="hover:text-[var(--text-primary)] transition-colors font-medium inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.rakibAsrar')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rakib-asrar/books"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('footer.books')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rakib-asrar/writing"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('footer.writing')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rakib-asrar/about"
                    className="hover:text-[var(--text-primary)] transition-colors inline-block py-1 min-h-[32px] sm:min-h-0"
                  >
                    {t('nav.about')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="pt-8 mt-12 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
              <span>© {currentYear} BDCON Labs. {t('common.allRightsReserved')}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className={`hidden sm:inline text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>{t('footer.builtWithPrecision')}</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Link to="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors py-1">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms-of-service" className="hover:text-[var(--text-primary)] transition-colors py-1">
                {t('footer.termsOfService')}
              </Link>
              <Link
                to="/admin"
                className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors font-mono text-[11px] py-1"
              >
                [Admin]
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
