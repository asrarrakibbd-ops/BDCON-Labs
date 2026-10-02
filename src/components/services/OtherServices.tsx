import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { ServiceCard } from './ServiceCard';
import { SERVICES_DATA } from '../../data/services';

export interface OtherServicesProps {
  currentServiceSlug: string;
}

export const OtherServices: React.FC<OtherServicesProps> = ({ currentServiceSlug }) => {
  const otherServices = SERVICES_DATA.filter((s) => s.slug !== currentServiceSlug).slice(0, 3);

  if (otherServices.length === 0) return null;

  return (
    <Section spacing="lg" surface="subtle" borderBottom>
      <Container size="2xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono">
              ADDITIONAL EXPERTISE
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Other Services by BDCON Labs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
