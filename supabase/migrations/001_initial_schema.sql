-- ==============================================================================
-- BDCON Labs — Supabase Database Migration
-- File: 001_initial_schema.sql
-- Description: Core content, author, inquiries, and settings schema
-- Compatible with PostgreSQL 15+ / Supabase
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- Supports proprietary software products (e.g., BuildEst BD)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    platforms TEXT[] NOT NULL DEFAULT ARRAY['web']::TEXT[],
    status TEXT NOT NULL DEFAULT 'in_development', -- 'available', 'coming_soon', 'in_development'
    featured BOOLEAN NOT NULL DEFAULT false,
    logo_url TEXT,
    screenshot_url TEXT,
    website_url TEXT,
    android_url TEXT,
    ios_url TEXT,
    problem TEXT,
    solution TEXT,
    who_is_it_for TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    faqs JSONB DEFAULT '[]'::JSONB,
    pricing_plans JSONB DEFAULT '[]'::JSONB,
    meta_title TEXT,
    meta_description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Product Features (Optional relational breakdown)
CREATE TABLE IF NOT EXISTS public.product_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Product Screenshots
CREATE TABLE IF NOT EXISTS public.product_screenshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 2. SERVICES TABLE
-- Supports BDCON Labs engineering and consultation offerings
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL, -- 'globe', 'layout-dashboard', 'smartphone', 'code', 'palette', 'message-square'
    category TEXT,
    features TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    use_cases TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    approach JSONB DEFAULT '[]'::JSONB,
    deliverables JSONB DEFAULT '[]'::JSONB,
    published BOOLEAN NOT NULL DEFAULT true,
    featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 3. PORTFOLIO PROJECTS TABLE
-- Engineered systems, applications, and client case studies
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'product', 'web-application', 'mobile-application', 'website', 'custom-software', 'experiment'
    project_type TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    screenshots TEXT[] DEFAULT ARRAY[]::TEXT[],
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    platforms TEXT[] DEFAULT ARRAY['web']::TEXT[],
    featured BOOLEAN NOT NULL DEFAULT false,
    client_name TEXT,
    client_visible BOOLEAN NOT NULL DEFAULT false,
    year INTEGER,
    challenge TEXT,
    solution TEXT,
    outcome TEXT,
    key_features TEXT[] DEFAULT ARRAY[]::TEXT[],
    live_url TEXT,
    repository_url TEXT,
    status TEXT NOT NULL DEFAULT 'live', -- 'live', 'in-development', 'archived'
    sort_order INTEGER NOT NULL DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 4. BOOKS TABLE
-- Publications by Rakib Asrar (Porojibi, Tiler Chaya, etc.)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    author TEXT NOT NULL DEFAULT 'রাকিব আসরার',
    description TEXT,
    excerpt TEXT,
    cover_image_url TEXT,
    genre TEXT,
    language TEXT NOT NULL DEFAULT 'bn',
    publication_year INTEGER,
    publication_date DATE,
    publisher TEXT,
    isbn TEXT,
    edition TEXT,
    pages INTEGER,
    price NUMERIC(10, 2),
    original_price NUMERIC(10, 2),
    stock_count INTEGER DEFAULT 0,
    availability TEXT NOT NULL DEFAULT 'available', -- 'available', 'coming-soon', 'unavailable'
    purchase_url TEXT,
    purchase_links JSONB DEFAULT '[]'::JSONB,
    table_of_contents TEXT[] DEFAULT ARRAY[]::TEXT[],
    featured BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    source_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 5. WRITING ENTRIES TABLE
-- Long-form essays, reflections, and philosophical writings
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.writing_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    excerpt TEXT,
    content TEXT,
    cover_image_url TEXT,
    category TEXT,
    language TEXT NOT NULL DEFAULT 'bn',
    published_at TIMESTAMPTZ,
    reading_time_minutes INTEGER DEFAULT 5,
    reading_time_text TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    author TEXT NOT NULL DEFAULT 'রাকিব আসরার',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    source_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 6. AUTHOR PROFILES TABLE
-- Dedicated editorial author identity for Rakib Asrar
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.author_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    display_name TEXT,
    legal_name TEXT,
    role TEXT,
    tagline TEXT,
    short_bio TEXT,
    biography TEXT,
    profile_image_url TEXT,
    education TEXT,
    profession TEXT,
    birth_date TEXT,
    birth_place TEXT,
    literary_interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    social_links JSONB DEFAULT '[]'::JSONB,
    timeline JSONB DEFAULT '[]'::JSONB,
    testimonials JSONB DEFAULT '[]'::JSONB,
    contact_email TEXT,
    contact_phone TEXT,
    contact_address TEXT,
    website_url TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 7. PROJECT REQUESTS TABLE
-- Submissions from /start-project inquiry engine
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    project_scope TEXT NOT NULL, -- 'mvp_development', 'full_product_engineering', 'architecture_consulting', 'system_redesign', 'custom_software'
    budget_range TEXT NOT NULL, -- 'under_5k', '5k_to_15k', '15k_to_30k', '30k_plus', 'undecided'
    timeline TEXT NOT NULL, -- 'immediate', '1_to_3_months', '3_to_6_months', 'flexible'
    project_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'reviewing', 'contacted', 'in_progress', 'completed', 'archived'
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 8. CONTACT MESSAGES TABLE
-- Submissions from /contact form
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'read', 'replied', 'archived'
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 9. SITE SETTINGS TABLE
-- Global configuration, branding, metadata, and default locale
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL DEFAULT 'default',
    company_name TEXT NOT NULL DEFAULT 'BDCON Labs',
    tagline TEXT NOT NULL DEFAULT 'Software & Digital Products',
    core_message TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    whatsapp_number TEXT,
    location TEXT,
    social_links JSONB DEFAULT '[]'::JSONB,
    default_locale TEXT NOT NULL DEFAULT 'en',
    default_theme TEXT NOT NULL DEFAULT 'system',
    logo_url TEXT,
    favicon_url TEXT,
    default_seo_title TEXT,
    default_seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 10. ADMIN ROLES TABLE
-- Prepares Supabase Auth role-based authorization for future admin panel
-- Avoids hardcoded email checks or insecure string comparisons
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin', -- 'admin', 'super_admin', 'editor'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, role)
);
