import { BaseEntity } from './common';

export type ProjectScope = 
  | 'mvp_development'
  | 'full_product_engineering'
  | 'architecture_consulting'
  | 'system_redesign'
  | 'custom_software';

export type BudgetRange =
  | 'under_5k'
  | '5k_to_15k'
  | '15k_to_30k'
  | '30k_plus'
  | 'undecided';

export type TimelineExpectation =
  | 'immediate'
  | '1_to_3_months'
  | '3_to_6_months'
  | 'flexible';

export interface ProjectRequest extends BaseEntity {
  name: string;
  email: string;
  company?: string;
  projectScope: ProjectScope;
  budgetRange: BudgetRange;
  timeline: TimelineExpectation;
  projectDescription: string;
  status: 'new' | 'reviewed' | 'in_discussion' | 'accepted' | 'declined';
  notes?: string;
}
