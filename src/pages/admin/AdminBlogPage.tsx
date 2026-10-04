// ==============================================================================
// BDCON Labs — Admin Writing & Essays Management (/admin/blog)
// Accessible, responsive administrative CRUD for essays & blog entries with cover image support
// ==============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { 
  FileText, 
  ExternalLink, 
  RefreshCw, 
  Loader2, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Save, 
  AlertCircle,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  getAdminWriting, 
  createAdminWriting, 
  updateAdminWriting, 
  deleteAdminWriting 
} from '../../data/admin/writing';
import { WritingEntry } from '../../types/writing';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { useTranslation } from '../../hooks/useTranslation';

export const AdminBlogPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [entries, setEntries] = useState<WritingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Modal (Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WritingEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('দার্শনিক ও চিন্তন');
  const [author, setAuthor] = useState('রাকিব আসরার');
  const [publishedAt, setPublishedAt] = useState('');
  const [readingTime, setReadingTime] = useState('৫ মিনিট পাঠ');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Modal
  const [deleteTarget, setDeleteTarget] = useState<WritingEntry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal accessibility ref
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadEntries = async () => {
    setLoading(true);
    const data = await getAdminWriting();
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = isBangla ? 'প্রবন্ধ ও ব্লগ — BDCON Labs Admin' : 'Writing & Essays — BDCON Labs Admin';
    loadEntries();
  }, [isBangla]);

  const handleOpenAdd = () => {
    setEditingEntry(null);
    setTitle('');
    setSubtitle('');
    setSlug('');
    setCategory('দার্শনিক ও চিন্তন');
    setAuthor('রাকিব আসরার');
    setPublishedAt(new Date().getFullYear().toString());
    setReadingTime('৫ মিনিট পাঠ');
    setExcerpt('');
    setContent('');
    setCoverImage('');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (e: WritingEntry) => {
    setEditingEntry(e);
    setTitle(e.title || '');
    setSubtitle(e.subtitle || '');
    setSlug(e.slug || '');
    setCategory(e.category || 'দার্শনিক ও চিন্তন');
    setAuthor(e.author || 'রাকিব আসরার');
    setPublishedAt(e.publishedAt || '');
    setReadingTime(e.readingTime || '৫ মিনিট পাঠ');
    setExcerpt(e.excerpt || '');
    setContent(e.content || '');
    setCoverImage(e.coverImage || '');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError(isBangla ? 'ছবির ফাইল সাইজ ৫ মেগাবাইট এর কম হতে হবে।' : 'File size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCoverImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError(isBangla ? 'প্রবন্ধের শিরোনাম আবশ্যক।' : 'Essay title is required.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const generatedSlug = slug.trim() || title.trim().toLowerCase().replace(/[\s\W]+/g, '-');
      const payload: Partial<WritingEntry> = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        slug: generatedSlug,
        category: category.trim(),
        author: author.trim(),
        publishedAt: publishedAt.trim(),
        readingTime: readingTime.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage: coverImage.trim(),
      };

      if (editingEntry) {
        await updateAdminWriting(editingEntry.id, payload);
      } else {
        await createAdminWriting(payload);
      }

      await loadEntries();
      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save essay.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAdminWriting(deleteTarget.id);
      await loadEntries();
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Delete essay failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title={isBangla ? 'প্রবন্ধ ও চিন্তন ব্যবস্থাপনা' : 'Writing & Essays'}
      subtitle={isBangla ? 'রাকিব আসরারের সাহিত্য ও গবেষণাধর্মী লেখা এবং ফিচার ইমেজ পরিচালনা করুন।' : 'Essays, philosophical reflections, and cover images stored in public.writing_entries.'}
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: isBangla ? 'প্রবন্ধ ও ব্লগ' : 'Writing' }]}
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            {isBangla ? 'মোট প্রকাশিত প্রবন্ধ: ' : 'Total Essays: '}
            <strong className="text-[var(--text-primary)]">{entries.length}</strong>
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadEntries}
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
              {isBangla ? 'নতুন প্রবন্ধ যোগ করুন' : 'Add New Essay'}
            </Button>
          </div>
        </div>

        {/* Catalog Table & Mobile Cards */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading essays directory...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {entries.map((e) => (
                  <div key={e.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      {/* Featured Image Thumbnail */}
                      <div 
                        onClick={() => handleOpenEdit(e)}
                        className="w-16 h-14 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden shrink-0 flex items-center justify-center cursor-pointer hover:border-[var(--color-brand)] transition-colors relative group"
                        title={isBangla ? 'ছবি পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit image'}
                      >
                        {e.coverImage ? (
                          <img
                            src={e.coverImage}
                            alt={e.title}
                            className="w-full h-full object-cover"
                            onError={(event) => {
                              (event.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <FileText className="w-6 h-6 text-[var(--color-brand)]/60" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Pencil className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif block leading-snug truncate">
                            {e.title}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bangla-sans font-medium uppercase bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] shrink-0">
                            {e.category || 'সাধারণ'}
                          </span>
                        </div>

                        {e.subtitle && (
                          <p className="text-xs text-[var(--text-secondary)] font-bangla-sans line-clamp-1">
                            {e.subtitle}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-1">
                          <span>{e.readingTime || '৫ মিনিট পাঠ'}</span>
                          <span>{e.publishedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-[var(--border-color)]">
                      <Link
                        to={`/rakib-asrar/writing/${e.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px]"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(e)}
                          leftIcon={<Pencil className="w-3 h-3" />}
                          className="text-xs min-h-[36px]"
                        >
                          {isBangla ? 'সম্পাদনা' : 'Edit'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(e)}
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
                      <th scope="col" className="py-3 px-4 w-20">Image</th>
                      <th scope="col" className="py-3 px-4">Title</th>
                      <th scope="col" className="py-3 px-4">Category</th>
                      <th scope="col" className="py-3 px-4">Reading Time</th>
                      <th scope="col" className="py-3 px-4">Published Date</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {entries.map((e) => (
                      <tr key={e.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                        {/* Cover Image Column */}
                        <td className="py-3 px-4">
                          <div 
                            onClick={() => handleOpenEdit(e)}
                            className="w-14 h-11 rounded-md bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center cursor-pointer hover:border-[var(--color-brand)] transition-colors group relative"
                            title={isBangla ? 'ফিচার ছবি পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit image'}
                          >
                            {e.coverImage ? (
                              <img
                                src={e.coverImage}
                                alt={e.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(event) => {
                                  (event.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <FileText className="w-5 h-5 text-[var(--color-brand)]/60" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Pencil className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div>
                            <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif leading-snug">{e.title}</span>
                            {e.subtitle && (
                              <p className="text-[11px] text-[var(--text-muted)] font-bangla-sans line-clamp-1 leading-normal">{e.subtitle}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bangla-sans text-[var(--text-secondary)]">
                          {e.category || 'সাধারণ'}
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-muted)]">
                          {e.readingTime || '৫ মিনিট পাঠ'}
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                          {e.publishedAt}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            <Link
                              to={`/rakib-asrar/writing/${e.slug}`}
                              className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold px-2 py-1"
                              aria-label={`View essay details for ${e.title}`}
                            >
                              <span>View Public</span>
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>

                            <button
                              onClick={() => handleOpenEdit(e)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-xs font-sans transition-colors"
                              title={isBangla ? 'সম্পাদনা করুন' : 'Edit essay'}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>{isBangla ? 'এডিট' : 'Edit'}</span>
                            </button>

                            <button
                              onClick={() => setDeleteTarget(e)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-sans transition-colors"
                              title={isBangla ? 'মুছে ফেলুন' : 'Delete essay'}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div 
            ref={modalRef}
            className="w-full max-w-2xl my-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <h2 className="text-base font-bold font-bangla-serif text-[var(--text-primary)]">
                {editingEntry ? (isBangla ? 'প্রবন্ধ সম্পাদনা করুন' : 'Edit Essay') : (isBangla ? 'নতুন প্রবন্ধ যোগ করুন' : 'Add New Essay')}
              </h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-lg hover:bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
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

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono max-h-[75vh] overflow-y-auto pr-1">
              {/* Cover Image Upload & Preview Section */}
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/50 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[var(--color-brand)]" />
                    <span>{isBangla ? 'ফিচার্ড কভার ইমেজ (Cover Image)' : 'Featured Cover Image'}</span>
                  </label>
                  {coverImage && (
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      {isBangla ? 'ছবি মুছুন' : 'Remove Image'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                  <div className="w-full sm:w-auto h-28 rounded-lg border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center overflow-hidden relative">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          (event.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-center p-2 text-[var(--text-muted)] space-y-1">
                        <ImageIcon className="w-6 h-6 mx-auto opacity-40" />
                        <span className="text-[10px] block">{isBangla ? 'কোনো ছবি নেই' : 'No image'}</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <div>
                      <input
                        type="text"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://... বা /images/blog/cover.jpg"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--color-brand)] outline-none"
                      />
                      <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                        {isBangla ? 'ছবির অনলাইন লিঙ্ক দিন অথবা ডিভাইস থেকে আপলোড করুন।' : 'Paste image URL or upload image file directly.'}
                      </span>
                    </div>

                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        leftIcon={<Upload className="w-3.5 h-3.5" />}
                        className="w-full text-xs font-mono"
                      >
                        {isBangla ? 'ডিভাইস থেকে ছবি আপলোড করুন' : 'Upload Image From Device'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">প্রবন্ধের শিরোনাম / Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. আত্মপরিচয়ের সংকট ও সমকালীন রাজনীতি"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-serif focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">উপ-শিরোনাম / Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. সমাজ ও সভ্যতার রূপান্তর বিষয়ক প্রাসঙ্গিক নিরীক্ষা"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">Slug (URL)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. attoporichoyer-songkot"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">বিষয়শ্রেণী / Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="দার্শনিক ও চিন্তন / সাহিত্য ও সংস্কৃতি"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">পাঠের সময় / Reading Time</label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    placeholder="৫ মিনিট পাঠ"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">প্রকাশের সাল বা তারিখ / Published Date</label>
                  <input
                    type="text"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    placeholder="২০২৬ / 2026-03-15"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">লেখক / Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">সংক্ষিপ্ত অংশ / Excerpt</label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="পাঠকদের জন্য প্রথম ২-৩ লাইনের ভূমিকা..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-bangla-sans"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">মূল প্রবন্ধ / Full Content (Markdown / Text)</label>
                  <textarea
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="প্রবন্ধের সম্পূর্ণ লেখা..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-bangla-sans leading-relaxed"
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
                  {isSaving ? (isBangla ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBangla ? 'সংরক্ষণ করুন' : 'Save Essay')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={isBangla ? 'প্রবন্ধটি মুছে ফেলতে চান?' : 'Confirm Delete Essay'}
        description={
          isBangla 
            ? `আপনি কি "${deleteTarget?.title}" প্রবন্ধটি নিশ্চিতভাবে মুছে ফেলতে চান?`
            : `Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`
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
