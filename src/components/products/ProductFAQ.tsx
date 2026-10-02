import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../ui/Section';
import { Product } from '../../types/product';
import { cn } from '../../lib/utils';

export interface ProductFAQProps {
  product: Product;
}

export const ProductFAQ: React.FC<ProductFAQProps> = ({ product }) => {
  const faqs = product.faqs;
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    // Open the first item by default if available
    return faqs && faqs.length > 0 ? { [faqs[0].id]: true } : {};
  });

  if (!faqs || faqs.length === 0) return null;

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Section spacing="lg" surface="subtle" borderBottom id="faq-section">
      <Container size="2xl">
        <div className="max-w-3xl space-y-8 mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 text-[var(--color-brand)]">
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span className="type-caption font-semibold tracking-wider uppercase font-mono">
                QUESTIONS &amp; ANSWERS
              </span>
            </div>
            <h2 className="type-h2 text-[var(--text-primary)] font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              Common questions regarding {product.name}&apos;s architecture, capabilities, and availability.
            </p>
          </div>

          {/* Accordion Stack */}
          <div className="space-y-3" role="region" aria-label={`${product.name} FAQs`}>
            {faqs.map((faq) => {
              const isOpen = Boolean(openIds[faq.id]);
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--color-brand)] transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ml-4',
                        isOpen && 'transform rotate-180 text-[var(--color-brand)]'
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-5 pb-5 pt-1 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/60 animate-in fade-in duration-150"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
