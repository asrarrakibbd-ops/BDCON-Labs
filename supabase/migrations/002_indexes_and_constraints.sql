-- ==============================================================================
-- BDCON Labs — Supabase Database Migration
-- File: 002_indexes_and_constraints.sql
-- Description: Performance query indexes and relationship constraints
-- ==============================================================================

-- 1. Products Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON public.products(sort_order);

CREATE INDEX IF NOT EXISTS idx_product_features_product_id ON public.product_features(product_id);
CREATE INDEX IF NOT EXISTS idx_product_features_sort_order ON public.product_features(sort_order);

CREATE INDEX IF NOT EXISTS idx_product_screenshots_product_id ON public.product_screenshots(product_id);
CREATE INDEX IF NOT EXISTS idx_product_screenshots_sort_order ON public.product_screenshots(sort_order);

-- 2. Services Indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(published);
CREATE INDEX IF NOT EXISTS idx_services_featured ON public.services(featured);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON public.services(sort_order);

-- 3. Portfolio Projects Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON public.portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON public.portfolio_projects(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON public.portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort_order ON public.portfolio_projects(sort_order);

-- 4. Books Indexes
CREATE INDEX IF NOT EXISTS idx_books_slug ON public.books(slug);
CREATE INDEX IF NOT EXISTS idx_books_availability ON public.books(availability);
CREATE INDEX IF NOT EXISTS idx_books_featured ON public.books(featured);
CREATE INDEX IF NOT EXISTS idx_books_publication_year ON public.books(publication_year);
CREATE INDEX IF NOT EXISTS idx_books_sort_order ON public.books(sort_order);

-- 5. Writing Entries Indexes
CREATE INDEX IF NOT EXISTS idx_writing_slug ON public.writing_entries(slug);
CREATE INDEX IF NOT EXISTS idx_writing_category ON public.writing_entries(category);
CREATE INDEX IF NOT EXISTS idx_writing_featured ON public.writing_entries(featured);
CREATE INDEX IF NOT EXISTS idx_writing_published_at ON public.writing_entries(published_at DESC NULLS LAST);

-- 6. Author Profile Indexes
CREATE INDEX IF NOT EXISTS idx_author_profiles_is_primary ON public.author_profiles(is_primary);

-- 7. Project Requests Indexes (Admin filtering & queue management)
CREATE INDEX IF NOT EXISTS idx_project_requests_status ON public.project_requests(status);
CREATE INDEX IF NOT EXISTS idx_project_requests_created_at ON public.project_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_requests_email ON public.project_requests(email);

-- 8. Contact Messages Indexes (Admin filtering & queue management)
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);

-- 9. Admin Roles Indexes
CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON public.admin_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_roles_role ON public.admin_roles(role);
