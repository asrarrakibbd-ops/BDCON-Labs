import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FeaturedProject } from '../portfolio/FeaturedProject';
import { ProjectCard } from '../portfolio/ProjectCard';
import { ProjectVisual } from '../portfolio/ProjectVisual';
import { getPortfolioProjects } from '../../data/portfolio';
import { PortfolioProject } from '../../types/portfolio';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const SelectedWorkSection: React.FC = () => {
  const { t, isBangla } = useTranslation();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    getPortfolioProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  const featured = projects.find((p) => p.featured) || projects[0];
  const others = projects.filter((p) => p.id !== featured?.id);
  
  // Secondary software/engineering projects (CivilDesk, Civil Estimator BD, BuildEst BD)
  const secondaryProjects = others.filter((p) => p.category !== 'website');
  // Editorial / Personal project (Rakib Asrar)
  const editorialProject = others.find((p) => p.category === 'website');

  if (!featured && projects.length === 0) return null;

  return (
    <Section spacing="xl" surface="subtle" borderBottom id="selected-work-section">
      <Container size="2xl">
        <div className="space-y-10 sm:space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[var(--border-color)]">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                <span className={`type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] text-[11px] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                  {t('portfolioPreview.eyebrow')}
                </span>
              </div>

              <h2 className={`type-h2 text-[var(--text-primary)] font-bold tracking-tight text-balance ${isBangla ? 'font-bangla-serif' : ''}`}>
                {t('portfolioPreview.heading')}
              </h2>

              <p className={`type-body-large text-[var(--text-secondary)] leading-relaxed text-balance ${isBangla ? 'font-bangla-sans' : ''}`}>
                {t('portfolioPreview.description')}
              </p>
            </div>

            <div className="shrink-0 pb-1">
              <Link to="/portfolio">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t('portfolioPreview.cta')}
                </Button>
              </Link>
            </div>
          </div>

          {/* 1. Featured Project Showcase: SalaryBD */}
          {featured && (
            <div className="space-y-8">
              <FeaturedProject project={featured} />

              {/* 2. Secondary Engineering & Software Projects Grid (CivilDesk, Civil Estimator BD, BuildEst BD) */}
              {secondaryProjects.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className={`flex items-center justify-between text-xs text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2 ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    <span className="uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                      {isBangla ? 'অন্যান্য সফটওয়্যার ও ইঞ্জিনিয়ারিং প্রজেক্ট' : 'Engineering & Software Projects'}
                    </span>
                    <span>{secondaryProjects.length} {isBangla ? 'টি প্রজেক্ট' : 'projects'}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {secondaryProjects.map((proj) => (
                      <ProjectCard key={proj.id} project={proj} />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Personal & Editorial Identity Spotlight: Rakib Asrar */}
              {editorialProject && (
                <div className="space-y-4 pt-4">
                  <div className={`flex items-center justify-between text-xs text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2 ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    <span className="uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                      {isBangla ? 'ব্যক্তিগত ও বুদ্ধিবৃত্তিক পোর্টফোলিও' : 'Editorial & Author Portfolio'}
                    </span>
                    <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400">
                      CONNECTED CREATIVE IDENTITY
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface-elevated)] shadow-xs hover:border-amber-600/40 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-6 space-y-4 text-left">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-mono font-medium">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{editorialProject.projectType || 'Author / Personal Website'}</span>
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-bangla-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                            {editorialProject.title}
                          </h3>
                          <p className="font-bangla-serif text-xs sm:text-sm text-amber-800/80 dark:text-amber-300/90 italic">
                            সাহিত্য, দর্শন ও বুদ্ধিবৃত্তিক কাজের একটি মার্জিত অনলাইন উপস্থিতি
                          </p>
                        </div>

                        <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
                          {editorialProject.shortDescription}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          {editorialProject.liveUrl && (
                            <a
                              href={editorialProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block"
                            >
                              <Button
                                variant="primary"
                                size="md"
                                leftIcon={<BookOpen className="w-4 h-4" />}
                                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                              >
                                {isBangla ? 'অফিসিয়াল ওয়েবসাইট দেখুন' : 'Visit Author Website'}
                              </Button>
                            </a>
                          )}

                          <Link to={`/portfolio/${editorialProject.slug}`}>
                            <Button
                              variant="outline"
                              size="md"
                              rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                              {isBangla ? 'কেস স্টাডি' : 'Case Details'}
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="lg:col-span-6 w-full">
                        <ProjectVisual project={editorialProject} size="md" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
