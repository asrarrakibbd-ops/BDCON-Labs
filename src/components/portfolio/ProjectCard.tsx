import React from 'react';
import { ArrowRight, Globe, Smartphone } from 'lucide-react';
import { PortfolioProject } from '../../types/portfolio';
import { ProjectVisual } from './ProjectVisual';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/useTranslation';

export interface ProjectCardProps {
  project: PortfolioProject;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
}) => {
  const { isBangla } = useTranslation();
  const detailPath = `/portfolio/${project.slug}`;

  return (
    <article
      className={cn(
        'group flex flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs transition-all duration-200 hover:border-[var(--border-strong)] hover:shadow-sm select-none',
        className
      )}
      aria-labelledby={`portfolio-card-title-${project.id}`}
    >
      <div className="space-y-4">
        {/* Visual Frame */}
        <div className="w-full overflow-hidden rounded-xl">
          <ProjectVisual project={project} size="sm" />
        </div>

        {/* Category & Status Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="type-caption font-mono uppercase tracking-wider text-[var(--color-brand)] text-[10px] font-bold">
            {project.category.replace('-', ' ')}
          </span>

          {project.status && (
            <span
              className={cn(
                'text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border',
                project.status === 'live'
                  ? 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success-border)]'
                  : 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border-[var(--color-brand-muted)]'
              )}
            >
              {project.status === 'live' ? (isBangla ? 'লাইভ' : 'live') : project.status.replace('-', ' ')}
            </span>
          )}
        </div>

        {/* Project Title */}
        <div className="space-y-1">
          <h3
            id={`portfolio-card-title-${project.id}`}
            className="type-h4 text-[var(--text-primary)] font-bold tracking-tight group-hover:text-[var(--color-brand)] transition-colors"
          >
            {project.title}
          </h3>
        </div>

        {/* Short Summary Description */}
        <p className="type-body-small text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technology Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
        {project.platforms && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
            {project.platforms.includes('web') && (
              <span title="Web Platform" className="inline-flex items-center">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            )}
            {project.platforms.includes('android') && (
              <span title="Android Platform" className="inline-flex items-center">
                <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            )}
          </div>
        )}

        <Link
          to={detailPath}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors group-hover:translate-x-1 duration-150 ml-auto"
          aria-label={isBangla ? `${project.title}-এর কেস স্টাডি দেখুন` : `View case study for ${project.title}`}
        >
          <span>{isBangla ? 'কেস স্টাডি দেখুন' : 'View Case Study'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
