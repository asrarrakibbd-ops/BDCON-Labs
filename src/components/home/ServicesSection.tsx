import React, { useEffect, useState } from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ServiceCard } from '../services/ServiceCard';
import { getServices } from '../../data/services';
import { Service } from '../../types/service';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const ServicesSection: React.FC = () => {
  const { t, isBangla } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then((data) => {
      setServices(data);
    });
  }, []);

  return (
    <Section spacing="xl" surface="canvas" borderBottom id="services-section">
      <Container size="2xl">
        <div className="space-y-10 sm:space-y-12">
          {/* Header with Visual Balance */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[var(--border-color)]">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                  {t('servicesPreview.eyebrow')}
                </span>
              </div>

              <h2 className={`type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance ${isBangla ? 'font-bangla-serif' : ''}`}>
                {t('servicesPreview.heading')}
              </h2>

              <p className={`type-body-large text-[var(--text-secondary)] leading-relaxed text-balance ${isBangla ? 'font-bangla-sans' : ''}`}>
                {t('servicesPreview.description')}
              </p>
            </div>

            <div className="shrink-0 pb-1">
              <Link to="/start-project">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t('servicesPreview.cta')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Core Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={idx < 2} // Subtle highlight on first 2 primary engineering services
              />
            ))}
          </div>

          {/* Bottom Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-color)]">
            <p className={`type-caption text-[var(--text-muted)] text-xs text-center sm:text-left ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
              {t('servicesPreview.subtext')}
            </p>

            <Link to="/services" className="inline-block">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                {t('servicesPreview.exploreAll')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
