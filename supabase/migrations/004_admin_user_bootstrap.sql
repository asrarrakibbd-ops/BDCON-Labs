-- ==============================================================================
-- BDCON Labs — Supabase Database Migration
-- File: 004_admin_user_bootstrap.sql
-- Description: Indexes, security helper procedures, and bootstrap role guidance
-- ==============================================================================

-- 1. Performance Indexes for Admin Inquiries Management
CREATE INDEX IF NOT EXISTS idx_project_requests_status ON public.project_requests(status);
CREATE INDEX IF NOT EXISTS idx_project_requests_created_at ON public.project_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON public.admin_roles(user_id);

-- ------------------------------------------------------------------------------
-- 2. ADMIN USER BOOTSTRAP INSTRUCTIONS (Run in Supabase Dashboard)
-- ------------------------------------------------------------------------------
-- STEP 1: In Supabase Dashboard -> Authentication -> Users -> Add User (Create User)
-- Enter the desired admin email (e.g. admin@bdconlabs.com) and a strong password.
--
-- STEP 2: In Supabase Dashboard -> SQL Editor, run the following statement to assign
-- the 'admin' role to that user by their email address:
--
-- INSERT INTO public.admin_roles (user_id, role)
-- SELECT id, 'admin'
-- FROM auth.users
-- WHERE email = 'admin@bdconlabs.com' -- Replace with your actual admin email
-- ON CONFLICT (user_id, role) DO NOTHING;
--
-- STEP 3: Now navigate to /admin/login on the BDCON Labs website and sign in.
-- You will have full access to /admin, /admin/project-requests, /admin/messages, etc.
-- ------------------------------------------------------------------------------
