import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfoSection } from '../components/contact/ContactInfoSection';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';

export const ContactPage: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={isBangla ? 'যোগাযোগ — BDCON Labs' : 'Contact — Inquiries & Consultation | BDCON Labs'}
        description={
          isBangla
            ? 'সফটওয়্যার প্রোডাক্ট, ডিজিটাল সল্যুশন বা প্রজেক্ট নিয়ে আলোচনার জন্য BDCON Labs-এর সাথে যোগাযোগ করুন।'
            : 'Get in touch with BDCON Labs for software product inquiries, collaboration, or technical development consultations.'
        }
        canonicalPath="/contact"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'যোগাযোগ' : 'Contact', url: '/contact' },
        ]}
      />
      {/* 1. Page Header */}
      <PageHeader
        eyebrow={isBangla ? 'যোগাযোগ' : 'CONTACT'}
        title={isBangla ? 'আমাদের সাথে কথা বলুন।' : "Let's talk."}
        description={
          isBangla
            ? 'কোনো প্রশ্ন, সফটওয়্যার পরিকল্পনা বা নতুন প্রজেক্টের বিষয়ে আলোচনা করতে BDCON Labs-এর সাথে যোগাযোগ করুন।'
            : 'Have a question, an idea, or a project in mind? Get in touch with BDCON Labs. We look forward to hearing about your requirements.'
        }
        borderBottom
      />

      {/* 2. Main Contact Grid */}
      <Section spacing="xl" surface="canvas" className="flex-1">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Information & Start a Project Sidebar */}
            <div className="lg:col-span-5">
              <ContactInfoSection />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
