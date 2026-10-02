import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { ThemeToggle } from '../../components/navigation/ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

export const TokenShowcase: React.FC = () => {
  const { resolvedTheme, theme } = useTheme();

  const colorGroups = [
    {
      group: 'Surfaces & Canvas',
      tokens: [
        { name: 'bg-canvas', cssVar: '--bg-canvas', desc: 'Main viewport neutral backdrop' },
        { name: 'bg-surface', cssVar: '--bg-surface', desc: 'Card and container background' },
        { name: 'bg-surface-elevated', cssVar: '--bg-surface-elevated', desc: 'Modals and floating menus' },
        { name: 'bg-surface-subtle', cssVar: '--bg-surface-subtle', desc: 'Muted wells and input backdrops' },
      ],
    },
    {
      group: 'Typography Text',
      tokens: [
        { name: 'text-primary', cssVar: '--text-primary', desc: 'High-contrast headings & primary body' },
        { name: 'text-secondary', cssVar: '--text-secondary', desc: 'Readable prose & supporting content' },
        { name: 'text-muted', cssVar: '--text-muted', desc: 'Quiet captions & metadata' },
      ],
    },
    {
      group: 'Brand & Technical Accents',
      tokens: [
        { name: 'color-brand', cssVar: '--color-brand', desc: 'Primary precision brand blue' },
        { name: 'color-brand-hover', cssVar: '--color-brand-hover', desc: 'Interactive hover state' },
        { name: 'color-accent', cssVar: '--color-accent', desc: 'Technical cyan accent' },
        { name: 'border-color', cssVar: '--border-color', desc: 'Hairline structural dividing line' },
      ],
    },
    {
      group: 'Semantic Feedback States',
      tokens: [
        { name: 'color-success', cssVar: '--color-success', desc: 'Positive validation & active status' },
        { name: 'color-warning', cssVar: '--color-warning', desc: 'Attention & architectural caution' },
        { name: 'color-error', cssVar: '--color-error', desc: 'Critical errors & invalid fields' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div>
          <h4 className="type-h4 text-[var(--text-primary)]">
            Semantic Color Token System
          </h4>
          <p className="type-body-small text-[var(--text-secondary)]">
            Active Theme: <span className="font-mono font-semibold capitalize text-[var(--color-brand)]">{theme}</span> (Resolves to <span className="font-mono font-semibold capitalize">{resolvedTheme}</span>)
          </p>
        </div>
        <ThemeToggle variant="segmented" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colorGroups.map((grp) => (
          <Card key={grp.group} padded>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">{grp.group}</CardTitle>
              <CardDescription>Variables adapt dynamically based on dark/light mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {grp.tokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-md border border-[var(--border-color)] shadow-2xs shrink-0"
                        style={{ backgroundColor: `var(${token.cssVar})` }}
                      />
                      <div>
                        <div className="font-mono font-semibold text-[var(--text-primary)]">
                          var({token.cssVar})
                        </div>
                        <div className="text-[var(--text-muted)] text-[11px]">
                          {token.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
