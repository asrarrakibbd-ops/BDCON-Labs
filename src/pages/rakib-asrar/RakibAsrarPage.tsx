import React, { useEffect, useState, useCallback } from 'react';
import { BookOpen, Feather, ArrowRight, Quote, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';
import { RakibAsrarNav } from '../../components/rakib-asrar/RakibAsrarNav';
import { RakibAsrarHero } from '../../components/rakib-asrar/RakibAsrarHero';
import { BookCard } from '../../components/rakib-asrar/BookCard';
import { WritingCard } from '../../components/rakib-asrar/WritingCard';
import { BrandBridge } from '../../components/rakib-asrar/BrandBridge';
import { getBooks } from '../../data/books';
import { getWritingEntries } from '../../data/writing';
import { getAuthorProfile, AuthorProfile, AUTHOR_PROFILE } from '../../data/author';
import { Book } from '../../types/book';
import { WritingEntry } from '../../types/writing';
import { Link } from '../../lib/router';
import { SEO } from '../../components/common/SEO';
import { buildPersonSchema } from '../../lib/structuredData';

export const RakibAsrarPage: React.FC = () => {
  const [authorProfile, setAuthorProfile] = useState<AuthorProfile>(AUTHOR_PROFILE);
  const [books, setBooks] = useState<Book[]>([]);
  const [writing, setWriting] = useState<WritingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [profileData, booksData, writingData] = await Promise.all([
        getAuthorProfile(),
        getBooks(),
        getWritingEntries(),
      ]);
      setAuthorProfile(profileData);
      setBooks(booksData);
      setWriting(writingData);
    } catch {
      // Fallbacks are preserved inside services
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    document.title = 'রাকিব আসরার · কথাসাহিত্যিক ও ক্রিয়েটর | Rakib Asrar';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'রাকিব আসরারের সাহিত্য, প্রকাশিত বই (পরজীবী, তিলের ছায়া), প্রবন্ধ ও সমকালীন চিন্তাভাবনা। Writer, Author and Creator associated with BDCON Labs.'
      );
    }
  }, []);

  const featuredBooks = books.filter((b) => b.featured).length > 0 ? books.filter((b) => b.featured) : books;
  const recentWriting = writing.slice(0, 3);

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title="রাকিব আসরার — কথাসাহিত্যিক ও ক্রিয়েটর | Rakib Asrar"
        description="রাকিব আসরারের সাহিত্য, প্রকাশিত বই (পরজীবী, তিলের ছায়া), প্রবন্ধ ও সমকালীন চিন্তাভাবনা।"
        canonicalPath="/rakib-asrar"
        ogType="profile"
        ogImage={authorProfile.profileImage}
        lang="bn"
        jsonLd={buildPersonSchema(authorProfile)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'রাকিব আসরার', url: '/rakib-asrar' },
        ]}
      />
      {/* 1. Brand Sub-Navigation & Switcher */}
      <RakibAsrarNav />

      {/* 2. Hero Section with Genuine Portrait */}
      <RakibAsrarHero profile={authorProfile} />

      {/* 3. Published Books Showcase (Section 10) */}
      <Section spacing="xl" surface="subtle" borderBottom id="books-overview">
        <Container size="2xl">
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
              <div className="space-y-2">
                <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[11px] font-bold">
                  বইসমূহ
                </span>
                <h2 className="font-bangla-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  প্রকাশিত গ্রন্থ ও উপন্যাস
                </h2>
                <p className="type-bangla-excerpt text-[var(--text-secondary)]">
                  অমর একুশে বইমেলায় প্রকাশিত গল্পসংকলন ও উপন্যাস।
                </p>
              </div>

              <Link to="/rakib-asrar/books">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  সব বই দেখুন
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
                {featuredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* 4. Selected Essays & Writing (Section 10 & 11) */}
      <Section spacing="xl" surface="canvas" borderBottom id="writing-overview">
        <Container size="2xl">
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
              <div className="space-y-2">
                <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[11px] font-bold">
                  প্রবন্ধ ও চিন্তন
                </span>
                <h2 className="font-bangla-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  নির্বাচিত প্রবন্ধ ও নিবন্ধ
                </h2>
                <p className="type-bangla-excerpt text-[var(--text-secondary)]">
                  দর্শন, সময়, স্মৃতি ও সমাজের টানাপোড়েন নিয়ে দীর্ঘ ভাবনা।
                </p>
              </div>

              <Link to="/rakib-asrar/writing">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  সব লেখা পড়ুন
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {recentWriting.map((entry) => (
                  <WritingCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* 5. Reader Testimonials & Reflections (Genuine from Source) */}
      {authorProfile.testimonials && authorProfile.testimonials.length > 0 && (
        <Section spacing="xl" surface="subtle" borderBottom>
          <Container size="2xl">
            <div className="space-y-10">
              <div className="space-y-2 text-center max-w-xl mx-auto">
                <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[11px] font-bold">
                  পাঠপ্রতিক্রিয়া
                </span>
                <h2 className="font-bangla-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  পাঠকের অনুভূতি
                </h2>
                <p className="type-bangla-excerpt text-[var(--text-secondary)]">
                  &lsquo;তিলের ছায়া&rsquo; এবং &lsquo;পরজীবী&rsquo; পাঠকদের কাছে যেভাবে প্রতিধ্বনিত হয়েছে।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {authorProfile.testimonials.map((test) => (
                  <div
                    key={test.id}
                    className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <Quote className="w-6 h-6 text-[var(--color-brand)] opacity-50" />
                      <p className="font-bangla-serif text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed italic">
                        &ldquo;{test.content}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border-color)]">
                      <p className="font-bangla-serif font-bold text-sm text-[var(--text-primary)]">
                        {test.readerName}
                      </p>
                      {test.readerRole && (
                        <p className="text-xs font-bangla-sans text-[var(--text-muted)]">
                          {test.readerRole}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 6. Context Bridge Back to BDCON Labs */}
      <BrandBridge />
    </div>
  );
};
