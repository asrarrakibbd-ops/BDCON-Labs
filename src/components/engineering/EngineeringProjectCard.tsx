import React from 'react';
import { ArrowRight, MapPin, Building, Calendar, Layers } from 'lucide-react';
import { Link } from '../../lib/router';
import { EngineeringProject } from '../../types/engineeringProject';
import { useTranslation } from '../../hooks/useTranslation';

interface EngineeringProjectCardProps {
  project: EngineeringProject;
}

export const EngineeringProjectCard: React.FC<EngineeringProjectCardProps> = ({ project }) => {
  const { isBangla } = useTranslation();

  const title = isBangla ? project.titleBn : project.titleEn;
  const projectType = isBangla ? project.projectTypeBn : project.projectTypeEn;
  const location = isBangla ? project.locationBn : project.locationEn;
  const shortDesc = isBangla ? project.shortDescBn : project.shortDescEn;
  const services = isBangla ? project.servicesProvidedBn : project.servicesProvidedEn;
  const status = isBangla ? project.statusBn : project.statusEn;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-sky-500/50 hover:shadow-lg transition-all duration-200 overflow-hidden">
      
      {/* Visual Image / Technical Graphic Area */}
      <div className="relative aspect-[16/10] w-full bg-[#08111e] overflow-hidden border-b border-[var(--border-color)]">
        {project.coverImage ? (
          <img 
            src={project.coverImage} 
            alt={title} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          /* Technical Architectural Schematic Placeholder */
          <div className="w-full h-full flex flex-col justify-between p-4 relative select-none">
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #38bdf8 1px, transparent 1px),
                  linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-sky-400">
              <span className="bg-sky-950/70 px-2 py-0.5 rounded border border-sky-800/40">
                {projectType}
              </span>
              {project.year && (
                <span className="text-slate-400">
                  {project.year}
                </span>
              )}
            </div>

            <div className="relative z-10 flex items-center justify-center my-auto">
              <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-sky-400 shadow-sm">
                <Building className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>BDCON-ENG-CASE</span>
              <span className="text-sky-300">VERIFIED PROJECT</span>
            </div>
          </div>
        )}

        {/* Status Badge if Verified */}
        {status && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-xs text-[11px] font-mono text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{status}</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Project Type & Location */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)]">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-medium">
              {projectType}
            </span>
            {location && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[var(--text-muted)]" />
                  <span>{location}</span>
                </span>
              </>
            )}
          </div>

          {/* Project Name */}
          <h3 
            className={`text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 ${
              isBangla ? 'font-bangla-serif tracking-normal' : ''
            }`}
          >
            {title}
          </h3>

          {/* Short Description */}
          <p className={`text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 ${isBangla ? 'font-bangla-sans' : ''}`}>
            {shortDesc}
          </p>
        </div>

        {/* Services Provided & View Project CTA */}
        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
          {services.length > 0 && (
            <div className="text-xs text-[var(--text-muted)]">
              <div className="text-[10px] font-mono uppercase tracking-wider mb-1.5">
                {isBangla ? 'প্রদত্ত সেবাসমূহ:' : 'Services provided:'}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                {services.map((srv, sIdx) => (
                  <span key={sIdx} className="inline-flex items-center">
                    <span>{srv}</span>
                    {sIdx < services.length - 1 && <span className="mx-1 text-[var(--text-muted)]">·</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Link 
              to={`/engineering/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:text-sky-500 transition-colors"
            >
              <span className={isBangla ? 'font-bangla-sans' : ''}>
                {isBangla ? 'প্রজেক্ট বিবরণ দেখুন' : 'View Project'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
