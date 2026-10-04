// ==============================================================================
// BDCON Labs — Admin Products Catalog Overview & Management (/admin/products)
// Full administrative CRUD: Add New, Edit, and Delete with image/screenshot support
// ==============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { 
  Layers, 
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
  Upload,
  Globe,
  Smartphone
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  getAdminProducts, 
  createAdminProduct, 
  updateAdminProduct, 
  deleteAdminProduct 
} from '../../data/admin/products';
import { Product, ProductPlatform, ProductStatus } from '../../types/product';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { useTranslation } from '../../hooks/useTranslation';

export const AdminProductsPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Modal (Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Financial & Payroll Tools');
  const [platforms, setPlatforms] = useState<ProductPlatform[]>(['web']);
  const [status, setStatus] = useState<ProductStatus>('available');
  const [featured, setFeatured] = useState(true);
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [androidUrl, setAndroidUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Modal
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getAdminProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = isBangla ? 'প্রোডাক্টস — BDCON Labs Admin' : 'Products — BDCON Labs Admin';
    loadProducts();
  }, [isBangla]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setSlug('');
    setTagline('');
    setCategory('Financial & Payroll Tools');
    setPlatforms(['web']);
    setStatus('available');
    setFeatured(true);
    setScreenshotUrl('');
    setShortDescription('');
    setDescription('');
    setFeaturesText('');
    setWebsiteUrl('');
    setAndroidUrl('');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name || '');
    setSlug(p.slug || '');
    setTagline(p.tagline || '');
    setCategory(p.category || 'Financial & Payroll Tools');
    setPlatforms(p.platforms || ['web']);
    setStatus(p.status || 'available');
    setFeatured(p.featured ?? true);
    setScreenshotUrl(p.screenshotUrl || (p as any).coverImage || p.logoUrl || '');
    setShortDescription(p.shortDescription || '');
    setDescription(p.description || '');
    setFeaturesText(Array.isArray(p.features) ? p.features.join('\n') : '');
    setWebsiteUrl(p.websiteUrl || p.liveUrl || '');
    setAndroidUrl(p.androidUrl || p.playStoreUrl || '');
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
      setScreenshotUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const togglePlatform = (plat: ProductPlatform) => {
    if (platforms.includes(plat)) {
      if (platforms.length === 1) return; // keep at least one
      setPlatforms(platforms.filter((p) => p !== plat));
    } else {
      setPlatforms([...platforms, plat]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError(isBangla ? 'প্রোডাক্টের নাম আবশ্যক।' : 'Product name is required.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const generatedSlug = slug.trim() || name.trim().toLowerCase().replace(/[\s\W]+/g, '-');
      const featArray = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload: Partial<Product> = {
        name: name.trim(),
        slug: generatedSlug,
        tagline: tagline.trim(),
        category,
        platforms,
        status,
        featured,
        screenshotUrl: screenshotUrl.trim(),
        coverImage: screenshotUrl.trim(),
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        features: featArray,
        websiteUrl: websiteUrl.trim(),
        liveUrl: websiteUrl.trim(),
        androidUrl: androidUrl.trim(),
        playStoreUrl: androidUrl.trim(),
      };

      if (editingProduct) {
        await updateAdminProduct(editingProduct.id, payload);
      } else {
        await createAdminProduct(payload);
      }

      await loadProducts();
      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAdminProduct(deleteTarget.id);
      await loadProducts();
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Delete product failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (st: ProductStatus) => {
    switch (st) {
      case 'available':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {isBangla ? 'লাইভ / সহজলভ্য' : 'AVAILABLE'}
          </span>
        );
      case 'coming_soon':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            {isBangla ? 'আসন্ন' : 'COMING SOON'}
          </span>
        );
      case 'in_development':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {isBangla ? 'বিকাশমান' : 'IN DEV'}
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">
            {st}
          </span>
        );
    }
  };

  return (
    <AdminLayout
      title={isBangla ? 'প্রোডাক্টস ব্যবস্থাপনা' : 'Products Management'}
      subtitle={isBangla ? 'বিডিকন ল্যাবসের সফটওয়্যার প্রোডাক্ট ক্যাটালগ ও ছবি নিয়ন্ত্রণ করুন।' : 'Proprietary software catalog records, screenshots, and platforms.'}
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: isBangla ? 'প্রোডাক্টস' : 'Products' }]}
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            {isBangla ? 'মোট প্রোডাক্ট: ' : 'Total Products: '}
            <strong className="text-[var(--text-primary)]">{products.length}</strong>
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadProducts}
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
              {isBangla ? 'নতুন প্রোডাক্ট যোগ করুন' : 'Add New Product'}
            </Button>
          </div>
        </div>

        {/* Catalog Table & Mobile Cards */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading products catalog...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {products.map((p) => {
                  const imgUrl = p.screenshotUrl || (p as any).coverImage || p.logoUrl || '';
                  return (
                    <div key={p.id} className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        {/* Image Thumbnail */}
                        <div className="w-16 h-14 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden shrink-0 flex items-center justify-center">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Layers className="w-6 h-6 text-[var(--color-brand)]/60" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-sm text-[var(--text-primary)] font-sans block truncate">
                              {p.name}
                            </span>
                            {getStatusBadge(p.status)}
                          </div>
                          <span className="text-xs text-[var(--text-secondary)] font-mono block">
                            {p.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                        {p.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {p.platforms.map((plat) => (
                          <span
                            key={plat}
                            className="px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[10px] uppercase font-mono text-[var(--text-muted)]"
                          >
                            {plat}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons on Mobile */}
                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-[var(--border-color)]">
                        <Link
                          to={`/products/${p.slug}`}
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
                  );
                })}
              </div>

              {/* Desktop Table View (>= 768px) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] text-[10px] uppercase text-[var(--text-muted)] font-semibold">
                    <tr>
                      <th scope="col" className="py-3 px-4 w-20">Image</th>
                      <th scope="col" className="py-3 px-4">Product Name &amp; Info</th>
                      <th scope="col" className="py-3 px-4">Category</th>
                      <th scope="col" className="py-3 px-4">Platforms</th>
                      <th scope="col" className="py-3 px-4">Status</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {products.map((p) => {
                      const imgUrl = p.screenshotUrl || (p as any).coverImage || p.logoUrl || '';
                      return (
                        <tr key={p.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                          {/* Image Column */}
                          <td className="py-3 px-4">
                            <div 
                              onClick={() => handleOpenEdit(p)}
                              className="w-14 h-11 rounded-md bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center cursor-pointer hover:border-[var(--color-brand)] transition-colors group relative"
                              title={isBangla ? 'ছবি পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit image'}
                            >
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt={p.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <Layers className="w-5 h-5 text-[var(--color-brand)]/60" />
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Pencil className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                          </td>

                          {/* Product Info */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <div>
                              <span className="font-bold text-sm text-[var(--text-primary)] font-sans block leading-snug">
                                {p.name}
                              </span>
                              {p.tagline && (
                                <span className="text-[11px] text-[var(--text-secondary)] font-sans block">
                                  {p.tagline}
                                </span>
                              )}
                              <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                                {p.shortDescription}
                              </p>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                            {p.category}
                          </td>

                          {/* Platforms */}
                          <td className="py-3.5 px-4">
                            <div className="flex gap-1 flex-wrap">
                              {p.platforms.map((plat) => (
                                <span
                                  key={plat}
                                  className="px-1.5 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[10px] uppercase text-[var(--text-muted)]"
                                >
                                  {plat}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            {getStatusBadge(p.status)}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center justify-end gap-2">
                              <Link
                                to={`/products/${p.slug}`}
                                className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold px-2 py-1"
                                aria-label={`View public presentation for ${p.name}`}
                              >
                                <span>View</span>
                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              </Link>

                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-xs font-sans transition-colors"
                                title={isBangla ? 'সম্পাদনা করুন' : 'Edit product'}
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>{isBangla ? 'এডিট' : 'Edit'}</span>
                              </button>

                              <button
                                onClick={() => setDeleteTarget(p)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-sans transition-colors"
                                title={isBangla ? 'মুছে ফেলুন' : 'Delete product'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>{isBangla ? 'ডিলিট' : 'Delete'}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="p-4 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] font-mono flex items-center justify-between">
            <span>{isBangla ? 'সকল প্রোডাক্ট ও ইমেজ ডেটা সিঙ্ক করা আছে।' : 'Product catalog and screenshot assets are synced.'}</span>
            <span className="text-[10px] opacity-75">BDCON Labs Platform</span>
          </div>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-surface-subtle)]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                  {editingProduct ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    {editingProduct
                      ? isBangla ? 'প্রোডাক্ট সম্পাদনা করুন' : 'Edit Product'
                      : isBangla ? 'নতুন প্রোডাক্ট যোগ করুন' : 'Add New Product'}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {isBangla ? 'প্রোডাক্টের বিবরণ, প্ল্যাটফর্ম ও ছবি হালনাগাদ করুন।' : 'Update product details, platforms, and preview screenshot.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)]/50 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Image / Screenshot Upload & URL Section */}
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[var(--color-brand)]" />
                    <span>{isBangla ? 'প্রোডাক্ট ছবি / স্ক্রিনশট (Image / Screenshot)' : 'Product Image / Screenshot'}</span>
                  </label>
                  {screenshotUrl && (
                    <button
                      type="button"
                      onClick={() => setScreenshotUrl('')}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      {isBangla ? 'ছবি মুছুন' : 'Remove Image'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                  {/* Image Preview Box */}
                  <div className="w-full sm:w-auto h-28 rounded-lg border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center overflow-hidden relative">
                    {screenshotUrl ? (
                      <img
                        src={screenshotUrl}
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

                  {/* Input controls */}
                  <div className="sm:col-span-2 space-y-2">
                    <div>
                      <input
                        type="text"
                        value={screenshotUrl}
                        onChange={(e) => setScreenshotUrl(e.target.value)}
                        placeholder="https://... বা /images/products/photo.png"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--color-brand)] outline-none"
                      />
                      <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                        {isBangla ? 'ছবির অনলাইন লিঙ্ক দিন অথবা ডিভাইস থেকে আপলোড করুন।' : 'Paste image URL or upload from your device below.'}
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
                        className="w-full text-xs"
                      >
                        {isBangla ? 'ডিভাইস থেকে ছবি আপলোড করুন' : 'Upload Image From Device'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {isBangla ? 'প্রোডাক্টের নাম *' : 'Product Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. বেতন নির্ধারণ ২০২৬ / CivilDesk"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:border-[var(--color-brand)] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] font-mono">
                    Slug / URL Identifier
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. salary-bd"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--color-brand)] outline-none"
                  />
                </div>
              </div>

              {/* Tagline & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {isBangla ? 'ট্যাগলাইন / সাবটাইটেল' : 'Tagline / Subtitle'}
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. SalaryBD / Pay Determination 2026"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:border-[var(--color-brand)] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {isBangla ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Financial & Payroll Tools, Engineering"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:border-[var(--color-brand)] outline-none"
                  />
                </div>
              </div>

              {/* Platforms & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {isBangla ? 'সাপোর্টেড প্ল্যাটফর্ম' : 'Platforms'}
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(['web', 'android', 'ios', 'desktop'] as ProductPlatform[]).map((plat) => {
                      const active = platforms.includes(plat);
                      return (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => togglePlatform(plat)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-mono uppercase transition-colors ${
                            active
                              ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)] font-bold'
                              : 'bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--color-brand)]'
                          }`}
                        >
                          {plat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {isBangla ? 'স্ট্যাটাস' : 'Status'}
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProductStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:border-[var(--color-brand)] outline-none"
                  >
                    <option value="available">{isBangla ? 'সহজলভ্য / লাইভ (Available)' : 'Available / Live'}</option>
                    <option value="coming_soon">{isBangla ? 'শীঘ্রই আসছে (Coming Soon)' : 'Coming Soon'}</option>
                    <option value="in_development">{isBangla ? 'বিকাশমান (In Development)' : 'In Development'}</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {isBangla ? 'সংক্ষিপ্ত বিবরণ (Short Description)' : 'Short Description'}
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder={isBangla ? 'প্রোডাক্টের সারসংক্ষেপ...' : 'Brief summary of the product...'}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:border-[var(--color-brand)] outline-none resize-y"
                />
              </div>

              {/* Detailed Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {isBangla ? 'পূর্ণ বিবরণ (Full Description)' : 'Full Description'}
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isBangla ? 'বিস্তারিত তথ্য ও বৈশিষ্ট্য...' : 'Comprehensive explanation of functionality...'}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:border-[var(--color-brand)] outline-none resize-y"
                />
              </div>

              {/* Features (one per line) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {isBangla ? 'প্রধান সুবিধাসমূহ (প্রতি লাইনে একটি)' : 'Key Features (one per line)'}
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder={isBangla ? 'বেতন ও পে নির্ধারণ ক্যালকুলেটর\nবাড়িভাড়া ও চিকিৎসা ভাতা সমন্বয়' : 'Fast automated calculation\nMobile-friendly interface'}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:border-[var(--color-brand)] outline-none resize-y"
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] font-mono flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                    <span>Website / Live Web URL</span>
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://salarybd.online"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--color-brand)] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] font-mono flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                    <span>Android / Play Store URL</span>
                  </label>
                  <input
                    type="url"
                    value={androidUrl}
                    onChange={(e) => setAndroidUrl(e.target.value)}
                    placeholder="https://play.google.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--color-brand)] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="prod-featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[var(--color-brand)] border-[var(--border-color)]"
                />
                <label htmlFor="prod-featured" className="text-xs text-[var(--text-primary)] select-none">
                  {isBangla ? 'হোমপেজে ফিচার্ড প্রোডাক্ট হিসেবে দেখান' : 'Show as Featured Product on homepage'}
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[var(--border-color)]">
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
                  {isSaving ? (isBangla ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBangla ? 'সংরক্ষণ করুন' : 'Save Product')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <AdminConfirmModal
          isOpen={true}
          title={isBangla ? 'প্রোডাক্ট মুছে ফেলা নিশ্চিত করুন' : 'Confirm Product Deletion'}
          description={
            isBangla
              ? `আপনি কি নিশ্চিত যে "${deleteTarget.name}" প্রোডাক্টটি স্থায়ীভাবে মুছে ফেলতে চান?`
              : `Are you sure you want to permanently delete "${deleteTarget.name}"? This action cannot be undone.`
          }
          confirmLabel={isBangla ? 'হ্যাঁ, মুছে ফেলুন' : 'Delete Product'}
          cancelLabel={isBangla ? 'বাতিল' : 'Cancel'}
          isLoading={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
};
