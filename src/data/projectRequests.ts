// ==============================================================================
// BDCON Labs — Project Requests Data Facade
// Stage 13: Centralized entry point for start-project intake submissions
// ==============================================================================

export {
  submitProjectRequest,
  submitProjectRequestService,
} from '../lib/supabase/services/projectRequests';
export type {
  ProjectRequestInput,
  ProjectSubmissionResult,
} from '../lib/supabase/services/projectRequests';
