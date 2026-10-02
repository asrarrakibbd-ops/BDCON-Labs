# BDCON Labs — Supabase Database Architecture & Security Foundation
**Stage 12A Documentation**

This document details the complete Supabase relational database schema, Row-Level Security (RLS) policies, storage buckets, migration ordering, and execution instructions for the BDCON Labs platform.

---

## 1. Migration Execution Order

All migration files are located in `supabase/migrations/` and should be executed in numerical order:

| Step | File | Description |
| :--- | :--- | :--- |
| **01** | `001_initial_schema.sql` | Creates all core tables, supporting tables, enums, foreign keys, and default values. |
| **02** | `002_indexes_and_constraints.sql` | Establishes query indexes for performance (slugs, statuses, categories, dates). |
| **03** | `003_rls_policies.sql` | Enables RLS on **every** table, creates the `is_admin()` security function, and restricts public access. |
| **04** | `004_storage.sql` | Provisions storage buckets with MIME type restrictions and public read / admin write policies. |
| **05** | `005_functions_and_triggers.sql` | Adds automated `handle_updated_at()` trigger on all mutable tables. |

*Alternative*: You may execute the single aggregated migration file `supabase/full_schema.sql` or copy/paste the individual files into **Supabase Dashboard → SQL Editor**.

---

## 2. Table Specifications & Relationships

### Core Content Tables

#### `products`
Stores proprietary software products engineered by BDCON Labs (e.g., BuildEst BD).
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `slug TEXT UNIQUE NOT NULL` — URL slug identifier
  * `name TEXT NOT NULL` — Display title
  * `tagline TEXT` — Promotional summary
  * `short_description TEXT NOT NULL`
  * `description TEXT NOT NULL`
  * `category TEXT NOT NULL`
  * `platforms TEXT[] DEFAULT ARRAY['web']`
  * `status TEXT DEFAULT 'in_development'` (`available`, `coming_soon`, `in_development`, `archived`)
  * `featured BOOLEAN DEFAULT false`
  * `logo_url`, `screenshot_url`, `website_url`, `android_url`, `ios_url`
  * `problem TEXT`, `solution TEXT`
  * `who_is_it_for TEXT[]`, `features TEXT[]`
  * `faqs JSONB`, `pricing_plans JSONB`
  * `sort_order INTEGER DEFAULT 0`
  * `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`

#### `product_features` (Relational)
* `id UUID PRIMARY KEY`, `product_id UUID REFERENCES products(id) ON DELETE CASCADE`
* `title TEXT NOT NULL`, `description TEXT`, `sort_order INTEGER`

#### `product_screenshots` (Relational)
* `id UUID PRIMARY KEY`, `product_id UUID REFERENCES products(id) ON DELETE CASCADE`
* `image_url TEXT NOT NULL`, `alt_text TEXT`, `caption TEXT`, `sort_order INTEGER`

#### `services`
Stores official BDCON Labs development and consultation capabilities.
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `slug TEXT UNIQUE NOT NULL`
  * `name TEXT NOT NULL`
  * `short_description TEXT NOT NULL`, `description TEXT NOT NULL`
  * `icon TEXT NOT NULL` (`globe`, `layout-dashboard`, `smartphone`, `code`, `palette`, `message-square`)
  * `category TEXT`
  * `features TEXT[]`, `use_cases TEXT[]`
  * `approach JSONB`, `deliverables JSONB`
  * `published BOOLEAN DEFAULT true`
  * `featured BOOLEAN DEFAULT false`
  * `sort_order INTEGER DEFAULT 0`
  * `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`

#### `portfolio_projects`
Engineered applications, systems, and case studies.
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `slug TEXT UNIQUE NOT NULL`
  * `title TEXT NOT NULL`
  * `short_description TEXT NOT NULL`, `description TEXT`
  * `category TEXT NOT NULL` (`product`, `web-application`, `mobile-application`, `website`, `custom-software`, `experiment`)
  * `project_type TEXT`
  * `logo_url`, `cover_image_url`, `screenshots TEXT[]`
  * `technologies TEXT[]`, `platforms TEXT[]`
  * `featured BOOLEAN DEFAULT false`
  * `client_name TEXT`, `client_visible BOOLEAN DEFAULT false`
  * `year INTEGER`, `challenge TEXT`, `solution TEXT`, `outcome TEXT`
  * `live_url TEXT`, `repository_url TEXT`
  * `status TEXT DEFAULT 'live'` (`live`, `in-development`, `archived`)
  * `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`

#### `books`
Publications by author Rakib Asrar (*Porojibi*, *Tiler Chaya*).
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `slug TEXT UNIQUE NOT NULL`
  * `title TEXT NOT NULL`, `subtitle TEXT`
  * `author TEXT DEFAULT 'রাকিব আসরার'`
  * `description TEXT`, `excerpt TEXT`
  * `cover_image_url TEXT`, `genre TEXT`, `language TEXT DEFAULT 'bn'`
  * `publication_year INTEGER`, `publication_date DATE`
  * `publisher TEXT`, `isbn TEXT`, `edition TEXT`, `pages INTEGER`
  * `price NUMERIC(10, 2)`, `original_price NUMERIC(10, 2)`, `stock_count INTEGER`
  * `availability TEXT DEFAULT 'available'` (`available`, `coming-soon`, `unavailable`)
  * `purchase_url TEXT`, `purchase_links JSONB`
  * `featured BOOLEAN DEFAULT true`, `sort_order INTEGER DEFAULT 0`
  * `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`

