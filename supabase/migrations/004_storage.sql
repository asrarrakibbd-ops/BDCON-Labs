-- ==============================================================================
-- BDCON Labs — Supabase Database Migration
-- File: 004_storage.sql
-- Description: Supabase Storage Buckets and Asset Access Policies
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PROVISION STORAGE BUCKETS
-- Public asset buckets for product screenshots, portfolio media, book covers, etc.
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('public-assets', 'public-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('product-assets', 'product-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('portfolio-assets', 'portfolio-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('book-assets', 'book-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('writing-assets', 'writing-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('author-assets', 'author-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET 
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ------------------------------------------------------------------------------
-- 2. STORAGE ROW-LEVEL SECURITY POLICIES
-- Public: Read objects from public buckets
-- Admin: Insert, Update, Delete assets
-- ------------------------------------------------------------------------------

-- Allow public read access to all public BDCON Labs buckets
CREATE POLICY "Public can view assets in BDCON buckets"
    ON storage.objects
    FOR SELECT
    USING (
        bucket_id IN (
            'public-assets',
            'product-assets',
            'portfolio-assets',
            'book-assets',
            'writing-assets',
            'author-assets'
        )
    );

-- Allow authenticated administrators to upload assets
CREATE POLICY "Admins can upload assets to BDCON buckets"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id IN (
            'public-assets',
            'product-assets',
            'portfolio-assets',
            'book-assets',
            'writing-assets',
            'author-assets'
        ) AND
        public.is_admin()
    );

-- Allow authenticated administrators to update assets
CREATE POLICY "Admins can update assets in BDCON buckets"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
        bucket_id IN (
            'public-assets',
            'product-assets',
            'portfolio-assets',
            'book-assets',
            'writing-assets',
            'author-assets'
        ) AND
        public.is_admin()
    );

-- Allow authenticated administrators to delete assets
CREATE POLICY "Admins can delete assets in BDCON buckets"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id IN (
            'public-assets',
            'product-assets',
            'portfolio-assets',
            'book-assets',
            'writing-assets',
            'author-assets'
        ) AND
        public.is_admin()
    );
