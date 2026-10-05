import React, { useEffect, useState, useCallback } from 'react';
import { Feather, BookOpen, GraduationCap, Briefcase, MapPin, Calendar, Mail, Phone, ExternalLink, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';
import { RakibAsrarNav } from '../../components/rakib-asrar/RakibAsrarNav';
import { BrandBridge } from '../../components/rakib-asrar/BrandBridge';
import { getAuthorProfile, AuthorProfile, AUTHOR_PROFILE } from '../../data/author';
import { Link } from '../../lib/router';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { buildPersonSchema } from '../../lib/structuredData';

export const RakibAsrarAboutPage: React.FC = () => {
  const [profile, setProfile] = useState<AuthorProfile>(AUTHOR_PROFILE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAuthorProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err?.message || 'পরিচিতি লোড করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title="পরিচিতি — রাকিব আসরার | About the Author"
        description="রাকিব আসরারের পূর্ণাঙ্গ জীবনবৃত্তান্ত, কর্মজীবন, শিক্ষাগত যোগ্যতা এবং সাহিত্যযাত্রার পরিচিতি।"
        canonicalPath="/rakib-asrar/about"
        ogType="profile"
        ogImage={profile.profileImage}
        lang="bn"
        jsonLd={buildPersonSchema(profile)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'রাকিব আসরার', url: '/rakib-asrar' },
          { name: 'পরিচিতি', url: '/rakib-asrar/about' },
        ]}
      />
      <RakibAsrarNav />
      <Breadcrumbs />

      {/* Hero Header */}
      <Section spacing="lg" surface="canvas" borderBottom>
        <Container size="2xl">
          <div className="max-w-3xl space-y-3">
            <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[11px] font-bold">
              লেখক পরিচিতি
            </span>
            <h1 className="font-bangla-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              {profile.displayName || profile.name}
            </h1>
            <p className="font-bangla-sans text-lg text-[var(--color-brand)] font-medium">
              {profile.role}
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Narrative & Profile Grid */}
      <Section spacing="xl" surface="subtle" borderBottom>
        <Container size="2xl">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 animate-pulse">
              <div className="lg:col-span-8 h-96 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
              <div className="lg:col-span-4 h-96 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
            </div>
          ) : error ? (
            <div className="p-8 sm:p-12 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
              <AlertCircle className="w-10 h-10 text-[var(--color-brand)] mx-auto opacity-80" />
              <div className="space-y-1">
                <h3 className="type-h3 text-[var(--text-primary)] font-bold">পরিচিতি লোড করা যায়নি</h3>
                <p className="type-body-small text-[var(--text-secondary)]">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchProfile} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                পুনরায় চেষ্টা করুন
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Full Factual Narrative & Timeline */}
              <div className="lg:col-span-8 space-y-8">
                {/* Full Biography from Source */}
                <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-5 shadow-xs">
                  <h2 className="font-bangla-serif text-2xl font-bold text-[var(--text-primary)]">
                    জীবন ও সাহিত্যের সূচনা
                  </h2>
                  <div className="space-y-4 font-bangla-serif text-base sm:text-lg leading-[1.95] text-[var(--text-secondary)]">
                    {profile.biography.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Milestones Timeline */}
                {profile.timeline && profile.timeline.length > 0 && (
                  <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-6 shadow-xs">
                    <h2 className="font-bangla-serif text-2xl font-bold text-[var(--text-primary)]">
                      জীবনের গুরুত্বপূর্ণ অধ্যায় ও মাইলফলক
                    </h2>

                    <div className="relative border-l-2 border-[var(--color-brand)]/30 ml-3 sm:ml-4 space-y-8 pl-6 sm:pl-8 py-2">
                      {profile.timeline.map((event, idx) => (
                        <div key={idx} className="relative group">
                          {/* Dot marker */}
                          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--color-brand)]" />
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-[var(--color-brand)]">
                              {event.year}
                            </span>
                            <h3 className="font-bangla-serif text-lg font-bold text-[var(--text-primary)]">
                              {event.title}
                            </h3>
                            <p className="font-bangla-sans text-sm text-[var(--text-secondary)] leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Literary Interests Tag Cloud */}
                {profile.literaryInterests && profile.literaryInterests.length > 0 && (
                  <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
                    <h3 className="font-bangla-serif text-xl font-bold text-[var(--text-primary)]">
                      সাহিত্যিক আগ্রহ ও ভাবনার ক্ষেত্র
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {profile.literaryInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] font-bangla-sans text-sm text-[var(--text-secondary)]"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Key Biographical Data Card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-xs sticky top-24">
                  {/* Portrait snippet */}
                  <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Fact Sheet */}
                  <div className="space-y-4 text-xs font-bangla-sans border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[var(--text-muted)] block text-[11px]">শিক্ষাগত যোগ্যতা</span>
                        <span className="font-semibold text-[var(--text-primary)] leading-snug block">
                          {profile.education}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[var(--text-muted)] block text-[11px]">পেশাগত পরিচয়</span>
                        <span className="font-semibold text-[var(--text-primary)] block">
                          {profile.profession}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[var(--text-muted)] block text-[11px]">জন্ম তারিখ</span>
                        <span className="font-semibold text-[var(--text-primary)] block">
                          {profile.birthDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[var(--text-muted)] block text-[11px]">জন্মস্থান</span>
                        <span className="font-semibold text-[var(--text-primary)] block">
                          {profile.birthPlace}
                        </span>
                      </div>
                    </div>

                    {profile.contactEmail && (
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[var(--text-muted)] block text-[11px]">ইমেইল</span>
                          <span className="font-mono text-[var(--text-primary)] block select-all">
                            {profile.contactEmail}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Genuine Social & Platform Links (Section 19) */}
                  {profile.socialLinks && profile.socialLinks.length > 0 && (
                    <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                      <span className="text-[11px] font-bangla-sans text-[var(--text-muted)] uppercase tracking-wider block">
                        অনলাইন প্রোফাইল ও মাধ্যম
                      </span>
                      <div className="space-y-1.5">
                        {profile.socialLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs text-[var(--text-secondary)] hover:text-[var(--color-brand)] transition-colors py-1 group"
                          >
                            <span className="capitalize">{link.label || link.platform}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <BrandBridge />
    </div>
  );
};
