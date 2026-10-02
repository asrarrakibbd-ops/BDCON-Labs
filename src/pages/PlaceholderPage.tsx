import React from 'react';
import { ArrowLeft, Layers, Shield } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Link, useRouter } from '../lib/router';
import { useTranslation } from '../hooks/useTranslation';
import { RouteConfig } from '../types/navigation';
import { PRODUCTS_DATA } from '../data/products';
import { SEO } from '../components/common/SEO';

export interface PlaceholderPageProps {
  route: RouteConfig;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ route }) => {
  const { t, isBangla } = useTranslation();
  const { path } = useRouter();

  const isParametric = route.isParametric;
  const isAdmin = route.category === 'admin';
  const isAuthor = route.category === 'author';

  // Check if this is a known product slug
  const matchedProduct = PRODUCTS_DATA.find((p) => `/products/${p.slug}` === path);

  const pageTitle = matchedProduct ? matchedProduct.name : route.name;
  const pageDescription = matchedProduct ? matchedProduct.shortDescription : route.description;
  const eyebrowText = matchedProduct
    ? 'PROPRIETARY SOFTWARE PRODUCT'
    : isAdmin
    ? 'ADMINISTRATION'
    : isAuthor
    ? 'RAKIB ASRAR'
    : 'BDCON LABS';
  const badgeText = matchedProduct
    ? 'BuildEst BD'
    : isAdmin
    ? 'Admin Architecture'
    : isAuthor
    ? 'Author Hub'
    : 'Public Route';

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={`${pageTitle} — BDCON Labs`}
        description={pageDescription}
        canonicalPath={path}
        noindex={isAdmin}
      />
      {/* Reusable PageHeader component from Stage 2 */}
      <PageHeader
        badge={badgeText}
        eyebrow={eyebrowText}
        title={pageTitle}
        description={pageDescription}
        cta={
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                {t('common.backToHome')}
              </Button>
            </Link>
            {route.path !== '/start-project' && (
              <Link to="/start-project">
                <Button variant="primary" size="sm">
                  {t('nav.startProject')}
                </Button>
              </Link>
            )}
          </div>
        }
      />

      {/* Main Architectural Confirmation */}
      <Section spacing="lg" surface="canvas" className="flex-1">
        <Container size="lg">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-[var(--color-brand)] mb-1">
                  {isAdmin ? <Shield className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                  <span className={`type-caption font-semibold uppercase tracking-wider ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {t('common.stage1Architecture')}
                  </span>
                </div>
                <CardTitle>{pageTitle}</CardTitle>
                <CardDescription>
                  Active Route: <code className="font-mono text-xs font-semibold text-[var(--color-brand)]">{path}</code>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="p-4 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-2">
                  <p className="type-body-small text-[var(--text-secondary)] font-medium">
                    {matchedProduct
                      ? 'Product detail presentation architecture is wired and compatible with this route. Full interactive product documentation and onboarding features will be expanded in Stage 5.'
                      : t('common.placeholderNote')}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[var(--text-muted)]">
                    <span className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                      Route Pattern: {route.path}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                      Category: {route.category}
                    </span>
                    {isParametric && (
                      <span className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--color-brand)] font-semibold">
                        Dynamic Parameter: :slug
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link to="/">
                    <Button variant="secondary" size="sm">
                      Homepage
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="outline" size="sm">
                      All Products
                    </Button>
                  </Link>
                  <Link to="/start-project">
                    <Button variant="primary" size="sm">
                      Start a Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {isAdmin && (
              <div className="p-4 rounded-lg border border-[var(--color-warning-border)] bg-[var(--color-warning-subtle)] text-[var(--text-secondary)] text-sm flex items-start gap-3">
                <Shield className="w-5 h-5 text-[var(--color-warning)] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[var(--text-primary)] block">
                    Admin Route Architecture Reserved
                  </strong>
                  This administrative route is registered in the routing table. Authentication guards and administration interfaces will be bound in subsequent stages per project specifications.
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};
