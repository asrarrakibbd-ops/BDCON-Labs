import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { ENGINEERING_SERVICES } from '../data/engineeringServices';
import { EngineeringServiceIcon } from '../components/engineering/EngineeringServiceIcon';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';

export const EngineeringServicesPage: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={
          isBangla
            ? 'ইঞ্জিনিয়ারিং সেবাসমূহ — বিডিকন ইঞ্জিনিয়ারিং লিমিটেড'
            : 'Engineering Services — BDCON Engineering Ltd'
        }
        description={
          isBangla
            ? 'বিল্ডিং ডিজাইন ও টেকনিক্যাল ড্রয়িং থেকে শুরু করে এস্টিমেশন এবং কনস্ট্রাকশন কনসালটেন্সি—বিডিকন ইঞ্জিনিয়ারিং প্রতিটি প্রকল্পের জন্য বাস্তবমুখী সিভিল ইঞ্জিনিয়ারিং সমাধান প্রদান করে।'
            : 'From building design and technical drawings to estimation and construction consultancy, BDCON Engineering provides practical civil engineering solutions tailored to each project.'
        }
        canonicalPath="/engineering/services"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'ইঞ্জিনিয়ারিং' : 'Engineering', url: '/engineering' },
          { name: isBangla ? 'সেবাসমূহ' : 'Services', url: '/engineering/services' },
        ]}
      />

      {/* Top Breadcrumbs Bar */}
      <Breadcrumbs />

      {/* Services Header Section */}
      <Section 
        spacing="xl" 
        className="relative overflow-hidden pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-canvas)] via-[var(--bg-surface)] to-[var(--bg-canvas)]"
      >
        {/* Subtle CAD Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
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
                {isBangla ? 'আমাদের ইঞ্জিনিয়ারিং সেবাসমূহ' : 'OUR ENGINEERING SERVICES'}
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
                ? 'আপনার প্রকল্পের প্রতিটি ধাপের জন্য নির্ভরযোগ্য ইঞ্জিনিয়ারিং সমাধান।'
                : 'Engineering solutions for every stage of your project.'
              }
            </h1>

            {/* Supporting Copy */}
            <p 
              className={`text-[var(--text-secondary)] font-normal max-w-2xl text-base sm:text-lg ${
                isBangla ? 'font-bangla-sans leading-relaxed' : 'type-body leading-relaxed'
              }`}
            >
              {isBangla
                ? 'বিল্ডিং ডিজাইন ও টেকনিক্যাল ড্রয়িং থেকে শুরু করে এস্টিমেশন এবং কনস্ট্রাকশন কনসালটেন্সি—বিডিকন ইঞ্জিনিয়ারিং প্রতিটি প্রকল্পের জন্য বাস্তবমুখী সিভিল ইঞ্জিনিয়ারিং সমাধান প্রদান করে।'
                : 'From building design and technical drawings to estimation and construction consultancy, BDCON Engineering provides practical civil engineering solutions tailored to each project.'
              }
            </p>

          </div>
        </Container>
      </Section>

      {/* Services Grid Section */}
      <Section spacing="xl" className="bg-[var(--bg-canvas)] border-b border-[var(--border-color)]">
        <Container size="2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ENGINEERING_SERVICES.map((service) => {
              const title = isBangla ? service.titleBn : service.titleEn;
              const shortDesc = isBangla ? service.shortDescBn : service.shortDescEn;
              const deliverables = isBangla ? service.deliverablesBn : service.deliverablesEn;

              return (
                <Link
                  key={service.slug}
                  to={`/engineering/services/${service.slug}`}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-sky-500/50 hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    {/* Card Top: Number Index and Icon */}
                    <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)] mb-5">
                      <span className="font-mono text-xs text-[var(--text-muted)] font-medium">
                        // {service.number}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-105 group-hover:border-sky-500/40 transition-transform">
                        <EngineeringServiceIcon name={service.iconName} className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 
                      className={`text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors ${
                        isBangla ? 'font-bangla-serif tracking-normal' : ''
                      }`}
                    >
                      {title}
                    </h2>

                    {/* Short Description */}
                    <p 
                      className={`text-sm text-[var(--text-secondary)] leading-relaxed mb-6 ${
                        isBangla ? 'font-bangla-sans' : ''
                      }`}
                    >
                      {shortDesc}
                    </p>
                  </div>

                  {/* Card Bottom: Deliverable Highlights and Arrow Indicator */}
                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                      {isBangla ? 'প্রধান আউটপুট:' : 'Key deliverables:'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] mb-5">
                      {deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-sky-500 font-mono text-[11px] select-none leading-relaxed">›</span>
                          <span className={`line-clamp-1 ${isBangla ? 'font-bangla-sans' : ''}`}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Detail Link Text */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:text-sky-500 transition-colors">
                      <span className={isBangla ? 'font-bangla-sans' : ''}>
                        {isBangla ? 'বিস্তারিত বিবরণ দেখুন' : 'Explore Service Scope'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </Container>
      </Section>

      {/* Discussion CTA */}
      <Section spacing="lg" className="bg-[var(--bg-surface)]">
        <Container size="2xl">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-canvas)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400">
                <Compass className="w-4 h-4" />
                <span>BDCON ENGINEERING CONSULTANCY</span>
              </div>
              <h3 
                className={`text-xl sm:text-2xl font-bold text-[var(--text-primary)] ${
                  isBangla ? 'font-bangla-serif tracking-normal' : ''
                }`}
              >
                {isBangla 
                  ? 'আপনার প্রজেক্টের জন্য উপযুক্ত ইঞ্জিনিয়ারিং সেবা বেছে নিতে সহায়তা প্রয়োজন?' 
                  : 'Need guidance selecting the right service scope for your project?'
                }
              </h3>
              <p className={`text-sm text-[var(--text-secondary)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                {isBangla
                  ? 'আমাদের ইঞ্জিনিয়ারিং দল আপনার ড্রয়িং, ডিজাইন বা এস্টিমেশনের প্রয়োজনীয়তা পর্যালোচনা করতে প্রস্তুত।'
                  : 'Connect with our engineering team to review requirements, drawings, or estimation needs.'
                }
              </p>
            </div>

            <Link to="/engineering/contact">
              <Button 
                as="span"
                variant="primary" 
                size="lg"
                className={`shrink-0 ${isBangla ? 'font-bangla-sans' : ''}`}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                {isBangla ? 'প্রজেক্ট নিয়ে আলোচনা করুন' : 'Discuss Your Project'}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
};