#### `writing_entries`
Long-form essays, reflections, and philosophical writings.
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `slug TEXT UNIQUE NOT NULL`
  * `title TEXT NOT NULL`, `subtitle TEXT`
  * `excerpt TEXT`, `content TEXT`
  * `cover_image_url TEXT`, `category TEXT`, `language TEXT DEFAULT 'bn'`
  * `published_at TIMESTAMPTZ`
  * `reading_time_minutes INTEGER DEFAULT 5`
  * `author TEXT DEFAULT 'রাকিব আসরার'`, `tags TEXT[]`
  * `featured BOOLEAN DEFAULT false`
  * `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`

#### `author_profiles`
Dedicated editorial author identity.
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `name TEXT NOT NULL`, `display_name TEXT`, `legal_name TEXT`
  * `role TEXT`, `tagline TEXT`, `short_bio TEXT`, `biography TEXT`
  * `profile_image_url TEXT`, `education TEXT`, `profession TEXT`
  * `birth_date TEXT`, `birth_place TEXT`
  * `literary_interests TEXT[]`
  * `social_links JSONB`, `timeline JSONB`, `testimonials JSONB`
  * `contact_email TEXT`, `contact_phone TEXT`, `contact_address TEXT`
  * `is_primary BOOLEAN DEFAULT true`

---

### Inquiries & Communications Tables

#### `project_requests` (`/start-project`)
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `name TEXT NOT NULL`, `email TEXT NOT NULL`, `phone TEXT`, `company TEXT`
  * `project_scope TEXT NOT NULL`
  * `budget_range TEXT NOT NULL`
  * `timeline TEXT NOT NULL`
  * `project_description TEXT NOT NULL`
  * `status TEXT DEFAULT 'new'` (`new`, `reviewing`, `contacted`, `in_progress`, `completed`, `archived`)
  * `admin_notes TEXT`
  * `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`

#### `contact_messages` (`/contact`)
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `name TEXT NOT NULL`, `email TEXT NOT NULL`, `phone TEXT`
  * `subject TEXT NOT NULL`, `message TEXT NOT NULL`
  * `status TEXT DEFAULT 'new'` (`new`, `read`, `replied`, `archived`)
  * `replied_at TIMESTAMPTZ`
  * `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`

#### `site_settings`
* **Primary Key**: `id UUID DEFAULT gen_random_uuid()`
* **Key Columns**:
  * `key TEXT UNIQUE NOT NULL DEFAULT 'default'`
  * `company_name TEXT NOT NULL`, `tagline TEXT NOT NULL`
  * `core_message TEXT`, `contact_email TEXT`, `contact_phone TEXT`, `whatsapp_number TEXT`
  * `location TEXT`, `social_links JSONB`
  * `default_locale TEXT DEFAULT 'en'`, `default_theme TEXT DEFAULT 'system'`
  * `logo_url TEXT`, `favicon_url TEXT`

---

## 3. Security Foundation & Row-Level Security (RLS)

RLS is **strictly enabled** on all 12 tables.

### Security Design Rules

1. **Public Read-Only Access**:
   * Visitors can `SELECT` published services (`published = true`), active products (`status != 'archived'`), active portfolio projects (`status != 'archived'`), available books (`availability != 'unavailable'`), published writings, and primary author profile.
2. **Form Inquiries Restricted to INSERT ONLY**:
   * Anonymous and public users can **only `INSERT`** into `project_requests` and `contact_messages`.
   * Public users **cannot `SELECT`, `UPDATE`, or `DELETE`** any submissions. This prevents competitors or unauthorized visitors from scraping customer inquiries or lead data.
3. **Role-Based Admin Access**:
   * No hardcoded email checks (e.g. `admin@example.com`).
   * Supabase Auth user IDs are assigned roles via the `admin_roles` table (`user_id`, `role IN ('admin', 'super_admin', 'editor')`).
   * The `public.is_admin()` function verifies administrative status securely via `SECURITY DEFINER`.

---

## 4. Supabase Storage Architecture

Six dedicated buckets are provisioned with 10MB file limits and image MIME restrictions:

* **`product-assets`**: Screenshots, logos, and UI diagrams for products (e.g. `buildest-bd/ui-preview.webp`)
* **`portfolio-assets`**: Project hero covers and architecture diagrams (`project-slug/cover.webp`)
* **`book-assets`**: High-resolution book covers and promotional media (`book-slug/cover.webp`)
* **`writing-assets`**: Editorial featured images for essays (`writing-slug/cover.webp`)
* **`author-assets`**: Author portraits and editorial photography (`profile/portrait.webp`)
* **`public-assets`**: General branding, logos, and icons

**Storage Security**:
* Public `SELECT` allowed on all media buckets for CDN delivery.
* `INSERT`, `UPDATE`, `DELETE` restricted to authenticated administrators verified via `public.is_admin()`.

---

## 5. Client & Data-Access Layer

The frontend application uses a centralized architecture:
* Client initialization: `src/lib/supabase/client.ts`
* Type definitions: `src/lib/supabase/types.ts`
* Modular data access services:
  * `src/lib/supabase/services/products.ts`
  * `src/lib/supabase/services/services.ts`
  * `src/lib/supabase/services/portfolio.ts`
  * `src/lib/supabase/services/books.ts`
  * `src/lib/supabase/services/writing.ts`
  * `src/lib/supabase/services/author.ts`
  * `src/lib/supabase/services/projectRequests.ts`
  * `src/lib/supabase/services/contactMessages.ts`
  * `src/lib/supabase/services/settings.ts`

**Static Fallback Policy (Stage 12A)**:
During Stage 12A, all service methods test for Supabase table availability and fall back gracefully to the validated static repositories in `src/data/`. No existing frontend pages break or display blank screens while remote tables are being initialized.
