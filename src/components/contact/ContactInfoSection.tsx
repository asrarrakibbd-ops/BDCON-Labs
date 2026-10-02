import React from 'react';
import { Mail, Github, ArrowRight, Wrench, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from '../../lib/router';
import { useTranslation } from '../../hooks/useTranslation';

export const ContactInfoSection: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <div className="space-y-6 select-none">
      {/* 1. Project Initiation Highlight Card (Section 14 & 20) */}
      <div className="p-6 sm:p-7 rounded-2xl border border-[var(--color-brand-muted)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-subtle)] border border-[var(--color-brand-muted)] flex items-center justify-center text-[var(--color-brand)]">
            <Wrench className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className={`type-caption uppercase text-[10px] text-[var(--color-brand)] font-bold block ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
              {isBangla ? 'ক্লায়েন্ট প্রজেক্ট' : 'CLIENT WORK'}
            </span>
            <h4 className="type-h4 text-[var(--text-primary)] font-bold tracking-tight">
              {isBangla ? 'নতুন সফটওয়্যার ডেভেলপ করতে চান?' : 'Looking to build software?'}
            </h4>
          </div>
        </div>

        <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
          {isBangla
            ? 'আপনার বিজনেসের অটোমেশন, ওয়েব অ্যাপ্লিকেশন, মোবাইল অ্যাপ বা কাস্টম সফটওয়্যার নিয়ে আলোচনা করতে আমাদের প্রজেক্ট রিকোয়েস্ট ফর্মটি ব্যবহার করুন।'
            : 'If you have a business requirement, web application, mobile app, or custom software project to discuss, use our structured project intake form.'}
        </p>

        <div className="pt-1">
          <Link to="/start-project">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {isBangla ? 'প্রজেক্ট শুরু করুন' : 'Start a Project'}
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Direct Studio Contact Coordinates */}
      <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-5 shadow-xs">
        <h4 className={`type-caption font-bold uppercase tracking-wider text-[var(--color-brand)] pb-2 border-b border-[var(--border-color)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
          {isBangla ? 'সরাসরি যোগাযোগের মাধ্যম' : 'Direct Channels'}
        </h4>

        <div className="space-y-4 text-sm">
          {/* Email */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)] shrink-0 mt-0.5">
              <Mail className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="space-y-0.5">
              <span className={`type-caption text-[11px] text-[var(--text-muted)] block ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'অফিসিয়াল ইমেইল' : 'Official Email'}
              </span>
              <a
                href="mailto:contact@bdconlabs.com"
                className="font-semibold text-[var(--text-primary)] hover:text-[var(--color-brand)] transition-colors"
              >
                contact@bdconlabs.com
              </a>
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)] shrink-0 mt-0.5">
              <Github className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="space-y-0.5">
              <span className={`type-caption text-[11px] text-[var(--text-muted)] block ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                {isBangla ? 'ওপেন সোর্স ও কোড' : 'Open Source & Code'}
              </span>
              <a
                href="https://github.com/bdconlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--text-primary)] hover:text-[var(--color-brand)] transition-colors"
              >
                github.com/bdconlabs
              </a>
            </div>
          </div>
        </div>

        {/* Operating Commitments */}
        <div className="pt-4 border-t border-[var(--border-color)] space-y-2 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" />
            <span>{isBangla ? 'সাধারণত ১–২ কর্মদিবসের মধ্যে আমরা রিপ্লাই দিয়ে থাকি' : 'General responses typically within 1–2 business days'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
            <span>{isBangla ? 'সকল তথ্য ও যোগাযোগ শতভাগ গোপনীয়তার সাথে বিবেচনা করা হয়' : 'All communications held with strict confidentiality'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
