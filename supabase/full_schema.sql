-- ==============================================================================
-- BDCON Labs — Complete Combined Supabase Schema (Stage 12A)
-- Run this in the Supabase Dashboard -> SQL Editor if you prefer executing
-- the full schema in a single batch.
-- ==============================================================================

-- STEP 1: Core Content, Author, Inquiries, and Settings Schema
\ir migrations/001_initial_schema.sql

-- STEP 2: Indexes and Constraints
\ir migrations/002_indexes_and_constraints.sql

-- STEP 3: Row-Level Security Policies & Roles
\ir migrations/003_rls_policies.sql

-- STEP 4: Storage Buckets & Policies
\ir migrations/004_storage.sql

-- STEP 5: Functions and Triggers
\ir migrations/005_functions_and_triggers.sql
