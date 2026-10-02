// ==============================================================================
// BDCON Labs — Supabase Database TypeScript Definitions
// Corresponds directly to SQL Schema in /supabase/migrations/
// ==============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string | null;
          short_description: string;
          description: string;
          category: string;
          platforms: string[];
          status: 'available' | 'coming_soon' | 'in_development' | 'archived';
          featured: boolean;
          logo_url: string | null;
          screenshot_url: string | null;
          website_url: string | null;
          android_url: string | null;
          ios_url: string | null;
          problem: string | null;
          solution: string | null;
          who_is_it_for: string[];
          features: string[];
          faqs: Json;
          pricing_plans: Json;
          meta_title: string | null;
          meta_description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline?: string | null;
          short_description: string;
          description: string;
          category: string;
          platforms?: string[];
          status?: 'available' | 'coming_soon' | 'in_development' | 'archived';
          featured?: boolean;
          logo_url?: string | null;
          screenshot_url?: string | null;
          website_url?: string | null;
          android_url?: string | null;
          ios_url?: string | null;
          problem?: string | null;
          solution?: string | null;
          who_is_it_for?: string[];
          features?: string[];
          faqs?: Json;
          pricing_plans?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      product_features: {
        Row: {
          id: string;
          product_id: string;
          title: string;
          description: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          title: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['product_features']['Insert']>;
      };
      product_screenshots: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string | null;
          caption: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url: string;
          alt_text?: string | null;
          caption?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['product_screenshots']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          slug: string;
          name: string;
          short_description: string;
          description: string;
          icon: string;
          category: string | null;
          features: string[];
          use_cases: string[];
          approach: Json;
          deliverables: Json;
          published: boolean;
          featured: boolean;
          sort_order: number;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          short_description: string;
          description: string;
          icon: string;
          category?: string | null;
          features?: string[];
          use_cases?: string[];
          approach?: Json;
          deliverables?: Json;
          published?: boolean;
          featured?: boolean;
          sort_order?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      portfolio_projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string;
          description: string | null;
          category: string;
          project_type: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          screenshots: string[];
          technologies: string[];
          platforms: string[];
          featured: boolean;
          client_name: string | null;
          client_visible: boolean;
          year: number | null;
          challenge: string | null;
          solution: string | null;
          outcome: string | null;
          key_features: string[];
          live_url: string | null;
          repository_url: string | null;
          status: 'live' | 'in-development' | 'archived';
          sort_order: number;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description: string;
          description?: string | null;
          category: string;
          project_type?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          screenshots?: string[];
          technologies?: string[];
          platforms?: string[];
          featured?: boolean;
          client_name?: string | null;
          client_visible?: boolean;
          year?: number | null;
          challenge?: string | null;
          solution?: string | null;
          outcome?: string | null;
          key_features?: string[];
          live_url?: string | null;
          repository_url?: string | null;
          status?: 'live' | 'in-development' | 'archived';
          sort_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['portfolio_projects']['Insert']>;
      };
      books: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          author: string;
          description: string | null;
          excerpt: string | null;
          cover_image_url: string | null;
          genre: string | null;
          language: string;
          publication_year: number | null;
          publication_date: string | null;
          publisher: string | null;
          isbn: string | null;
          edition: string | null;
          pages: number | null;
          price: number | null;
          original_price: number | null;
          stock_count: number;
          availability: 'available' | 'coming-soon' | 'unavailable';
          purchase_url: string | null;
          purchase_links: Json;
          table_of_contents: string[];
          featured: boolean;
          sort_order: number;
          source_url: string | null;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          author?: string;
          description?: string | null;
          excerpt?: string | null;
          cover_image_url?: string | null;
          genre?: string | null;
          language?: string;
          publication_year?: number | null;
          publication_date?: string | null;
          publisher?: string | null;
          isbn?: string | null;
          edition?: string | null;
          pages?: number | null;
          price?: number | null;
          original_price?: number | null;
          stock_count?: number;
          availability?: 'available' | 'coming-soon' | 'unavailable';
          purchase_url?: string | null;
          purchase_links?: Json;
          table_of_contents?: string[];
          featured?: boolean;
          sort_order?: number;
          source_url?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['books']['Insert']>;
      };
      writing_entries: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          excerpt: string | null;
          content: string | null;
          cover_image_url: string | null;
          category: string | null;
          language: string;
          published_at: string | null;
          reading_time_minutes: number;
          reading_time_text: string | null;
          featured: boolean;
          author: string;
          tags: string[];
          source_url: string | null;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          excerpt?: string | null;
          content?: string | null;
          cover_image_url?: string | null;
          category?: string | null;
          language?: string;
          published_at?: string | null;
          reading_time_minutes?: number;
          reading_time_text?: string | null;
          featured?: boolean;
          author?: string;
          tags?: string[];
          source_url?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['writing_entries']['Insert']>;
      };
      author_profiles: {
        Row: {
          id: string;
          name: string;
          display_name: string | null;
          legal_name: string | null;
          role: string | null;
          tagline: string | null;
          short_bio: string | null;
          biography: string | null;
          profile_image_url: string | null;
          education: string | null;
          profession: string | null;
          birth_date: string | null;
          birth_place: string | null;
          literary_interests: string[];
          social_links: Json;
          timeline: Json;
          testimonials: Json;
          contact_email: string | null;
          contact_phone: string | null;
          contact_address: string | null;
          website_url: string | null;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          display_name?: string | null;
          legal_name?: string | null;
          role?: string | null;
          tagline?: string | null;
          short_bio?: string | null;
          biography?: string | null;
          profile_image_url?: string | null;
          education?: string | null;
          profession?: string | null;
          birth_date?: string | null;
          birth_place?: string | null;
          literary_interests?: string[];
          social_links?: Json;
          timeline?: Json;
          testimonials?: Json;
          contact_email?: string | null;
          contact_phone?: string | null;
          contact_address?: string | null;
          website_url?: string | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['author_profiles']['Insert']>;
      };
      project_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          project_scope: string;
          budget_range: string;
          timeline: string;
          project_description: string;
          status: 'new' | 'reviewing' | 'contacted' | 'in_progress' | 'completed' | 'archived';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          project_scope: string;
          budget_range: string;
          timeline: string;
          project_description: string;
          status?: 'new' | 'reviewing' | 'contacted' | 'in_progress' | 'completed' | 'archived';
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['project_requests']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          status: 'new' | 'read' | 'replied' | 'archived';
          replied_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
          replied_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          company_name: string;
          tagline: string;
          core_message: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          whatsapp_number: string | null;
          location: string | null;
          social_links: Json;
          default_locale: string;
          default_theme: string;
          logo_url: string | null;
          favicon_url: string | null;
          default_seo_title: string | null;
          default_seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key?: string;
          company_name?: string;
          tagline?: string;
          core_message?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          whatsapp_number?: string | null;
          location?: string | null;
          social_links?: Json;
          default_locale?: string;
          default_theme?: string;
          logo_url?: string | null;
          favicon_url?: string | null;
          default_seo_title?: string | null;
          default_seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>;
      };
      admin_roles: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['admin_roles']['Insert']>;
      };
    };
  };
}
