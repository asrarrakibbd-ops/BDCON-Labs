import React from 'react';
import { Compass, ArrowRight, DraftingCompass, ShieldCheck } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const HomepageEngineeringSection: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <Section 
      spacing="xl" 
      surface="subtle"
      borderBottom 
      id="engineering-spotlight"
      className="relative overflow-hidden"
    >
      <Container size="2xl">
        {/* Enclosing Card Container with BDCON Standard Gradient and Surface System */}
        <div className="relative rounded-2xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--bg-surface-subtle)] p-6 sm:p-8 lg:p-10 shadow-xs hover:border-[var(--border-strong)] transition-all duration-300 overflow-hidden">
          
          {/* Soft Ambient Brand Gradient Glow (matching BDCON Hero & Feature cards) */}
          <div 
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-60 dark:opacity-30"
            style={{
              background: 'radial-gradient(circle, var(--color-brand-glow) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div 
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-30 dark:opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Brand & Engineering Positioning */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Distinctive Eyebrow Tag */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-sky-600 dark:bg-sky-400 rotate-45 inline-block shrink-0" />
                <span className={`text-xs uppercase tracking-widest text-[var(--color-brand)] font-semibold ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                  {isBangla ? 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি' : 'CIVIL ENGINEERING CONSULTANCY'}
                </span>
                <span className="hidden sm:inline-block text-[var(--border-color)]">/</span>
                <span className="hidden sm:inline-block text-[11px] font-mono text-[var(--text-muted)]">
                  BDCON ECOSYSTEM
                </span>
              </div>

              {/* Entity Name */}
              <h2 
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] tracking-tight ${
                  isBangla ? 'font-bangla-serif' : 'type-h1'
                }`}
              >
                BDCON Engineering Ltd
              </h2>

              {/* Positioning Subheading */}
              <p className={`text-lg sm:text-xl font-bold text-sky-700 dark:text-sky-400 ${isBangla ? 'font-bangla-serif' : ''}`}>
                {isBangla ? 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি' : 'Civil Engineering Consultancy'}
              </p>

              {/* Exact Required Short Copy */}
              <p className={`text-base text-[var(--text-secondary)] leading-relaxed max-w-xl ${isBangla ? 'font-bangla-sans' : 'type-body'}`}>
                {isBangla
                  ? 'বাস্তবমুখী ও নির্মাণযোগ্য সমাধানের জন্য বিল্ডিং ডিজাইন, ইঞ্জিনিয়ারিং ড্রয়িং, নির্ভুল এস্টিমেশন এবং কনস্ট্রাকশন কনসালটেন্সি সেবা।'
                  : 'Building design, engineering drawings, estimation and construction consultancy for practical, buildable solutions.'
                }
              </p>

              {/* Engineering Highlights (Zero-Pill Typography) */}
              <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className={isBangla ? 'font-bangla-sans' : 'font-medium'}>
                    {isBangla ? 'বিল্ডিং ডিজাইন ও ওয়ার্কিং ড্রয়িং' : 'Building Design & Working Drawings'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className={isBangla ? 'font-bangla-sans' : 'font-medium'}>
                    {isBangla ? 'কোয়ান্টিটি সার্ভেয়িং ও বিওকিউ (BOQ)' : 'Quantity Surveying & BOQ'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className={isBangla ? 'font-bangla-sans' : 'font-medium'}>
                    {isBangla ? 'সাইট কনসালটেন্সি' : 'Construction Consultancy'}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <Link to="/engineering">
                  <Button 
                    as="span"
                    variant="primary" 
                    size="md"
                    className={isBangla ? 'font-bangla-sans' : ''}
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    {isBangla ? 'বিডিকন ইঞ্জিনিয়ারিং ঘুরে দেখুন' : 'Explore BDCON Engineering'}
                  </Button>
                </Link>
              </div>

            </div>

            {/* Right Column: Architectural Drawing Card (Visually distinct from software cards) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-950 p-5 sm:p-6 text-slate-300 space-y-4 shadow-lg select-none">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <DraftingCompass className="w-4 h-4 text-sky-400" />
                    <span className="text-sky-300 font-semibold">BDCON-ENG-ARCH</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-slate-400">BNBC COMPLIANT</span>
                  </div>
                </div>

                {/* Vector Architectural Framing Sketch */}
                <div className="aspect-[16/9] w-full bg-[#050a14] rounded-lg border border-slate-800/80 p-3 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle Precision Framing Guides */}
                  <svg viewBox="0 0 300 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Horizontal & Vertical Grid Lines */}
                    <line x1="20" y1="20" x2="280" y2="20" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.4" />
                    <line x1="20" y1="100" x2="280" y2="100" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.4" />
                    <line x1="50" y1="10" x2="50" y2="110" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.4" />
                    <line x1="150" y1="10" x2="150" y2="110" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.4" />
                    <line x1="250" y1="10" x2="250" y2="110" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.4" />

                    {/* Concrete Beam Frame Outline */}
                    <rect x="50" y="20" width="200" height="80" stroke="#cbd5e1" strokeWidth="1.5" fill="#0c1e38" fillOpacity="0.5" />
                    <line x1="150" y1="20" x2="150" y2="100" stroke="#94a3b8" strokeWidth="1.2" />

                    {/* Columns */}
                    {[
                      { x: 50, y: 20 },
                      { x: 150, y: 20 },
                      { x: 250, y: 20 },
                      { x: 50, y: 100 },
                      { x: 150, y: 100 },
                      { x: 250, y: 100 }
                    ].map((col, idx) => (
                      <rect key={idx} x={col.x - 4} y={col.y - 4} width="8" height="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
                    ))}

                    {/* Dimension Annotation */}
                    <line x1="50" y1="12" x2="150" y2="12" stroke="#94a3b8" strokeWidth="0.6" />
                    <text x="100" y="10" textAnchor="middle" fill="#7dd3fc" fontSize="7" fontFamily="monospace">4,500 mm</text>

                    <line x1="150" y1="12" x2="250" y2="12" stroke="#94a3b8" strokeWidth="0.6" />
                    <text x="200" y="10" textAnchor="middle" fill="#7dd3fc" fontSize="7" fontFamily="monospace">4,500 mm</text>
                  </svg>

                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-800/80 pt-1">
                    <span>SCALE 1:100</span>
                    <span className="text-sky-300">PRACTICAL &amp; BUILDABLE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="font-mono text-[11px]">
                    {isBangla ? 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি' : 'Consultancy for Physical Construction'}
                  </span>
                  <Link to="/engineering" className="text-sky-400 hover:text-sky-300 font-semibold text-xs inline-flex items-center gap-1">
                    <span>{isBangla ? 'বিস্তারিত' : 'Learn More'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
};
