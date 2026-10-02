import React, { useEffect, useState, useCallback } from 'react';
import { ArrowRight, Wrench, AlertCircle, RefreshCw } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceProcess } from '../components/services/ServiceProcess';
import { WhyUsSection } from '../components/services/WhyUsSection';
import { CapabilitiesSection } from '../components/services/CapabilitiesSection';
import { ServiceCTA } from '../components/services/ServiceCTA';
import { EmptyState } from '../components/ui/EmptyState';
import { getServices } from '../data/services';
import { Service } from '../types/service';
import { Link } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';

export const ServicesPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getServices();
      setServices(data);
    } catch (err: any) {
      setError(err?.message || (isBangla ? 'সেবাসমূহ লোড করা সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : 'We could not load services right now. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, [isBangla]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={isBangla ? 'সার্ভিসসমূহ — BDCON Labs' : 'Client Services — BDCON Labs'}
        description={
          isBangla
            ? 'বিজনেস ওয়েবসাইট থেকে শুরু করে কাস্টম সফটওয়্যার—BDCON Labs আপনার পরিকল্পনা ও প্রয়োজনীয়তাকে রূপ দেয় কার্যকর ডিজিটাল প্রোডাক্টে।'
            : 'From business websites to custom software, BDCON Labs helps turn ideas, workflows and requirements into practical digital products.'
        }
        canonicalPath="/services"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'সার্ভিসসমূহ' : 'Services', url: '/services' },
        ]}
      />
      {/* 1. Services Page Header */}
      <PageHeader
        eyebrow={isBangla ? 'আমাদের সার্ভিসেস' : 'WHAT WE BUILD'}
        title={isBangla ? 'আপনার প্রতিষ্ঠানের চাহিদা অনুযায়ী ডিজিটাল সমাধান।' : 'Digital solutions built around your needs.'}
        description={
          isBangla
            ? 'বিজনেস ওয়েবসাইট থেকে শুরু করে কাস্টম সফটওয়্যার—BDCON Labs আপনার পরিকল্পনা ও প্রয়োজনীয়তাকে রূপ দেয় কার্যকর ডিজিটাল প্রোডাক্টে।'
            : 'From business websites to custom software, BDCON Labs helps turn ideas, workflows and requirements into practical digital products.'
        }
        cta={
          <Link to="/start-project">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {isBangla ? 'প্রজেক্ট শুরু করুন' : 'Start a Project'}
            </Button>
          </Link>
        }
        borderBottom
      />

      {/* 2. Core Services Grid Section */}
      <Section spacing="lg" surface="subtle" borderBottom>
        <Container size="2xl">
          <div className="space-y-10">
            <div className="space-y-2 max-w-2xl">
              <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'সফটওয়্যার সার্ভিসেস' : 'ENGINEERING DOMAINS'}
              </span>
              <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                {isBangla ? 'আমাদের মূল সার্ভিসসমূহ' : 'Our Primary Services'}
              </h2>
              <p className="type-body text-[var(--text-secondary)]">
                {isBangla
                  ? 'নির্দিষ্ট প্রাতিষ্ঠানিক লক্ষ্য ও বাস্তব কাজের প্রয়োজন মেটাতে বিশেষায়িত সফটওয়্যার ইঞ্জিনিয়ারিং সার্ভিস।'
                  : 'Structured solutions designed to address distinct operational and user interaction requirements.'}
              </p>
            </div>

            {loading ? (
              /* Loading Skeleton */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-72 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
                ))}
              </div>
            ) : error ? (
              /* Error State */
              <div className="p-8 sm:p-12 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-[var(--color-brand)] mx-auto opacity-80" />
                <div className="space-y-1">
                  <h3 className="type-h3 text-[var(--text-primary)] font-bold">
                    {isBangla ? 'সার্ভিসসমূহ লোড করা যায়নি' : 'Unable to load services'}
                  </h3>
                  <p className="type-body-small text-[var(--text-secondary)]">{error}</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchServices} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                  {isBangla ? 'পুনরায় চেষ্টা করুন' : 'Try again'}
                </Button>
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Services will appear here as they are published."
                description="BDCON Labs engineering domains and service offerings are being updated."
              />
            )}
          </div>
        </Container>
      </Section>

      {/* 3. Engineering Process Section */}
      <ServiceProcess />

      {/* 4. Why BDCON Labs Principles */}
      <WhyUsSection />

      {/* 5. Supported Platforms & Capabilities */}
      <CapabilitiesSection />

      {/* 6. Contact & Project Request CTA */}
      <ServiceCTA />
    </div>
  );
};
