import React from 'react';
import { AboutHero } from '../components/about/AboutHero';
import { CompanyStory } from '../components/about/CompanyStory';
import { MissionVision } from '../components/about/MissionVision';
import { CorePrinciples } from '../components/about/CorePrinciples';
import { PillarsComparison } from '../components/about/PillarsComparison';
import { TeamArchitecture } from '../components/about/TeamArchitecture';
import { RakibAsrarBridge } from '../components/about/RakibAsrarBridge';
import { AboutCTA } from '../components/about/AboutCTA';
import { SEO } from '../components/common/SEO';
import { buildOrganizationSchema } from '../lib/structuredData';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title="About BDCON Labs — Engineering Philosophy & Principles"
        description="Learn about BDCON Labs, our engineering philosophy, operating principles, proprietary software products, and custom digital solutions."
        canonicalPath="/about"
        jsonLd={buildOrganizationSchema()}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />
      {/* 1. About Hero */}
      <AboutHero />

      {/* 2. Philosophy & Engineering Approach */}
      <CompanyStory />

      {/* 3. Mission & Vision */}
      <MissionVision />

      {/* 4. Core Operating Principles (01-04) */}
      <CorePrinciples />

      {/* 5. Products vs Services Connection */}
      <PillarsComparison />

      {/* 6. Engineering Practice & Technology Discipline */}
      <TeamArchitecture />

      {/* 7. Subtle Rakib Asrar Author Hub Connection */}
      <RakibAsrarBridge />

      {/* 8. Conversion CTA */}
      <AboutCTA />
    </div>
  );
};
