import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ArrowRight, Briefcase, AlertCircle, RefreshCw } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { FeaturedProject } from '../components/portfolio/FeaturedProject';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { PortfolioFilter } from '../components/portfolio/PortfolioFilter';
import { PortfolioCTA } from '../components/portfolio/PortfolioCTA';
import { EmptyState } from '../components/ui/EmptyState';
import { getPortfolioProjects } from '../data/portfolio';
import { PortfolioProject, PortfolioCategory } from '../types/portfolio';
import { Link } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';

export const PortfolioPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPortfolioProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err?.message || (isBangla ? 'প্রজেক্ট লোড করা সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : 'We could not load portfolio projects right now. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, [isBangla]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    document.title = isBangla ? 'পোর্টফোলিও — BDCON Labs' : 'Portfolio & Case Studies — BDCON Labs';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        isBangla
          ? 'BDCON Labs-এর তৈরি সফটওয়্যার প্রোডাক্টস, ওয়েব অ্যাপ্লিকেশন ও কাস্টম সিস্টেমসমূহ।'
          : 'Explore software products, web applications, and custom software systems engineered by BDCON Labs.'
      );
    }
  }, [isBangla]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects;
    }
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const featured = activeCategory === 'all'
    ? filteredProjects.find((p) => p.featured) || filteredProjects[0]
    : null;

  const standardGrid = featured
    ? filteredProjects.filter((p) => p.id !== featured.id)
    : filteredProjects;

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={isBangla ? 'পোর্টফোলিও — BDCON Labs' : 'Client Portfolio & Case Studies — BDCON Labs'}
        description={
          isBangla
            ? 'BDCON Labs-এর তৈরি সফটওয়্যার প্রোডাক্টস, ওয়েব অ্যাপ্লিকেশন ও কাস্টম সিস্টেমসমূহ।'
            : 'Explore software products, web applications, mobile tools, and custom digital systems engineered by BDCON Labs with precision and purpose.'
        }
        canonicalPath="/portfolio"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'পোর্টফোলিও' : 'Portfolio', url: '/portfolio' },
        ]}
      />
      {/* Top Breadcrumb Bar */}
      <Breadcrumbs />

      {/* 1. Page Header */}
      <PageHeader
        eyebrow={isBangla ? 'আমাদের কাজ ও প্রজেক্ট' : 'OUR WORK'}
        title={isBangla ? 'বাস্তব সমস্যা সমাধানে নির্মিত সফটওয়্যার।' : 'Software built to solve real problems.'}
        description={
          isBangla
            ? 'কাজের গতিশীলতা বাড়াতে BDCON Labs-এর তৈরি বিভিন্ন সফটওয়্যার প্রোডাক্ট, ওয়েব অ্যাপ্লিকেশন ও কাস্টম সিস্টেম ঘুরে দেখুন।'
            : 'Explore software products, web applications, mobile tools, and custom digital systems engineered by BDCON Labs with precision and purpose.'
        }
        cta={
          <Link to="/start-project">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {isBangla ? 'প্রজেক্ট শুরু করুন' : 'Start a Project'}
            </Button>
          </Link>
        }
        borderBottom
      />

      {/* 2. Portfolio Category Filter & Counter */}
      <Section spacing="sm" surface="canvas" borderBottom className="py-4">
        <Container size="2xl">
          <PortfolioFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </Container>
      </Section>

      {/* 3. Main Projects Showcase Grid */}
      <Section spacing="lg" surface="subtle" className="flex-1">
        <Container size="2xl">
          {loading ? (
            /* Loading Skeleton State */
            <div className="space-y-8 animate-pulse">
              <div className="h-96 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
                ))}
              </div>
            </div>
          ) : error ? (
            /* Error State with Retry */
            <div className="p-8 sm:p-12 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
              <AlertCircle className="w-10 h-10 text-[var(--color-brand)] mx-auto opacity-80" />
              <div className="space-y-1">
                <h3 className="type-h3 text-[var(--text-primary)] font-bold">Unable to load projects</h3>
                <p className="type-body-small text-[var(--text-secondary)]">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchProjects} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                Try again
              </Button>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="space-y-8 sm:space-y-10">
              {/* Highlighted Lead Project Card (shown on 'all' view) */}
              {featured && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                    <span className="type-caption font-semibold tracking-wider uppercase text-[var(--color-brand)] font-mono text-[11px]">
                      FLAGSHIP INITIATIVE
                    </span>
                  </div>
                  <FeaturedProject project={featured} />
                </div>
              )}

              {/* Standard Grid of Additional Works */}
              {standardGrid.length > 0 && (
                <div className="space-y-6 pt-4">
                  {featured && (
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono border-b border-[var(--border-color)] pb-3">
                      <span>ADDITIONAL CASE STUDIES</span>
                      <span>{standardGrid.length} {standardGrid.length === 1 ? 'project' : 'projects'}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {standardGrid.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              title="Selected work will appear here."
              description="No projects currently match the selected filter category."
              actionLabel={activeCategory !== 'all' ? "View All Work" : undefined}
              onAction={activeCategory !== 'all' ? () => setActiveCategory('all') : undefined}
            />
          )}
        </Container>
      </Section>

      {/* 4. Portfolio Conversion CTA */}
      <PortfolioCTA />
    </div>
  );
};
