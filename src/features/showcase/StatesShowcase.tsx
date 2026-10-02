import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Button } from '../../components/ui/Button';

export const StatesShowcase: React.FC = () => {
  const [activeState, setActiveState] = useState<'empty' | 'loading' | 'error'>('empty');

  return (
    <Card padded>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>System Feedback &amp; Lifecycle States</CardTitle>
            <CardDescription>
              Standardized states for data collections, async transitions, and error recovery.
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
            <button
              type="button"
              onClick={() => setActiveState('empty')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeState === 'empty'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Empty State
            </button>
            <button
              type="button"
              onClick={() => setActiveState('loading')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeState === 'loading'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Loading State
            </button>
            <button
              type="button"
              onClick={() => setActiveState('error')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeState === 'error'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Error State
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[280px] flex items-center justify-center">
          {activeState === 'empty' && (
            <EmptyState
              title="No Products Configured"
              description="Stage 1 maintains clean architecture without fabricating dummy product records. Real software products will be registered in Stage 2."
              actionLabel="Refresh Status"
              onAction={() => alert('Empty state action triggered cleanly.')}
            />
          )}

          {activeState === 'loading' && (
            <LoadingState message="Fetching system schema and validating endpoints..." />
          )}

          {activeState === 'error' && (
            <ErrorState
              title="Unable to Sync Data Layer"
              description="A mock network anomaly occurred during data validation. Tap retry to re-establish the connection."
              onRetry={() => alert('Retry handler triggered cleanly.')}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
