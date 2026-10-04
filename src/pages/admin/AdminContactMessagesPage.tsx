// ==============================================================================
// BDCON Labs — Admin Contact Messages Management (/admin/messages)
// Stage 16B: Accessible, responsive inbound communication review & status triage
// ==============================================================================

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  MessageSquare, 
  Search, 
  X, 
  Eye, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Phone, 
  Trash2,
  Save,
  Loader2,
  Reply,
  Bell
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  getAdminContactMessages, 
  updateAdminContactMessage, 
  deleteAdminContactMessage, 
  ContactMessageRow 
} from '../../data/admin/contactMessages';
import { subscribeInquiryUpdates } from '../../lib/events/inquirySync';
import { Button } from '../../components/ui/Button';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';

export const AdminContactMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveToast, setLiveToast] = useState<string | null>(null);

  // Selected Message for detail modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageRow | null>(null);
  const [editStatus, setEditStatus] = useState<string>('new');
  const [isSaving, setIsSaving] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Deletion modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal accessibility refs
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const pageSize = 15;

  const loadMessages = useCallback(async (showSpinner = true) => {
    try {
      if (showSpinner) setLoading(true);
      setError(null);
      const res = await getAdminContactMessages({
        page,
        pageSize,
        status: statusFilter,
        search: searchQuery,
      });
      setMessages(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err?.message || 'Failed to load contact messages.');
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, [page, statusFilter, searchQuery]);

  useEffect(() => {
    document.title = 'Contact Messages — BDCON Labs Admin';
    loadMessages(true);
  }, [loadMessages]);

  // Real-time synchronization subscription and auto-poll
  useEffect(() => {
    const unsubscribe = subscribeInquiryUpdates((event) => {
      // Instantly reload messages list when any inquiry event occurs
      loadMessages(false);
      if (event.type === 'contact') {
        const sender = event.data?.name ? `from ${event.data.name}` : '';
        setLiveToast(`🔔 New contact message received ${sender}!`);
        setTimeout(() => setLiveToast(null), 6000);
      }
    });

    // 5-second background poll when tab is visible
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        loadMessages(false);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadMessages]);

  // Modal keyboard and focus management
  useEffect(() => {
    if (selectedMessage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleCloseDetail();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]'
          );
          if (focusable.length === 0) return;

          const firstEl = focusable[0];
          const lastEl = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedMessage]);

  const handleOpenDetail = (msg: ContactMessageRow, e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      triggerRef.current = e.currentTarget as HTMLElement;
    }
    setSelectedMessage(msg);
    setEditStatus(msg.status);
    setActionNotice(null);

    // If opening a 'new' message, automatically mark as 'read'
    if (msg.status === 'new') {
      updateAdminContactMessage(msg.id, { status: 'read' }).then(() => {
        setEditStatus('read');
        loadMessages();
      });
    }
  };

  const handleCloseDetail = () => {
    setSelectedMessage(null);
    triggerRef.current?.focus();
  };

  const handleSaveStatus = async () => {
    if (!selectedMessage) return;
    setIsSaving(true);
    setActionNotice(null);

    const res = await updateAdminContactMessage(selectedMessage.id, {
      status: editStatus,
    });

    setIsSaving(false);
    if (res.success) {
      setActionNotice('Status updated successfully.');
      setSelectedMessage({
        ...selectedMessage,
        status: editStatus as ContactMessageRow['status'],
      });
      loadMessages();
    } else {
      setActionNotice(`Error: ${res.error || 'Failed to update message'}`);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);

    const res = await deleteAdminContactMessage(deleteTargetId);
    setIsDeleting(false);

    if (res.success) {
      if (selectedMessage?.id === deleteTargetId) {
        setSelectedMessage(null);
      }
      setDeleteTargetId(null);
      loadMessages();
    } else {
      setActionNotice(`Deletion failed: ${res.error}`);
      setDeleteTargetId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">NEW</span>;
      case 'read':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">READ</span>;
      case 'replied':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">REPLIED</span>;
      case 'archived':
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">{status}</span>;
    }
  };

  const statuses = [
    { label: 'All Statuses', value: 'all' },
    { label: 'New', value: 'new' },
    { label: 'Read', value: 'read' },
    { label: 'Replied', value: 'replied' },
    { label: 'Archived', value: 'archived' },
  ];

  return (
    <AdminLayout
      title="Contact Messages"
      subtitle="Inbound inquiries and communications received via the public /contact form."
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Contact Messages' }]}
    >
      <div className="space-y-6">
        {/* Real-time Toast Notification */}
        {liveToast && (
          <div 
            role="status"
            className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-emerald-500 shrink-0 animate-bounce" aria-hidden="true" />
              <span>{liveToast}</span>
            </div>
            <button 
              onClick={() => setLiveToast(null)} 
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Live Status Sub-header */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">
              Live Sync Active
            </span>
            <span className="text-[var(--text-muted)] text-[11px] hidden sm:inline">
              · Incoming messages appear instantly
            </span>
          </div>
          <span className="text-[var(--text-muted)] text-[11px]">
            Total: {total} {total === 1 ? 'message' : 'messages'}
          </span>
        </div>

        {/* Controls Toolbar: Search, Status Filter & Refresh */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by name, email, subject, content..."
              value={searchQuery}
              aria-label="Search contact messages"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] transition-colors font-mono min-h-[44px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Status Filter & Refresh */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <label htmlFor="msg-status-filter" className="sr-only">
                Filter by Status
              </label>
              <select
                id="msg-status-filter"
                value={statusFilter}
                aria-label="Filter contact messages by status"
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] min-h-[44px]"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => loadMessages(true)}
              disabled={loading}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
              className="min-h-[44px] shrink-0"
              aria-label="Refresh contact messages list"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Data Container: Responsive Cards on Mobile + Table on Desktop */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading contact messages...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center space-y-3" role="alert">
              <AlertCircle className="w-8 h-8 text-[var(--color-error)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-secondary)]">{error}</p>
              <Button variant="outline" size="sm" onClick={() => loadMessages(true)} className="min-h-[44px]">
                Try Again
              </Button>
            </div>
          ) : messages.length > 0 ? (
            <>
              {/* Mobile Card List (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className="p-4 space-y-3 hover:bg-[var(--bg-surface-subtle)]/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <span className="font-semibold text-sm text-[var(--text-primary)] block truncate">
                          {msg.name}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-mono block break-all">
                          {msg.email}
                        </span>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(msg.status)}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface-subtle)] space-y-1 text-xs font-mono text-[var(--text-secondary)]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Subject:</span>
                        <span className="font-semibold text-right truncate max-w-[200px]">{msg.subject}</span>
                      </div>
                      {msg.phone && (
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Phone:</span>
                          <span>{msg.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                        <span>Received:</span>
                        <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => handleOpenDetail(msg, e)}
                        leftIcon={<Eye className="w-3.5 h-3.5" aria-hidden="true" />}
                        className="flex-1 min-h-[44px]"
                        aria-label={`Read and respond to message from ${msg.name}`}
                      >
                        Read Message
                      </Button>

                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(msg.id)}
                        className="p-2.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--color-error)] hover:border-[var(--color-error-border)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-error)]"
                        aria-label={`Delete message from ${msg.name}`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table (>= 768px) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-[10px] font-mono uppercase text-[var(--text-muted)] font-semibold">
                    <tr>
                      <th scope="col" className="py-3 px-4">Status</th>
                      <th scope="col" className="py-3 px-4">Sender</th>
                      <th scope="col" className="py-3 px-4">Subject</th>
                      <th scope="col" className="py-3 px-4">Preview</th>
                      <th scope="col" className="py-3 px-4">Date</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {messages.map((msg) => (
                      <tr 
                        key={msg.id} 
                        className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors cursor-pointer group"
                        onClick={(e) => handleOpenDetail(msg, e)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenDetail(msg, e);
                          }
                        }}
                        aria-label={`Contact message from ${msg.name}: ${msg.subject}`}
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          {getStatusBadge(msg.status)}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <p className="font-semibold text-[var(--text-primary)]">{msg.name}</p>
                          <p className="text-[11px] text-[var(--text-muted)] font-mono break-all">{msg.email}</p>
                        </td>
                        <td className="py-3 px-4 font-medium text-[var(--text-primary)] max-w-xs truncate">
                          {msg.subject}
                        </td>
                        <td className="py-3 px-4 text-[var(--text-muted)] max-w-sm truncate">
                          {msg.message}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-[11px] font-mono text-[var(--text-muted)]">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => handleOpenDetail(msg, e)}
                              className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                              aria-label={`Inspect message from ${msg.name}`}
                              title="Inspect Message"
                            >
                              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTargetId(msg.id)}
                              className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-error-border)] text-[var(--text-muted)] hover:text-[var(--color-error)] min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-error)]"
                              aria-label={`Delete message from ${msg.name}`}
                              title="Delete Message"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="py-16 text-center space-y-2 p-4">
              <MessageSquare className="w-8 h-8 mx-auto text-[var(--text-muted)] opacity-50" aria-hidden="true" />
              <h3 className="text-sm font-mono font-bold text-[var(--text-primary)]">
                No contact messages found
              </h3>
              <p className="text-xs font-mono text-[var(--text-secondary)] max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'all'
                  ? 'No messages matched your search query or status filter.'
                  : 'New inquiries sent via the public /contact form will be displayed here.'}
              </p>
            </div>
          )}

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-3.5 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
              <span>
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} messages
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  leftIcon={<ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />}
                  className="min-h-[44px]"
                  aria-label="Previous page"
                >
                  Prev
                </Button>
                <span className="px-2 font-semibold text-[var(--text-primary)]">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
                  className="min-h-[44px]"
                  aria-label="Next page"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* Message Detail & Response Drawer */}
        {/* -------------------------------------------------------------------- */}
        {selectedMessage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-modal-title"
          >
            <div 
              className="fixed inset-0"
              onClick={handleCloseDetail}
              aria-hidden="true"
            />

            <div 
              ref={modalRef}
              className="relative w-full max-w-2xl max-h-[92vh] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-surface-subtle)] gap-2">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 id="message-modal-title" className="font-mono text-base font-bold text-[var(--text-primary)] break-words">
                      {selectedMessage.subject}
                    </h3>
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    Received on {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] shrink-0"
                  aria-label="Close contact message details modal"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-6 overflow-y-auto text-xs font-mono">
                {/* Notice banner */}
                {actionNotice && (
                  <div 
                    role="status"
                    className="p-3 rounded-lg border border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{actionNotice}</span>
                  </div>
                )}

                {/* Sender Contact Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)]">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">Sender</span>
                    <span className="font-semibold text-sm text-[var(--text-primary)] font-sans break-words">
                      {selectedMessage.name}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">Email</span>
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`} className="text-[var(--color-brand)] font-semibold hover:underline inline-flex items-center gap-1 break-all min-h-[24px]">
                      <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{selectedMessage.email}</span>
                    </a>
                  </div>

                  {selectedMessage.phone && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase">Phone</span>
                      <span className="text-[var(--text-primary)] font-semibold inline-flex items-center gap-1 break-words">
                        <Phone className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
                        <span>{selectedMessage.phone}</span>
                      </span>
                    </div>
                  )}

                  {selectedMessage.replied_at && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase">Replied Timestamp</span>
                      <span className="text-emerald-500 font-semibold">
                        {new Date(selectedMessage.replied_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Full Message Text */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-bold text-[var(--text-muted)] block">
                    MESSAGE CONTENT:
                  </span>
                  <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans text-sm leading-relaxed whitespace-pre-wrap break-words select-text">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Status Triage Controls */}
                <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                  <span className="text-[11px] uppercase font-bold text-[var(--color-brand)] block">
                    STATUS MANAGEMENT
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <label htmlFor="edit-msg-status" className="text-xs font-semibold text-[var(--text-primary)]">
                      Current Status:
                    </label>
                    <select
                      id="edit-msg-status"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="px-3.5 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] min-h-[44px]"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isSaving || editStatus === selectedMessage.status}
                      onClick={handleSaveStatus}
                      leftIcon={isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> : <Save className="w-3.5 h-3.5" aria-hidden="true" />}
                      className="min-h-[44px]"
                    >
                      Update Status
                    </Button>

                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--color-brand)] text-white text-xs font-semibold hover:opacity-90 transition-opacity ml-auto min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                    >
                      <Reply className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Reply via Email Client</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-subtle)] flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTargetId(selectedMessage.id)}
                  leftIcon={<Trash2 className="w-4 h-4 text-[var(--color-error)]" aria-hidden="true" />}
                  className="text-xs text-[var(--color-error)] hover:bg-[var(--color-error-subtle)] min-h-[44px]"
                  aria-label="Delete this contact message"
                >
                  Delete Message
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseDetail}
                  className="min-h-[44px]"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Accessible Deletion Confirmation Dialog */}
        <AdminConfirmModal
          isOpen={!!deleteTargetId}
          title="Delete Contact Message?"
          description="Are you sure you want to permanently delete this message inquiry? This action cannot be undone and will permanently remove this record from the database."
          confirmLabel="Permanently Delete"
          cancelLabel="Cancel"
          isDestructive={true}
          isLoading={isDeleting}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTargetId(null)}
        />
      </div>
    </AdminLayout>
  );
};
