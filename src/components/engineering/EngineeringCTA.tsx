import React from 'react';
import { ArrowRight, Compass, MessageSquare } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const EngineeringCTA: React.FC = () => {
  const { t, isBangla } = useTranslation();

  return (
    <Section 
      spacing="xl" 
      className="bg-[var(--bg-canvas)] relative overflow-hidden"
    >
      <Container size="2xl">
        <div className="relative rounded-2xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--bg-surface-subtle)] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm">
          
          {/* Subtle Technical Grid Lines in CTA */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--border-color) 1px, transparent 1px),
                linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-color)] text-xs text-[var(--color-brand)] font-medium">
              <Compass className="w-3.5 h-3.5 text-sky-500" />
              <span className={isBangla ? 'font-bangla-sans' : 'font-mono'}>
                {isBangla ? 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি' : 'BDCON ENGINEERING LTD'}
              </span>
            </div>

            {/* Heading */}
            <h2 
              className={`text-[var(--text-primary)] font-bold tracking-tight text-balance ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.3] text-2xl sm:text-3xl lg:text-4xl' 
                  : 'type-h1 text-2xl sm:text-3xl lg:text-4xl'
              }`}
            >
              {t(
                'engineeringLanding.cta.heading', 
                'Have an engineering project in mind?'
              )}
            </h2>

            {/* Supporting Text */}
            <p 
              className={`text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
                isBangla ? 'font-bangla-sans' : 'type-body'
              }`}
            >
              {t(
                'engineeringLanding.cta.description', 
                'Discuss your building design, drawing requirements, or estimation needs with our engineering team for practical, buildable advice.'
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/engineering/contact">
                <Button 
                  as="span"
                  variant="primary" 
                  size="lg"
                  className={`w-full sm:w-auto shadow-sm ${isBangla ? 'font-bangla-sans' : ''}`}
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  {t('engineeringLanding.cta.button', 'Discuss Your Project')}
                </Button>
              </Link>
            </div>

            {/* Technical note */}
            <p className={`text-xs text-[var(--text-muted)] pt-2 ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
              {isBangla
                ? 'আবাসিক, বাণিজ্যিক ও প্রাতিষ্ঠানিক প্রকল্পের জন্য বাস্তবমুখী ড্রয়িং ও পেশাদার পরামর্শ।'
                : 'Practical drawings and consultancy for residential, commercial, and institutional projects.'
              }
            </p>

          </div>

        </div>
      </Container>
    </Section>
  );
};
