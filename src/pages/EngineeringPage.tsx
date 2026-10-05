import React from 'react';
import { SEO } from '../components/common/SEO';
import { EngineeringHero } from '../components/engineering/EngineeringHero';
import { EngineeringServicesPreview } from '../components/engineering/EngineeringServicesPreview';
import { EngineeringProjectsPreview } from '../components/engineering/EngineeringProjectsPreview';
import { EngineeringBrandIntro } from '../components/engineering/EngineeringBrandIntro';
import { EngineeringCTA } from '../components/engineering/EngineeringCTA';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { useTranslation } from '../hooks/useTranslation';

export const EngineeringPage: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={
          isBangla
            ? 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি — বিডিকন ইঞ্জিনিয়ারিং লিমিটেড'
            : 'Civil Engineering Consultancy — BDCON Engineering Ltd'
        }
        description={
          isBangla
            ? 'বাস্তবমুখী ও নির্মাণযোগ্য সমাধানের জন্য বিল্ডিং ডিজাইন, ইঞ্জিনিয়ারিং ড্রয়িং, নির্ভুল এস্টিমেশন এবং কনস্ট্রাকশন কনসালটেন্সি সেবা।'
            : 'Building design, engineering drawings, estimation and construction consultancy for practical, buildable solutions by BDCON Engineering Ltd.'
        }
        canonicalPath="/engineering"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'ইঞ্জিনিয়ারিং' : 'Engineering', url: '/engineering' },
        ]}
      />

      {/* Top Breadcrumb Bar */}
      <Breadcrumbs />

      {/* 1. Hero Section */}
      <EngineeringHero />

      {/* 2. Services Preview (The 6 core engineering preview cards) */}
      <EngineeringServicesPreview />

      {/* 3. Selected Projects Preview (Minimal disciplined preview) */}
      <EngineeringProjectsPreview />

      {/* 4. Brand Introduction (Engineering expertise for real-world projects & BDCON relationship) */}
      <EngineeringBrandIntro />

      {/* 5. CTA Section */}
      <EngineeringCTA />
    </div>
  );
};
