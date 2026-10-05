import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  RotateCcw,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link } from '../lib/router';
import { submitProjectRequest } from '../data/projectRequests';
import { trackEvent } from '../../src/lib/analytics';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { useTranslation } from '../hooks/useTranslation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
  /** Hidden honeypot field to trap automated spam bots */
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  description?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const StartProjectPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    description: '',
    budget: 'Not sure',
    timeline: 'Flexible',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    document.title = isBangla ? 'নতুন প্রজেক্ট শুরু করুন — BDCON Labs' : 'Start a Project — BDCON Labs';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        isBangla
          ? 'আপনার সফটওয়্যার পরিকল্পনা বা ব্যবসায়িক প্রয়োজনীয়তা আমাদের জানান। আমরা বিস্তারিত টেকনিক্যাল রূপরেখা নিয়ে আলোচনা করব।'
          : 'Tell BDCON Labs about your project, software idea, or business requirement to begin technical scoping.'
      );
    }
  }, [isBangla]);

  const projectTypeOptions = [
    { key: 'Website', labelEn: 'Website', labelBn: 'ওয়েবসাইট' },
    { key: 'Web Application', labelEn: 'Web Application', labelBn: 'ওয়েব অ্যাপ্লিকেশন' },
    { key: 'Mobile Application', labelEn: 'Mobile Application', labelBn: 'মোবাইল অ্যাপ' },
    { key: 'Custom Software', labelEn: 'Custom Software', labelBn: 'কাস্টম সফটওয়্যার' },
    { key: 'UI/UX Design', labelEn: 'UI/UX Design', labelBn: 'ইউআই/ইউএক্স ডিজাইন' },
    { key: 'Software Consultation', labelEn: 'Software Consultation', labelBn: 'টেকনিক্যাল কনসালটেন্সি' },
    { key: 'Other', labelEn: 'Other', labelBn: 'অন্যান্য' },
  ];

  const budgetOptions = [
    { key: 'Under ৳50,000', labelEn: 'Under ৳50,000', labelBn: '৫০,০০০ টাকার নিচে' },
    { key: '৳50,000–৳1,00,000', labelEn: '৳50,000–৳1,00,000', labelBn: '৫০,০০০–১,০০,০০০ টাকা' },
    { key: '৳1,00,000–৳5,00,000', labelEn: '৳1,00,000–৳5,00,000', labelBn: '১,০০,০০০–৫,০০,০০০ টাকা' },
    { key: 'Above ৳5,00,000', labelEn: 'Above ৳5,00,000', labelBn: '৫,০০,০০০ টাকার বেশি' },
    { key: 'Not sure', labelEn: 'Not sure', labelBn: 'এখনও নিশ্চিত নই' },
  ];

  const timelineOptions = [
    { key: 'Urgent (< 1 month)', labelEn: 'Urgent (< 1 month)', labelBn: 'জরুরি (১ মাসের কম)' },
    { key: '1–3 months', labelEn: '1–3 months', labelBn: '১–৩ মাস' },
    { key: '3–6 months', labelEn: '3–6 months', labelBn: '৩–৬ মাস' },
    { key: 'Flexible', labelEn: 'Flexible', labelBn: 'আলোচনাসাপেক্ষ / ফ্লেক্সিবল' },
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const company = formData.company.trim();
    const description = formData.description.trim();

    // 1. Name validation
    if (!name) {
      newErrors.name = isBangla ? 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।' : 'Full name or organization name is required.';
    } else if (name.length < 2) {
      newErrors.name = isBangla ? 'নাম কমপক্ষে ২ অক্ষরের হতে হবে।' : 'Name must be at least 2 characters.';
    } else if (name.length > 100) {
      newErrors.name = isBangla ? 'নাম ১০০ অক্ষরের বেশি হতে পারবে না।' : 'Name cannot exceed 100 characters.';
    }

    // 2. Email validation
    if (!email) {
      newErrors.email = isBangla ? 'অনুগ্রহ করে ইমেইল ঠিকানা দিন।' : 'Email address is required.';
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = isBangla ? 'সঠিক ফরম্যাটের ইমেইল ঠিকানা লিখুন (যেমন: name@example.com)।' : 'Please provide a valid email format (e.g. name@example.com).';
    } else if (email.length > 150) {
      newErrors.email = isBangla ? 'ইমেইল ঠিকানা ১৫০ অক্ষরের বেশি হতে পারবে না।' : 'Email address cannot exceed 150 characters.';
    }

    // 3. Phone validation (optional)
    if (phone && phone.length > 30) {
      newErrors.phone = isBangla ? 'ফোন নম্বর ৩০ অক্ষরের বেশি হতে পারবে না।' : 'Phone number cannot exceed 30 characters.';
    }

    // 4. Company validation (optional)
    if (company && company.length > 100) {
      newErrors.company = isBangla ? 'প্রতিষ্ঠানের নাম ১০০ অক্ষরের বেশি হতে পারবে না।' : 'Company name cannot exceed 100 characters.';
    }

    // 5. Project Type validation
    if (!formData.projectType) {
      newErrors.projectType = isBangla ? 'অনুগ্রহ করে প্রজেক্টের ধরন নির্বাচন করুন।' : 'Please select a project type.';
    }

    // 6. Description validation
    if (!description) {
      newErrors.description = isBangla ? 'অনুগ্রহ করে আপনার প্রজেক্ট বা সফটওয়্যারের বর্ণনা লিখুন।' : 'Please provide a short description of what you are looking to build.';
    } else if (description.length < 15) {
      newErrors.description = isBangla ? 'প্রজেক্টের বিবরণ কমপক্ষে ১৫ অক্ষরের হতে হবে।' : 'Please provide at least 15 characters to explain your requirements.';
    } else if (description.length > 3000) {
      newErrors.description = isBangla ? 'প্রজেক্টের বিবরণ ৩,০০০ অক্ষরের বেশি হতে পারবে না।' : 'Project description cannot exceed 3,000 characters.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstField = Object.keys(newErrors)[0];
      const targetElement = document.getElementById(`field-${firstField === 'projectType' ? 'project-types' : firstField}`);
      if (targetElement) {
        targetElement.focus();
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitProjectRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        project_scope: formData.projectType,
        project_description: formData.description,
        budget_range: formData.budget,
        timeline: formData.timeline,
        honeypot: formData.website,
      });

      if (result.success) {
        setSubmitted(true);
        trackEvent('project_request_submitted', {
          projectScope: formData.projectType,
          budgetRange: formData.budget,
          timeline: formData.timeline,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          description: '',
          budget: 'Not sure',
          timeline: 'Flexible',
          website: '',
        });
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(result.error || (isBangla ? 'প্রজেক্টের তথ্য জমা দেওয়া সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : "We couldn't submit your project request right now. Please try again."));
      }
    } catch {
      setSubmitError(isBangla ? 'নেটওয়ার্কজনিত সমস্যার কারণে তথ্য জমা দেওয়া যায়নি। সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।' : "We couldn't submit your project request right now due to a network issue. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      description: '',
      budget: 'Not sure',
      timeline: 'Flexible',
      website: '',
    });
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title={isBangla ? 'নতুন প্রজেক্ট শুরু করুন — BDCON Labs' : 'Start a Project — Project Intake & Scoping | BDCON Labs'}
        description={
          isBangla
            ? 'আপনার সফটওয়্যার পরিকল্পনা বা ব্যবসায়িক প্রয়োজনীয়তা আমাদের জানান। আমরা বিস্তারিত টেকনিক্যাল রূপরেখা নিয়ে আলোচনা করব।'
            : 'Tell BDCON Labs about your project, software idea, or business requirement to begin technical scoping.'
        }
        canonicalPath="/start-project"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isBangla ? 'নতুন প্রজেক্ট শুরু করুন' : 'Start a Project', url: '/start-project' },
        ]}
      />
      {/* Top Breadcrumb Bar */}
      <Breadcrumbs />

      {/* 1. Page Header */}
      <PageHeader
        eyebrow={isBangla ? 'প্রজেক্টের সূচনা' : 'PROJECT INITIATION'}
        title={isBangla ? 'একত্রে কার্যকর কিছু তৈরি করি।' : "Let's build something useful."}
        description={
          isBangla
            ? 'আপনার প্রজেক্টের পরিকল্পনা বা সফটওয়্যার প্রয়োজনীয়তা আমাদের জানান। আমরা টেকনিক্যাল সম্ভাব্যতা যাচাই করে একটি টেকসই সল্যুশনের রূপরেখা তৈরি করব।'
            : "Tell us about your project, idea or business requirement. We'll evaluate the technical scope and discuss how to turn it into an effective digital solution."
        }
        borderBottom
      />

      {/* 2. Main Form Section */}
      <Section spacing="lg" surface="canvas" className="flex-1">
        <Container size="md">
          {submitted ? (
            /* SUCCESS CONFIRMATION BOX */
            <div 
              role="status"
              aria-live="polite"
              className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center space-y-6 shadow-xs animate-in fade-in"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success-border)] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <h2 className="type-h3 text-[var(--text-primary)] font-bold">
                  {isBangla ? 'আপনার প্রজেক্টের তথ্য সফলভাবে জমা হয়েছে।' : 'Your project request has been received.'}
                </h2>
                <p className="type-body text-[var(--text-secondary)] max-w-md mx-auto">
                  {isBangla
                    ? 'BDCON Labs-এ আপনার প্রজেক্টের রিকোয়ারমেন্ট পাঠানোর জন্য ধন্যবাদ। আমাদের সফটওয়্যার ইঞ্জিনিয়ারিং টিম শীঘ্রই আপনার রিকোয়েস্ট পর্যালোচনা করে যোগাযোগ করবে।'
                    : 'Thank you for submitting your project specifications to BDCON Labs. Our engineering team will review your requirements and follow up with a technical assessment.'}
                </p>
              </div>

              {/* Confidentiality & Architecture Note */}
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-xs text-[var(--text-muted)] text-left space-y-2 max-w-lg mx-auto">
                <div className={`flex items-center gap-1.5 text-[var(--color-brand)] font-semibold text-[11px] uppercase tracking-wider ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                  <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{isBangla ? 'প্রজেক্টের গোপনীয়তা ও টেকনিক্যাল রিভিউ' : 'CONFIDENTIALITY & TECHNICAL SCOPING'}</span>
                </div>
                <p className="leading-relaxed">
                  {isBangla
                    ? 'আপনার প্রজেক্টের বিবরণ ও যোগাযোগের তথ্যাদি সম্পূর্ণ নিরাপদ ও সংরক্ষিত। আমরা প্রতিটি ধারণার সুরক্ষা ও পর্যালোচনা প্রক্রিয়ায় শতভাগ গোপনীয়তা বজায় রাখি।'
                    : 'Your submitted requirements and contact details have been stored securely in our system. We respect proprietary concepts and maintain complete confidentiality throughout the review process.'}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button variant="outline" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
                  {isBangla ? 'আরেকটি প্রজেক্ট জমা দিন' : 'Submit Another Request'}
                </Button>
                <Link to="/">
                  <Button as="span" variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                    {isBangla ? 'হোমপেজে ফিরে যান' : 'Return to Homepage'}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Form Container */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-6 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs space-y-8"
              >
                {/* ERROR BANNER */}
                {submitError && (
                  <div 
                    role="alert"
                    aria-live="assertive"
                    className="p-4 rounded-xl border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] text-[var(--color-error)] text-sm flex items-start gap-3 animate-in fade-in"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <p className="font-semibold">{submitError}</p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {isBangla
                          ? 'আপনার তথ্যাদি সংরক্ষিত রয়েছে। সংযোগ পরীক্ষা করে পুনরায় পাঠান।'
                          : 'Your entered requirements have been preserved. Please verify your connection and click ‘Submit Project Inquiry’ again.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Hidden Honeypot Field (Bot Trap) */}
                <div 
                  aria-hidden="true" 
                  className="opacity-0 absolute -z-50 w-0 h-0 overflow-hidden pointer-events-none"
                >
                  <label htmlFor="project-website-hp">Leave this field blank</label>
                  <input
                    id="project-website-hp"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Section 1: Contact Details */}
                <div className="space-y-4">
                  <h2 className={`type-caption font-bold uppercase tracking-wider text-[var(--color-brand)] pb-2 border-b border-[var(--border-color)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {isBangla ? '০১. যোগাযোগের তথ্য' : '01. Contact Information'}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="field-name" className="text-xs font-semibold text-[var(--text-primary)] block">
                        {isBangla ? 'পুরো নাম' : 'Full Name'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="field-name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        maxLength={100}
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'field-name-error' : undefined}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder={isBangla ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                          errors.name
                            ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
                            : 'border-[var(--border-color)] focus:border-[var(--color-brand)] focus:ring-[var(--color-brand)]'
                        }`}
                      />
                      {errors.name && (
                        <p id="field-name-error" className="text-xs text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="field-email" className="text-xs font-semibold text-[var(--text-primary)] block">
                        {isBangla ? 'ইমেইল ঠিকানা' : 'Email Address'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="field-email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        maxLength={150}
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'field-email-error' : undefined}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="tanvir@company.com"
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                          errors.email
                            ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
                            : 'border-[var(--border-color)] focus:border-[var(--color-brand)] focus:ring-[var(--color-brand)]'
                        }`}
                      />
                      {errors.email && (
                        <p id="field-email-error" className="text-xs text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label htmlFor="field-phone" className="text-xs font-semibold text-[var(--text-primary)] block">
                        {isBangla ? 'ফোন / হোয়াটসঅ্যাপ' : 'Phone / WhatsApp'} <span className="text-[var(--text-muted)] font-normal text-[11px]">({isBangla ? 'ঐচ্ছিক' : 'Optional'})</span>
                      </label>
                      <input
                        id="field-phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        maxLength={30}
                        disabled={isSubmitting}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'field-phone-error' : undefined}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="+880 1..."
                        className="w-full h-11 px-3.5 rounded-lg border border-[var(--border-color)] text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      {errors.phone && (
                        <p id="field-phone-error" className="text-xs text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Company / Organization */}
                    <div className="space-y-1.5">
                      <label htmlFor="field-company" className="text-xs font-semibold text-[var(--text-primary)] block">
                        {isBangla ? 'প্রতিষ্ঠান বা অর্গানাইজেশন' : 'Company or Organization'} <span className="text-[var(--text-muted)] font-normal text-[11px]">({isBangla ? 'ঐচ্ছিক' : 'Optional'})</span>
                      </label>
                      <input
                        id="field-company"
                        type="text"
                        autoComplete="organization"
                        value={formData.company}
                        maxLength={100}
                        disabled={isSubmitting}
                        aria-invalid={errors.company ? 'true' : 'false'}
                        aria-describedby={errors.company ? 'field-company-error' : undefined}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (errors.company) setErrors({ ...errors, company: undefined });
                        }}
                        placeholder={isBangla ? 'যেমন: প্রাইম কনস্ট্রাকশন লি.' : 'e.g. Acme Tech Ltd.'}
                        className="w-full h-11 px-3.5 rounded-lg border border-[var(--border-color)] text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      {errors.company && (
                        <p id="field-company-error" className="text-xs text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Project Classification */}
                <div className="space-y-4">
                  <h2 className={`type-caption font-bold uppercase tracking-wider text-[var(--color-brand)] pb-2 border-b border-[var(--border-color)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {isBangla ? '০২. প্রজেক্টের ধরন ও বিবরণ' : '02. Project Specification'}
                  </h2>

                  {/* Project Type Buttons */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[var(--text-primary)] block" id="project-type-label">
                      {isBangla ? 'প্রজেক্টের ধরন' : 'Project Type'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
                    </label>
                    <div 
                      id="field-project-types"
                      role="radiogroup" 
                      aria-labelledby="project-type-label"
                      tabIndex={0}
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-lg p-1"
                    >
                      {projectTypeOptions.map((opt) => {
                        const isSelected = formData.projectType === opt.key;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            disabled={isSubmitting}
                            onClick={() => {
                              setFormData({ ...formData, projectType: opt.key });
                              if (errors.projectType) setErrors({ ...errors, projectType: undefined });
                            }}
                            className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer select-none min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed ${
                              isSelected
                                ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white shadow-2xs font-semibold'
                                : 'border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                            }`}
                          >
                            {isBangla ? opt.labelBn : opt.labelEn}
                          </button>
                        );
                      })}
                    </div>
                    {errors.projectType && (
                      <p className="text-xs text-[var(--color-error)] flex items-center gap-1 pt-1 font-medium" role="alert">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.projectType}</span>
                      </p>
                    )}
                  </div>

                  {/* Project Description */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="field-description" className="text-xs font-semibold text-[var(--text-primary)] block">
                        {isBangla ? 'প্রজেক্টের বিবরণ ও মূল ফিচারসমূহ' : 'Project Description & Requirements'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]" aria-live="polite">
                        {formData.description.length}/3000
                      </span>
                    </div>
                    <textarea
                      id="field-description"
                      rows={5}
                      value={formData.description}
                      maxLength={3000}
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={errors.description ? 'true' : 'false'}
                      aria-describedby={errors.description ? 'field-desc-error' : undefined}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        if (errors.description) setErrors({ ...errors, description: undefined });
                      }}
                      placeholder={
                        isBangla
                          ? 'আপনি কী ধরনের সফটওয়্যার তৈরি করতে চান, প্রধান ফিচারসমূহ বা সমাধান করতে চাওয়া সমস্যাগুলো লিখুন...'
                          : "Briefly describe what you're trying to build, key workflows, user types, or problems to be solved..."
                      }
                      className={`w-full p-3.5 rounded-lg border text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-1 leading-relaxed resize-y disabled:opacity-60 disabled:cursor-not-allowed ${
                        errors.description
                          ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
                          : 'border-[var(--border-color)] focus:border-[var(--color-brand)] focus:ring-[var(--color-brand)]'
                      }`}
                    />
                    {errors.description && (
                      <p id="field-desc-error" className="text-xs text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.description}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Section 3: Parameters (Budget & Timeline) */}
                <div className="space-y-4">
                  <h2 className={`type-caption font-bold uppercase tracking-wider text-[var(--color-brand)] pb-2 border-b border-[var(--border-color)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                    {isBangla ? '০৩. বাজেট ও সময়সীমা' : '03. Estimated Scope & Timing'}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Budget Range */}
                    <div className="space-y-1.5">
                      <label htmlFor="field-budget" className="text-xs font-semibold text-[var(--text-primary)] block">
                        {isBangla ? 'সম্ভাব্য বাজেট' : 'Estimated Budget Bracket'}
                      </label>
                      <select
                        id="field-budget"
                        value={formData.budget}
                        disabled={isSubmitting}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-lg border border-[var(--border-color)] text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {isBangla ? opt.labelBn : opt.labelEn}
                          </option>
                        ))}
                      </select>
                      <span className="type-caption text-[11px] text-[var(--text-muted)] block">
                        {isBangla ? 'প্রাথমিক পরিকল্পনা ও ফিজিবিলিটি যাচাইয়ের জন্য।' : 'Initial benchmark for feasibility planning.'}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-1.5">
                      <label htmlFor="field-timeline" className="text-xs font-semibold text-[var(--text-primary)] block">
                        {isBangla ? 'সম্ভাব্য ডেলিভারি সময়সীমা' : 'Target Timeline'}
                      </label>
                      <select
                        id="field-timeline"
                        value={formData.timeline}
                        disabled={isSubmitting}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-lg border border-[var(--border-color)] text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {timelineOptions.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {isBangla ? opt.labelBn : opt.labelEn}
                          </option>
                        ))}
                      </select>
                      <span className="type-caption text-[11px] text-[var(--text-muted)] block">
                        {isBangla ? 'প্রজেক্ট সমাপ্তি বা প্রথম কার্যকর সংস্করণ চালুর সম্ভাব্য সময়।' : 'Target completion or MVP deployment horizon.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Evaluation Guarantee */}
                <div className="p-3.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {isBangla
                      ? 'আপনার রিকোয়েস্টটি সরাসরি আমাদের সফটওয়্যার ইঞ্জিনিয়ারিং টিমের কাছে পৌঁছাবে। আমরা বিশদ টেকনিক্যাল পরিধি বিশ্লেষণ করে সুস্পষ্ট পরিকল্পনা প্রদান করব।'
                      : 'Your inquiry is delivered directly to our senior engineering team. We will review your technical specifications and respond with clear scoping milestones.'}
                  </span>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="type-caption text-xs text-[var(--text-muted)] text-center sm:text-left">
                    {isBangla
                      ? 'সকল তথ্য কঠোর গোপনীয়তার সাথে পর্যালোচনা করা হয়।'
                      : 'All requirements evaluated under strict confidentiality.'}
                  </p>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    rightIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    {isSubmitting
                      ? (isBangla ? 'রিকোয়েস্ট পাঠানো হচ্ছে...' : 'Submitting Request...')
                      : (isBangla ? 'প্রজেক্ট রিকোয়েস্ট পাঠান' : 'Submit Project Inquiry')}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};
