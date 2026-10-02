export type ServiceIconType = 
  | 'globe' 
  | 'layout-dashboard' 
  | 'smartphone' 
  | 'code' 
  | 'palette' 
  | 'message-square';

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceApproachStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: ServiceIconType;
  category?: string;
  features: string[];
  useCases: string[];
  approach?: ServiceApproachStep[];
  deliverables?: ServiceDeliverable[];
  published: boolean;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  order: number;
}
