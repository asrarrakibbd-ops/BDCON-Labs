import React, { useEffect, useState, useMemo } from 'react';
import { 
  Building2, 
  Compass, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  FileSpreadsheet, 
  DraftingCompass,
  Clock
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { getEngineeringProjects } from '../data/engineeringProjects';
import { EngineeringProject } from '../types/engineeringProject';
import { EngineeringProjectCard } from '../components/engineering/EngineeringProjectCard';

export const EngineeringProjectsPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [projects, setProjects] = useState<EngineeringProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getEngineeringProjects().then((data) => {
      if (isMounted) {
        setProjects(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter options derived dynamically from real projects (only if real projects exist)
  const projectTypes = useMemo(() => {
    if (projects.length === 0) return [];
    const types = new Set<string>();
    projects.forEach((p) => {
      if (p.projectTypeEn) types.add(p.projectTypeEn);
    });
    return Array.from(types);
  }, [projects]);

  const availableServices = useMemo(() => {
    if (projects.length === 0) return [];
    const srvs = new Set<string>();
    projects.forEach((p) => {
      p.servicesProvidedEn.forEach((s) => srvs.add(s));
    });
    return Array.from(srvs);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesType = selectedType === 'all' || p.projectTypeEn === selectedType;
      const matchesService = selectedService === 'all' || p.servicesProvidedEn.includes(selectedService);
      return matchesType && matchesService;
    });
  }, [projects, selectedType, selectedService]);

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={
          isBangla
            ? 'ইঞ্জিনিয়ারিং প্রজেক্টসমূহ — বিডিকন ইঞ্জিনিয়ারিং লিমিটেড'
            : 'Selected Engineering Projects — BDCON Engineering Ltd'
        }
        description={
          isBangla
            ? 'বিডিকন ইঞ্জিনিয়ারিং কর্তৃক সম্পন্নকৃত বিল্ডিং ডিজাইন, ইঞ্জিনিয়ারিং ড্রয়িং, এস্টিমেশন এবং কনসালটেন্সি কাজসমূহ ঘুরে দেখুন।'
            : 'Explore selected building design, engineering, estimation and consultancy work completed by BDCON Engineering.'
        }
        canonicalPath="/engineering/projects"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'ইঞ্জিনিয়ারিং' : 'Engineering', url: '/engineering' },
          { name: isBangla ? 'প্রজেক্টস' : 'Projects', url: '/engineering/projects' },
        ]}
      />

      {/* Hero Section */}
      <Section 
        spacing="xl" 
        className="relative overflow-hidden pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-canvas)] via-[var(--bg-surface)] to-[var(--bg-canvas)]"
      >
        {/* Subtle Engineering Drafting Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--border-color) 1px, transparent 1px),
              linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
          aria-hidden="true"
        />

        <Container size="2xl" className="relative z-10">
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-sky-600 dark:bg-sky-400 rotate-45 inline-block shrink-0" />
              <span className={`text-xs uppercase tracking-widest text-[var(--color-brand)] font-semibold ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'বাছাইকৃত প্রজেক্টসমূহ' : 'SELECTED PROJECTS'}
              </span>
            </div>

            {/* Heading */}
            <h1 
              className={`text-[var(--text-primary)] font-bold tracking-tight text-balance ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.25] text-3xl sm:text-4xl lg:text-5xl' 
                  : 'type-display tracking-tight text-3xl sm:text-4xl lg:text-[46px] leading-[1.12]'
              }`}
            >
              {isBangla 
                ? 'বাস্তব প্রকল্পের ভিত্তিতে নির্মিত ইঞ্জিনিয়ারিং সমাধান।'
                : 'Engineering work built around real projects.'
              }
            </h1>

            {/* Supporting Copy */}
            <p 
              className={`text-[var(--text-secondary)] font-normal max-w-2xl text-base sm:text-lg ${
                isBangla ? 'font-bangla-sans leading-relaxed' : 'type-body leading-relaxed'
              }`}
            >
              {isBangla
                ? 'বিডিকন ইঞ্জিনিয়ারিং কর্তৃক সম্পন্নকৃত বিল্ডিং ডিজাইন, ইঞ্জিনিয়ারিং ড্রয়িং, এস্টিমেশন এবং কনসালটেন্সি কাজসমূহ ঘুরে দেখুন।'
                : 'Explore selected building design, engineering, estimation and consultancy work completed by BDCON Engineering.'
              }
            </p>

            {/* Breadcrumb Quick Reference */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Link to="/engineering" className="hover:text-[var(--text-primary)] transition-colors">
                BDCON Engineering
              </Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-medium">Projects</span>
            </div>

          </div>
        </Container>
      </Section>

      {/* Main Content Area */}
      <Section spacing="xl" className="bg-[var(--bg-canvas)] border-b border-[var(--border-color)]">
        <Container size="2xl">
          
          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-mono">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
                <span>{isBangla ? 'প্রজেক্ট লোড হচ্ছে...' : 'Retrieving engineering portfolio...'}</span>
              </div>
            </div>
          ) : projects.length > 0 ? (
            /* When real projects are registered */
            <div className="space-y-8">
              {/* Optional Lightweight Filter Bar (Rendered only when real projects exist) */}
              {(projectTypes.length > 1 || availableServices.length > 1) && (
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs">
                  {/* Type Filter */}
                  {projectTypes.length > 1 && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[var(--text-muted)] uppercase">
                        {isBangla ? 'টাইপ:' : 'Type:'}
                      </span>
                      <button
                        onClick={() => setSelectedType('all')}
                        className={`px-3 py-1.5 rounded font-medium transition-colors ${
                          selectedType === 'all'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {isBangla ? 'সকল' : 'All'}
                      </button>
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`px-3 py-1.5 rounded font-medium transition-colors ${
                            selectedType === type
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Service Filter */}
                  {availableServices.length > 1 && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[var(--text-muted)] uppercase">
                        {isBangla ? 'সেবা:' : 'Service:'}
                      </span>
                      <button
                        onClick={() => setSelectedService('all')}
                        className={`px-3 py-1.5 rounded font-medium transition-colors ${
                          selectedService === 'all'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {isBangla ? 'সকল' : 'All'}
                      </button>
                      {availableServices.map((srv) => (
                        <button
                          key={srv}
                          onClick={() => setSelectedService(srv)}
                          className={`px-3 py-1.5 rounded font-medium transition-colors ${
                            selectedService === srv
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProjects.map((project) => (
                  <EngineeringProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          ) : (
            /* Strict E3 Rule: Clean, Polished Placeholder State when no real projects exist yet */
            <div className="py-12 sm:py-16 max-w-2xl mx-auto text-center space-y-6">
              
              {/* Technical Architectural Drafting Box Graphic */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-sm relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #38bdf8 1px, transparent 1px),
                      linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
                    `,
                    backgroundSize: '10px 10px'
                  }}
                  aria-hidden="true"
                />
                <DraftingCompass className="w-9 h-9 relative z-10" />
              </div>

              {/* Exact Requested Clean Heading */}
              <div className="space-y-3">
                <h2 
                  className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight ${
                    isBangla ? 'font-bangla-serif' : 'type-h2'
                  }`}
                >
                  {isBangla 
                    ? 'ইঞ্জিনিয়ারিং প্রজেক্টসমূহ শীঘ্রই এখানে যুক্ত করা হবে।'
                    : 'Engineering projects will be showcased here.'
                  }
                </h2>

                <p 
                  className={`text-base text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto ${
                    isBangla ? 'font-bangla-sans' : 'type-body'
                  }`}
                >
                  {isBangla
                    ? 'বিডিকন ইঞ্জিনিয়ারিং লিমিটেডের বাস্তবায়িত সিভিল ইঞ্জিনিয়ারিং প্রকল্প, কাঠামোগত ড্রয়িং ও প্রাক্কলন কেস স্টাডি তথ্য সংযোজন প্রক্রিয়াধীন রয়েছে।'
                    : 'Documented civil engineering projects, architectural working drawings, and construction consultancy case studies are currently being curated and will be published here.'
                  }
                </p>
              </div>

              {/* Technical Verification Note */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-muted)] font-mono max-w-md mx-auto space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-sky-600 dark:text-sky-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>STANDARDS COMPLIANCE</span>
                </div>
                <p>Real case studies and engineering drawing sheets will appear as verified project archives are approved.</p>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/engineering/contact">
                  <Button 
                    as="span"
                    variant="primary" 
                    size="lg"
                    className={isBangla ? 'font-bangla-sans' : ''}
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    {isBangla ? 'প্রজেক্ট নিয়ে আলোচনা করুন' : 'Discuss Your Project'}
                  </Button>
                </Link>

                <Link to="/engineering/services">
                  <Button 
                    as="span"
                    variant="secondary" 
                    size="lg"
                    className={isBangla ? 'font-bangla-sans' : ''}
                  >
                    {isBangla ? 'আমাদের সেবাসমূহ দেখুন' : 'Explore Our Services'}
                  </Button>
                </Link>
              </div>

            </div>
          )}

        </Container>
      </Section>
    </div>
  );
};
