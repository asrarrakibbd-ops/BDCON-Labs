import React, { useState } from 'react';
import { 
  Terminal, 
  Palette, 
  Type, 
  Box, 
  AlertCircle, 
  Route as RouteIcon, 
  Layout, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { CompanyIntroSection } from '../components/home/CompanyIntroSection';
import { PrinciplesSection } from '../components/home/PrinciplesSection';
import { ProductsSection } from '../components/home/ProductsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection';
import { HomepageAboutSection } from '../components/home/HomepageAboutSection';
import { HomepageRakibAsrarSection } from '../components/home/HomepageRakibAsrarSection';
import { HomepageContactCTA } from '../components/home/HomepageContactCTA';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { TokenShowcase } from '../features/showcase/TokenShowcase';
import { TypographyShowcase } from '../features/showcase/TypographyShowcase';
import { ComponentsShowcase } from '../features/showcase/ComponentsShowcase';
import { StatesShowcase } from '../features/showcase/StatesShowcase';
import { RoutesDirectory } from '../features/showcase/RoutesDirectory';
import { ShellShowcase } from '../features/showcase/ShellShowcase';
import { SEO } from '../components/common/SEO';
import { buildOrganizationSchema } from '../lib/structuredData';

export const HomePage: React.FC = () => {
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'shell' | 'tokens' | 'typography' | 'components' | 'states' | 'routes'>('shell');

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="BDCON Labs — Software & Digital Products"
        description="BDCON Labs builds practical software products, web applications, mobile applications and custom digital solutions for professionals, businesses and organizations."
        canonicalPath="/"
        jsonLd={buildOrganizationSchema()}
      />
      {/* 1. Primary Homepage Hero Section wrapped in overflow-hidden container to prevent mobile horizontal scroll */}
      <div className="w-full overflow-hidden">
        <HeroSection 
          headlineClassName="animate-fade-in-up"
          bodyClassName="animate-fade-in-up-delay-1"
          ctaClassName="animate-fade-in-up-delay-2"
          visualClassName="overflow-hidden"
        />
      </div>

      {/* 2. Company Introduction Section */}
      <CompanyIntroSection />

      {/* 3. Company Positioning Principles (01-04) */}
      <PrinciplesSection />

      {/* 4. Products Section (Featured Product: BuildEst BD & Catalog Gateway) */}
      <ProductsSection />

      {/* 5. Services Section (What We Build: Client Solutions) */}
      <ServicesSection />

      {/* 6. Selected Work / Portfolio Section */}
      <SelectedWorkSection />

      {/* 7. Homepage About / Philosophy Section */}
      <HomepageAboutSection />

      {/* 8. Connected Creative Identity: Rakib Asrar */}
      <HomepageRakibAsrarSection />

      {/* 9. Conversion Contact CTA */}
      <HomepageContactCTA />

      {/* 10. Collapsible Foundation & Architecture Inspector (Preserving Stage 1 & 2 Test Suite) */}
      <Section spacing="sm" surface="subtle" borderBottom>
        <Container size="2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-subtle)] text-[var(--color-brand)] flex items-center justify-center shrink-0" aria-hidden="true">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  Developer &amp; Architecture Tools
                </p>
                <p className="type-caption text-[var(--text-muted)] text-[11px]">
                  Inspect theme tokens, typography scale, UI primitives, and the 25+ route table.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setInspectorOpen(!inspectorOpen)}
              rightIcon={inspectorOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            >
              {inspectorOpen ? 'Hide Subsystem Inspector' : 'Open Subsystem Inspector'}
            </Button>
          </div>

          {/* Expanded Inspector Panel */}
          {inspectorOpen && (
            <div className="pt-6 space-y-6 animate-in fade-in duration-200">
              {/* Tab Selector */}
              <div
                role="tablist"
                aria-label="Subsystem Inspector"
                className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeInspectorTab === 'shell'}
                  onClick={() => setActiveInspectorTab('shell')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeInspectorTab === 'shell'
                      ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                  Global Shell
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeInspectorTab === 'tokens'}
                  onClick={() => setActiveInspectorTab('tokens')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeInspectorTab === 'tokens'
                      ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                  Color Tokens
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeInspectorTab === 'typography'}
                  onClick={() => setActiveInspectorTab('typography')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeInspectorTab === 'typography'
                      ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Type className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                  Typography Scale
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeInspectorTab === 'components'}
                  onClick={() => setActiveInspectorTab('components')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeInspectorTab === 'components'
                      ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                  UI Primitives
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeInspectorTab === 'states'}
                  onClick={() => setActiveInspectorTab('states')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeInspectorTab === 'states'
                      ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                  Lifecycle States
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeInspectorTab === 'routes'}
                  onClick={() => setActiveInspectorTab('routes')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeInspectorTab === 'routes'
                      ? 'bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-semibold shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <RouteIcon className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                  Routes Table
                </button>
              </div>

              {/* Subsystem Panel Body */}
              <div className="pt-2">
                {activeInspectorTab === 'shell' && <ShellShowcase />}
                {activeInspectorTab === 'tokens' && <TokenShowcase />}
                {activeInspectorTab === 'typography' && <TypographyShowcase />}
                {activeInspectorTab === 'components' && <ComponentsShowcase />}
                {activeInspectorTab === 'states' && <StatesShowcase />}
                {activeInspectorTab === 'routes' && <RoutesDirectory />}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};
