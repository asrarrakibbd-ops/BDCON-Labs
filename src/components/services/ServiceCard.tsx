import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Service } from '../../types/service';
import { ServiceIcon } from './ServiceIcon';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/useTranslation';

export interface ServiceCardProps {
  service: Service;
  className?: string;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className, featured = false }) => {
  const { isBangla } = useTranslation();
  const detailPath = `/services/${service.slug}`;

  return (
    <article
      className={cn(
        'group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-200 select-none',
        featured
          ? 'bg-[var(--bg-surface-elevated)] border-[var(--color-brand-muted)] shadow-xs hover:border-[var(--color-brand)]'
          : 'bg-[var(--bg-surface)] border-[var(--border-color)] shadow-xs hover:border-[var(--border-strong)] hover:shadow-sm',
        className
      )}
      aria-labelledby={`service-title-${service.id}`}
    >
      <div className="space-y-4">
        {/* Card Header: Icon & Category */}
        <div className="flex items-center justify-between gap-3">
          <div className="w-11 h-11 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)] group-hover:border-[var(--color-brand)] group-hover:bg-[var(--color-brand-subtle)] transition-all duration-200">
            <ServiceIcon name={service.icon} className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          </div>

          {service.category && (
            <span className="type-caption font-mono uppercase text-[10px] text-[var(--text-muted)] tracking-wider px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
              {service.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          id={`service-title-${service.id}`}
          className="type-h4 text-[var(--text-primary)] font-bold tracking-tight group-hover:text-[var(--color-brand)] transition-colors"
        >
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
          {service.shortDescription}
        </p>
      </div>

      {/* Card Action Link */}
      <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
        <Link
          to={detailPath}
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors group-hover:translate-x-1 duration-150"
          aria-label={isBangla ? `${service.name}-এর বিস্তারিত বিবরণ দেখুন` : `Explore ${service.name}`}
        >
          <span>{isBangla ? 'বিস্তারিত বিবরণ' : 'Explore Specifications'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
