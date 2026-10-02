import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

export interface AdminConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AdminConfirmModal: React.FC<AdminConfirmModalProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus cancel button for safe keyboard default
    cancelButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex="0"]'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
    >
      <div
        className="fixed inset-0"
        onClick={() => !isLoading && onCancel()}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl space-y-5 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDestructive
                ? 'bg-[var(--color-error-subtle)] text-[var(--color-error)] border border-[var(--color-error-border)]'
                : 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand-muted)]'
            }`}
            aria-hidden="true"
          >
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <h3
              id="confirm-modal-title"
              className="text-base font-bold font-mono text-[var(--text-primary)]"
            >
              {title}
            </h3>
            <p
              id="confirm-modal-desc"
              className="text-xs text-[var(--text-secondary)] leading-relaxed"
            >
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            ref={cancelButtonRef}
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={onCancel}
            className="min-h-[44px] px-4"
          >
            {cancelLabel}
          </Button>

          <Button
            variant={isDestructive ? 'primary' : 'primary'}
            size="sm"
            disabled={isLoading}
            onClick={onConfirm}
            leftIcon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
            className={`min-h-[44px] px-4 ${
              isDestructive
                ? '!bg-[var(--color-error)] hover:!bg-[var(--color-error)]/90 text-white'
                : ''
            }`}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
