import React, { useEffect, useState, useCallback } from 'react';
import { BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';
import { RakibAsrarNav } from '../../components/rakib-asrar/RakibAsrarNav';
import { BookCard } from '../../components/rakib-asrar/BookCard';
import { BrandBridge } from '../../components/rakib-asrar/BrandBridge';
import { EmptyState } from '../../components/ui/EmptyState';
import { getBooks } from '../../data/books';
import { Book } from '../../types/book';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';

export const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBooks();
      setBooks(data);
    } catch (err: any) {
      setError(err?.message || 'বইসমূহের তথ্য লোড করা সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title="বইসমূহ — রাকিব আসরার | Books by Rakib Asrar"
        description="রাকিব আসরারের প্রকাশিত বইসমূহ—তিলের ছায়া ও পরজীবী। অমর একুশে বইমেলার নির্বাচিত গ্রন্থাবলী।"
        canonicalPath="/rakib-asrar/books"
        lang="bn"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'রাকিব আসরার', url: '/rakib-asrar' },
          { name: 'বইসমূহ', url: '/rakib-asrar/books' },
        ]}
      />
      <RakibAsrarNav />
      <Breadcrumbs />

      {/* Header */}
      <Section spacing="lg" surface="canvas" borderBottom>
        <Container size="2xl">
          <div className="max-w-3xl space-y-3">
            <span className="type-caption font-bangla-sans uppercase tracking-wider text-[var(--color-brand)] text-[11px] font-bold">
              গ্রন্থতালিকা
            </span>
            <h1 className="font-bangla-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              প্রকাশিত বইসমূহ
            </h1>
            <p className="font-bangla-sans text-base text-[var(--text-secondary)] leading-relaxed">
              রাকিব আসরারের উপন্যাস ও গল্পগ্রন্থ। বইগুলোর সারাংশ, পৃষ্ঠা সংখ্যা, মূল্য ও রকমারি থেকে সংগ্রহের তথ্য নিচে দেওয়া হলো।
            </p>
          </div>
        </Container>
      </Section>

      {/* Books Content */}
      <Section spacing="xl" surface="subtle" className="flex-1" borderBottom>
        <Container size="2xl">
          {loading ? (
            /* Loading Skeleton */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
              ))}
            </div>
          ) : error ? (
            /* Error State */
            <div className="p-8 sm:p-12 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
              <AlertCircle className="w-10 h-10 text-[var(--color-brand)] mx-auto opacity-80" />
              <div className="space-y-1">
                <h3 className="type-h3 text-[var(--text-primary)] font-bold">বইয়ের তালিকা লোড করা যায়নি</h3>
                <p className="type-body-small text-[var(--text-secondary)]">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchBooks} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                পুনরায় চেষ্টা করুন
              </Button>
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="শীঘ্রই নতুন বই যুক্ত হবে"
              description="রাকিব আসরারের নতুন বই প্রকাশিত হলে এখানে বিস্তারিত যুক্ত হবে।"
            />
          )}
        </Container>
      </Section>

      <BrandBridge />
    </div>
  );
};
