import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to standard developer console in dev environment
    console.error('Unhandled application exception caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-canvas)] text-[var(--text-primary)]">
          <div className="max-w-md w-full p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center shadow-lg space-y-6">
            <div className="w-14 h-14 mx-auto rounded-xl bg-[var(--color-error-subtle)] border border-[var(--color-error-border)] flex items-center justify-center text-[var(--color-error)]">
              <AlertCircle className="w-7 h-7" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="type-h3 text-[var(--text-primary)] font-bold">
                System Recovered from Anomaly
              </h1>
              <p className="type-body-small text-[var(--text-secondary)]">
                The interface encountered an unexpected state. Our application shell prevented system collapse.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={this.handleReload}
                leftIcon={<RefreshCw className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Refresh View
              </Button>
              <Button
                variant="outline"
                onClick={this.handleReset}
                leftIcon={<Home className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Return to Hub
              </Button>
            </div>

            <p className="type-caption text-[var(--text-muted)] text-[11px]">
              BDCON Labs Global Fault-Tolerant Shell
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
