import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Compass, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Clock, 
  FolderCheck
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link, useRouter, matchPath } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { 
  getEngineeringServiceBySlug, 
  getEngineeringServices 
} from '../data/engineeringServices';
import { EngineeringService } from '../types/engineering';
import { EngineeringServiceIcon } from '../components/engineering/EngineeringServiceIcon';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';

export const EngineeringServiceDetailPage: React.FC = () => {
  const { path } = useRouter();
  const { isBangla } = useTranslation();
  const [service, setService] = useState<EngineeringService | null>(null);
  const [allServices, setAllServices] = useState<EngineeringService[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract slug from route pattern /engineering/services/:slug
  const match = matchPath('/engineering/services/:slug', path);
  const slug = match.matches ? match.params.slug : '';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      getEngineeringServiceBySlug(slug),
      getEngineeringServices()
    ]).then(([resService, resList]) => {
      if (isMounted) {
        setService(resService || null);
        setAllServices(resList);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-mono">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
          <span>{isBangla ? 'ইঞ্জিনিয়ারিং সেবা লোড হচ্ছে...' : 'Retrieving engineering service specifications...'}</span>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!service) {
    return (
      <Section spacing="xl" className="flex-1 flex items-center justify-center">
        <Container size="md">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-md mx-auto space-y-5 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Compass className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className={`text-xl font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                {isBangla ? 'ইঞ্জিনিয়ারিং সেবাটি পাওয়া যায়নি' : 'Service Specification Not Found'}
              </h2>
              <p className={`text-sm text-[var(--text-secondary)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                {isBangla
                  ? 'আপনি যে সেবাটির বিবরণ খুঁজছেন, তা বর্তমানে উপলব্ধ নয় অথবা লিংকটি পরিবর্তিত হয়েছে।'
                  : 'The requested engineering service route does not exist or has been relocated.'
                }
              </p>
            </div>

            <Link to="/engineering/services">
              <Button as="span" variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}>
                {isBangla ? 'সকল সেবাসমূহ দেখুন' : 'Back to Engineering Services'}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  const title = isBangla ? service.titleBn : service.titleEn;
  const shortDesc = isBangla ? service.shortDescBn : service.shortDescEn;
  const introduction = isBangla ? service.introductionBn : service.introductionEn;
  const whatWeProvide = isBangla ? service.whatWeProvideBn : service.whatWeProvideEn;
  const deliverables = isBangla ? service.deliverablesBn : service.deliverablesEn;
  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={
          isBangla
            ? `${title} — বিডিকন ইঞ্জিনিয়ারিং লিমিটেড`
            : `${title} — BDCON Engineering Ltd`
        }
        description={shortDesc}
        canonicalPath={`/engineering/services/${service.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'ইঞ্জিনিয়ারিং' : 'Engineering', url: '/engineering' },
          { name: isBangla ? 'সেবাসমূহ' : 'Services', url: '/engineering/services' },
          { name: title, url: `/engineering/services/${service.slug}` },
        ]}
      />

      {/* Header & Breadcrumb Section */}
      <Section 
        spacing="xl" 
        className="relative overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-canvas)] via-[var(--bg-surface)] to-[var(--bg-canvas)]"
      >
        {/* Technical drafting grid background */}
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
          
          {/* Breadcrumb Bar */}
          <Breadcrumbs variant="inline" currentTitle={title} className="mb-6" />

          {/* Hero Header Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  DISCIPLINE {service.number}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  BDCON ENGINEERING LTD
                </span>
              </div>

              <h1 
                className={`text-[var(--text-primary)] font-bold text-balance ${
                  isBangla 
                    ? 'font-bangla-serif tracking-normal leading-[1.25] text-3xl sm:text-4xl lg:text-5xl' 
                    : 'type-display tracking-tight text-3xl sm:text-4xl lg:text-[44px] leading-[1.15]'
                }`}
              >
                {title}
              </h1>

              <p 
                className={`text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed ${
                  isBangla ? 'font-bangla-sans' : 'type-body'
                }`}
              >
                {introduction}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link to={`/engineering/contact?service=${service.slug}`}>
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
                    leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
                  >
                    {isBangla ? 'সকল সেবাসমূহ' : 'All Services'}
                  </Button>
                </Link>
              </div>

            </div>

            {/* Right Card: Technical Specification Badge */}
            <div className="lg:col-span-4 w-full">
              <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-sm">
                <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <EngineeringServiceIcon name={service.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-[var(--text-muted)] block">Discipline</span>
                    <span className="text-sm font-bold text-[var(--text-primary)] block truncate">{title}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[var(--text-secondary)] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Code Standard</span>
                    <span className="text-sky-600 dark:text-sky-400 font-semibold">BNBC &amp; ACI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Output Format</span>
                    <span className="text-[var(--text-primary)]">CAD DWG / PDF / BOQ</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Practicality</span>
                    <span className="text-emerald-500 font-semibold">Field Buildable</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to={`/engineering/contact?service=${service.slug}`} className="block">
                    <Button as="span" variant="secondary" size="sm" className="w-full justify-center">
                      {isBangla ? 'পরামর্শ অনুরোধ করুন' : 'Request Consultation'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </Container>
      </Section>

      {/* Main Body Content: What We Provide & Typical Deliverables */}
      <Section spacing="xl" className="bg-[var(--bg-canvas)] border-b border-[var(--border-color)]">
        <Container size="2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Content (8 Cols): Scope and Deliverables */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16">
              
              {/* 1. What We Provide */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className={`text-xs font-mono uppercase tracking-widest text-[var(--color-brand)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                    {isBangla ? 'সেবার আওতা' : 'SERVICE SCOPE'}
                  </span>
                </div>

                <h2 
                  className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight ${
                    isBangla ? 'font-bangla-serif' : 'type-h2'
                  }`}
                >
                  {isBangla ? 'আমরা যা প্রদান করি' : 'What We Provide'}
                </h2>

                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {whatWeProvide.map((item, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-start gap-3.5 hover:border-sky-500/40 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className={`text-sm sm:text-base text-[var(--text-primary)] leading-relaxed ${isBangla ? 'font-bangla-sans' : ''}`}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Typical Deliverables */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className={`text-xs font-mono uppercase tracking-widest text-[var(--color-brand)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                    {isBangla ? 'ডেলিভারেবলস' : 'PROJECT OUTPUTS'}
                  </span>
                </div>

                <h2 
                  className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight ${
                    isBangla ? 'font-bangla-serif' : 'type-h2'
                  }`}
                >
                  {isBangla ? 'প্রত্যাশিত আউটপুট ও ড্রয়িং' : 'Typical Deliverables'}
                </h2>

                <div className="p-6 sm:p-7 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
                  <p className={`text-sm text-[var(--text-secondary)] leading-relaxed pb-3 border-b border-[var(--border-subtle)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                    {isBangla
                      ? 'প্রতিটি কাজের শেষে ক্লায়েন্টকে প্রয়োজনীয় ফরম্যাটে স্পষ্ট ও মানসম্পন্ন ডকুমেন্টেশন হস্তান্তর করা হয়:'
                      : 'Upon completion, clients receive standardized, coordinated engineering documentation prepared for practical execution:'
                    }
                  </p>

                  <ul className="space-y-3 pt-1">
                    {deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                          <FolderCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-sm text-[var(--text-primary)] leading-relaxed font-medium ${isBangla ? 'font-bangla-sans' : ''}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. Simple Project Workflow */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className={`text-xs font-mono uppercase tracking-widest text-[var(--color-brand)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                    {isBangla ? 'কাজের ধাপ' : 'SIMPLE WORKFLOW'}
                  </span>
                </div>

                <h2 
                  className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight ${
                    isBangla ? 'font-bangla-serif' : 'type-h2'
                  }`}
                >
                  {isBangla ? 'সহজ ও সুশৃঙ্খল প্রকল্প প্রক্রিয়া' : 'Simple Project Workflow'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {service.workflow.map((wStep) => {
                    const stepTitle = isBangla ? wStep.titleBn : wStep.titleEn;
                    const stepDesc = isBangla ? wStep.descBn : wStep.descEn;

                    return (
                      <div 
                        key={wStep.step}
                        className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2 relative"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                          <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                            STEP {wStep.step}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-slate-400/40" />
                        </div>

                        <h3 className={`text-base font-bold text-[var(--text-primary)] pt-1 ${isBangla ? 'font-bangla-serif' : ''}`}>
                          {stepTitle}
                        </h3>

                        <p className={`text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed ${isBangla ? 'font-bangla-sans' : ''}`}>
                          {stepDesc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Sidebar (4 Cols): Other Engineering Services */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-5 sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <h3 className={`text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {isBangla ? 'অন্যান্য সেবাসমূহ' : 'Other Services'}
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {otherServices.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {otherServices.map((other) => {
                    const otherTitle = isBangla ? other.titleBn : other.titleEn;

                    return (
                      <Link
                        key={other.slug}
                        to={`/engineering/services/${other.slug}`}
                        className="group flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-surface-subtle)] transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs text-[var(--text-muted)]">
                            {other.number}
                          </span>
                          <span className={`text-xs sm:text-sm font-medium text-[var(--text-primary)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors ${
                            isBangla ? 'font-bangla-sans' : ''
                          }`}>
                            {otherTitle}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <Link to="/engineering/services" className="block text-center text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                    {isBangla ? 'সকল সেবাসমূহ একনজরে দেখুন →' : 'View all engineering services →'}
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </Container>
      </Section>

      {/* Primary Bottom CTA */}
      <Section spacing="xl" className="bg-[var(--bg-surface)] relative overflow-hidden">
        <Container size="2xl">
          <div className="p-8 sm:p-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-center max-w-3xl mx-auto space-y-6 shadow-sm">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-sky-600 dark:text-sky-400 font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>BDCON ENGINEERING LTD</span>
            </div>

            <h2 
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] tracking-tight ${
                isBangla ? 'font-bangla-serif' : 'type-h1'
              }`}
            >
              {isBangla 
                ? 'আপনার কোনো ইঞ্জিনিয়ারিং বা নির্মাণ প্রজেক্ট রয়েছে?' 
                : 'Have an engineering project in mind?'
              }
            </h2>

            <p className={`text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed ${isBangla ? 'font-bangla-sans' : 'type-body'}`}>
              {isBangla
                ? `${title} সংক্রান্ত যেকোনো প্রশ্ন, ড্রয়িং পর্যালোচনা কিংবা এস্টিমেশন নিয়ে আলোচনা করতে আমাদের ইঞ্জিনিয়ারিং দলের সাথে যুক্ত হোন।`
                : `Connect with our engineering team to review requirements, drawings, or estimation needs for ${title}.`
              }
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={`/engineering/contact?service=${service.slug}`}>
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
    </div>
  );
};
