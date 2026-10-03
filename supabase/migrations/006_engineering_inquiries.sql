-- ==============================================================================
-- BDCON Engineering Ltd — Database Migration
-- File: 006_engineering_inquiries.sql
-- Description: Dedicated table and RLS policies for engineering project enquiries
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENGINEERING INQUIRIES TABLE
-- Submissions from /engineering/contact inquiry form
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.engineering_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    project_location TEXT NOT NULL,
    project_type TEXT NOT NULL,
    building_area TEXT,
    required_service TEXT NOT NULL,
    description TEXT NOT NULL,
    preferred_contact TEXT NOT NULL DEFAULT 'email', -- 'email', 'phone', 'whatsapp'
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'reviewed', 'contacted', 'archived'
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 2. INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_engineering_inquiries_created_at 
    ON public.engineering_inquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_engineering_inquiries_status 
    ON public.engineering_inquiries (status);

CREATE INDEX IF NOT EXISTS idx_engineering_inquiries_required_service 
    ON public.engineering_inquiries (required_service);

CREATE INDEX IF NOT EXISTS idx_engineering_inquiries_email 
    ON public.engineering_inquiries (email);

-- ------------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- - Public / Anonymous: INSERT ONLY (Cannot select, update, or delete)
-- - Authenticated Administrators: Full SELECT / UPDATE / DELETE access
-- ------------------------------------------------------------------------------
ALTER TABLE public.engineering_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit engineering inquiries"
    ON public.engineering_inquiries
    FOR INSERT
    TO public
    WITH CHECK (
        length(name) >= 2 AND
        length(email) >= 5 AND
        length(phone) >= 3 AND
        length(project_location) >= 2 AND
        length(description) >= 10
    );

CREATE POLICY "Admins can view and manage engineering inquiries"
    ON public.engineering_inquiries
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
