// ==============================================================================
// BDCON Labs — Admin Project Requests Management (/admin/project-requests)
// Stage 16B: Accessible, responsive intake review, status triage & notes
// ==============================================================================

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ClipboardList, 
  Search, 
  X, 
  Eye, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Mail, 
  Phone, 
  Building2, 
  Trash2,
  Save,
  Loader2,
  ArrowRight,
  Bell
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  getAdminProjectRequests, 
  updateAdminProjectRequest, 
  deleteAdminProjectRequest, 
  ProjectRequestRow 
} from '../../data/admin/projectRequests';
import { subscribeInquiryUpdates } from '../../lib/events/inquirySync';
import { Button } from '../../components/ui/Button';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';

export const AdminProjectRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<ProjectRequestRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveToast, setLiveToast] = useState<string | null>(null);

  // Selected Request for detail modal
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequestRow | null>(null);
  const [editStatus, setEditStatus] = useState<string>('new');
  const [editNotes, setEditNotes] = useState<string>('');
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

  const loadRequests = useCallback(async (showSpinner = true) => {
    try {
      if (showSpinner) setLoading(true);
      setError(null);
      const res = await getAdminProjectRequests({
        page,
        pageSize,
        status: statusFilter,
        search: searchQuery,
      });
      setRequests(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err?.message || 'Failed to load project requests.');
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, [page, statusFilter, searchQuery]);

  useEffect(() => {
    document.title = 'Project Requests — BDCON Labs Admin';
    loadRequests(true);
  }, [loadRequests]);

  // Real-time synchronization subscription and auto-poll
  useEffect(() => {
    const unsubscribe = subscribeInquiryUpdates((event) => {
      // Instantly reload project requests list when any inquiry event occurs
      loadRequests(false);
      if (event.type === 'project') {
        const sender = event.data?.name ? `from ${event.data.name}` : '';
        setLiveToast(`🔔 New project request received ${sender}!`);
        setTimeout(() => setLiveToast(null), 6000);
      }
    });

    // 5-second background poll when tab is visible
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        loadRequests(false);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadRequests]);

  // Modal keyboard and focus management
  useEffect(() => {
    if (selectedRequest) {
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
  }, [selectedRequest]);

  const handleOpenDetail = (req: ProjectRequestRow, e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      triggerRef.current = e.currentTarget as HTMLElement;
    }
    setSelectedRequest(req);
    setEditStatus(req.status);
    setEditNotes(req.admin_notes || '');
    setActionNotice(null);
  };

  const handleCloseDetail = () => {
    setSelectedRequest(null);
    triggerRef.current?.focus();
  };

  const handleSaveDetails = async () => {
    if (!selectedRequest) return;
    setIsSaving(true);
    setActionNotice(null);

    const res = await updateAdminProjectRequest(selectedRequest.id, {
      status: editStatus,
      admin_notes: editNotes.trim() || null,
    });

    setIsSaving(false);
    if (res.success) {
      setActionNotice('Status and notes updated successfully.');
      setSelectedRequest({
        ...selectedRequest,
        status: editStatus as ProjectRequestRow['status'],
        admin_notes: editNotes.trim() || null,
      });
      loadRequests();
    } else {
      setActionNotice(`Error: ${res.error || 'Failed to update request'}`);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);

    const res = await deleteAdminProjectRequest(deleteTargetId);
    setIsDeleting(false);

    if (res.success) {
      if (selectedRequest?.id === deleteTargetId) {
        setSelectedRequest(null);
      }
      setDeleteTargetId(null);
      loadRequests();
    } else {
      setActionNotice(`Deletion failed: ${res.error}`);
      setDeleteTargetId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">NEW</span>;
      case 'reviewing':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">REVIEWING</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">CONTACTED</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">IN PROGRESS</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">COMPLETED</span>;
      case 'archived':
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">{status}</span>;
    }
  };

  const statuses = [
    { label: 'All Statuses', value: 'all' },
    { label: 'New', value: 'new' },
    { label: 'Reviewing', value: 'reviewing' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Archived', value: 'archived' },
  ];

  return (
    <AdminLayout
      title="Project Requests"
      subtitle="Client specifications submitted via the public /start-project inquiry engine."
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Project Requests' }]}
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
              · Incoming project requests appear instantly
            </span>
          </div>
          <span className="text-[var(--text-muted)] text-[11px]">
            Total: {total} {total === 1 ? 'request' : 'requests'}
          </span>
        </div>

        {/* Controls Toolbar: Search, Status Filter & Refresh */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by client, email, company, description..."
              value={searchQuery}
              aria-label="Search project requests"
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
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Status Filter & Refresh */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <label htmlFor="status-filter-select" className="sr-only">
                Filter by Status
              </label>
              <select
                id="status-filter-select"
                value={statusFilter}
                aria-label="Filter project requests by workflow status"
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
              onClick={() => loadRequests(true)}
              disabled={loading}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
              className="min-h-[44px] shrink-0"
              aria-label="Refresh project requests list"
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
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading project requests...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center space-y-3" role="alert">
              <AlertCircle className="w-8 h-8 text-[var(--color-error)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-secondary)]">{error}</p>
              <Button variant="outline" size="sm" onClick={() => loadRequests(true)} className="min-h-[44px]">
                Try Again
              </Button>
            </div>
          ) : requests.length > 0 ? (
            <>
              {/* Mobile Card List (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {requests.map((req) => (
                  <div 
                    key={req.id} 
                    className="p-4 space-y-3 hover:bg-[var(--bg-surface-subtle)]/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <span className="font-semibold text-sm text-[var(--text-primary)] block truncate">
                          {req.name}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-mono block break-all">
                          {req.email}
                        </span>
                        {req.company && (
                          <span className="text-[11px] text-[var(--color-brand)] font-mono block truncate">
                            {req.company}
                          </span>
                        )}
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(req.status)}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface-subtle)] space-y-1 text-xs font-mono text-[var(--text-secondary)]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Scope:</span>
                        <span className="font-semibold text-right">{req.project_scope}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Budget:</span>
                        <span>{req.budget_range} ({req.timeline})</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                        <span>Submitted:</span>
                        <span>{new Date(req.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {req.project_description}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => handleOpenDetail(req, e)}
                        leftIcon={<Eye className="w-3.5 h-3.5" aria-hidden="true" />}
                        className="flex-1 min-h-[44px]"
                        aria-label={`View full specifications for request from ${req.name}`}
                      >
                        Inspect Details
                      </Button>

                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(req.id)}
                        className="p-2.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--color-error)] hover:border-[var(--color-error-border)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-error)]"
                        aria-label={`Delete project request from ${req.name}`}
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
                      <th scope="col" className="py-3 px-4">Client</th>
                      <th scope="col" className="py-3 px-4">Project Type</th>
                      <th scope="col" className="py-3 px-4">Budget &amp; Timeline</th>
                      <th scope="col" className="py-3 px-4">Date</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {requests.map((req) => (
                      <tr 
                        key={req.id} 
                        className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors cursor-pointer group"
                        onClick={(e) => handleOpenDetail(req, e)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenDetail(req, e);
                          }
                        }}
                        aria-label={`Project request from ${req.name}, status ${req.status}`}
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          {getStatusBadge(req.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-0.5">
                            <p className="font-semibold text-[var(--text-primary)]">{req.name}</p>
                            <p className="text-[11px] text-[var(--text-muted)] font-mono break-all">{req.email}</p>
                            {req.company && (
                              <p className="text-[10px] text-[var(--color-brand)] font-mono">{req.company}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-[var(--text-secondary)]">
                          {req.project_scope}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[var(--text-secondary)] whitespace-nowrap">
                          <div>{req.budget_range}</div>
                          <div className="text-[10px] text-[var(--text-muted)]">{req.timeline}</div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-[11px] font-mono text-[var(--text-muted)]">
                          {new Date(req.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => handleOpenDetail(req, e)}
                              className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                              aria-label={`View full specifications for request from ${req.name}`}
                              title="View Full Specifications"
                            >
                              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTargetId(req.id)}
                              className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-error-border)] text-[var(--text-muted)] hover:text-[var(--color-error)] min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-error)]"
                              aria-label={`Delete project request from ${req.name}`}
                              title="Delete Request"
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
              <ClipboardList className="w-8 h-8 mx-auto text-[var(--text-muted)] opacity-50" aria-hidden="true" />
              <h3 className="text-sm font-mono font-bold text-[var(--text-primary)]">
                No project requests found
              </h3>
              <p className="text-xs font-mono text-[var(--text-secondary)] max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'all'
                  ? 'No submissions matched your search or status filter.'
                  : 'New client project specifications submitted via /start-project will appear here.'}
              </p>
            </div>
          )}

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-3.5 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
              <span>
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} requests
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
        {/* Detail & Status Management Modal Drawer */}
        {/* -------------------------------------------------------------------- */}
        {selectedRequest && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-modal-title"
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
                    <h3 id="request-modal-title" className="font-mono text-base font-bold text-[var(--text-primary)] truncate">
                      {selectedRequest.name}
                    </h3>
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    Submitted on {new Date(selectedRequest.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] shrink-0"
                  aria-label="Close project request details modal"
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

                {/* Client Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)]">
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase">Email</span>
                      <a href={`mailto:${selectedRequest.email}`} className="text-[var(--text-primary)] font-semibold hover:underline break-all">
                        {selectedRequest.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase">Phone / WhatsApp</span>
                      <span className="text-[var(--text-primary)] font-semibold break-words">
                        {selectedRequest.phone || 'Not provided'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase">Organization</span>
                      <span className="text-[var(--text-primary)] font-semibold break-words">
                        {selectedRequest.company || 'Not provided'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase">Scope &amp; Budget</span>
                      <span className="text-[var(--text-primary)] font-semibold break-words">
                        {selectedRequest.budget_range} ({selectedRequest.timeline})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-bold text-[var(--text-muted)] block">
                    PROJECT DESCRIPTION &amp; REQUIREMENTS:
                  </span>
                  <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans text-sm leading-relaxed whitespace-pre-wrap break-words select-text">
                    {selectedRequest.project_description}
                  </div>
                </div>

                {/* Administrative Triage Controls */}
                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                  <span className="text-[11px] uppercase font-bold text-[var(--color-brand)] block">
                    ADMINISTRATIVE TRIAGE
                  </span>

                  <div className="space-y-1.5">
                    <label htmlFor="edit-status-select" className="text-xs font-semibold text-[var(--text-primary)] block">
                      Workflow Status:
                    </label>
                    <select
                      id="edit-status-select"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] min-h-[44px]"
                    >
                      <option value="new">New (Needs evaluation)</option>
                      <option value="reviewing">Reviewing (Technical scoping)</option>
                      <option value="contacted">Contacted (Communication ongoing)</option>
                      <option value="in_progress">In Progress (Active contract)</option>
                      <option value="completed">Completed (Delivered)</option>
                      <option value="archived">Archived (Closed / Stale)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="edit-notes-input" className="text-xs font-semibold text-[var(--text-primary)] block">
                      Internal Admin Notes (Private):
                    </label>
                    <textarea
                      id="edit-notes-input"
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add private technical evaluation notes, estimated effort, or assignee remarks..."
                      className="w-full p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-canvas)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)] resize-y min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-subtle)] flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTargetId(selectedRequest.id)}
                  leftIcon={<Trash2 className="w-4 h-4 text-[var(--color-error)]" aria-hidden="true" />}
                  className="text-xs text-[var(--color-error)] hover:bg-[var(--color-error-subtle)] min-h-[44px]"
                  aria-label="Delete this project request record"
                >
                  Delete Record
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCloseDetail}
                    className="min-h-[44px]"
                  >
                    Close
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isSaving}
                    onClick={handleSaveDetails}
                    leftIcon={isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> : <Save className="w-3.5 h-3.5" aria-hidden="true" />}
                    className="min-h-[44px]"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accessible Deletion Confirmation Dialog */}
        <AdminConfirmModal
          isOpen={!!deleteTargetId}
          title="Delete Project Request?"
          description="Are you sure you want to permanently delete this project inquiry? This action cannot be undone and will permanently remove this record from the database."
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
