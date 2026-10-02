import React from 'react';
import { Layers, Ruler, Code2, Globe, Smartphone, Compass } from 'lucide-react';
import { PortfolioProject } from '../../types/portfolio';
import { cn } from '../../lib/utils';

export interface ProjectVisualProps {
  project: PortfolioProject;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  project,
  className,
  size = 'md',
}) => {
  // If a genuine real image is provided and valid
  if (project.coverImage && project.coverImage.trim()) {
    return (
      <div
        className={cn(
          'relative w-full rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] shadow-xs select-none',
          size === 'lg' ? 'aspect-[16/10]' : 'aspect-[16/11]',
          className
        )}
      >
        <img
          src={project.coverImage}
          alt={`${project.title} project visual`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  // Purposeful design placeholder (Section 10)
  // Clean architectural CAD framing with project initials/emblem
  const isProduct = project.category === 'product';

  return (
    <div
      className={cn(
        'relative w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between shadow-xs select-none group-hover:border-[var(--border-strong)] transition-all duration-300',
        size === 'lg' ? 'aspect-[16/10]' : 'aspect-[16/11]',
        className
      )}
      role="img"
      aria-label={`${project.title} technical design framing`}
    >
      {/* Precision CAD Architectural Grid Backplate */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
          backgroundSize: size === 'lg' ? '28px 28px' : '20px 20px',
        }}
      />
      {/* Subtle brand glow behind center mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-brand)]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top Application Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-5 py-3 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] opacity-40" />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)] ml-2">
            bdcon.portfolio / {project.slug}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-2.5 py-0.5 rounded font-semibold border border-[var(--color-brand-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
          <span>{project.projectType || 'ENGINEERED SOLUTION'}</span>
        </div>
      </div>

      {/* Center Technical Blueprint & Architecture Representation */}
      <div className="relative z-10 flex-1 p-5 sm:p-6 flex flex-col justify-center items-center text-center space-y-3.5">
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] shadow-xs flex items-center justify-center text-[var(--color-brand)] group-hover:border-[var(--color-brand)] transition-colors">
            {isProduct ? (
              <Ruler className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
            ) : (
              <Code2 className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
            )}
          </div>
        </div>

        <div className="space-y-1 max-w-sm">
          <h4 className="type-h4 text-[var(--text-primary)] font-bold tracking-tight">
            {project.title}
          </h4>
          <p className="type-caption text-[var(--text-muted)] font-mono text-xs">
            {project.projectType || 'Software System'}
          </p>
        </div>

        {/* Dynamic Technologies Pills inside frame */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 pt-1 max-w-xs sm:max-w-sm">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)] shadow-2xs"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Frame Status Sub-Bar */}
      <div className="relative z-10 px-4 sm:px-5 py-2.5 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[var(--color-brand)]" />
          <span className="font-medium text-[var(--text-secondary)] uppercase text-[10px]">
            {project.category.replace('-', ' ')}
          </span>
        </div>
        <span className="text-[10px] text-[var(--text-muted)]">
          {project.platforms?.join(' • ').toUpperCase() || 'WEB APPLICATION'}
        </span>
      </div>
    </div>
  );
};
