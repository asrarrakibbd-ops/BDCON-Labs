import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Compass, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft,
  ShieldCheck,
  DraftingCompass,
  FileCheck2,
  Loader2
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link, useRouter } from '../lib/router';
import { SEO } from '../components/common/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { submitEngineeringInquiry, EngineeringInquiryInput } from '../lib/supabase/services/engineeringInquiries';

const SERVICE_OPTIONS = [
  { value: 'building-design', labelEn: 'Building Design', labelBn: 'বিল্ডিং ডিজাইন' },
  { value: 'design-engineering-drawings', labelEn: 'Design & Engineering Drawings', labelBn: 'ডিজাইন ও ইঞ্জিনিয়ারিং ড্রয়িং' },
  { value: 'building-estimation', labelEn: 'Building Estimation', labelBn: 'বিল্ডিং এস্টিমেশন' },
  { value: 'quantity-surveying-boq', labelEn: 'Quantity Surveying & BOQ', labelBn: 'কোয়ান্টিটি সার্ভেয়িং ও বিওকিউ (BOQ)' },
  { value: 'construction-consultancy', labelEn: 'Construction Consultancy', labelBn: 'কনস্ট্রাকশন কনসালটেন্সি' },
  { value: 'civil-engineering-consultancy', labelEn: 'Civil Engineering Consultancy', labelBn: 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি' },
  { value: 'other', labelEn: 'Other Engineering Inquiry', labelBn: 'অন্যান্য ইঞ্জিনিয়ারিং পরামর্শ' },
];

const PROJECT_TYPE_OPTIONS = [
  { value: 'residential', labelEn: 'Residential Building (House / Apartment)', labelBn: 'আবাসিক ভবন (বাড়ি / অ্যাপার্টমেন্ট)' },
  { value: 'commercial', labelEn: 'Commercial Building (Office / Retail / Market)', labelBn: 'বাণিজ্যিক ভবন (অফিস / শপিং মল)' },
  { value: 'mixed-use', labelEn: 'Mixed-Use Development (Residential & Commercial)', labelBn: 'মিশ্র ভবন (আবাসিক ও বাণিজ্যিক)' },
  { value: 'industrial', labelEn: 'Industrial Structure / Warehouse / Factory', labelBn: 'শিল্প কারখানা / ওয়ারহাউস / ফ্যাক্টরি' },
  { value: 'institutional', labelEn: 'Institutional / School / Hospital / Mosque', labelBn: 'প্রাতিষ্ঠানিক / শিক্ষাপ্রতিষ্ঠান / মসজিদ' },
  { value: 'other', labelEn: 'Other Civil Infrastructure', labelBn: 'অন্যান্য সিভিল অবকাঠামো' },
];

export const EngineeringContactPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const { path } = useRouter();

  // Read URL query params on client side
  const [formData, setFormData] = useState<EngineeringInquiryInput>({
    name: '',
    email: '',
    phone: '',
    project_location: '',
    project_type: '',
    building_area: '',
    required_service: '',
    description: '',
    preferred_contact: 'email',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submissionId, setSubmissionId] = useState<string>('');

  // Auto-select service or project from query parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const serviceParam = searchParams.get('service');
      if (serviceParam) {
        const found = SERVICE_OPTIONS.find(s => s.value === serviceParam || serviceParam.includes(s.value));
        if (found) {
          setFormData(prev => ({ ...prev, required_service: found.value }));
        }
      }
    }
  }, []);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = isBangla ? 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)।' : 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = isBangla ? 'সঠিক ইমেইল এড্রেস লিখুন।' : 'Please enter a valid email address.';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 3) {
      errors.phone = isBangla ? 'ফোন বা হোয়াটসঅ্যাপ নম্বর দিন।' : 'Please enter your phone or WhatsApp number.';
    }

    if (!formData.project_location.trim() || formData.project_location.trim().length < 2) {
      errors.project_location = isBangla ? 'প্রকল্পের অবস্থান বা শহর উল্লেখ করুন।' : 'Please specify the project location / city.';
    }

    if (!formData.project_type) {
      errors.project_type = isBangla ? 'প্রকল্পের ধরন নির্বাচন করুন।' : 'Please select a project type.';
    }

    if (!formData.required_service) {
      errors.required_service = isBangla ? 'প্রয়োজনীয় সেবাটি নির্বাচন করুন।' : 'Please select the required engineering service.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = isBangla ? 'প্রকল্পের প্রয়োজনীয়তা বিস্তারিত লিখুন (কমপক্ষে ১০ অক্ষর)।' : 'Please describe your project requirements (at least 10 characters).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || success) return;

    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await submitEngineeringInquiry(formData);
      if (result.success) {
        setSuccess(true);
        setSubmissionId(`ENG-${Date.now().toString().slice(-6)}`);
      } else {
        setErrorMessage(result.error || (isBangla ? 'আবেদনটি জমা দেওয়া সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : 'Failed to submit inquiry. Please try again.'));
      }
    } catch {
      setErrorMessage(isBangla ? 'নেটওয়ার্ক সংযোগে সমস্যা দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : 'A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={
          isBangla
            ? 'প্রজেক্ট নিয়ে আলোচনা — বিডিকন ইঞ্জিনিয়ারিং লিমিটেড'
            : 'Discuss Your Project — BDCON Engineering Ltd'
        }
        description={
          isBangla
            ? 'বিল্ডিং ডিজাইন, ইঞ্জিনিয়ারিং ড্রয়িং, এস্টিমেশন কিংবা কনস্ট্রাকশন কনসালটেন্সির জন্য আপনার প্রকল্পের বিবরণ পাঠান।'
            : 'Submit your building design, drawing, estimation, or construction consultancy inquiry to BDCON Engineering Ltd.'
        }
        canonicalPath="/engineering/contact"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'ইঞ্জিনিয়ারিং' : 'Engineering', url: '/engineering' },
          { name: isBangla ? 'যোগাযোগ ও আলোচনা' : 'Contact & Inquiry', url: '/engineering/contact' },
        ]}
      />

      {/* Header Section */}
      <Section 
        spacing="lg" 
        className="relative overflow-hidden pt-8 sm:pt-12 pb-10 sm:pb-12 border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-canvas)] via-[var(--bg-surface)] to-[var(--bg-canvas)]"
      >
        <Container size="2xl">
          <div className="max-w-3xl space-y-4">
            
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] select-none">
              <Link to="/" className="hover:text-[var(--text-primary)] transition-colors">
                {isBangla ? 'হোম' : 'Home'}
              </Link>
              <span>/</span>
              <Link to="/engineering" className="hover:text-[var(--text-primary)] transition-colors">
                {isBangla ? 'ইঞ্জিনিয়ারিং' : 'Engineering'}
              </Link>
              <span>/</span>
              <span className="text-sky-600 dark:text-sky-400 font-medium">
                {isBangla ? 'প্রজেক্ট আলোচনা' : 'Discuss Project'}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-sky-600 dark:bg-sky-400 rotate-45 inline-block shrink-0" />
              <span className={`text-xs uppercase tracking-widest text-[var(--color-brand)] font-semibold ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'ইঞ্জিনিয়ারিং পরামর্শ ও অনুসন্ধান' : 'ENGINEERING CONSULTANCY INTAKE'}
              </span>
            </div>

            <h1 
              className={`text-[var(--text-primary)] font-bold text-balance ${
                isBangla 
                  ? 'font-bangla-serif tracking-normal leading-[1.25] text-3xl sm:text-4xl lg:text-5xl' 
                  : 'type-display tracking-tight text-3xl sm:text-4xl lg:text-[44px] leading-[1.15]'
              }`}
            >
              {isBangla ? 'আপনার ইঞ্জিনিয়ারিং প্রজেক্ট নিয়ে আলোচনা করুন' : 'Discuss Your Engineering Project'}
            </h1>

            <p 
              className={`text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed ${
                isBangla ? 'font-bangla-sans' : 'type-body'
              }`}
            >
              {isBangla
                ? 'বিল্ডিং ডিজাইন, ইঞ্জিনিয়ারিং ড্রয়িং, এস্টিমেশন কিংবা সাইট কনসালটেন্সির জন্য আপনার প্রকল্পের প্রাথমিক তথ্য দিন। আমাদের ইঞ্জিনিয়ারিং দল প্রয়োজনীয় বিবরণ পর্যালোচনা করবে।'
                : 'Share your requirements for building design, technical drawings, estimation, or site consultancy. Our engineering team will review your specifications with practical rigor.'
              }
            </p>

          </div>
        </Container>
      </Section>

      {/* Form & Sidebar Grid Section */}
      <Section spacing="xl" className="bg-[var(--bg-canvas)] border-b border-[var(--border-color)]">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Form Column (8 Cols) */}
            <div className="lg:col-span-8">
              {success ? (
                /* Success State */
                <div className="p-8 sm:p-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider block">
                      REFERENCE // {submissionId}
                    </span>
                    <h2 className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                      {isBangla ? 'আপনার প্রজেক্টের তথ্য সফলভাবে গৃহীত হয়েছে' : 'Engineering Inquiry Received'}
                    </h2>
                    <p className={`text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed ${isBangla ? 'font-bangla-sans' : ''}`}>
                      {isBangla
                        ? 'আপনার প্রদত্ত তথ্য আমাদের ইঞ্জিনিয়ারিং দলের কাছে পৌঁছেছে। আপনার উল্লেখিত পছন্দের মাধ্যমে শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।'
                        : 'Thank you for sharing your project specifications. Our engineering consultancy team will review your requirements and respond via your preferred contact method.'
                      }
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/engineering">
                      <Button as="span" variant="primary" size="md" className={isBangla ? 'font-bangla-sans' : ''}>
                        {isBangla ? 'ইঞ্জিনিয়ারিং হোমে ফিরুন' : 'Back to Engineering'}
                      </Button>
                    </Link>

                    <button
                      onClick={() => {
                        setSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          project_location: '',
                          project_type: '',
                          building_area: '',
                          required_service: '',
                          description: '',
                          preferred_contact: 'email',
                          honeypot: '',
                        });
                      }}
                      className={`text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] underline p-2 ${isBangla ? 'font-bangla-sans' : ''}`}
                    >
                      {isBangla ? 'আরেকটি প্রজেক্ট আলোচনা জমা দিন' : 'Submit another project inquiry'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Intake Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-8 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
                  
                  {/* Honeypot Spam Trap */}
                  <input
                    type="text"
                    name="organization_identifier"
                    value={formData.honeypot}
                    onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                    className="sr-only"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Error Notification Banner */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400 flex items-start gap-3 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span className={isBangla ? 'font-bangla-sans' : ''}>{errorMessage}</span>
                    </div>
                  )}

                  {/* Section 1: Contact Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                      <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">01</span>
                      <h2 className={`text-base font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                        {isBangla ? 'আপনার যোগাযোগের তথ্য' : 'Contact Information'}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'নাম *' : 'Your Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder={isBangla ? 'যেমন: মো: রফিকুল ইসলাম' : 'e.g., Engr. John Smith'}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors ${
                            validationErrors.name ? 'border-red-500' : 'border-[var(--border-color)]'
                          }`}
                        />
                        {validationErrors.name && (
                          <p className="text-xs text-red-500 font-mono">{validationErrors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'ইমেইল এড্রেস *' : 'Email Address *'}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="client@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors ${
                            validationErrors.email ? 'border-red-500' : 'border-[var(--border-color)]'
                          }`}
                        />
                        {validationErrors.email && (
                          <p className="text-xs text-red-500 font-mono">{validationErrors.email}</p>
                        )}
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'ফোন / হোয়াটসঅ্যাপ *' : 'Phone / WhatsApp *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+880 1700 000000"
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors ${
                            validationErrors.phone ? 'border-red-500' : 'border-[var(--border-color)]'
                          }`}
                        />
                        {validationErrors.phone && (
                          <p className="text-xs text-red-500 font-mono">{validationErrors.phone}</p>
                        )}
                      </div>

                      {/* Preferred Contact Method */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'পছন্দের যোগাযোগ মাধ্যম' : 'Preferred Contact Method'}
                        </label>
                        <select
                          value={formData.preferred_contact}
                          onChange={(e) => setFormData(prev => ({ ...prev, preferred_contact: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        >
                          <option value="email">{isBangla ? 'ইমেইল' : 'Email'}</option>
                          <option value="phone">{isBangla ? 'সরাসরি ফোন কল' : 'Direct Phone Call'}</option>
                          <option value="whatsapp">{isBangla ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Project Specifications */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                      <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">02</span>
                      <h2 className={`text-base font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                        {isBangla ? 'প্রকল্পের সাধারণ তথ্য' : 'Project Parameters'}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Project Location */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'প্রকল্পের অবস্থান / শহর *' : 'Project Location / City *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.project_location}
                          onChange={(e) => setFormData(prev => ({ ...prev, project_location: e.target.value }))}
                          placeholder={isBangla ? 'যেমন: ঢাকা, উত্তরা / চট্টগ্রাম' : 'e.g., Uttara, Dhaka / Sylhet'}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors ${
                            validationErrors.project_location ? 'border-red-500' : 'border-[var(--border-color)]'
                          }`}
                        />
                        {validationErrors.project_location && (
                          <p className="text-xs text-red-500 font-mono">{validationErrors.project_location}</p>
                        )}
                      </div>

                      {/* Project Type */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'প্রকল্পের ধরন *' : 'Project Type *'}
                        </label>
                        <select
                          required
                          value={formData.project_type}
                          onChange={(e) => setFormData(prev => ({ ...prev, project_type: e.target.value }))}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border text-sm text-[var(--text-primary)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors ${
                            validationErrors.project_type ? 'border-red-500' : 'border-[var(--border-color)]'
                          }`}
                        >
                          <option value="">{isBangla ? '-- ধরন নির্বাচন করুন --' : '-- Select Project Type --'}</option>
                          {PROJECT_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {isBangla ? opt.labelBn : opt.labelEn}
                            </option>
                          ))}
                        </select>
                        {validationErrors.project_type && (
                          <p className="text-xs text-red-500 font-mono">{validationErrors.project_type}</p>
                        )}
                      </div>

                      {/* Approximate Building Area */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'আনুমানিক বিল্ডিং এরিয়া' : 'Approximate Building Area'}
                        </label>
                        <input
                          type="text"
                          value={formData.building_area || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, building_area: e.target.value }))}
                          placeholder={isBangla ? 'যেমন: ৫ তলা, আনুমানিক ১০,০০০ বর্গফুট' : 'e.g., 6-Story / 12,000 sq ft'}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        />
                      </div>

                      {/* Required Service */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {isBangla ? 'প্রয়োজনীয় সেবা *' : 'Required Service *'}
                        </label>
                        <select
                          required
                          value={formData.required_service}
                          onChange={(e) => setFormData(prev => ({ ...prev, required_service: e.target.value }))}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border text-sm text-[var(--text-primary)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors ${
                            validationErrors.required_service ? 'border-red-500' : 'border-[var(--border-color)]'
                          }`}
                        >
                          <option value="">{isBangla ? '-- সেবা নির্বাচন করুন --' : '-- Select Engineering Service --'}</option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {isBangla ? opt.labelBn : opt.labelEn}
                            </option>
                          ))}
                        </select>
                        {validationErrors.required_service && (
                          <p className="text-xs text-red-500 font-mono">{validationErrors.required_service}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Description */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                      <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">03</span>
                      <h2 className={`text-base font-bold text-[var(--text-primary)] ${isBangla ? 'font-bangla-serif' : ''}`}>
                        {isBangla ? 'প্রকল্পের প্রয়োজনীয়তা ও বিবরণ *' : 'Project Description *'}
                      </h2>
                    </div>

                    <textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={
                        isBangla 
                          ? 'আপনার প্রকল্পের বর্তমান অবস্থা, ড্রয়িং প্রয়োজন নাকি এস্টিমেশন, কোনো নির্দিষ্ট সময়সীমা বা বিশেষ প্রয়োজনীয়তা থাকলে সংক্ষেপে লিখুন...' 
                          : 'Describe your current project status, whether you have architectural plans, need structural drawings, estimation, BOQ or site guidance...'
                      }
                      className={`w-full p-3.5 rounded-lg bg-[var(--bg-canvas)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors leading-relaxed ${
                        validationErrors.description ? 'border-red-500' : 'border-[var(--border-color)]'
                      }`}
                    />
                    {validationErrors.description && (
                      <p className="text-xs text-red-500 font-mono">{validationErrors.description}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
                      <ShieldCheck className="w-4 h-4 text-sky-500" />
                      <span>{isBangla ? 'তথ্য সম্পূর্ণ নিরাপদ ও গোপনীয়' : 'Information treated with professional confidentiality'}</span>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      className={`w-full sm:w-auto ${isBangla ? 'font-bangla-sans' : ''}`}
                      rightIcon={
                        loading ? (
                          <Loader2 className="w-4 h-4 animate-spin ml-1" />
                        ) : (
                          <Send className="w-4 h-4 ml-1" />
                        )
                      }
                    >
                      {loading 
                        ? (isBangla ? 'জমা দেওয়া হচ্ছে...' : 'Submitting Inquiry...') 
                        : (isBangla ? 'প্রজেক্ট আলোচনা জমা দিন' : 'Submit Project Inquiry')
                      }
                    </Button>
                  </div>

                </form>
              )}
            </div>

            {/* Sidebar Column (4 Cols): Direct Contacts & Standards */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Direct Engineering Desk Card */}
              <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-5 shadow-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[var(--text-muted)] block">CONSULTANCY</span>
                    <h3 className={`text-sm font-bold text-[var(--text-primary)] block ${isBangla ? 'font-bangla-serif' : ''}`}>
                      BDCON Engineering Ltd
                    </h3>
                  </div>
                </div>

                <p className={`text-xs text-[var(--text-secondary)] leading-relaxed ${isBangla ? 'font-bangla-sans' : ''}`}>
                  {isBangla
                    ? 'আমাদের প্রকৌশলীরা আপনার ড্রয়িং, ডিজাইন এবং এস্টিমেশনের প্রয়োজনীয়তা সতর্কতার সাথে পর্যালোচনা করে কার্যকর পরামর্শ প্রদান করেন।'
                    : 'Our civil engineers analyze plans and site conditions to deliver code-aligned, buildable solutions.'
                  }
                </p>

                <div className="space-y-3 pt-2 text-xs font-mono text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>engineering@bdconlabs.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>+880 1888 013444</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Engineering Standards Card */}
              <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)] text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
                  <DraftingCompass className="w-4 h-4 text-sky-500" />
                  <span>{isBangla ? 'প্রকৌশল মানদণ্ড' : 'Core Standards'}</span>
                </div>

                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-mono text-[11px] select-none">›</span>
                    <span className={isBangla ? 'font-bangla-sans' : ''}>BNBC &amp; ACI Structural Codes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-mono text-[11px] select-none">›</span>
                    <span className={isBangla ? 'font-bangla-sans' : ''}>Practical Field Constructibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-mono text-[11px] select-none">›</span>
                    <span className={isBangla ? 'font-bangla-sans' : ''}>Standardized Quantity Takeoffs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-mono text-[11px] select-none">›</span>
                    <span className={isBangla ? 'font-bangla-sans' : ''}>Transparent Rate Analysis</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link to="/engineering/services" className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline block">
                    {isBangla ? 'সকল সেবাসমূহ দেখুন →' : 'Explore all services →'}
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
};
