export interface WritingEntry {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  publishedAt?: string;
  readingTime?: string;
  readingTimeMinutes?: number;
  featured?: boolean;
  author?: string;
  language?: 'bn' | 'en';
  tags?: string[];
  sourceUrl?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}
