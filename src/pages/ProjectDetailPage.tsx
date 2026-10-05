import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Compass, 
  ExternalLink, 
  Globe, 
  Smartphone, 
  Code2, 
  Cpu, 
  AlertCircle, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ProjectVisual } from '../components/portfolio/ProjectVisual';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { PortfolioCTA } from '../components/portfolio/PortfolioCTA';
import { Link, useRouter, matchPath } from '../lib/router';
import { getPortfolioProjectBySlug, getPortfolioProjects } from '../data/portfolio';
import { PortfolioProject } from '../types/portfolio';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { buildCaseStudySchema } from '../lib/structuredData';
import { trackEvent } from '../lib/analytics';
import { useTranslation } from '../hooks/useTranslation';

export const ProjectDetailPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const { path } = useRouter();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [otherProjects, setOtherProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Match /portfolio/:slug
  const match = matchPath('/portfolio/:slug', path);
  const slug = match.matches ? match.params.slug : '';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (slug) {
      Promise.all([
        getPortfolioProjectBySlug(slug),
        getPortfolioProjects(),
      ]).then(([res, all]) => {
        if (isMounted) {
          setProject(res);
          if (res) {
            setOtherProjects(all.filter((p) => p.id !== res.id).slice(0, 3));
            trackEvent('portfolio_view', { slug: res.slug, title: res.title });
          } else {
            setOtherProjects([]);
          }
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      setProject(null);
      setOtherProjects([]);
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-mono">
          <div className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-ping" />
          <span>Retrieving case study specifications...</span>
        </div>
      </div>
    );
  }

  // Not Found State (Section 17)
  if (!project) {
    return (
      <Section spacing="xl" surface="canvas" className="flex-1 flex items-center justify-center">
        <Container size="md">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-md mx-auto space-y-5 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)]">
              <Compass className="w-6 h-6" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="type-h3 text-[var(--text-primary)] font-bold">
                Project Not Found
              </h1>
              <p className="type-body-small text-[var(--text-secondary)]">
                The requested case study (<code className="font-mono text-xs">{slug || path}</code>) does not exist in our portfolio directory.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link to="/portfolio">
                <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Portfolio
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="md">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <article className="w-full flex-1 flex flex-col">
      <SEO
        title={project.seo?.title || `${project.title} — Portfolio | BDCON Labs`}
        description={project.seo?.description || project.shortDescription}
        canonicalPath={`/portfolio/${project.slug}`}
        ogImage={project.coverImage || project.logo}
        jsonLd={buildCaseStudySchema(project)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: project.title, url: `/portfolio/${project.slug}` },
        ]}
      />
      {/* 1. Breadcrumbs Bar */}
      <Breadcrumbs currentTitle={project.title} />

      {/* 2. Project Hero */}
      <header className="w-full py-10 sm:py-14 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Narrative & Status */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="type-caption font-bold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                  {project.category.replace('-', ' ')}
                </span>
                {project.status && (
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)]">
                    {project.status.replace('-', ' ')}
                  </span>
                )}
                {project.year && (
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    // {project.year}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h1 className="type-h1 text-[var(--text-primary)] font-bold tracking-tight">
                  {project.title}
                </h1>
                {project.projectType && (
                  <p className="type-body-large text-[var(--color-brand)] font-medium">
                    {project.projectType}
                  </p>
                )}
              </div>

              <p className="type-body text-[var(--text-secondary)] leading-relaxed text-balance">
                {project.shortDescription}
              </p>

              {/* Client information (Only when clientVisible is true) */}
              {project.clientVisible && project.clientName && (
                <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-mono">
                  <span className="text-[var(--text-muted)]">Client / Organization: </span>
                  <span className="font-semibold text-[var(--text-primary)]">{project.clientName}</span>
                </div>
              )}

              {/* Live Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="md" leftIcon={<Globe className="w-4 h-4" />} rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      {isBangla ? 'লাইভ প্রজেক্ট দেখুন' : 'Live Project'}
                    </Button>
                  </a>
                )}

                {project.repositoryUrl && (
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="md" leftIcon={<Code2 className="w-4 h-4" />} rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      {isBangla ? 'সোর্স রিপোজিটরি' : 'Repository'}
                    </Button>
                  </a>
                )}

                {/* If software product, link to dedicated product page */}
                {['buildest-bd', 'salary-bd', 'civildesk', 'civil-estimator-bd'].includes(project.slug) && (
                  <Link to={`/products/${project.slug}`}>
                    <Button variant="secondary" size="md">
                      {isBangla ? 'প্রোডাক্ট বিবরণ দেখুন' : 'View Product Page'}
                    </Button>
                  </Link>
                )}

                <Link to="/start-project">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {isBangla ? 'প্রজেক্ট নিয়ে কথা বলুন' : 'Start Similar Project'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Large Visual Framing */}
            <div className="lg:col-span-6 w-full">
              <ProjectVisual project={project} size="lg" />
            </div>
          </div>
        </Container>
      </header>

      {/* 3. Overview Section */}
      <Section spacing="lg" surface="canvas" borderBottom>
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                CASE SPECIFICATION
              </span>
              <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                Project Overview
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                {project.description || project.shortDescription}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Challenge & Solution Split (Data-driven: Section 11 & 12) */}
      {(project.challenge || project.solution) && (
        <Section spacing="lg" surface="subtle" borderBottom>
          <Container size="2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Challenge Card */}
              {project.challenge && (
                <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
                  <div className="flex items-center gap-2.5 text-[var(--color-warning)]">
                    <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="type-caption font-bold uppercase tracking-wider font-mono">
                      The Operational Challenge
                    </h3>
                  </div>
                  <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Solution Card */}
              {project.solution && (
                <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
                  <div className="flex items-center gap-2.5 text-[var(--color-success)]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="type-caption font-bold uppercase tracking-wider font-mono">
                      The Engineered Solution
                    </h3>
                  </div>
                  <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. Key Features (Data-driven) */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <Section spacing="lg" surface="canvas" borderBottom>
          <Container size="2xl">
            <div className="space-y-8">
              <div className="space-y-2 max-w-2xl">
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                  CAPABILITIES
                </span>
                <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                  Key System Deliverables
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand)] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <span className="type-body-small font-medium text-[var(--text-secondary)]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 6. Technology Stack (Data-driven: Section 14) */}
      {project.technologies && project.technologies.length > 0 && (
        <Section spacing="lg" surface="subtle" borderBottom>
          <Container size="2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                  TECHNICAL ARCHITECTURE
                </span>
                <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                  Technology Stack
                </h2>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="p-3 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-mono font-semibold text-[var(--text-primary)] shadow-2xs flex items-center gap-2"
                  >
                    <Cpu className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 7. Real Screenshots (Data-driven: Section 11 & 12) */}
      {project.screenshots && project.screenshots.length > 0 && (
        <Section spacing="lg" surface="canvas" borderBottom>
          <Container size="2xl">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                  INTERFACE VERIFICATION
                </span>
                <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                  Screenshots &amp; Interface Views
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.map((shot, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[var(--border-color)] shadow-xs">
                    <img src={shot} alt={`${project.title} screenshot ${idx + 1}`} loading="lazy" className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 8. Outcome (Data-driven) */}
      {project.outcome && (
        <Section spacing="lg" surface="subtle" borderBottom>
          <Container size="2xl">
            <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 max-w-3xl">
              <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                OUTCOME &amp; IMPACT
              </span>
              <h3 className="type-h3 text-[var(--text-primary)] font-bold">
                Operational Result
              </h3>
              <p className="type-body text-[var(--text-secondary)] leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* 9. Related Work (Section 11) */}
      {otherProjects.length > 0 && (
        <Section spacing="lg" surface="canvas" borderBottom>
          <Container size="2xl">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                  OTHER WORK
                </span>
                <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
                  Additional Projects by BDCON Labs
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {otherProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 10. Bottom CTA */}
      <PortfolioCTA />
    </article>
  );
};
