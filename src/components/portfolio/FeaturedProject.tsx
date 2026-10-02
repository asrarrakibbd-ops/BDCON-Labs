import React from 'react';
import { ArrowRight, Check, Globe, Smartphone, Code2 } from 'lucide-react';
import { PortfolioProject } from '../../types/portfolio';
import { ProjectVisual } from './ProjectVisual';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';

export interface FeaturedProjectProps {
  project: PortfolioProject;
  className?: string;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  className,
}) => {
  const detailPath = `/portfolio/${project.slug}`;

  return (
    <article
      className={cn(
        'rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:border-[var(--border-strong)] relative overflow-hidden',
        className
      )}
      aria-labelledby={`featured-project-heading-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Case Narrative, Capabilities & Action */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Top Row: Category & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="type-caption font-bold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
              FEATURED // {project.category.replace('-', ' ')}
            </span>

            {project.status && (
              <span
                className={cn(
                  'text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border',
                  project.status === 'live'
                    ? 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success-border)]'
                    : 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border-[var(--color-brand-muted)]'
                )}
              >
                {project.status.replace('-', ' ')}
              </span>
            )}
          </div>

          {/* Title & Type */}
          <div className="space-y-2">
            <h3
              id={`featured-project-heading-${project.id}`}
              className="type-h2 text-[var(--text-primary)] font-bold tracking-tight"
            >
              {project.title}
            </h3>
            {project.projectType && (
              <p className="type-body text-[var(--color-brand)] font-medium">
                {project.projectType}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="type-body text-[var(--text-secondary)] leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Key Features / Takeaways */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="pt-1 space-y-2.5">
              <span className="type-caption font-mono uppercase tracking-wider text-[var(--text-muted)] text-[11px] block">
                Engineering Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {project.keyFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Check className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-1.5">
              <span className="type-caption font-mono text-[11px] text-[var(--text-muted)] mr-1">
                Stack:
              </span>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* CTA Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to={detailPath} className="inline-block">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Case Study
              </Button>
            </Link>

            <Link to="/products/buildest-bd" className="inline-block">
              <Button
                variant="outline"
                size="md"
              >
                View Product Page
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Large Technical Product Visual */}
        <div className="lg:col-span-6 w-full">
          <ProjectVisual project={project} size="lg" />
        </div>
      </div>
    </article>
  );
};
