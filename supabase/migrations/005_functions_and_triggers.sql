-- ==============================================================================
-- BDCON Labs — Supabase Database Migration
-- File: 005_functions_and_triggers.sql
-- Description: Reusable automated triggers and maintenance functions
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. REUSABLE UPDATED_AT TRIGGER FUNCTION
-- Automatically sets updated_at to UTC timestamp whenever a row is modified
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$;

-- ------------------------------------------------------------------------------
-- 2. ATTACH TRIGGERS TO APPLICATION TABLES
-- ------------------------------------------------------------------------------

-- Products
DROP TRIGGER IF EXISTS tr_products_updated_at ON public.products;
CREATE TRIGGER tr_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Services
DROP TRIGGER IF EXISTS tr_services_updated_at ON public.services;
CREATE TRIGGER tr_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Portfolio Projects
DROP TRIGGER IF EXISTS tr_portfolio_updated_at ON public.portfolio_projects;
CREATE TRIGGER tr_portfolio_updated_at
    BEFORE UPDATE ON public.portfolio_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Books
DROP TRIGGER IF EXISTS tr_books_updated_at ON public.books;
CREATE TRIGGER tr_books_updated_at
    BEFORE UPDATE ON public.books
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Writing Entries
DROP TRIGGER IF EXISTS tr_writing_updated_at ON public.writing_entries;
CREATE TRIGGER tr_writing_updated_at
    BEFORE UPDATE ON public.writing_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Author Profiles
DROP TRIGGER IF EXISTS tr_author_profiles_updated_at ON public.author_profiles;
CREATE TRIGGER tr_author_profiles_updated_at
    BEFORE UPDATE ON public.author_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Project Requests
DROP TRIGGER IF EXISTS tr_project_requests_updated_at ON public.project_requests;
CREATE TRIGGER tr_project_requests_updated_at
    BEFORE UPDATE ON public.project_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Contact Messages
DROP TRIGGER IF EXISTS tr_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER tr_contact_messages_updated_at
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Site Settings
DROP TRIGGER IF EXISTS tr_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER tr_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
