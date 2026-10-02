import React, { useState, useEffect, useCallback } from 'react';
import { Feather, ArrowLeft, Clock, Calendar, BookOpen, Share2, Type, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';
import { RakibAsrarNav } from '../../components/rakib-asrar/RakibAsrarNav';
import { WritingCard } from '../../components/rakib-asrar/WritingCard';
import { BrandBridge } from '../../components/rakib-asrar/BrandBridge';
import { EmptyState } from '../../components/ui/EmptyState';
import { getWritingEntries, getWritingBySlug } from '../../data/writing';
import { WritingEntry } from '../../types/writing';
import { useRouter, matchPath, Link } from '../../lib/router';
import { SEO } from '../../components/common/SEO';
import { buildArticleSchema } from '../../lib/structuredData';
import { trackEvent } from '../../lib/analytics';

export const WritingPage: React.FC = () => {
  const { path, navigate } = useRouter();
  const [entries, setEntries] = useState<WritingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedEntry, setSelectedEntry] = useState<WritingEntry | null>(null);
  const [entryLoading, setEntryLoading] = useState(false);
  const [fontSizeModifier, setFontSizeModifier] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Check if current URL matches /rakib-asrar/writing/:slug
  const slugMatch = matchPath('/rakib-asrar/writing/:slug', path);
  const urlSlug = slugMatch.matches ? slugMatch.params.slug : null;

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWritingEntries();
      setEntries(data);
    } catch (err: any) {
      setError(err?.message || 'লেখালেখি লোড করা সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    if (urlSlug) {
      setEntryLoading(true);
      getWritingBySlug(urlSlug).then((entry) => {
        if (entry) {
          setSelectedEntry(entry);
          trackEvent('writing_view', { slug: entry.slug, title: entry.title });
        } else {
          setSelectedEntry(null);
        }
        setEntryLoading(false);
      }).catch(() => {
        setEntryLoading(false);
      });
    } else {
      setSelectedEntry(null);
    }
  }, [urlSlug]);

  // Handle font size class modifier for reader comfort
  const getProseSizeClass = () => {
    switch (fontSizeModifier) {
      case 'large':
        return 'text-[1.1875rem] sm:text-[1.25rem] leading-[2.05]';
      case 'xlarge':
        return 'text-[1.3125rem] sm:text-[1.4rem] leading-[2.15]';
      default:
        return 'text-[1.0625rem] sm:text-[1.1875rem] leading-[1.95]';
    }
  };

  const handleSelectEntry = (entry: WritingEntry) => {
    setSelectedEntry(entry);
    navigate(`/rakib-asrar/writing/${entry.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedEntry(null);
    navigate('/rakib-asrar/writing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedArticles = selectedEntry
    ? entries.filter((item) => item.id !== selectedEntry.id).slice(0, 3)
    : [];

  return (
    <div className="w-full flex-1 flex flex-col">
      <RakibAsrarNav />

      {/* If an entry is selected for long-form reading, display full editorial reader view */}
      {urlSlug ? (
        entryLoading ? (
          <div className="w-full min-h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--color-brand)] border-t-transparent animate-spin" />
              <p className="type-caption font-bangla-sans text-[var(--text-muted)]">প্রবন্ধটি লোড হচ্ছে...</p>
            </div>
          </div>
        ) : selectedEntry ? (
          <article className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
            <SEO
              title={`${selectedEntry.title} — রাকিব আসরার | Essays`}
              description={selectedEntry.seo?.description || selectedEntry.excerpt || selectedEntry.title}
              canonicalPath={`/rakib-asrar/writing/${selectedEntry.slug}`}
              ogType="article"
              ogImage={selectedEntry.coverImage}
              lang="bn"
              jsonLd={buildArticleSchema(selectedEntry)}
              breadcrumbs={[
                { name: 'Home', url: '/' },
                { name: 'রাকিব আসরার', url: '/rakib-asrar' },
                { name: 'লেখালেখি', url: '/rakib-asrar/writing' },
                { name: selectedEntry.title, url: `/rakib-asrar/writing/${selectedEntry.slug}` },
              ]}
            />
            {/* Header / Article Info */}
            <Section spacing="lg" surface="canvas" borderBottom className="pb-8">
              <Container size="md">
                <div className="space-y-6">
                  {/* Top Bar: Back Action & Category */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBackToList}
                      className="inline-flex items-center gap-2 text-xs font-bangla-sans font-semibold text-[var(--color-brand)] hover:underline cursor-pointer group"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                      <span>সব লেখায় ফিরে যান</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--text-muted)] text-[10px]">
                        {selectedEntry.category || 'প্রবন্ধ'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-4">
                    <h1 className="font-bangla-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.25]">
                      {selectedEntry.title}
                    </h1>

                    {selectedEntry.subtitle && (
                      <p className="type-bangla-subhead text-[var(--text-secondary)] font-medium">
                        {selectedEntry.subtitle}
                      </p>
                    )}

                    {/* Metadata strip */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-[var(--border-color)] text-xs font-bangla-sans text-[var(--text-muted)]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                        <span>{selectedEntry.readingTime || `${selectedEntry.readingTimeMinutes || 5} মিনিট পাঠ`}</span>
                      </div>
                      {selectedEntry.publishedAt && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{selectedEntry.publishedAt}</span>
                        </div>
                      )}
                      <span>·</span>
                      <span className="font-semibold text-[var(--text-primary)]">
                        {selectedEntry.author || 'রাকিব আসরার'}
                      </span>
                    </div>
                  </div>
                </div>
              </Container>
            </Section>

            {/* Reading View Controls Toolbar */}
            <div className="sticky top-16 z-20 border-b border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-md py-2">
              <Container size="md">
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span className="font-bangla-sans text-xs text-[var(--text-muted)] hidden sm:inline">
                    পড়ার সুবিধা
                  </span>

                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-[11px] font-bangla-sans text-[var(--text-muted)] mr-1">ফন্ট সাইজ:</span>
                    <button
                      type="button"
                      onClick={() => setFontSizeModifier('normal')}
                      className={`px-2 py-1 rounded text-xs font-mono cursor-pointer transition-colors ${
                        fontSizeModifier === 'normal'
                          ? 'bg-[var(--color-brand)] text-white font-bold'
                          : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSizeModifier('large')}
                      className={`px-2.5 py-1 rounded text-sm font-mono cursor-pointer transition-colors ${
                        fontSizeModifier === 'large'
                          ? 'bg-[var(--color-brand)] text-white font-bold'
                          : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      A+
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSizeModifier('xlarge')}
                      className={`px-3 py-1 rounded text-base font-mono cursor-pointer transition-colors ${
                        fontSizeModifier === 'xlarge'
                          ? 'bg-[var(--color-brand)] text-white font-bold'
                          : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      A++
                    </button>
                  </div>
                </div>
              </Container>
            </div>

            {/* Article Content Section */}
            <Section spacing="lg" surface="canvas" className="flex-1">
              <Container size="md">
                <div className="space-y-8">
                  {/* Lead Excerpt Block */}
                  {selectedEntry.excerpt && (
                    <div className="p-5 rounded-xl border-l-4 border-l-[var(--color-brand)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-serif text-lg leading-relaxed italic">
                      &ldquo;{selectedEntry.excerpt}&rdquo;
                    </div>
                  )}

                  {/* Long-Form Article Body Paragraphs with Refined Bangla Typography */}
                  <div className={`prose-bangla ${getProseSizeClass()} text-[var(--text-secondary)] space-y-7`}>
                    {selectedEntry.content ? (
                      selectedEntry.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="font-bangla-serif">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="font-bangla-serif">{selectedEntry.excerpt}</p>
                    )}
                  </div>

                  {/* Article Footer & Return Action */}
                  <div className="pt-10 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs font-bangla-sans text-[var(--text-muted)]">
                      প্রকাশকাল: {selectedEntry.publishedAt || '২০২৬'} · সর্বস্বত্ব সংরক্ষিত
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBackToList}
                      leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                    >
                      অন্যান্য লেখা দেখুন
                    </Button>
                  </div>

                  {/* Related Articles */}
                  {relatedArticles.length > 0 && (
                    <div className="pt-10 border-t border-[var(--border-color)] space-y-5">
                      <h3 className="font-bangla-serif text-xl font-bold text-[var(--text-primary)]">
                        আরও পড়ুন
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {relatedArticles.map((rel) => (
                          <div
                            key={rel.id}
                            onClick={() => handleSelectEntry(rel)}
                            className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--color-brand)] cursor-pointer transition-colors space-y-2 select-none"
                          >
                            <span className="text-[10px] font-mono text-[var(--color-brand)] uppercase font-semibold">
                              {rel.category}
                            </span>
                            <h4 className="font-bangla-serif text-base font-bold text-[var(--text-primary)] line-clamp-2">
                              {rel.title}
                            </h4>
                            <span className="text-xs font-bangla-sans text-[var(--color-brand)] font-semibold inline-flex items-center gap-1">
                              পাঠ করুন →
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </Section>
          </article>
        ) : (
          /* Essay Not Found State (Section 27) */
          <div className="w-full min-h-[50vh] flex items-center justify-center p-6">
            <EmptyState
              title="প্রবন্ধটি পাওয়া যায়নি"
              description="অনুরোধকৃত প্রবন্ধটি হয়তো সরিয়ে নেওয়া হয়েছে বা লিঙ্কটি সঠিক নয়।"
              actionLabel="সব লেখা দেখুন"
              onAction={handleBackToList}
            />
          </div>
        )
      ) : (
        /* Catalogue View */
        <>
          <SEO
            title="লেখালেখি ও প্রবন্ধমালা — রাকিব আসরার | Essays & Thoughts"
            description="সমাজ, সাহিত্য, মানবমন ও সমকালীন জীবনের নানা অনুভূতি নিয়ে লিখিত ভাবনা ও প্রবন্ধমালা। রাকিব আসরারের নির্বাচিত রচনাবলী।"
            canonicalPath="/rakib-asrar/writing"
            lang="bn"
            breadcrumbs={[
              { name: 'Home', url: '/' },
              { name: 'রাকিব আসরার', url: '/rakib-asrar' },
              { name: 'লেখালেখি', url: '/rakib-asrar/writing' },
            ]}
          />
          {/* Header */}
          <Section spacing="lg" surface="canvas" borderBottom>
            <Container size="2xl">
              <div className="max-w-3xl space-y-3">
                <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[11px] font-bold">
                  নির্বাচিত রচনা ও চিন্তন ({entries.length})
                </span>
                <h1 className="font-bangla-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.25]">
                  প্রবন্ধ ও চিন্তন
                </h1>
                <p className="type-bangla-excerpt text-[var(--text-secondary)] leading-[1.85] max-w-2xl">
                  সমাজ, সাহিত্য, মানবমন ও সমকালীন জীবনের নানা অনুভূতি নিয়ে লিখিত ভাবনা ও প্রবন্ধমালা। প্রতিটি লেখার মূল উদ্দেশ্য গভীর চিন্তা ও সরল প্রকাশের মেলবন্ধন ঘটানো।
                </p>
              </div>
            </Container>
          </Section>

          {/* Writing Grid */}
          <Section spacing="xl" surface="subtle" className="flex-1" borderBottom>
            <Container size="2xl">
              {loading ? (
                /* Loading Skeleton */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
                  ))}
                </div>
              ) : error ? (
                /* Error State with Retry */
                <div className="p-8 sm:p-12 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
                  <AlertCircle className="w-10 h-10 text-[var(--color-brand)] mx-auto opacity-80" />
                  <div className="space-y-1">
                    <h3 className="type-h3 text-[var(--text-primary)] font-bold">লেখালেখি লোড করা যায়নি</h3>
                    <p className="type-body-small text-[var(--text-secondary)]">{error}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchEntries} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                    পুনরায় চেষ্টা করুন
                  </Button>
                </div>
              ) : entries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {entries.map((entry) => (
                    <WritingCard
                      key={entry.id}
                      entry={entry}
                      onRead={handleSelectEntry}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="নতুন লেখা শীঘ্রই প্রকাশিত হবে"
                  description="রাকিব আসরারের নতুন প্রবন্ধ প্রকাশিত হলে এখানে যুক্ত হবে।"
                />
              )}
            </Container>
          </Section>
        </>
      )}

      <BrandBridge />
    </div>
  );
};
