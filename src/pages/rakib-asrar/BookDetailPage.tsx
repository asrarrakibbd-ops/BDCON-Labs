import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Calendar, Check, Tag, ShoppingCart, Layers, BookCheck } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';
import { RakibAsrarNav } from '../../components/rakib-asrar/RakibAsrarNav';
import { BookCard } from '../../components/rakib-asrar/BookCard';
import { BrandBridge } from '../../components/rakib-asrar/BrandBridge';
import { Link, useRouter, matchPath } from '../../lib/router';
import { getBookBySlug, getBooks } from '../../data/books';
import { Book } from '../../types/book';
import { SEO } from '../../components/common/SEO';
import { buildBookSchema } from '../../lib/structuredData';
import { trackEvent } from '../../lib/analytics';

export const BookDetailPage: React.FC = () => {
  const { path } = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Match /rakib-asrar/books/:slug
  const match = matchPath('/rakib-asrar/books/:slug', path);
  const slug = match.matches ? match.params.slug : '';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (slug) {
      Promise.all([
        getBookBySlug(slug),
        getBooks(),
      ]).then(([res, all]) => {
        if (isMounted) {
          setBook(res);
          if (res) {
            setRelatedBooks(all.filter((b) => b.id !== res.id));
            trackEvent('book_view', { slug: res.slug, title: res.title });
          } else {
            setRelatedBooks([]);
          }
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      setBook(null);
      setRelatedBooks([]);
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full flex-1 flex flex-col">
        <RakibAsrarNav />
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-bangla-sans">
            <div className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-ping" />
            <span>বইয়ের তথ্য লোড হচ্ছে...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="w-full flex-1 flex flex-col">
        <RakibAsrarNav />
        <Section spacing="xl" surface="canvas" className="flex-1 flex items-center justify-center">
          <Container size="md">
            <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-md mx-auto space-y-5 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)]">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <h1 className="font-bangla-serif text-2xl font-bold text-[var(--text-primary)]">
                  বইটি পাওয়া যায়নি
                </h1>
                <p className="font-bangla-sans text-xs text-[var(--text-secondary)]">
                  এই শিরোনামের কোনো বই বর্তমানে তালিকাভুক্ত নেই।
                </p>
              </div>

              <div className="pt-2">
                <Link to="/rakib-asrar/books">
                  <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    সকল বই দেখুন
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <article className="w-full flex-1 flex flex-col">
      <SEO
        title={`${book.title} — রাকিব আসরার | Book Details`}
        description={book.seo?.description || book.description || `${book.title} — রাকিব আসরারের গ্রন্থ`}
        canonicalPath={`/rakib-asrar/books/${book.slug}`}
        ogType="book"
        ogImage={book.coverImage}
        lang="bn"
        jsonLd={buildBookSchema(book)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'রাকিব আসরার', url: '/rakib-asrar' },
          { name: 'বইসমূহ', url: '/rakib-asrar/books' },
          { name: book.title, url: `/rakib-asrar/books/${book.slug}` },
        ]}
      />
      <RakibAsrarNav />

      {/* Breadcrumb Navigation */}
      <div className="w-full bg-[var(--bg-canvas)] border-b border-[var(--border-color)] py-3">
        <Container size="2xl">
          <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 text-xs font-bangla-sans">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-[var(--text-muted)] truncate">
              <li>
                <Link to="/rakib-asrar" className="hover:text-[var(--text-primary)] transition-colors">
                  রাকিব আসরার
                </Link>
              </li>
              <li aria-hidden="true" className="shrink-0 text-[var(--border-strong)]">/</li>
              <li>
                <Link to="/rakib-asrar/books" className="hover:text-[var(--text-primary)] transition-colors">
                  বইসমূহ
                </Link>
              </li>
              <li aria-hidden="true" className="shrink-0 text-[var(--border-strong)]">/</li>
              <li className="font-semibold text-[var(--text-primary)] truncate" aria-current="page">
                {book.title}
              </li>
            </ol>

            <Link
              to="/rakib-asrar/books"
              className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--color-brand)] transition-colors shrink-0 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>গ্রন্থতালিকা</span>
            </Link>
          </nav>
        </Container>
      </div>

      {/* Book Main Profile */}
      <header className="w-full py-10 sm:py-14 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <Container size="2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Book Cover */}
            <div className="md:col-span-5 lg:col-span-4 max-w-[300px] mx-auto md:mx-0 w-full">
              <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-md flex items-center justify-center text-center select-none">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="space-y-3 p-4">
                    <BookOpen className="w-12 h-12 mx-auto text-[var(--color-brand)]" aria-hidden="true" />
                    <p className="font-bangla-serif text-lg font-bold text-[var(--text-primary)]">
                      {book.title}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Book Metadata & Synopsis */}
            <div className="md:col-span-7 lg:col-span-8 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                {book.genre && (
                  <span className="font-bangla-sans font-semibold text-xs text-[var(--color-brand)] px-2.5 py-0.5 rounded-full bg-[var(--color-brand-subtle)] border border-[var(--color-brand-muted)]">
                    {book.genre}
                  </span>
                )}
                {book.publicationYear && (
                  <span className="text-xs font-bangla-sans text-[var(--text-muted)] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>অমর একুশে বইমেলা {book.publicationYear}</span>
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h1 className="font-bangla-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.2]">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="font-bangla-sans text-base sm:text-lg text-[var(--color-brand)] font-medium">
                    {book.subtitle}
                  </p>
                )}
                <p className="font-bangla-sans text-sm text-[var(--text-secondary)]">
                  লেখক: <strong className="text-[var(--text-primary)]">{book.author}</strong>
                </p>
              </div>

              {/* Price & Stock Display */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] max-w-md">
                {book.price && (
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bangla-sans text-[var(--text-muted)] uppercase block">নির্ধারিত মূল্য</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bangla-sans font-bold text-2xl text-[var(--text-primary)]">
                        ৳{book.price}
                      </span>
                      {book.originalPrice && (
                        <span className="line-through text-sm text-[var(--text-muted)] font-bangla-sans">
                          ৳{book.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="h-8 w-px bg-[var(--border-color)]" />

                <div className="space-y-0.5">
                  <span className="text-[11px] font-bangla-sans text-[var(--text-muted)] uppercase block">সংগ্রহের অবস্থা</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bangla-sans font-bold text-[var(--color-success)]">
                    <Check className="w-3.5 h-3.5" />
                    মুদ্রিত কপি স্টকে রয়েছে
                  </span>
                </div>
              </div>

              {/* Purchase Trigger (Rokomari Link) */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                {book.purchaseUrl && (
                  <a
                    href={book.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ExternalLink className="w-4 h-4" />}
                      className="bg-[#2196f3] hover:bg-[#1e88e5] text-white border-transparent"
                    >
                      রকমারি থেকে অর্ডার করুন
                    </Button>
                  </a>
                )}
              </div>

              {/* Publication Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 max-w-lg text-xs font-bangla-sans">
                {book.publisher && (
                  <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-0.5">
                    <span className="text-[10px] font-bangla-sans text-[var(--text-muted)] uppercase block">প্রকাশক</span>
                    <span className="font-bold text-[var(--text-primary)]">{book.publisher}</span>
                  </div>
                )}
                {book.pages && (
                  <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-0.5">
                    <span className="text-[10px] font-bangla-sans text-[var(--text-muted)] uppercase block">পৃষ্ঠা সংখ্যা</span>
                    <span className="font-bold text-[var(--text-primary)]">{book.pages} পৃষ্ঠা</span>
                  </div>
                )}
                <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-0.5">
                  <span className="text-[10px] font-bangla-sans text-[var(--text-muted)] uppercase block">ভাষা</span>
                  <span className="font-bold text-[var(--text-primary)]">বাংলা</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Book Synopsis & Details */}
      <Section spacing="xl" surface="canvas" borderBottom>
        <Container size="2xl">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <BookCheck className="w-5 h-5 text-[var(--color-brand)]" />
              <h2 className="font-bangla-serif text-2xl font-bold text-[var(--text-primary)]">
                বইয়ের সারাংশ ও প্রেক্ষাপট
              </h2>
            </div>

            <div className="space-y-4 font-bangla-serif text-base sm:text-lg leading-[1.95] text-[var(--text-secondary)]">
              {book.description?.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <Section spacing="lg" surface="subtle" borderBottom>
          <Container size="2xl">
            <div className="space-y-6">
              <h3 className="font-bangla-serif text-2xl font-bold text-[var(--text-primary)]">
                লেখকের অন্যান্য প্রকাশিত বই
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {relatedBooks.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      <BrandBridge />
    </article>
  );
};
