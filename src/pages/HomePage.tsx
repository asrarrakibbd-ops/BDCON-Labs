import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CompanyIntroSection } from '../components/home/CompanyIntroSection';
import { PrinciplesSection } from '../components/home/PrinciplesSection';
import { ProductsSection } from '../components/home/ProductsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection';
import { HomepageAboutSection } from '../components/home/HomepageAboutSection';
import { HomepageEngineeringSection } from '../components/home/HomepageEngineeringSection';
import { HomepageRakibAsrarSection } from '../components/home/HomepageRakibAsrarSection';
import { HomepageContactCTA } from '../components/home/HomepageContactCTA';
import { SEO } from '../components/common/SEO';
import { buildOrganizationSchema } from '../lib/structuredData';

export const HomePage: React.FC = () => {

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

      {/* 7. Connected Entity: BDCON Engineering Ltd (Civil Engineering Consultancy) */}
      <HomepageEngineeringSection />

      {/* 8. Homepage About / Philosophy Section */}
      <HomepageAboutSection />

      {/* 9. Connected Creative Identity: Rakib Asrar */}
      <HomepageRakibAsrarSection />

      {/* 10. Conversion Contact CTA */}
      <HomepageContactCTA />
    </div>
  );
};
