// ==============================================================================
// BDCON Labs — Admin Portfolio Management (/admin/portfolio)
// Accessible, responsive administrative CRUD for case studies & projects with image support
// ==============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { 
  FolderKanban, 
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
  getAdminPortfolio, 
  createAdminPortfolio, 
  updateAdminPortfolio, 
  deleteAdminPortfolio 
} from '../../data/admin/portfolio';
import { PortfolioProject } from '../../types/portfolio';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { useTranslation } from '../../hooks/useTranslation';

export const AdminPortfolioPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Modal (Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'product' | 'web-application' | 'mobile-application' | 'website' | 'custom-software' | 'experiment'>('web-application');
  const [technologies, setTechnologies] = useState('React, TypeScript, Tailwind CSS');
  const [status, setStatus] = useState<'live' | 'in-development' | 'archived'>('live');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Modal
  const [deleteTarget, setDeleteTarget] = useState<PortfolioProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getAdminPortfolio();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = isBangla ? 'পোর্টফোলিও — BDCON Labs Admin' : 'Portfolio Projects — BDCON Labs Admin';
    loadProjects();
  }, [isBangla]);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setCategory('web-application');
    setTechnologies('React, TypeScript, Tailwind CSS');
    setStatus('live');
    setShortDescription('');
    setDescription('');
    setLiveUrl('');
    setRepositoryUrl('');
    setCoverImage('');
    setYear(new Date().getFullYear());
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: PortfolioProject) => {
    setEditingProject(p);
    setTitle(p.title || '');
    setSlug(p.slug || '');
    setCategory(p.category || 'web-application');
    setTechnologies(Array.isArray(p.technologies) ? p.technologies.join(', ') : '');
    setStatus(p.status || 'live');
    setShortDescription(p.shortDescription || '');
    setDescription(p.description || '');
    setLiveUrl(p.liveUrl || '');
    setRepositoryUrl(p.repositoryUrl || '');
    setCoverImage(p.coverImage || '');
    setYear(p.year || new Date().getFullYear());
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
      setFormError(isBangla ? 'প্রজেক্টের নাম আবশ্যক।' : 'Project title is required.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const generatedSlug = slug.trim() || title.trim().toLowerCase().replace(/[\s\W]+/g, '-');
      const techArray = technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: Partial<PortfolioProject> = {
        title: title.trim(),
        slug: generatedSlug,
        category,
        technologies: techArray.length > 0 ? techArray : ['React', 'TypeScript'],
        status,
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        liveUrl: liveUrl.trim(),
        repositoryUrl: repositoryUrl.trim(),
        coverImage: coverImage.trim(),
        year: Number(year),
      };

      if (editingProject) {
        await updateAdminPortfolio(editingProject.id, payload);
      } else {
        await createAdminPortfolio(payload);
      }

      await loadProjects();
      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAdminPortfolio(deleteTarget.id);
      await loadProjects();
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Delete project failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (st?: string) => {
    switch (st) {
      case 'live':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">LIVE</span>;
      case 'in-development':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">IN-DEV</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">{st || 'ARCHIVED'}</span>;
    }
  };

  return (
    <AdminLayout
      title={isBangla ? 'পোর্টফোলিও ও প্রজেক্টস' : 'Portfolio Projects'}
      subtitle={isBangla ? 'সফটওয়্যার সল্যুশন ও কেস স্টাডিজ পরিচালনা করুন।' : 'Case studies and software projects stored in public.portfolio_projects.'}
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: isBangla ? 'পোর্টফোলিও' : 'Portfolio' }]}
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            {isBangla ? 'মোট প্রজেক্ট: ' : 'Total Case Studies: '}
            <strong className="text-[var(--text-primary)]">{projects.length}</strong>
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadProjects}
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
              {isBangla ? 'নতুন প্রজেক্ট যোগ করুন' : 'Add New Project'}
            </Button>
          </div>
        </div>

        {/* Catalog Table & Mobile Cards */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading portfolio directory...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      {/* Cover Thumbnail */}
                      <div 
                        onClick={() => handleOpenEdit(p)}
                        className="w-16 h-14 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden shrink-0 flex items-center justify-center cursor-pointer hover:border-[var(--color-brand)] transition-colors relative group"
                        title={isBangla ? 'ছবি পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit image'}
                      >
                        {p.coverImage ? (
                          <img
                            src={p.coverImage}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <FolderKanban className="w-6 h-6 text-[var(--color-brand)]/60" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Pencil className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif block leading-snug truncate">
                            {p.title}
                          </span>
                          {getStatusBadge(p.status)}
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] font-bangla-sans line-clamp-1">
                          {p.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {p.technologies?.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-[var(--border-color)]">
                      <Link
                        to={`/portfolio/${p.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px]"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(p)}
                          leftIcon={<Pencil className="w-3 h-3" />}
                          className="text-xs min-h-[36px]"
                        >
                          {isBangla ? 'সম্পাদনা' : 'Edit'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(p)}
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
                      <th scope="col" className="py-3 px-4">Title &amp; Summary</th>
                      <th scope="col" className="py-3 px-4">Category</th>
                      <th scope="col" className="py-3 px-4">Technologies</th>
                      <th scope="col" className="py-3 px-4">Status</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                        {/* Image Thumbnail Column */}
                        <td className="py-3 px-4">
                          <div 
                            onClick={() => handleOpenEdit(p)}
                            className="w-14 h-11 rounded-md bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center cursor-pointer hover:border-[var(--color-brand)] transition-colors group relative"
                            title={isBangla ? 'ছবি পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit image'}
                          >
                            {p.coverImage ? (
                              <img
                                src={p.coverImage}
                                alt={p.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <FolderKanban className="w-5 h-5 text-[var(--color-brand)]/60" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Pencil className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div>
                            <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif leading-snug">{p.title}</span>
                            <p className="text-[11px] text-[var(--text-muted)] font-bangla-sans line-clamp-1 leading-normal">{p.shortDescription}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 uppercase text-[10px] text-[var(--text-secondary)] font-mono">
                          {p.category}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {p.technologies?.slice(0, 4).map((tech) => (
                              <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(p.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            <Link
                              to={`/portfolio/${p.slug}`}
                              className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold px-2 py-1"
                              aria-label={`View case study for ${p.title}`}
                            >
                              <span>View</span>
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>

                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-xs font-sans transition-colors"
                              title={isBangla ? 'সম্পাদনা করুন' : 'Edit project'}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>{isBangla ? 'এডিট' : 'Edit'}</span>
                            </button>

                            <button
                              onClick={() => setDeleteTarget(p)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-sans transition-colors"
                              title={isBangla ? 'মুছে ফেলুন' : 'Delete project'}
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
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)] font-bangla-serif">
                  {editingProject ? (isBangla ? 'প্রজেক্ট সম্পাদনা করুন' : 'Edit Project') : (isBangla ? 'নতুন প্রজেক্ট যোগ করুন' : 'Add New Project')}
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {editingProject ? editingProject.slug : 'new-project'}
                </p>
              </div>
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
              {/* Image Upload & Preview Section */}
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/50 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[var(--color-brand)]" />
                    <span>{isBangla ? 'প্রজেক্ট কভার ইমেজ / স্ক্রিনশট' : 'Cover Image / Screenshot'}</span>
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
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
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
                        placeholder="https://... বা /images/portfolio/project.png"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--color-brand)] outline-none"
                      />
                      <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                        {isBangla ? 'ছবির অনলাইন লিংক দিন অথবা নিচের বাটন দিয়ে ফাইল আপলোড করুন।' : 'Paste image URL or upload image file directly.'}
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
                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">প্রজেক্ট নাম / Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. BuildEst BD"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">Slug (URL)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. buildest-bd"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">ক্যাটাগরি / Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  >
                    <option value="web-application">Web Application</option>
                    <option value="mobile-application">Mobile Application</option>
                    <option value="product">Proprietary Product</option>
                    <option value="custom-software">Custom Software</option>
                    <option value="website">Corporate Website</option>
                    <option value="experiment">R&amp;D Experiment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">স্ট্যাটাস / Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  >
                    <option value="live">Live</option>
                    <option value="in-development">In Development</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">টেকনোলজি / Technologies (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="React, TypeScript, Tailwind CSS, PostgreSQL"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">লাইভ লিংক / Live URL</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">সোর্স কোড লিংক / Repository URL</label>
                  <input
                    type="url"
                    value={repositoryUrl}
                    onChange={(e) => setRepositoryUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">সংক্ষিপ্ত বিবরণ / Short Description</label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="প্রজেক্টের ১-২ লাইনের সারসংক্ষেপ..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-bangla-sans"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">বিস্তারিত বিবরণ / Full Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="কেস স্টাডি, চ্যালেঞ্জ ও সমাধান..."
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
                  {isSaving ? (isBangla ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBangla ? 'সংরক্ষণ করুন' : 'Save Project')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={isBangla ? 'প্রজেক্টটি মুছে ফেলবেন?' : 'Confirm Delete Project'}
        description={
          isBangla 
            ? `আপনি কি "${deleteTarget?.title}" প্রজেক্টটি পোর্টফোলিও থেকে মুছে ফেলতে চান?`
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
