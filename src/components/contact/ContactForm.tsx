import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitContactMessage } from '../../data/contactMessages';
import { trackEvent } from '../../lib/analytics';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** Hidden honeypot field to trap automated spam bots */
  website: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm: React.FC = () => {
  const { isBangla } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    // 1. Name validation
    if (!name) {
      newErrors.name = isBangla ? 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।' : 'Please provide your full name.';
    } else if (name.length < 2) {
      newErrors.name = isBangla ? 'নাম কমপক্ষে ২ অক্ষরের হতে হবে।' : 'Name must be at least 2 characters.';
    } else if (name.length > 100) {
      newErrors.name = isBangla ? 'নাম ১০০ অক্ষরের বেশি হতে পারবে না।' : 'Name cannot exceed 100 characters.';
    }

    // 2. Email validation
    if (!email) {
      newErrors.email = isBangla ? 'অনুগ্রহ করে ইমেইল ঠিকানা দিন।' : 'Please provide an email address.';
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = isBangla ? 'সঠিক ফরম্যাটের ইমেইল ঠিকানা লিখুন (যেমন: name@example.com)।' : 'Please provide a valid email format (e.g. name@example.com).';
    } else if (email.length > 150) {
      newErrors.email = isBangla ? 'ইমেইল ঠিকানা ১৫০ অক্ষরের বেশি হতে পারবে না।' : 'Email address cannot exceed 150 characters.';
    }

    // 3. Phone validation (optional)
    if (phone && phone.length > 30) {
      newErrors.phone = isBangla ? 'ফোন নম্বর ৩০ অক্ষরের বেশি হতে পারবে না।' : 'Phone number cannot exceed 30 characters.';
    }

    // 4. Subject validation
    if (!subject) {
      newErrors.subject = isBangla ? 'অনুগ্রহ করে আলোচনার বিষয়টি উল্লেখ করুন।' : 'Please specify the subject of your inquiry.';
    } else if (subject.length < 2) {
      newErrors.subject = isBangla ? 'বিষয় কমপক্ষে ২ অক্ষরের হতে হবে।' : 'Subject must be at least 2 characters.';
    } else if (subject.length > 150) {
      newErrors.subject = isBangla ? 'বিষয় ১৫০ অক্ষরের বেশি হতে পারবে না।' : 'Subject cannot exceed 150 characters.';
    }

    // 5. Message validation
    if (!message) {
      newErrors.message = isBangla ? 'অনুগ্রহ করে আপনার বার্তা লিখুন।' : 'Please provide your message.';
    } else if (message.length < 10) {
      newErrors.message = isBangla ? 'বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে।' : 'Message must be at least 10 characters.';
    } else if (message.length > 3000) {
      newErrors.message = isBangla ? 'বার্তা ৩,০০০ অক্ষরের বেশি হতে পারবে না।' : 'Message cannot exceed 3,000 characters.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstField = Object.keys(newErrors)[0];
      const targetElement = document.getElementById(`contact-${firstField}`);
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
      const result = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        honeypot: formData.website,
      });

      if (result.success) {
        setSubmitted(true);
        trackEvent('contact_message_submitted', { subject: formData.subject });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          website: '',
        });
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(result.error || (isBangla ? 'বার্তাটি পাঠানো সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : "We couldn't deliver your message right now. Please try again."));
      }
    } catch {
      setSubmitError(isBangla ? 'নেটওয়ার্কজনিত সমস্যার কারণে বার্তা পাঠানো যায়নি। অনুগ্রহ করে সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।' : "We couldn't deliver your message due to a connection issue. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      website: '',
    });
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div 
        role="status" 
        aria-live="polite"
        className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center space-y-6 shadow-xs animate-in fade-in"
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success-border)] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h3 className="type-h3 text-[var(--text-primary)] font-bold">
            {isBangla ? 'আপনার মেসেজ সফলভাবে পাঠানো হয়েছে।' : 'Your message has been sent successfully.'}
          </h3>
          <p className="type-body text-[var(--text-secondary)] max-w-md mx-auto">
            {isBangla
              ? 'BDCON Labs-এ মেসেজ পাঠানোর জন্য ধন্যবাদ। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।'
              : 'Thank you for reaching out to BDCON Labs. Our engineering team has received your communication and will review your inquiry with priority.'}
          </p>
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {isBangla ? 'আরেকটি মেসেজ পাঠান' : 'Send Another Message'}
          </Button>

          <Link to="/">
            <Button as="span" variant="ghost" size="md">
              {isBangla ? 'হোমপেজে ফিরে যান' : 'Back to Home'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                ? 'আপনার তথ্যাদি সংরক্ষিত রয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় পাঠান।'
                : 'Your entered information has been preserved. Please check your network connection and click ‘Send Message’ again.'}
            </p>
          </div>
        </div>
      )}

      {/* Hidden Honeypot Field (Spam Bot Trap) */}
      <div 
        aria-hidden="true" 
        className="opacity-0 absolute -z-50 w-0 h-0 overflow-hidden pointer-events-none"
      >
        <label htmlFor="contact-website-hp">Leave this field blank</label>
        <input
          id="contact-website-hp"
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* 1. Name Input */}
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="type-caption font-semibold uppercase tracking-wider text-[var(--text-primary)] block">
          {isBangla ? 'আপনার নাম' : 'Your Name'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={isBangla ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
          value={formData.name}
          maxLength={100}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
            errors.name ? 'border-[var(--color-error)] ring-1 ring-[var(--color-error)]' : 'border-[var(--border-color)]'
          }`}
        />
        {errors.name && (
          <p id="contact-name-error" className="type-caption text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* 2. Email & Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="type-caption font-semibold uppercase tracking-wider text-[var(--text-primary)] block">
            {isBangla ? 'ইমেইল ঠিকানা' : 'Email Address'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="tanvir@example.com"
            value={formData.email}
            maxLength={150}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.email ? 'border-[var(--color-error)] ring-1 ring-[var(--color-error)]' : 'border-[var(--border-color)]'
            }`}
          />
          {errors.email && (
            <p id="contact-email-error" className="type-caption text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="contact-phone" className="type-caption font-semibold uppercase tracking-wider text-[var(--text-primary)] block">
            {isBangla ? 'ফোন / হোয়াটসঅ্যাপ' : 'Phone / WhatsApp'} <span className="text-[var(--text-muted)] text-[11px] font-normal">({isBangla ? 'ঐচ্ছিক' : 'optional'})</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+880 1..."
            value={formData.phone}
            maxLength={30}
            disabled={isSubmitting}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.phone ? 'border-[var(--color-error)] ring-1 ring-[var(--color-error)]' : 'border-[var(--border-color)]'
            }`}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="type-caption text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* 3. Subject Input */}
      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="type-caption font-semibold uppercase tracking-wider text-[var(--text-primary)] block">
          {isBangla ? 'বিষয়' : 'Subject'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder={isBangla ? 'যেমন: BuildEst BD সংক্রান্ত আলোচনা / সফটওয়্যার অনুসন্ধান' : 'e.g. BuildEst BD consultation / Custom software inquiry'}
          value={formData.subject}
          maxLength={150}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          onChange={(e) => {
            setFormData({ ...formData, subject: e.target.value });
            if (errors.subject) setErrors({ ...errors, subject: undefined });
          }}
          className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
            errors.subject ? 'border-[var(--color-error)] ring-1 ring-[var(--color-error)]' : 'border-[var(--border-color)]'
          }`}
        />
        {errors.subject && (
          <p id="contact-subject-error" className="type-caption text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* 4. Message Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="contact-message" className="type-caption font-semibold uppercase tracking-wider text-[var(--text-primary)] block">
            {isBangla ? 'আপনার বার্তা' : 'Your Message'} <span className="text-[var(--color-brand)]" aria-hidden="true">*</span>
          </label>
          <span className="text-[11px] font-mono text-[var(--text-muted)]" aria-live="polite">
            {formData.message.length}/3000
          </span>
        </div>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={isBangla ? 'আপনার প্রজেক্ট আইডিয়া, প্রশ্ন বা প্রয়োজনীয়তা বিস্তারিত লিখুন...' : 'Please describe your requirements, questions or context...'}
          value={formData.message}
          maxLength={3000}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] transition-all resize-y disabled:opacity-60 disabled:cursor-not-allowed ${
            errors.message ? 'border-[var(--color-error)] ring-1 ring-[var(--color-error)]' : 'border-[var(--border-color)]'
          }`}
        />
        {errors.message && (
          <p id="contact-message-error" className="type-caption text-[var(--color-error)] flex items-center gap-1 font-medium" role="alert">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* 5. Submit Button with Loading State */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        leftIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        className="w-full sm:w-auto min-h-[44px]"
      >
        {isSubmitting
          ? (isBangla ? 'মেসেজ পাঠানো হচ্ছে...' : 'Sending Message...')
          : (isBangla ? 'মেসেজ পাঠান' : 'Send Message')}
      </Button>
    </form>
  );
};
