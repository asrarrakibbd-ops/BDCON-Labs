export interface BookEdition {
  format: 'hardcover' | 'paperback' | 'ebook' | 'pdf';
  isbn?: string;
  pages?: number;
  language: string;
}

export interface BookPurchaseLink {
  storeName: string;
  url: string;
  isDirect?: boolean;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  description?: string;
  excerpt?: string;
  coverImage?: string;
  coverImageUrl?: string; // backwards compatibility
  genre?: string;
  language?: 'bn' | 'en';
  publicationYear?: number;
  publishedYear?: number; // backwards compatibility
  isbn?: string;
  publisher?: string;
  pages?: number;
  price?: number;
  originalPrice?: number;
  stockCount?: number;
  availability?: 'available' | 'coming-soon' | 'unavailable';
  purchaseUrl?: string;
  purchaseLinks?: BookPurchaseLink[];
  featured?: boolean;
  order?: number;
  sourceUrl?: string;
  tableOfContents?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
}
