// ==============================================================================
// BDCON Labs — Contact Messages Data Facade
// Stage 13: Centralized entry point for contact form submissions
// ==============================================================================

export {
  submitContactMessage,
  submitContactMessageService,
} from '../lib/supabase/services/contactMessages';
export type {
  ContactMessageInput,
  ContactSubmissionResult,
} from '../lib/supabase/services/contactMessages';
