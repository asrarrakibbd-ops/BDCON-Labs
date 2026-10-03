import React from 'react';
import { ArrowRight, DraftingCompass, Building, ShieldCheck } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';
import { ENGINEERING_PROJECTS } from '../../data/engineeringProjects';
import { EngineeringProjectCard } from './EngineeringProjectCard';

export const EngineeringProjectsPreview: React.FC = () => {
  const { isBangla } = useTranslation();
  const realProjects = ENGINEERING_PROJECTS.slice(0, 3);

  return (
    <Section 
      spacing="xl" 
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-color)] relative"
    >
      <Container size="2xl">
        
        {/* Header with Title and CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span className={`text-xs font-mono uppercase tracking-widest text-[var(--color-brand)] ${isBangla ? 'font-bangla-sans' : ''}`}>
                {isBangla ? 'প্রজেক্ট পোর্টফোলিও' : 'PROJECT PORTFOLIO'}
              </span>
            </div>

            <h2 
              className={`text-[var(--text-primary)] font-bold tracking-tight ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.3] text-2xl sm:text-3xl lg:text-4xl' 
                  : 'type-h1 text-2xl sm:text-3xl lg:text-4xl'
              }`}
            >
              {isBangla 
                ? 'বাস্তব প্রকল্পের ভিত্তিতে নির্মিত ইঞ্জিনিয়ারিং সমাধান।'
                : 'Engineering work built around real projects.'
              }
            </h2>

            <p className={`text-[var(--text-secondary)] text-base ${isBangla ? 'font-bangla-sans leading-relaxed' : 'type-body'}`}>
              {isBangla
                ? 'বিডিকন ইঞ্জিনিয়ারিং কর্তৃক সম্পন্নকৃত বিল্ডিং ডিজাইন, ইঞ্জিনিয়ারিং ড্রয়িং এবং কনসালটেন্সি কাজসমূহ।'
                : 'Explore selected building design, structural drawings, estimation, and consultancy projects.'
              }
            </p>
          </div>

          <div className="shrink-0">
            <Link to="/engineering/projects">
              <Button 
                as="span" 
                variant="secondary" 
                size="md"
                className={isBangla ? 'font-bangla-sans' : ''}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                {isBangla ? 'সকল প্রজেক্ট দেখুন' : 'View All Projects'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Content: Real Projects Grid OR Minimal Disciplined Placeholder */}
        {realProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {realProjects.map((project) => (
              <EngineeringProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          /* Minimal non-fake preview showcase */
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <DraftingCompass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className={`text-base sm:text-lg font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                  {isBangla ? 'ইঞ্জিনিয়ারিং প্রজেক্টসমূহ শীঘ্রই এখানে যুক্ত করা হবে।' : 'Engineering projects will be showcased here.'}
                </h3>
                <p className={`text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl ${isBangla ? 'font-bangla-sans' : ''}`}>
                  {isBangla
                    ? 'বাস্তবায়িত সিভিল ইঞ্জিনিয়ারিং প্রকল্প, স্ট্রাকচারাল ড্রয়িং ও কনসালটেন্সি কেস স্টাডি তথ্য সংযোজন প্রক্রিয়াধীন রয়েছে।'
                    : 'Documented civil engineering projects, structural drawings, and construction consultancy archives are currently being compiled.'
                  }
                </p>
              </div>
            </div>

            <Link to="/engineering/projects" className="shrink-0 w-full md:w-auto">
              <Button 
                as="span" 
                variant="primary" 
                size="sm"
                className={`w-full md:w-auto ${isBangla ? 'font-bangla-sans' : ''}`}
                rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
              >
                {isBangla ? 'সকল প্রজেক্ট দেখুন' : 'View All Projects'}
              </Button>
            </Link>
          </div>
        )}

      </Container>
    </Section>
  );
};
