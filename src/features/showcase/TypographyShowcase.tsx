import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';

export const TypographyShowcase: React.FC = () => {
  const typeScales = [
    {
      name: 'Display Heading',
      className: 'type-display',
      sample: 'Software That Solves Real Problems',
      meta: 'Fluid clamp(2.25rem, 5vw + 1rem, 3.75rem) · Bold · Tracking -0.035em',
    },
    {
      name: 'Heading 1 (H1)',
      className: 'type-h1',
      sample: 'Engineering Precision for Digital Products',
      meta: 'clamp(1.875rem, 3vw + 0.75rem, 2.5rem) · Bold · Tracking -0.025em',
    },
    {
      name: 'Heading 2 (H2)',
      className: 'type-h2',
      sample: 'Architecture Built for Long-Term Scalability',
      meta: 'clamp(1.5rem, 2vw + 0.5rem, 1.875rem) · Semibold · Tracking -0.02em',
    },
    {
      name: 'Heading 3 (H3)',
      className: 'type-h3',
      sample: 'Proprietary Software & Client Engineering',
      meta: 'clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem) · Semibold',
    },
    {
      name: 'Heading 4 (H4)',
      className: 'type-h4',
      sample: 'System Modules & Core Capabilities',
      meta: '1.125rem (18px) · Semibold',
    },
    {
      name: 'Body Large',
      className: 'type-body-large',
      sample: 'BDCON Labs builds software products and systems with an emphasis on engineering rigor, clean architecture, and practical utility.',
      meta: '1.125rem · 1.65 line-height · 400 Regular',
    },
    {
      name: 'Body Standard',
      className: 'type-body',
      sample: 'We design and engineer digital systems that deliver tangible outcomes for businesses, organizations, and end users.',
      meta: '1rem (16px) · 1.6 line-height · 400 Regular',
    },
    {
      name: 'Body Small',
      className: 'type-body-small',
      sample: 'Standardized interfaces, resilient database schemas, and accessible components built without unnecessary third-party bloat.',
      meta: '0.875rem (14px) · 1.5 line-height',
    },
    {
      name: 'Caption / Microcopy',
      className: 'type-caption',
      sample: 'LAST DEPLOYED // STAGE 1 ARCHITECTURE VERIFIED // 2026',
      meta: '0.75rem (12px) · Medium · Muted Text',
    },
    {
      name: 'Monospace & Tabular Numerals',
      className: 'type-mono text-sm text-[var(--text-secondary)]',
      sample: 'LATENCY: 42ms · 99.98% SUCCESS · ID: 8b7e-902c · $142,500.00',
      meta: 'JetBrains Mono · font-variant-numeric: tabular-nums',
    },
  ];

  return (
    <Card padded>
      <CardHeader>
        <CardTitle>Typography Scale &amp; Hierarchy System</CardTitle>
        <CardDescription>
          Engineered using Plus Jakarta Sans for UI and JetBrains Mono for tabular and code metrics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-[var(--border-color)]">
          {typeScales.map((item) => (
            <div key={item.name} className="py-5 first:pt-0 last:pb-0 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)] font-mono">
                  {item.name}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {item.meta}
                </span>
              </div>
              <div className={item.className}>
                {item.sample}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
