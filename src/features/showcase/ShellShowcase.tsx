import React, { useState } from 'react';
import { Layout, Smartphone, Compass, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/layout/PageHeader';
import { Section } from '../../components/ui/Section';
import { SocialLinks } from '../../components/layout/SocialLinks';
import { Skeleton, CardSkeleton } from '../../components/ui/Skeleton';
import { Link } from '../../lib/router';

export const ShellShowcase: React.FC = () => {
  const [showSkeletonDemo, setShowSkeletonDemo] = useState(false);
  const [triggerError, setTriggerError] = useState(false);

  if (triggerError) {
    throw new Error('Test application crash simulated in ShellShowcase to verify ErrorBoundary resilience.');
  }

  return (
    <div className="space-y-8">
      {/* 1. Header & Active Navigation Verification */}
      <Card padded>
        <CardHeader>
          <div className="flex items-center gap-2 text-[var(--color-brand)] mb-1">
            <Compass className="w-5 h-5" />
            <span className="type-caption font-semibold uppercase tracking-wider font-mono">
              Stage 2 Navigation Shell
            </span>
          </div>
          <CardTitle>Active Navigation &amp; Deep-Route Highlighting</CardTitle>
          <CardDescription>
            The shell automatically highlights root and deep routes (e.g. nested product slugs or author book chapters) using text weight, surface shading, and subtle indicator dots.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="type-body-small text-[var(--text-secondary)]">
              Test deep-route active detection by selecting any of these hierarchical routes:
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link to="/products">
                <Button variant="outline" size="sm">
                  /products (Catalog)
                </Button>
              </Link>
              <Link to="/products/buildest-bd">
                <Button variant="outline" size="sm">
                  /products/buildest-bd (Deep Slug)
                </Button>
              </Link>
              <Link to="/rakib-asrar">
                <Button variant="outline" size="sm">
                  /rakib-asrar (Author Hub)
                </Button>
              </Link>
              <Link to="/rakib-asrar/books">
                <Button variant="outline" size="sm">
                  /rakib-asrar/books (Author Books)
                </Button>
              </Link>
              <Link to="/start-project">
                <Button variant="primary" size="sm">
                  /start-project (Primary CTA)
                </Button>
              </Link>
              <Link to="/invalid-test-route">
                <Button variant="secondary" size="sm">
                  Test 404 Route
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Reusable PageHeader Primitive */}
      <Card padded>
        <CardHeader>
          <div className="flex items-center gap-2 text-[var(--color-brand)] mb-1">
            <Layout className="w-5 h-5" />
            <span className="type-caption font-semibold uppercase tracking-wider font-mono">
              Reusable PageHeader
            </span>
          </div>
          <CardTitle>PageHeader Component Specification</CardTitle>
          <CardDescription>
            Standardized header supporting eyebrow, title, description, category badge, and action CTAs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-canvas)]">
            <PageHeader
              eyebrow="SOFTWARE CATALOG"
              badge="Proprietary Tools"
              title="Software Built by BDCON Labs"
              description="Purpose-built digital systems engineered to solve concrete real-world operational problems."
              borderBottom={false}
              className="py-6 sm:py-8"
              cta={
                <div className="flex items-center gap-3">
                  <Button variant="primary" size="sm">
                    Browse All Products
                  </Button>
                  <Button variant="secondary" size="sm">
                    Documentation
                  </Button>
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. Social Links Foundation */}
      <Card padded>
        <CardHeader>
          <CardTitle>Social &amp; External Communication Links</CardTitle>
          <CardDescription>
            Configurable external links component. Complies with zero-broken-link policy: unconfigured accounts remain completely unrendered.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm text-[var(--text-primary)]">
                  Active Configured Links
                </p>
                <p className="type-caption text-[var(--text-muted)] text-xs">
                  GitHub &amp; Contact Dispatch (LinkedIn and X hidden automatically until verified)
                </p>
              </div>
              <SocialLinks
                links={{
                  github: 'https://github.com/bdconlabs',
                  email: 'contact@bdconlabs.com',
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Loading Skeleton Foundation */}
      <Card padded>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Loading Skeleton Foundation</CardTitle>
              <CardDescription>
                Restrained layout placeholders for future asynchronous data fetching without fake mock data.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSkeletonDemo(!showSkeletonDemo)}
            >
              Toggle Skeleton Demo ({showSkeletonDemo ? 'Active' : 'Off'})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showSkeletonDemo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-center space-y-2">
              <p className="type-body-small text-[var(--text-secondary)] font-medium">
                Skeleton primitives ready for async product/service lists
              </p>
              <p className="type-caption text-[var(--text-muted)]">
                Click &quot;Toggle Skeleton Demo&quot; above to view animated layout skeletons.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 5. ErrorBoundary Resilience Test */}
      <Card padded>
        <CardHeader>
          <div className="flex items-center gap-2 text-[var(--color-error)] mb-1">
            <ShieldAlert className="w-5 h-5" />
            <span className="type-caption font-semibold uppercase tracking-wider font-mono">
              Fault Tolerance
            </span>
          </div>
          <CardTitle>Application-Level Error Boundary</CardTitle>
          <CardDescription>
            Catches unexpected runtime exceptions in component trees, preventing a blank screen and providing clean user recovery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[var(--color-error-subtle)] border border-[var(--color-error-border)]">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Simulate Runtime Exception
              </p>
              <p className="type-caption text-[var(--text-secondary)] text-xs">
                Tests the ErrorBoundary component by purposefully triggering a render throw.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setTriggerError(true)}
            >
              Trigger Test Exception
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
