import { BaseEntity } from './common';

export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  repliedAt?: string;
}
