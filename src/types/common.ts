/**
 * Common shared types across BDCON Labs data layer
 */

export type EntityId = string;

export interface BaseEntity {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
}

export type Status = 'draft' | 'published' | 'archived';

export interface MetaData {
  title?: string;
  description?: string;
  ogImage?: string;
  keywords?: string[];
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
