import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, X, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { ProductCard } from '../components/products/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { getProducts } from '../data/products';
import { Product } from '../types/product';
import { useTranslation } from '../hooks/useTranslation';
import { SEO } from '../components/common/SEO';

export const ProductsPage: React.FC = () => {
  const { t, isBangla } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err?.message || (isBangla ? 'প্রোডাক্টসমূহ লোড করা সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : 'We could not load products right now. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, [isBangla]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Sync document title and meta description
  useEffect(() => {
    document.title = isBangla ? 'সফটওয়্যার প্রোডাক্টস — BDCON Labs' : 'Products — BDCON Labs';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        isBangla
          ? 'পেশাজীবী ও ব্যবসা প্রতিষ্ঠানের জন্য BDCON Labs-এর তৈরি নির্ভরযোগ্য সফটওয়্যার প্রোডাক্টসমূহ।'
          : 'Explore software products created by BDCON Labs for professionals, businesses and organizations.'
      );
    }
  }, [isBangla]);

  // Compute unique categories dynamically from products
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && product.status !== selectedStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        return matchesName || matchesCategory || matchesDesc;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedStatus !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <SEO
        title="Software Products — BDCON Labs"
        description="Catalog of proprietary software products and digital tools built by BDCON Labs, including BuildEst BD."
        canonicalPath="/products"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
        ]}
      />
      {/* 1. Page Header */}
      <PageHeader
        eyebrow={isBangla ? 'আমাদের প্রোডাক্টস' : 'PRODUCT CATALOGUE'}
        title={isBangla ? 'সফটওয়্যার প্রোডাক্টস' : 'Software Products'}
        description={
          isBangla
            ? 'বাস্তব সমস্যা সমাধান ও দৈনন্দিন কাজের প্রক্রিয়া সহজ করতে BDCON Labs-এর তৈরি বিশেষায়িত সফটওয়্যার ও ডিজিটাল টুলস।'
            : 'Proprietary software products and specialized digital tools engineered by BDCON Labs to solve practical domain problems.'
        }
        borderBottom
      />

      {/* 2. Filter & Search Toolbar */}
      <Section spacing="sm" surface="canvas" borderBottom className="py-4">
        <Container size="2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder={isBangla ? 'নাম বা ক্যাটাগরি দিয়ে সার্চ করুন...' : 'Search products by title, problem, or category...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className={`flex items-center gap-1.5 text-[var(--text-muted)] mr-1 ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                <Filter className="w-3.5 h-3.5" />
                <span>{isBangla ? 'ক্যাটাগরি:' : 'Category:'}</span>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[var(--color-brand)] text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isBangla ? 'সব ক্যাটাগরি' : 'All Categories'}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[var(--color-brand)] text-white'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Reset filter button if active */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  leftIcon={<X className="w-3.5 h-3.5" />}
                  className="text-xs text-[var(--text-muted)]"
                >
                  {isBangla ? 'রিসেট' : 'Reset'}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Products Grid Section */}
      <Section spacing="lg" surface="canvas" className="flex-1">
        <Container size="2xl">
          {loading ? (
            /* Loading Skeleton State */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]" />
              ))}
            </div>
          ) : error ? (
            /* Error State with Retry */
            <div className="p-8 sm:p-12 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
              <AlertCircle className="w-10 h-10 text-[var(--color-brand)] mx-auto opacity-80" />
              <div className="space-y-1">
                <h3 className="type-h3 text-[var(--text-primary)] font-bold">
                  {isBangla ? 'প্রোডাক্ট তালিকা লোড করা যায়নি' : 'Unable to load products'}
                </h3>
                <p className="type-body-small text-[var(--text-secondary)]">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchProducts} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                {isBangla ? 'পুনরায় চেষ্টা করুন' : 'Try again'}
              </Button>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-6">
              {/* Active count meta */}
              <div className={`flex items-center justify-between text-xs text-[var(--text-muted)] ${isBangla ? 'font-bangla-sans' : 'font-mono'}`}>
                <span>
                  {isBangla ? `মোট ${filteredProducts.length}টি প্রোডাক্ট প্রদর্শিত হচ্ছে` : `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`}
                </span>
                <span>{isBangla ? 'BDCON Labs সফটওয়্যার ক্যাটালগ' : 'BDCON Labs Proprietary Catalog'}</span>
              </div>

              {/* Responsive Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : hasActiveFilters ? (
            /* Empty Search Results State */
            <EmptyState
              title={isBangla ? 'কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি' : 'No products matched your criteria'}
              description={isBangla ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ বা ক্যাটাগরি দিয়ে চেষ্টা করুন।' : 'Try adjusting your keyword query or resetting active category filters.'}
              actionLabel={isBangla ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}
              onAction={resetFilters}
            />
          ) : (
            /* Genuine Empty Catalogue State (Requirement 25) */
            <EmptyState
              title={isBangla ? 'শীঘ্রই নতুন প্রোডাক্ট যুক্ত হবে' : 'Products will appear here as they are released.'}
              description={isBangla ? 'BDCON Labs-এর নতুন সফটওয়্যার প্রোডাক্টের ডেভেলপমেন্ট সম্পন্ন হলে এখানে তালিকাভুক্ত করা হবে।' : 'New BDCON Labs software products will be listed here as development milestones are completed.'}
            />
          )}
        </Container>
      </Section>
    </div>
  );
};
