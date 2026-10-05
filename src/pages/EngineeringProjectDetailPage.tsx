import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Building, 
  Calendar, 
  Layers, 
  Check, 
  Maximize2,
  FileText,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link, useRouter, matchPath } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { getEngineeringProjectBySlug } from '../data/engineeringProjects';
import { EngineeringProject } from '../types/engineeringProject';
import { EngineeringGalleryModal } from '../components/engineering/EngineeringGalleryModal';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';

export const EngineeringProjectDetailPage: React.FC = () => {
  const { path } = useRouter();
  const { isBangla } = useTranslation();
  const [project, setProject] = useState<EngineeringProject | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Match /engineering/projects/:slug
  const match = matchPath('/engineering/projects/:slug', path);
  const slug = match.matches ? match.params.slug : '';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (slug) {
      getEngineeringProjectBySlug(slug).then((res) => {
        if (isMounted) {
          setProject(res || null);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      setProject(null);
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-mono">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
          <span>{isBangla ? 'প্রজেক্ট ডেটা লোড হচ্ছে...' : 'Retrieving project specification...'}</span>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!project) {
    return (
      <Section spacing="xl" className="flex-1 flex items-center justify-center">
        <Container size="md">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-md mx-auto space-y-5 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Compass className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className={`text-xl font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                {isBangla ? 'প্রজেক্টটি পাওয়া যায়নি' : 'Project Specification Not Found'}
              </h2>
              <p className={`text-sm text-[var(--text-secondary)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                {isBangla
                  ? 'আপনি যে ইঞ্জিনিয়ারিং প্রজেক্টটির বিবরণ খুঁজছেন, তা বর্তমানে ডাটাবেসে নিবন্ধিত নেই।'
                  : 'The requested engineering project archive is not available or has been updated.'
                }
              </p>
            </div>

            <Link to="/engineering/projects">
              <Button as="span" variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}>
                {isBangla ? 'সকল প্রজেক্ট দেখুন' : 'Back to Engineering Projects'}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  const title = isBangla ? project.titleBn : project.titleEn;
  const projectType = isBangla ? project.projectTypeBn : project.projectTypeEn;
  const location = isBangla ? project.locationBn : project.locationEn;
  const client = isBangla ? project.clientBn : project.clientEn;
  const overview = isBangla ? project.overviewBn : project.overviewEn;
  const services = isBangla ? project.servicesProvidedBn : project.servicesProvidedEn;
  const status = isBangla ? project.statusBn : project.statusEn;

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={
          isBangla
            ? `${title} — বিডিকন ইঞ্জিনিয়ারিং লিমিটেড`
            : `${title} — BDCON Engineering Ltd`
        }
        description={project.shortDescEn}
        canonicalPath={`/engineering/projects/${project.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'ইঞ্জিনিয়ারিং' : 'Engineering', url: '/engineering' },
          { name: isBangla ? 'প্রজেক্টস' : 'Projects', url: '/engineering/projects' },
          { name: title, url: `/engineering/projects/${project.slug}` },
        ]}
      />

      {/* Hero Section */}
      <Section 
        spacing="xl" 
        className="relative overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-canvas)] via-[var(--bg-surface)] to-[var(--bg-canvas)]"
      >
        <Container size="2xl">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumbs variant="inline" currentTitle={title} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Title & Overview */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  {projectType}
                </span>
                {status && (
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {status}
                  </span>
                )}
              </div>

              {/* Project Name */}
              <h1 
                className={`text-[var(--text-primary)] font-bold text-balance ${
                  isBangla 
                    ? 'font-bangla-serif tracking-normal leading-[1.25] text-3xl sm:text-4xl lg:text-5xl' 
                    : 'type-display tracking-tight text-3xl sm:text-4xl lg:text-[44px] leading-[1.15]'
                }`}
              >
                {title}
              </h1>

              {/* Factual Project Overview */}
              <div className="space-y-3 pt-2">
                <h3 className={`text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                  {isBangla ? 'প্রকল্প বিবরণ' : 'PROJECT OVERVIEW'}
                </h3>
                <p 
                  className={`text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed ${
                    isBangla ? 'font-bangla-sans' : 'type-body'
                  }`}
                >
                  {overview}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link to={`/engineering/contact?project=${project.slug}`}>
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

                <Link to="/engineering/projects">
                  <Button 
                    as="span"
                    variant="secondary" 
                    size="lg"
                    className={isBangla ? 'font-bangla-sans' : ''}
                    leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
                  >
                    {isBangla ? 'সকল প্রজেক্ট দেখুন' : 'All Projects'}
                  </Button>
                </Link>
              </div>

            </div>

            {/* Right Column: Verified Project Information Card */}
            <div className="lg:col-span-4 w-full">
              <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-sm">
                
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <h2 className={`text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {isBangla ? 'প্রকল্প তথ্য' : 'Project Information'}
                  </h2>
                  <ShieldCheck className="w-4 h-4 text-sky-500" />
                </div>

                <div className="space-y-3 text-xs">
                  {location && (
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
                      <span className="font-mono text-[var(--text-muted)]">
                        {isBangla ? 'অবস্থান' : 'Location'}
                      </span>
                      <span className="font-medium text-[var(--text-primary)] text-right">
                        {location}
                      </span>
                    </div>
                  )}

                  {client && (
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
                      <span className="font-mono text-[var(--text-muted)]">
                        {isBangla ? 'ক্লায়েন্ট' : 'Client'}
                      </span>
                      <span className="font-medium text-[var(--text-primary)] text-right">
                        {client}
                      </span>
                    </div>
                  )}

                  {project.year && (
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
                      <span className="font-mono text-[var(--text-muted)]">
                        {isBangla ? 'সাল' : 'Year'}
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {project.year}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[var(--text-muted)]">
                      {isBangla ? 'কনসালটেন্ট' : 'Consultant'}
                    </span>
                    <span className="font-medium text-sky-600 dark:text-sky-400">
                      BDCON Engineering Ltd
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </Container>
      </Section>

      {/* Scope of Work Section */}
      {services.length > 0 && (
        <Section spacing="lg" className="bg-[var(--bg-canvas)] border-b border-[var(--border-color)]">
          <Container size="2xl">
            <div className="space-y-4">
              <h2 className={`text-xl sm:text-2xl font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : 'type-h2'}`}>
                {isBangla ? 'কাজের পরিধি' : 'Scope of Work'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((srv, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-sm font-medium text-[var(--text-primary)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                      {srv}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Visual Gallery (Drawings, Schematics, Photos) */}
      {project.gallery.length > 0 && (
        <Section spacing="xl" className="bg-[var(--bg-surface)] border-b border-[var(--border-color)]">
          <Container size="2xl">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : 'type-h2'}`}>
                    {isBangla ? 'ড্রয়িং ও ভিজ্যুয়াল গ্যালারি' : 'Visual Gallery & Drawings'}
                  </h2>
                  <p className={`text-sm text-[var(--text-secondary)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                    {isBangla
                      ? 'সম্পূর্ণ ভিউ দেখতে যেকোনো ইমেজে ক্লিক করুন।'
                      : 'Click any drawing sheet or photograph to expand in high resolution.'
                    }
                  </p>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {project.gallery.length} {isBangla ? 'টি ফাইল' : 'SHEETS'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {project.gallery.map((item, gIdx) => {
                  const itemTitle = isBangla ? item.titleBn || item.titleEn : item.titleEn;
                  const itemCaption = isBangla ? item.captionBn || item.captionEn : item.captionEn;

                  return (
                    <button
                      key={item.id}
                      onClick={() => openLightbox(gIdx)}
                      className="group relative flex flex-col rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-canvas)] hover:border-sky-500/60 hover:shadow-lg transition-all text-left"
                    >
                      <div className="relative aspect-[4/3] w-full bg-[#08111e] overflow-hidden">
                        <img 
                          src={item.url} 
                          alt={itemTitle || 'Engineering sheet'} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <div className="p-2 rounded-lg bg-black/60 backdrop-blur-xs flex items-center gap-1.5 text-xs font-mono">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>EXPAND</span>
                          </div>
                        </div>
                      </div>

                      {(itemTitle || itemCaption) && (
                        <div className="p-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] space-y-0.5">
                          {itemTitle && (
                            <h4 className={`text-xs font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                              {itemTitle}
                            </h4>
                          )}
                          {itemCaption && (
                            <p className={`text-[11px] text-[var(--text-muted)] truncate ${isBangla ? 'font-bangla-sans' : ''}`}>
                              {itemCaption}
                            </p>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          </Container>
        </Section>
      )}

      {/* Bottom CTA */}
      <Section spacing="xl" className="bg-[var(--bg-canvas)]">
        <Container size="2xl">
          <div className="p-8 sm:p-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-3xl mx-auto space-y-6 shadow-sm">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-color)] text-xs text-sky-600 dark:text-sky-400 font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>BDCON ENGINEERING LTD</span>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : 'type-h1'}`}>
              {isBangla ? 'আপনার কোনো ইঞ্জিনিয়ারিং প্রজেক্ট রয়েছে?' : 'Discuss Your Project'}
            </h2>

            <p className={`text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed ${isBangla ? 'font-bangla-sans' : 'type-body'}`}>
              {isBangla
                ? 'অনুরূপ বা যেকোনো ধরনের বিল্ডিং ডিজাইন, ড্রয়িং বা এস্টিমেশন নিয়ে আমাদের প্রকৌশলীদের সাথে আলোচনা করুন।'
                : 'Connect with our engineering consultancy team to discuss drawings, structural planning, or estimation for your next project.'
              }
            </p>

            <div className="pt-2 flex justify-center">
              <Link to={`/engineering/contact?project=${project.slug}`}>
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
            </div>

          </div>
        </Container>
      </Section>

      {/* Lightbox Modal */}
      <EngineeringGalleryModal
        items={project.gallery}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setActiveImageIndex}
      />
    </div>
  );
};
