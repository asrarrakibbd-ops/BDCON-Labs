import { BaseEntity, MetaData, Status } from './common';

export interface Author {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
}

export interface BlogPost extends BaseEntity {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  readingTimeMinutes: number;
  publishedAt: string;
  category: string;
  tags: string[];
  coverImageUrl?: string;
  status: Status;
  featured?: boolean;
  metadata?: MetaData;
}
