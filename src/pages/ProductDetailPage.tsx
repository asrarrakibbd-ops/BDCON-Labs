import React, { useEffect, useState } from 'react';
import { ArrowLeft, Compass, AlertCircle } from 'lucide-react';
import { ProductBreadcrumbs } from '../components/products/ProductBreadcrumbs';
import { ProductHero } from '../components/products/ProductHero';
import { ProductProblemSolution } from '../components/products/ProductProblemSolution';
import { ProductFeatures } from '../components/products/ProductFeatures';
import { ProductWhoIsItFor } from '../components/products/ProductWhoIsItFor';
import { ProductFAQ } from '../components/products/ProductFAQ';
import { ProductCTASection } from '../components/products/ProductCTASection';
import { RelatedProducts } from '../components/products/RelatedProducts';
import { Container } from '../components/layout/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Link, useRouter, matchPath } from '../lib/router';
import { getProductBySlug } from '../data/products';
import { Product } from '../types/product';
import { SEO } from '../components/common/SEO';
import { buildSoftwareApplicationSchema } from '../lib/structuredData';
import { trackEvent } from '../lib/analytics';

export const ProductDetailPage: React.FC = () => {
  const { path } = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Extract slug from URL pattern /products/:slug
  const match = matchPath('/products/:slug', path);
  const slug = match.matches ? match.params.slug : '';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (slug) {
      getProductBySlug(slug).then((res) => {
        if (isMounted) {
          setProduct(res);
          setLoading(false);

          if (res) {
            trackEvent('product_view', { slug: res.slug, name: res.name });
          }
        }
      });
    } else {
      setLoading(false);
      setProduct(null);
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-mono">
          <div className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-ping" />
          <span>Retrieving product specification...</span>
        </div>
      </div>
    );
  }

  // Error / Not Found State (Section 32)
  if (!product) {
    return (
      <Section spacing="xl" surface="canvas" className="flex-1 flex items-center justify-center">
        <Container size="md">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center max-w-md mx-auto space-y-5 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--color-brand)]">
              <Compass className="w-6 h-6" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="type-h3 text-[var(--text-primary)] font-bold">
                Product Not Found
              </h1>
              <p className="type-body-small text-[var(--text-secondary)]">
                The product requested (<code className="font-mono text-xs">{slug || path}</code>) does not exist in the BDCON Labs product directory.
              </p>
            </div>

            <div className="pt-2">
              <Link to="/products">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <article className="w-full flex-1 flex flex-col">
      <SEO
        title={product.metaTitle || `${product.name} — BDCON Labs`}
        description={product.metaDescription || product.shortDescription}
        canonicalPath={`/products/${product.slug}`}
        ogType="website"
        ogImage={product.screenshotUrl || product.logoUrl}
        jsonLd={buildSoftwareApplicationSchema(product)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: product.name, url: `/products/${product.slug}` },
        ]}
      />
      {/* Top Breadcrumb Bar */}
      <div className="w-full bg-[var(--bg-canvas)] border-b border-[var(--border-color)] py-3">
        <Container size="2xl">
          <ProductBreadcrumbs productName={product.name} />
        </Container>
      </div>

      {/* 1. Product Hero */}
      <ProductHero product={product} />

      {/* 2. Product Overview & Problem/Solution */}
      <ProductProblemSolution product={product} />

      {/* 3. Key Features / Specifications */}
      <ProductFeatures product={product} />

      {/* 4. Target Audience */}
      <ProductWhoIsItFor product={product} />

      {/* 5. Product FAQs */}
      <ProductFAQ product={product} />

      {/* 6. Product CTA Section */}
      <ProductCTASection product={product} />

      {/* 7. Optional Related Products */}
      <RelatedProducts currentProductSlug={product.slug} />
    </article>
  );
};
