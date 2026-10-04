// ==============================================================================
// BDCON Labs — Admin Services Management (/admin/services)
// Accessible, responsive administrative CRUD for service offerings
// ==============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { 
  Wrench, 
  ExternalLink, 
  RefreshCw, 
  Loader2, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Save, 
  AlertCircle 
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  getAdminServices, 
  createAdminService, 
  updateAdminService, 
  deleteAdminService 
} from '../../data/admin/services';
import { Service, ServiceIconType } from '../../types/service';
import { ServiceIcon } from '../../components/services/ServiceIcon';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { useTranslation } from '../../hooks/useTranslation';

export const AdminServicesPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Modal (Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Applications');
  const [icon, setIcon] = useState<ServiceIconType>('code');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [useCasesText, setUseCasesText] = useState('');
  const [published, setPublished] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Modal
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const loadServices = async () => {
    setLoading(true);
    const data = await getAdminServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = isBangla ? 'সার্ভিসেস — BDCON Labs Admin' : 'Services Management — BDCON Labs Admin';
    loadServices();
  }, [isBangla]);

  const handleOpenAdd = () => {
    setEditingService(null);
    setName('');
    setSlug('');
    setCategory('Applications');
    setIcon('code');
    setShortDescription('');
    setDescription('');
    setFeaturesText('');
    setUseCasesText('');
    setPublished(true);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (s: Service) => {
    setEditingService(s);
    setName(s.name || '');
    setSlug(s.slug || '');
    setCategory(s.category || 'Applications');
    setIcon(s.icon || 'code');
    setShortDescription(s.shortDescription || '');
    setDescription(s.description || '');
    setFeaturesText(Array.isArray(s.features) ? s.features.join('\n') : '');
    setUseCasesText(Array.isArray(s.useCases) ? s.useCases.join('\n') : '');
    setPublished(s.published ?? true);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError(isBangla ? 'সার্ভিসের নাম আবশ্যক।' : 'Service name is required.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const generatedSlug = slug.trim() || name.trim().toLowerCase().replace(/[\s\W]+/g, '-');
      const features = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);
      const useCases = useCasesText
        .split('\n')
        .map((u) => u.trim())
        .filter(Boolean);

      const payload: Partial<Service> = {
        name: name.trim(),
        slug: generatedSlug,
        category: category.trim(),
        icon,
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        features,
        useCases,
        published,
      };

      if (editingService) {
        await updateAdminService(editingService.id, payload);
      } else {
        await createAdminService(payload);
      }

      await loadServices();
      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save service.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAdminService(deleteTarget.id);
      await loadServices();
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Delete service failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title={isBangla ? 'সার্ভিসেস ব্যবস্থাপনা' : 'Services Management'}
      subtitle={isBangla ? 'ইঞ্জিনিয়ারিং ও কনসাল্টিং সার্ভিসসমূহ পরিচালনা করুন।' : 'Engineering and consulting offerings stored in public.services.'}
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: isBangla ? 'সার্ভিসেস' : 'Services' }]}
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            {isBangla ? 'মোট সার্ভিস: ' : 'Total Services: '}
            <strong className="text-[var(--text-primary)]">{services.length}</strong>
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadServices}
              disabled={loading}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />}
              className="min-h-[40px]"
            >
              {isBangla ? 'রিফ্রেশ' : 'Refresh'}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAdd}
              leftIcon={<Plus className="w-3.5 h-3.5" aria-hidden="true" />}
              className="min-h-[40px]"
            >
              {isBangla ? 'নতুন সার্ভিস যোগ করুন' : 'Add New Service'}
            </Button>
          </div>
        </div>

        {/* Catalog Table & Mobile Cards */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading services catalog...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {services.map((s) => (
                  <div key={s.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      {/* Service Icon Box */}
                      <div 
                        onClick={() => handleOpenEdit(s)}
                        className="w-12 h-12 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20 flex items-center justify-center shrink-0 cursor-pointer hover:bg-[var(--color-brand)]/20 transition-colors"
                        title={isBangla ? 'আইকন পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit service'}
                      >
                        <ServiceIcon name={s.icon} className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif block leading-snug truncate">
                            {s.name}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 border ${
                            s.published 
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                              : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                          }`}>
                            {s.published ? 'PUBLISHED' : 'DRAFT'}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] font-bangla-sans line-clamp-1 mt-0.5">
                          {s.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-[var(--text-muted)] font-mono">
                      Category: {s.category || 'General'}
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-[var(--border-color)]">
                      <Link
                        to={`/services/${s.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px]"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(s)}
                          leftIcon={<Pencil className="w-3 h-3" />}
                          className="text-xs min-h-[36px]"
                        >
                          {isBangla ? 'সম্পাদনা' : 'Edit'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(s)}
                          leftIcon={<Trash2 className="w-3 h-3 text-red-500" />}
                          className="text-xs text-red-600 dark:text-red-400 min-h-[36px] hover:bg-red-500/10"
                        >
                          {isBangla ? 'মুছুন' : 'Delete'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (>= 768px) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-[10px] uppercase text-[var(--text-muted)] font-semibold">
                    <tr>
                      <th scope="col" className="py-3 px-4 w-16">Icon</th>
                      <th scope="col" className="py-3 px-4">Service Domain</th>
                      <th scope="col" className="py-3 px-4">Category</th>
                      <th scope="col" className="py-3 px-4">Visibility</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {services.map((s) => (
                      <tr key={s.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                        {/* Service Icon Column */}
                        <td className="py-3 px-4">
                          <div 
                            onClick={() => handleOpenEdit(s)}
                            className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20 flex items-center justify-center cursor-pointer hover:bg-[var(--color-brand)]/20 transition-colors group relative"
                            title={isBangla ? 'আইকন পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit service'}
                          >
                            <ServiceIcon name={s.icon} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                              <Pencil className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-sm">
                          <div>
                            <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif leading-snug">{s.name}</span>
                            <p className="text-[11px] text-[var(--text-muted)] font-bangla-sans line-clamp-1 leading-normal">{s.shortDescription}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-sans text-[var(--text-secondary)]">
                          {s.category || 'General'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                            s.published 
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                              : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                          }`}>
                            {s.published ? 'PUBLISHED' : 'DRAFT'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            <Link
                              to={`/services/${s.slug}`}
                              className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold px-2 py-1"
                              aria-label={`View public details for ${s.name}`}
                            >
                              <span>View Public</span>
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>

                            <button
                              onClick={() => handleOpenEdit(s)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-xs font-sans transition-colors"
                              title={isBangla ? 'সম্পাদনা করুন' : 'Edit service'}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>{isBangla ? 'এডিট' : 'Edit'}</span>
                            </button>

                            <button
                              onClick={() => setDeleteTarget(s)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-sans transition-colors"
                              title={isBangla ? 'মুছে ফেলুন' : 'Delete service'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{isBangla ? 'ডিলিট' : 'Delete'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div 
            ref={modalRef}
            className="w-full max-w-2xl my-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <h2 className="text-base font-bold font-bangla-serif text-[var(--text-primary)]">
                {editingService 
                  ? (isBangla ? 'সার্ভিসের তথ্য সম্পাদনা' : 'Edit Service') 
                  : (isBangla ? 'নতুন সার্ভিস যুক্ত করুন' : 'Add New Service')}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">সার্ভিসের নাম / Service Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: Web Application Development বা Mobile App Development"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="যেমন: web-application-development"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">ক্যাটাগরি / Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Web Presence / Applications / Mobile / Custom Systems"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">আইকন / Icon</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-mono"
                  >
                    <option value="code">code</option>
                    <option value="globe">globe</option>
                    <option value="layout-dashboard">layout-dashboard</option>
                    <option value="smartphone">smartphone</option>
                    <option value="palette">palette</option>
                    <option value="message-square">message-square</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">ভিজিবিলিটি / Visibility</label>
                  <select
                    value={published ? 'published' : 'draft'}
                    onChange={(e) => setPublished(e.target.value === 'published')}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-mono"
                  >
                    <option value="published">Published (প্রকাশিত)</option>
                    <option value="draft">Draft (ড্রাফট)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">সংক্ষিপ্ত বিবরণ / Short Description</label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="১-২ লাইনের সার্ভিস পরিচিতি..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-bangla-sans"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">মূল বৈশিষ্ট্যসমূহ / Key Features (প্রতি লাইনে একটি)</label>
                  <textarea
                    rows={3}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="Custom architecture design&#10;Full-stack development&#10;Cloud deployment"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-sans"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">বিস্তারিত বিবরণ / Full Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="সার্ভিসের সম্পূর্ণ কর্মপরিধি ও বিবরণ..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-bangla-sans"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSaving}
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSaving}
                  leftIcon={isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                >
                  {isSaving ? (isBangla ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBangla ? 'সংরক্ষণ করুন' : 'Save Service')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={isBangla ? 'সার্ভিসটি মুছে ফেলবেন?' : 'Confirm Delete Service'}
        description={
          isBangla 
            ? `আপনি কি "${deleteTarget?.name}" সার্ভিসটি নিশ্চিতভাবে অপসারণ করতে চান?`
            : `Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`
        }
        confirmLabel={isBangla ? 'হ্যাঁ, মুছুন' : 'Delete'}
        cancelLabel={isBangla ? 'বাতিল' : 'Cancel'}
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminLayout>
  );
};
