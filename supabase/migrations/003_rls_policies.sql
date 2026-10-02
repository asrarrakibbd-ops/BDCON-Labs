-- ==============================================================================
-- BDCON Labs — Supabase Database Migration
-- File: 003_rls_policies.sql
-- Description: Complete Row-Level Security (RLS) policies and Role-Based Access Control
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. HELPER FUNCTION: is_admin()
-- Verifies whether current authenticated user has administrative privileges
-- Avoids hardcoded email checks or vulnerable client-supplied claims
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'super_admin', 'editor')
  );
$$;

-- ------------------------------------------------------------------------------
-- 2. ENABLE ROW-LEVEL SECURITY ON ALL TABLES
-- Mandatory security hardening for every application table
-- ------------------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.author_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. PRODUCTS POLICIES
-- Public: Read non-archived products
-- Admin: Full access
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view active products"
    ON public.products
    FOR SELECT
    USING (status != 'archived');

CREATE POLICY "Admins have full access to products"
    ON public.products
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Product Features
CREATE POLICY "Public can view product features"
    ON public.product_features
    FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to product features"
    ON public.product_features
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Product Screenshots
CREATE POLICY "Public can view product screenshots"
    ON public.product_screenshots
    FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to product screenshots"
    ON public.product_screenshots
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 4. SERVICES POLICIES
-- Public: Read published services
-- Admin: Full access
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view published services"
    ON public.services
    FOR SELECT
    USING (published = true);

CREATE POLICY "Admins have full access to services"
    ON public.services
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. PORTFOLIO PROJECTS POLICIES
-- Public: Read non-archived portfolio projects
-- Admin: Full access
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view active portfolio projects"
    ON public.portfolio_projects
    FOR SELECT
    USING (status != 'archived');

CREATE POLICY "Admins have full access to portfolio projects"
    ON public.portfolio_projects
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 6. BOOKS POLICIES
-- Public: Read catalog books
-- Admin: Full access
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view catalog books"
    ON public.books
    FOR SELECT
    USING (availability != 'unavailable');

CREATE POLICY "Admins have full access to books"
    ON public.books
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 7. WRITING ENTRIES POLICIES
-- Public: Read published writing entries
-- Admin: Full access
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view published writing entries"
    ON public.writing_entries
    FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to writing entries"
    ON public.writing_entries
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 8. AUTHOR PROFILES POLICIES
-- Public: Read author profiles
-- Admin: Full access
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view primary author profile"
    ON public.author_profiles
    FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to author profiles"
    ON public.author_profiles
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 9. PROJECT REQUESTS POLICIES (/start-project)
-- Public / Anon: INSERT ONLY (Cannot read, update, or delete submissions)
-- Admin: Full read/management access
-- ------------------------------------------------------------------------------
CREATE POLICY "Anyone can submit project requests"
    ON public.project_requests
    FOR INSERT
    TO public
    WITH CHECK (
        length(name) >= 2 AND
        length(email) >= 5 AND
        length(project_description) >= 10
    );

CREATE POLICY "Admins can view and manage project requests"
    ON public.project_requests
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 10. CONTACT MESSAGES POLICIES (/contact)
-- Public / Anon: INSERT ONLY (Cannot read, update, or delete messages)
-- Admin: Full read/management access
-- ------------------------------------------------------------------------------
CREATE POLICY "Anyone can submit contact messages"
    ON public.contact_messages
    FOR INSERT
    TO public
    WITH CHECK (
        length(name) >= 2 AND
        length(email) >= 5 AND
        length(subject) >= 2 AND
        length(message) >= 5
    );

CREATE POLICY "Admins can view and manage contact messages"
    ON public.contact_messages
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 11. SITE SETTINGS POLICIES
-- Public: Read site settings
-- Admin: Full access
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view site settings"
    ON public.site_settings
    FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to site settings"
    ON public.site_settings
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 12. ADMIN ROLES POLICIES
-- Authenticated users: Read own role
-- Super Admins: Manage admin roles
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own role"
    ON public.admin_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage admin roles"
    ON public.admin_roles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles
            WHERE user_id = auth.uid() AND role = 'super_admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_roles
            WHERE user_id = auth.uid() AND role = 'super_admin'
        )
    );
