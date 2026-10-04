// ==============================================================================
// BDCON Labs — Admin Books Management (/admin/books)
// Accessible, responsive administrative CRUD for books & publications with cover image support
// ==============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { 
  BookMarked, 
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
  getAdminBooks, 
  createAdminBook, 
  updateAdminBook, 
  deleteAdminBook 
} from '../../data/admin/books';
import { Book } from '../../types/book';
import { Button } from '../../components/ui/Button';
import { Link } from '../../lib/router';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { useTranslation } from '../../hooks/useTranslation';

export const AdminBooksPage: React.FC = () => {
  const { isBangla } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Modal (Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('রাকিব আসরার');
  const [genre, setGenre] = useState('কথাসাহিত্য');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState<number>(new Date().getFullYear());
  const [price, setPrice] = useState<number>(250);
  const [originalPrice, setOriginalPrice] = useState<number>(300);
  const [stockCount, setStockCount] = useState<number>(50);
  const [availability, setAvailability] = useState<'available' | 'coming-soon' | 'unavailable'>('available');
  const [purchaseUrl, setPurchaseUrl] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Modal
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const loadBooks = async () => {
    setLoading(true);
    const data = await getAdminBooks();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = isBangla ? 'প্রকাশিত বই — BDCON Labs Admin' : 'Books & Publications — BDCON Labs Admin';
    loadBooks();
  }, [isBangla]);

  const handleOpenAdd = () => {
    setEditingBook(null);
    setTitle('');
    setSubtitle('');
    setSlug('');
    setAuthor('রাকিব আসরার');
    setGenre('কথাসাহিত্য');
    setPublisher('');
    setPublicationYear(new Date().getFullYear());
    setPrice(250);
    setOriginalPrice(300);
    setStockCount(50);
    setAvailability('available');
    setPurchaseUrl('');
    setDescription('');
    setCoverImage('');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (b: Book) => {
    setEditingBook(b);
    setTitle(b.title || '');
    setSubtitle(b.subtitle || '');
    setSlug(b.slug || '');
    setAuthor(b.author || 'রাকিব আসরার');
    setGenre(b.genre || 'কথাসাহিত্য');
    setPublisher(b.publisher || '');
    setPublicationYear(b.publicationYear || b.publishedYear || new Date().getFullYear());
    setPrice(b.price || 0);
    setOriginalPrice(b.originalPrice || 0);
    setStockCount(b.stockCount ?? 50);
    setAvailability(b.availability || 'available');
    setPurchaseUrl(b.purchaseUrl || '');
    setDescription(b.description || '');
    setCoverImage(b.coverImage || b.coverImageUrl || '');
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
      setFormError(isBangla ? 'বইয়ের শিরোনাম আবশ্যক।' : 'Book title is required.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const generatedSlug = slug.trim() || title.trim().toLowerCase().replace(/[\s\W]+/g, '-');
      const payload: Partial<Book> = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        slug: generatedSlug,
        author: author.trim(),
        genre: genre.trim(),
        publisher: publisher.trim(),
        publicationYear: Number(publicationYear),
        publishedYear: Number(publicationYear),
        price: Number(price),
        originalPrice: Number(originalPrice),
        stockCount: Number(stockCount),
        availability,
        purchaseUrl: purchaseUrl.trim(),
        description: description.trim(),
        coverImage: coverImage.trim(),
        coverImageUrl: coverImage.trim(),
      };

      if (editingBook) {
        await updateAdminBook(editingBook.id, payload);
      } else {
        await createAdminBook(payload);
      }

      await loadBooks();
      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save book.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAdminBook(deleteTarget.id);
      await loadBooks();
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title={isBangla ? 'প্রকাশিত বই ব্যবস্থাপনা' : 'Books & Publications'}
      subtitle={isBangla ? 'সাহিত্যকর্ম ও বইয়ের তালিকা এবং প্রচ্ছদ ছবি যোগ, সম্পাদনা ও অপসারণ করুন।' : 'Published literary works, book covers, and pricing stored in public.books.'}
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: isBangla ? 'প্রকাশিত বই' : 'Books' }]}
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            {isBangla ? 'মোট প্রকাশিত বই: ' : 'Total Publications: '}
            <strong className="text-[var(--text-primary)]">{books.length}</strong>
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadBooks}
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
              {isBangla ? 'নতুন বই যোগ করুন' : 'Add New Book'}
            </Button>
          </div>
        </div>

        {/* Catalog Table & Mobile Cards */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-3" role="status">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand)] mx-auto" aria-hidden="true" />
              <p className="text-xs font-mono text-[var(--text-muted)]">Loading books catalog...</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View (< 768px) */}
              <div className="md:hidden divide-y divide-[var(--border-color)]">
                {books.map((b) => {
                  const cover = b.coverImage || b.coverImageUrl || '';
                  return (
                    <div key={b.id} className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        {/* Book Cover Thumbnail */}
                        <div 
                          onClick={() => handleOpenEdit(b)}
                          className="w-14 h-20 rounded-md bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden shrink-0 flex items-center justify-center shadow-xs cursor-pointer hover:border-[var(--color-brand)] transition-colors relative group"
                          title={isBangla ? 'প্রচ্ছদ পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit cover'}
                        >
                          {cover ? (
                            <img
                              src={cover}
                              alt={b.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <BookMarked className="w-6 h-6 text-[var(--color-brand)]/60" />
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Pencil className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif block leading-snug truncate">
                              {b.title}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bangla-sans font-bold uppercase bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand-muted)] shrink-0">
                              {b.genre || 'কথাসাহিত্য'}
                            </span>
                          </div>

                          {b.subtitle && (
                            <p className="text-xs text-[var(--text-secondary)] font-bangla-sans line-clamp-1">
                              {b.subtitle}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-xs font-bangla-sans text-[var(--text-secondary)] pt-1">
                            <span>{b.publisher} ({b.publishedYear || b.publicationYear})</span>
                            <span className="font-bold text-sm text-[var(--text-primary)]">৳{b.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons on Mobile */}
                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-[var(--border-color)]">
                        <Link
                          to={`/rakib-asrar/books/${b.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold min-h-[36px]"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>

                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEdit(b)}
                            leftIcon={<Pencil className="w-3 h-3" />}
                            className="text-xs min-h-[36px]"
                          >
                            {isBangla ? 'সম্পাদনা' : 'Edit'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteTarget(b)}
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
                      <th scope="col" className="py-3 px-4 w-16">Cover</th>
                      <th scope="col" className="py-3 px-4">Title</th>
                      <th scope="col" className="py-3 px-4">Genre</th>
                      <th scope="col" className="py-3 px-4">Publisher &amp; Year</th>
                      <th scope="col" className="py-3 px-4">Price</th>
                      <th scope="col" className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {books.map((b) => {
                      const cover = b.coverImage || b.coverImageUrl || '';
                      return (
                        <tr key={b.id} className="hover:bg-[var(--bg-surface-subtle)]/60 transition-colors">
                          {/* Cover Thumbnail Column */}
                          <td className="py-3 px-4">
                            <div 
                              onClick={() => handleOpenEdit(b)}
                              className="w-12 h-16 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center cursor-pointer hover:border-[var(--color-brand)] transition-colors group relative shadow-2xs"
                              title={isBangla ? 'প্রচ্ছদ ছবি পরিবর্তন বা সম্পাদনা করুন' : 'Click to edit cover'}
                            >
                              {cover ? (
                                <img
                                  src={cover}
                                  alt={b.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <BookMarked className="w-5 h-5 text-[var(--color-brand)]/60" />
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Pencil className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <div>
                              <span className="font-bold text-sm text-[var(--text-primary)] font-bangla-serif leading-snug">{b.title}</span>
                              {b.subtitle && (
                                <p className="text-[11px] text-[var(--text-muted)] font-bangla-sans line-clamp-1 leading-normal">{b.subtitle}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-bangla-sans text-[var(--text-secondary)]">
                            {b.genre || 'কথাসাহিত্য'}
                          </td>
                          <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                            {b.publisher} ({b.publishedYear || b.publicationYear})
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-[var(--text-primary)]">
                            ৳{b.price}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center justify-end gap-2">
                              <Link
                                to={`/rakib-asrar/books/${b.slug}`}
                                className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] hover:underline font-semibold px-2 py-1"
                                aria-label={`View book details for ${b.title}`}
                              >
                                <span>View</span>
                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              </Link>

                              <button
                                onClick={() => handleOpenEdit(b)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-xs font-sans transition-colors"
                                title={isBangla ? 'সম্পাদনা করুন' : 'Edit book'}
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>{isBangla ? 'এডিট' : 'Edit'}</span>
                              </button>

                              <button
                                onClick={() => setDeleteTarget(b)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-sans transition-colors"
                                title={isBangla ? 'মুছে ফেলুন' : 'Delete book'}
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
                  {editingBook ? (isBangla ? 'বই সম্পাদনা করুন' : 'Edit Book') : (isBangla ? 'নতুন বই যোগ করুন' : 'Add New Book')}
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {editingBook ? editingBook.slug : 'new-book'}
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
              {/* Cover Image Upload & URL Section */}
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)]/50 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[var(--color-brand)]" />
                    <span>{isBangla ? 'বইয়ের প্রচ্ছদ ছবি (Book Cover Image)' : 'Book Cover Image'}</span>
                  </label>
                  {coverImage && (
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      {isBangla ? 'ছবি মুছুন' : 'Remove Cover'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                  <div className="w-24 h-32 mx-auto sm:mx-0 rounded-lg border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center overflow-hidden relative shadow-xs">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt="Book Cover Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-center p-2 text-[var(--text-muted)] space-y-1">
                        <BookMarked className="w-6 h-6 mx-auto opacity-40" />
                        <span className="text-[10px] block">{isBangla ? 'কোনো প্রচ্ছদ নেই' : 'No cover'}</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <div>
                      <input
                        type="text"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://... বা /images/books/book.jpg"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--color-brand)] outline-none"
                      />
                      <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                        {isBangla ? 'প্রচ্ছদের অনলাইন লিঙ্ক দিন অথবা ডিভাইস থেকে আপলোড করুন।' : 'Paste image URL or upload image file directly.'}
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
                        {isBangla ? 'ডিভাইস থেকে প্রচ্ছদ ছবি আপলোড করুন' : 'Upload Cover From Device'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">বইয়ের শিরোনাম / Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. কালান্তরের প্রতিচ্ছবি"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-serif focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">উপ-শিরোনাম / Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. নির্বাচিত সামাজিক ও ঐতিহাসিক আখ্যান"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">Slug (URL)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. kalantorer-proticchobi"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">লেখক / Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. রাকিব আসরার"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">ধরণ / Genre</label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="e.g. কথাসাহিত্য / প্রবন্ধ"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">প্রকাশক / Publisher</label>
                  <input
                    type="text"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="e.g. অবসর প্রকাশনা সংস্থা"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-bangla-sans focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">প্রকাশনার সাল / Year</label>
                  <input
                    type="number"
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">মূল্য (টাকা) / Price (BDT)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">পূর্বমূল্য / Original Price</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">স্ট্যাটাস / Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  >
                    <option value="available">Available (পাওয়া যাচ্ছে)</option>
                    <option value="coming-soon">Coming Soon (শীঘ্রই আসছে)</option>
                    <option value="unavailable">Unavailable (মুদ্রণ শেষ)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">ক্রয় লিংক / Rokomari or Purchase URL</label>
                  <input
                    type="url"
                    value={purchaseUrl}
                    onChange={(e) => setPurchaseUrl(e.target.value)}
                    placeholder="https://www.rokomari.com/book/..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-[var(--text-secondary)]">বইয়ের বিবরণ / Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="বইয়ের সংক্ষিপ্ত প্রেক্ষাপট ও পরিচয়..."
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
                  {isSaving ? (isBangla ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBangla ? 'সংরক্ষণ করুন' : 'Save Book')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={isBangla ? 'বইটি মুছে ফেলবেন?' : 'Confirm Delete Book'}
        description={
          isBangla 
            ? `আপনি কি "${deleteTarget?.title}" বইটি তালিকা থেকে মুছে ফেলতে চান?`
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
