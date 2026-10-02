import React, { useEffect, useState } from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FeaturedProject } from '../portfolio/FeaturedProject';
import { ProjectCard } from '../portfolio/ProjectCard';
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

          {/* Featured Case Study Presentation */}
          {featured && (
            <div className="space-y-8">
              <FeaturedProject project={featured} />

              {/* Other Projects Grid */}
              {others.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
                  {others.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
