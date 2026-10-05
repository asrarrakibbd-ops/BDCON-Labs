import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Compass, Sparkles } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceIcon } from '../components/services/ServiceIcon';
import { OtherServices } from '../components/services/OtherServices';
import { Link, useRouter, matchPath } from '../lib/router';
import { getServiceBySlug } from '../data/services';
import { Service } from '../types/service';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { buildServiceSchema } from '../lib/structuredData';
import { trackEvent } from '../lib/analytics';

export const ServiceDetailPage: React.FC = () => {
  const { path } = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // Match /services/:slug
  const match = matchPath('/services/:slug', path);
  const slug = match.matches ? match.params.slug : '';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (slug) {
      getServiceBySlug(slug).then((res) => {
        if (isMounted) {
          setService(res);
          setLoading(false);

          if (res) {
            trackEvent('service_view', { slug: res.slug, name: res.name });
          }
        }
      });
    } else {
      setLoading(false);
      setService(null);
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-mono">
          <div className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-ping" />
          <span>Retrieving service specifications...</span>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!service) {
    return (
      <Section spacing="xl" surface="canvas" className="flex-1 flex items-center justify-center">
        <Container size="md">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-md mx-auto space-y-5 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)]">
              <Compass className="w-6 h-6" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="type-h3 text-[var(--text-primary)] font-bold">
                Service Not Found
              </h1>
              <p className="type-body-small text-[var(--text-secondary)]">
                The service requested (<code className="font-mono text-xs">{slug || path}</code>) is not registered in our current catalog.
              </p>
            </div>

            <div className="pt-2">
              <Link to="/services">
                <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <article className="w-full flex-1 flex flex-col">
      <SEO
        title={service.metaTitle || `${service.name} — BDCON Labs`}
        description={service.metaDescription || service.shortDescription}
        canonicalPath={`/services/${service.slug}`}
        jsonLd={buildServiceSchema(service)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.name, url: `/services/${service.slug}` },
        ]}
      />
      {/* 1. Breadcrumbs Bar */}
      <Breadcrumbs currentTitle={service.name} />

      {/* 2. Service Hero */}
      <header className="w-full py-10 sm:py-14 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <Container size="2xl">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)] shadow-xs shrink-0">
                <ServiceIcon name={service.icon} className="w-6 h-6" />
              </div>
              <div>
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono block">
                  {service.category || 'CLIENT SOLUTIONS'}
                </span>
                <h1 className="type-h1 text-[var(--text-primary)] font-bold tracking-tight">
                  {service.name}
                </h1>
              </div>
            </div>

            <p className="type-body-large text-[var(--text-secondary)] leading-relaxed text-balance">
              {service.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/start-project">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start a Project
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  General Consultation
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* 3. Service Overview Section */}
      <Section spacing="lg" surface="canvas" borderBottom>
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
                OVERVIEW
              </span>
              <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                Our Approach to {service.name}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                {service.description}
              </p>
              <p className="type-body-small text-[var(--text-muted)] leading-relaxed">
                We combine structured engineering, disciplined scope planning, and continuous communication to build software solutions that perform reliably in production.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. What We Can Build (Use Cases) */}
      {service.useCases && service.useCases.length > 0 && (
        <Section spacing="lg" surface="subtle" borderBottom>
          <Container size="2xl">
            <div className="space-y-8">
              <div className="space-y-2 max-w-2xl">
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
                  SOLUTIONS &amp; APPLICATIONS
                </span>
                <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                  What We Can Build
                </h2>
                <p className="type-body text-[var(--text-secondary)]">
                  Typical operational use cases and system configurations supported under this service:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs space-y-1.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
                    <h3 className="font-bold text-sm text-[var(--text-primary)] pt-1">
                      {useCase}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 5. Key Features & Architectural Capabilities */}
      {service.features && service.features.length > 0 && (
        <Section spacing="lg" surface="canvas" borderBottom>
          <Container size="2xl">
            <div className="space-y-8">
              <div className="space-y-2 max-w-2xl">
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
                  TECHNICAL STANDARDS
                </span>
                <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                  Standard Capabilities Included
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand)] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <span className="type-body-small font-medium text-[var(--text-secondary)]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 6. Bottom Project CTA */}
      <Section spacing="lg" surface="subtle" borderBottom>
        <Container size="2xl">
          <div className="p-8 sm:p-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-3xl mx-auto shadow-xs space-y-5">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              GET STARTED
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Ready to build your {service.name.toLowerCase()}?
            </h2>
            <p className="type-body text-[var(--text-secondary)] max-w-xl mx-auto text-balance">
              Share your project requirements, operational workflows, and timelines with us to receive a clear technical proposal.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link to="/start-project">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start a Project
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Inquire First
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Other Services */}
      <OtherServices currentServiceSlug={service.slug} />
    </article>
  );
};
