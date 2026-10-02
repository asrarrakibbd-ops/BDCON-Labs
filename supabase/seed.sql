-- ==============================================================================
-- BDCON Labs — Supabase Content Seed Script (Stage 12B)
-- Description: Migrates genuine existing website content into Supabase
-- Run this directly in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- Safe to run multiple times (uses ON CONFLICT DO UPDATE)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PRODUCTS (BuildEst BD)
-- ------------------------------------------------------------------------------
INSERT INTO public.products (
    slug,
    name,
    tagline,
    short_description,
    description,
    category,
    platforms,
    status,
    featured,
    logo_url,
    screenshot_url,
    website_url,
    android_url,
    ios_url,
    problem,
    solution,
    who_is_it_for,
    features,
    faqs,
    pricing_plans,
    meta_title,
    meta_description,
    sort_order
) VALUES (
    'buildest-bd',
    'BuildEst BD',
    'Professional building estimation and quantity surveying software',
    'Professional software for construction estimation, quantity surveying, measurement, and BOQ generation for construction professionals and builders.',
    'BuildEst BD is a purpose-built software product developed by BDCON Labs for construction estimation, quantity surveying, structural measurement, and automated BOQ preparation. Designed specifically to solve accurate cost forecasting and takeoff workflows for construction professionals.',
    'Construction & Estimation',
    ARRAY['web', 'android']::TEXT[],
    'in_development',
    true,
    NULL,
    NULL,
    '',
    '',
    '',
    'Manual construction estimating and material takeoff are slow, error-prone, and lead to costly budget overruns on job sites due to formula discrepancies and unstandardized calculation sheets.',
    'BuildEst BD delivers a structured quantity surveying and estimation engine that automates measurement analysis, streamlines takeoff routines, and generates standardized BOQs with speed and precision.',
    ARRAY[
        'Civil Engineers',
        'Quantity Surveyors',
        'Estimators',
        'Contractors',
        'Construction Professionals'
    ]::TEXT[],
    ARRAY[
        'Construction estimation',
        'Quantity surveying & measurement',
        'Automated BOQ generation',
        'Civil engineering workflows'
    ]::TEXT[],
    '[
        {
            "id": "faq-1",
            "question": "What is BuildEst BD?",
            "answer": "BuildEst BD is a specialized digital estimation and quantity surveying software created by BDCON Labs for civil engineers, quantity surveyors, and builders to streamline structural calculations, takeoff measurement, and bill of quantities (BOQ) preparation."
        },
        {
            "id": "faq-2",
            "question": "What platforms will BuildEst BD support?",
            "answer": "BuildEst BD is designed to run across modern web browsers and Android mobile devices, enabling engineers to access estimate schedules and takeoff data both in the office and directly on job sites."
        },
        {
            "id": "faq-3",
            "question": "How does BuildEst BD improve BOQ preparation?",
            "answer": "BuildEst BD automates the transformation of dimensional measurements into formatted BOQ schedules, reducing manual transposition errors and saving hours of repetitive spreadsheet entry."
        }
    ]'::JSONB,
    '[]'::JSONB,
    'BuildEst BD — Construction Estimation Software | BDCON Labs',
    'Professional building estimation, quantity surveying, and automated BOQ software by BDCON Labs for civil engineers, contractors, and construction professionals.',
    1
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    platforms = EXCLUDED.platforms,
    status = EXCLUDED.status,
    featured = EXCLUDED.featured,
    problem = EXCLUDED.problem,
    solution = EXCLUDED.solution,
    who_is_it_for = EXCLUDED.who_is_it_for,
    features = EXCLUDED.features,
    faqs = EXCLUDED.faqs,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    sort_order = EXCLUDED.sort_order;

-- Relational Product Features for BuildEst BD
DELETE FROM public.product_features WHERE product_id IN (SELECT id FROM public.products WHERE slug = 'buildest-bd');
INSERT INTO public.product_features (product_id, title, description, sort_order)
SELECT id, 'Construction Estimation Engine', 'Structured calculation workflows designed specifically for building construction, structural elements, masonry, reinforcement, and architectural finishes.', 1
FROM public.products WHERE slug = 'buildest-bd'
UNION ALL
SELECT id, 'Quantity Surveying & Measurement', 'Streamlined dimension takeoff schedules, audit-ready item measurements, and formula-backed verification routines for bill accuracy.', 2
FROM public.products WHERE slug = 'buildest-bd'
UNION ALL
SELECT id, 'Automated BOQ Generation', 'Instant compilation of bills of quantities with standardized formatting, rate analysis breakdowns, and exportable engineering summaries.', 3
FROM public.products WHERE slug = 'buildest-bd'
UNION ALL
SELECT id, 'Civil Engineering Workflows', 'Tailored to Bangladesh and regional building standards, material specifications, and actual site management practices.', 4
FROM public.products WHERE slug = 'buildest-bd';

-- ------------------------------------------------------------------------------
-- 2. SERVICES (6 Genuine Engineering & Consultation Offerings)
-- ------------------------------------------------------------------------------
INSERT INTO public.services (
    slug,
    name,
    short_description,
    description,
    icon,
    category,
    features,
    use_cases,
    published,
    featured,
    sort_order,
    meta_title,
    meta_description
) VALUES 
(
    'web-development',
    'Web Application Development',
    'Modern, fast, and maintainable web applications built with clean architecture and responsive user interfaces.',
    'We engineer production-ready web applications that balance robust backend capabilities with responsive, accessible user interfaces. Every application is designed with modular codebases, clean component hierarchies, and resilient error boundaries to support growing businesses.',
    'globe',
    'Core Engineering',
    ARRAY[
        'Custom web application engineering from foundation to deployment',
        'Responsive, accessible, mobile-first design implementations',
        'Performance optimization and modern bundle delivery',
        'Secure API integration and real-time state synchronization',
        'Comprehensive automated testing and CI/CD deployment pipelines'
    ]::TEXT[],
    ARRAY[
        'Customer-facing digital products',
        'SaaS applications and platforms',
        'Self-service customer portals',
        'Interactive administrative web tools',
        'Dynamic multi-tenant business systems'
    ]::TEXT[],
    true,
    true,
    1,
    'Web Application Development — BDCON Labs',
    'Engineering modern, high-performance web applications tailored to operational requirements.'
),
(
    'dashboard-internal-tools',
    'Dashboards & Internal Tools',
    'Custom administrative dashboards, monitoring interfaces, and internal tooling to streamline operations.',
    'Operational bottlenecks cost time and introduce errors. We design and develop bespoke administrative panels, workflow dashboards, and operational monitors that provide clear data visibility and empower non-technical teams to manage complex day-to-day operations with confidence.',
    'layout-dashboard',
    'Business Operations',
    ARRAY[
        'Custom administrative panels with role-based access control (RBAC)',
        'Operational dashboards with clear typographic data hierarchies',
        'Data table management with search, multi-column sorting, and export',
        'Workflow automation tools and approval pipelines',
        'System monitoring, auditing, and activity logging'
    ]::TEXT[],
    ARRAY[
        'Internal company administration',
        'Operational workflow management',
        'Data analytics and business intelligence',
        'Inventory and resource tracking',
        'Customer service and ticket triage'
    ]::TEXT[],
    true,
    true,
    2,
    'Dashboards & Internal Tools — BDCON Labs',
    'Custom internal business tools and administrative dashboards engineered for operational efficiency.'
),
(
    'mobile-app-development',
    'Mobile Application Engineering',
    'Pragmatic Android and multi-platform mobile solutions designed for real-world reliability and ease of use.',
    'Whether your workforce is on a job site or your customers are on the move, we develop performant, reliable mobile applications. We focus on lightweight architectures, offline capability, responsive touch interactions, and seamless synchronization with cloud infrastructure.',
    'smartphone',
    'Mobile Engineering',
    ARRAY[
        'Native and cross-platform mobile application development',
        'Offline-first data architectures and background synchronization',
        'Intuitive touch interfaces optimized for diverse screen sizes',
        'Device hardware integration (camera, location, local storage)',
        'Play Store deployment, release management, and updates'
    ]::TEXT[],
    ARRAY[
        'Field operations and site inspection tools',
        'On-the-go utility and calculator apps',
        'Mobile customer portals',
        'Data collection and survey applications',
        'Companion apps for web systems'
    ]::TEXT[],
    true,
    true,
    3,
    'Mobile Application Development — BDCON Labs',
    'Reliable Android and multi-platform mobile applications for field operations and consumer use.'
),
(
    'custom-software',
    'Custom Software Engineering',
    'Tailored software solutions designed around unique business requirements, complex rules, and domain workflows.',
    'Off-the-shelf software often fails to address unique organizational constraints and specialized industry logic. We architect and implement bespoke software solutions designed specifically around your domain rules, operational workflows, and integration requirements.',
    'code',
    'Custom Engineering',
    ARRAY[
        'Bespoke software architecture engineered around domain logic',
        'Legacy workflow digitization and data migration',
        'Custom calculation, billing, and estimation engines',
        'Third-party system integrations and bespoke webhooks',
        'Scalable relational and document database architectures'
    ]::TEXT[],
    ARRAY[
        'Specialized industry calculation engines',
        'Proprietary workflow management systems',
        'Legacy manual process automation',
        'Multi-system integration middleware',
        'Bespoke enterprise utility tools'
    ]::TEXT[],
    true,
    false,
    4,
    'Custom Software Engineering — BDCON Labs',
    'Tailored software solutions engineered around proprietary workflows and unique domain requirements.'
),
(
    'architecture-consulting',
    'Technical Architecture & System Design',
    'Scalable system design, technology evaluation, database modeling, and technical roadmaps.',
    'Sound architecture is the difference between a product that scales smoothly and one that requires painful, costly rewrites. We analyze technical requirements, evaluate trade-offs, design clean system topologies, and provide actionable technical blueprints for your engineering team.',
    'palette',
    'Consulting & Strategy',
    ARRAY[
        'End-to-end system architecture blueprinting and diagramming',
        'Relational and non-relational database schema design',
        'Technology stack evaluation, prototyping, and recommendation',
        'Security auditing, API design, and authentication flows',
        'Scalability planning and technical debt reduction strategies'
    ]::TEXT[],
    ARRAY[
        'New product conceptualization and technical scoping',
        'Pre-development architecture validation',
        'Refactoring planning for scaling systems',
        'Technical due diligence and stack migration',
        'High-level engineering leadership advisory'
    ]::TEXT[],
    true,
    false,
    5,
    'Technical Architecture & System Design — BDCON Labs',
    'Pragmatic architectural blueprints, database modeling, and system design for sustainable software.'
),
(
    'code-modernization',
    'Consulting & Code Modernization',
    'Practical guidance for turning a software idea, manual workflow or business requirement into a clear digital solution.',
    'Before writing code, technical clarity is essential. BDCON Labs works alongside founders, executives, and department leads to evaluate technical feasibility, define minimal viable scopes, and architect sustainable development roadmaps.',
    'message-square',
    'Consulting & Strategy',
    ARRAY[
        'Technical feasibility and operational complexity analysis',
        'Requirement scoping and pragmatic MVP definition',
        'System architecture blueprinting and data modeling',
        'Technology stack evaluation and selection',
        'Phased implementation timelines and risk mitigation'
    ]::TEXT[],
    ARRAY[
        'Product planning',
        'Feature planning',
        'Technical architecture',
        'Workflow digitization',
        'MVP planning & scoping'
    ]::TEXT[],
    true,
    true,
    6,
    'Software Consultation — BDCON Labs',
    'Pragmatic technical guidance and architecture consultation for software products by BDCON Labs.'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    category = EXCLUDED.category,
    features = EXCLUDED.features,
    use_cases = EXCLUDED.use_cases,
    published = EXCLUDED.published,
    featured = EXCLUDED.featured,
    sort_order = EXCLUDED.sort_order,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description;

-- ------------------------------------------------------------------------------
-- 3. PORTFOLIO PROJECTS
-- ------------------------------------------------------------------------------
INSERT INTO public.portfolio_projects (
    slug,
    title,
    short_description,
    description,
    category,
    project_type,
    logo_url,
    cover_image_url,
    screenshots,
    technologies,
    platforms,
    featured,
    client_name,
    client_visible,
    year,
    challenge,
    solution,
    outcome,
    key_features,
    live_url,
    repository_url,
    status,
    sort_order,
    seo_title,
    seo_description
) VALUES (
    'buildest-bd',
    'BuildEst BD',
    'Professional building estimation and quantity surveying software engineered for civil engineers, quantity surveyors, and construction builders.',
    'BuildEst BD is a purpose-built software product developed by BDCON Labs for construction estimation, quantity surveying, structural measurement, and automated BOQ preparation. Designed specifically to solve accurate cost forecasting and takeoff workflows for construction professionals.',
    'product',
    'Proprietary Software Product',
    NULL,
    NULL,
    ARRAY[]::TEXT[],
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Android', 'Vite']::TEXT[],
    ARRAY['web', 'android']::TEXT[],
    true,
    NULL,
    false,
    2026,
    'Manual construction estimating and material takeoff are slow, error-prone, and lead to costly budget overruns on job sites due to formula discrepancies and unstandardized calculation sheets.',
    'BuildEst BD delivers a structured quantity surveying and estimation engine that automates measurement analysis, streamlines takeoff routines, and generates standardized BOQs with speed and precision.',
    'Standardizes estimating accuracy, reduces manual spreadsheet transposition errors by an estimated 80%, and enables rapid turnaround on formal bids.',
    ARRAY[
        'Construction estimation calculation workflows',
        'Quantity surveying & audit-ready material takeoff schedules',
        'Automated BOQ generation and rate analyses',
        'Multi-platform accessibility across Web and Android devices'
    ]::TEXT[],
    NULL,
    NULL,
    'in-development',
    1,
    'BuildEst BD — Case Study & Project Details | BDCON Labs',
    'Explore BuildEst BD: Professional construction estimation and automated BOQ generation software engineered by BDCON Labs.'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    project_type = EXCLUDED.project_type,
    technologies = EXCLUDED.technologies,
    platforms = EXCLUDED.platforms,
    featured = EXCLUDED.featured,
    year = EXCLUDED.year,
    challenge = EXCLUDED.challenge,
    solution = EXCLUDED.solution,
    outcome = EXCLUDED.outcome,
    key_features = EXCLUDED.key_features,
    status = EXCLUDED.status,
    sort_order = EXCLUDED.sort_order,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

-- ------------------------------------------------------------------------------
-- 4. BOOKS (Rakib Asrar Publications)
-- ------------------------------------------------------------------------------
INSERT INTO public.books (
    slug,
    title,
    subtitle,
    author,
    description,
    excerpt,
    cover_image_url,
    genre,
    language,
    publication_year,
    publisher,
    isbn,
    edition,
    pages,
    price,
    original_price,
    stock_count,
    availability,
    purchase_url,
    purchase_links,
    table_of_contents,
    featured,
    sort_order,
    source_url,
    seo_title,
    seo_description
) VALUES 
(
    'porojibi',
    'পরজীবী',
    'গল্পগ্রন্থ · ছোটগল্প সংকলন',
    'রাকিব আসরার',
    'পরজীবী রাকিব আসরারের প্রথম প্রকাশিত গল্পগ্রন্থ। মানুষের মনের সূক্ষ্ম অনুভূতি, সম্পর্কের অদৃশ্য জটিলতা, টানাপোড়েন এবং অস্তিত্বের সংকটকে উপজীব্য করে রচিত বাস্তবধর্মী ছোটগল্পের সংকলন। সমসাময়িক জীবনের মনস্তাত্ত্বিক দ্বন্দ্ব ও সামাজিক টানাপোড়েন অত্যন্ত দরদ ও বাস্তবতার সাথে এই বইটিতে ফুটে উঠেছে।',
    'মানুষ কি নিজেই নিজের কাছে কখনো পরজীবী হয়ে ওঠে? যে অনুভূতিগুলোকে আমরা লালন করি, তা কি সত্যিই আমাদের—নাকি অন্য কারও ছায়া আমরা বয়ে বেড়াই অবচেতনে?',
    '/images/rakib-asrar/books/porojibi.jpg',
    'ছোটগল্প',
    'bn',
    2025,
    'অক্ষরবৃত্ত প্রকাশন',
    '978-984-99052-1-9',
    'প্রথম প্রকাশ (বইমেলা ২০২৫)',
    112,
    220.00,
    220.00,
    1,
    'available',
    'https://www.rokomari.com/book/483648/porojibi',
    '[
        {"label": "রকমারি (Rokomari)", "url": "https://www.rokomari.com/book/483648/porojibi", "isDirect": true},
        {"label": "অক্ষরবৃত্ত প্রকাশনী", "url": "https://www.facebook.com/aksharbritto/", "isDirect": false},
        {"label": "বইবাজার", "url": "https://www.boibazar.com/", "isDirect": false}
    ]'::JSONB,
    ARRAY[
        'পরজীবী',
        'ছায়ার ব্যবচ্ছেদ',
        'অচেনা পদধ্বনি',
        'নীল আলোর সীমানা',
        'বৃত্তের বাইরে',
        'অপেক্ষার শেষ প্রহর',
        'স্মৃতির প্রতিবিম্ব'
    ]::TEXT[],
    true,
    0,
    'https://asrarbd.vercel.app/books/পরজীবী',
    'পরজীবী · রাকিব আসরার | Book',
    'পরজীবী রাকিব আসরারের প্রথম প্রকাশিত গল্পগ্রন্থ। মানুষের মনের সূক্ষ্ম অনুভূতি, সম্পর্কের অদৃশ্য টানাপোড়েন এবং বাস্তবধর্মী ছোটগল্পের সংকলন।'
),
(
    'tiler-chaya',
    'তিলের ছায়া',
    'উপন্যাস · অমর একুশে বইমেলা ২০২৬',
    'রাকিব আসরার',
    'কিছু প্রশ্নের উত্তর জীবনকে সহজ করে না—বরং তা আরও জটিল করে তোলে।\nরায়ানের পরিচিত, স্বাভাবিক জীবন—বিশ্ববিদ্যালয় আর রাফিয়াকে ঘিরে গড়ে ওঠা তার ছিমছাম পৃথিবী—হঠাৎ করেই ভেঙে পড়তে শুরু করে একটা অদ্ভুত ঘটনার পর। বন্ধুদের পরিচিত চেহারাগুলো অচেনা লাগতে থাকে, আর রাফিয়ার নীরবতার আড়ালে জমতে থাকে অজানা কোনো রহস্য। সত্য যখন সামনে আসে, তখন তা মুক্তি দেয় না; বরং আরও বড় এক বিভ্রান্তির জন্ম দেয়। সম্পর্কের টানাপোড়েন, অপরাধবোধ আর অবদমিত সত্যের মুখোমুখি দাঁড়িয়ে সে বুঝতে পারে—সব সত্যি সবসময় প্রকাশ করতে হয় না; কিছু সত্যি গোপন করে রাখাটাও একধরনের দায়িত্বের মধ্যে পড়ে।\n\nকিন্তু সেই দায়িত্ব কি শেষ পর্যন্ত তাকে শান্তি দেবে, নাকি নিয়ে যাবে আরও গভীর কোনো অন্ধকারের দিকে?',
    'কিছু প্রশ্নের উত্তর জীবনকে সহজ করে না—বরং তা আরও জটিল করে তোলে। সব সত্যি সবসময় প্রকাশ করতে হয় না; কিছু সত্যি গোপন করে রাখাটাও একধরনের দায়িত্বের মধ্যে পড়ে।',
    '/images/rakib-asrar/books/tiler-chaya.jpg',
    'মনস্তাত্ত্বিক উপন্যাস',
    'bn',
    2026,
    'অক্ষরবৃত্ত প্রকাশন',
    '978-984-99882-0-5',
    'প্রথম প্রকাশ (বইমেলা ২০২৬)',
    144,
    280.00,
    280.00,
    1,
    'available',
    'https://www.rokomari.com/book/525381/tiler-chaya',
    '[
        {"label": "রকমারি (Rokomari)", "url": "https://www.rokomari.com/book/525381/tiler-chaya", "isDirect": true},
        {"label": "অক্ষরবৃত্ত প্রকাশনী", "url": "https://www.facebook.com/aksharbritto/", "isDirect": false},
        {"label": "বইবাজার", "url": "https://www.boibazar.com/", "isDirect": false}
    ]'::JSONB,
    ARRAY[
        'সূচনা: শান্ত নদীর বুকে ঢেউ',
        'অচেনা রাফিয়া',
        'নীরবতার সংকেত',
        'প্রশ্নচিহ্ন ও ছায়া',
        'সত্যের খোলস',
        'দায়িত্ব ও বিভ্রান্তি',
        'উপসংহার: তিলের ছায়া'
    ]::TEXT[],
    true,
    1,
    'https://asrarbd.vercel.app/books/তিলের-ছায়া',
    'তিলের ছায়া · রাকিব আসরার | Book',
    'কিছু প্রশ্নের উত্তর জীবনকে সহজ করে না—বরং তা আরও জটিল করে তোলে। রায়ানের পরিচিত, স্বাভাবিক জীবন হঠাৎ করেই ভেঙে পড়তে শুরু করে।'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    author = EXCLUDED.author,
    description = EXCLUDED.description,
    excerpt = EXCLUDED.excerpt,
    cover_image_url = EXCLUDED.cover_image_url,
    genre = EXCLUDED.genre,
    language = EXCLUDED.language,
    publication_year = EXCLUDED.publication_year,
    publisher = EXCLUDED.publisher,
    isbn = EXCLUDED.isbn,
    edition = EXCLUDED.edition,
    pages = EXCLUDED.pages,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    stock_count = EXCLUDED.stock_count,
    availability = EXCLUDED.availability,
    purchase_url = EXCLUDED.purchase_url,
    purchase_links = EXCLUDED.purchase_links,
    table_of_contents = EXCLUDED.table_of_contents,
    featured = EXCLUDED.featured,
    sort_order = EXCLUDED.sort_order,
    source_url = EXCLUDED.source_url,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

-- ------------------------------------------------------------------------------
-- 5. WRITING & ESSAYS (5 Genuine Rakib Asrar Essays)
-- ------------------------------------------------------------------------------
INSERT INTO public.writing_entries (
    slug,
    title,
    subtitle,
    excerpt,
    content,
    cover_image_url,
    category,
    language,
    published_at,
    reading_time_minutes,
    reading_time_text,
    featured,
    author,
    tags,
    source_url,
    seo_title,
    seo_description
) VALUES 
(
    'gyan-bibhrom-o-sotter-sondhan',
    'জ্ঞান, বিভ্রম ও সত্যের সন্ধান',
    'দর্শন ও মনস্তাত্ত্বিক ভাবনা',
    'আমরা যা জানি বলে বিশ্বাস করি, তা কি আসলেই সত্য—নাকি কেবল আমাদের বিশ্বাস আর অভিজ্ঞতার তৈরি এক গ্রহণযোগ্য ব্যাখ্যা? বাস্তব আর ধারণার সীমারেখা নিয়ে এক ব্যক্তিগত বিশ্লেষণ।',
    'আমরা যা জানি বলে বিশ্বাস করি, তা কি আসলেই সত্য—নাকি কেবল আমাদের বিশ্বাস আর অভিজ্ঞতার তৈরি এক গ্রহণযোগ্য ব্যাখ্যা?

মানুষের ইতিহাস মূলত সত্যকে খোঁজার ইতিহাস। আদিম গুহাচিত্র থেকে শুরু করে আজকের কোয়ান্টাম মেকানিক্স—সবকিছুর মূলেই ছিল জানার তীব্র আকাঙ্ক্ষা। কিন্তু জানার এই প্রক্রিয়ায় আমরা কতটুকু এগিয়েছি? আমরা কি আসলেই পরম সত্যকে ছুঁতে পেরেছি, নাকি আমরা কেবল আমাদের ইন্দ্রিয়গ্রাহ্য জগতের চারপাশে কতগুলো সুবিধাজনক সংজ্ঞা তৈরি করে নিয়েছি?

দর্শনশাস্ত্রের একটা মৌলিক প্রশ্ন হলো—জ্ঞানের উৎস কী? ইন্দ্রিয় প্রত্যক্ষবাদীরা বলেন, আমরা যা দেখি, শুনি, স্পর্শ করি—সেটাই জ্ঞানের ভিত্তি। কিন্তু আমাদের ইন্দ্রিয় কি অভ্রান্ত? চোখের সামনে মরীচিকা দেখে আমরা জলের বিভ্রম তৈরি করি। কান অনেক সময় এমন শব্দ শোনে যা বাস্তবে নেই। তাহলে যে যন্ত্রটি নিজেই ত্রুটিপূর্ণ, তার সংগৃহীত তথ্য কতটা নির্ভুল হতে পারে?

এখানেই বিভ্রমের শুরু। আমরা অনেক সময় বিভ্রমকেই জ্ঞান বলে আঁকড়ে ধরে থাকি। কারণ বিভ্রম মানুষকে একধরনের মানসিক নিশ্চয়তা দেয়। অনিশ্চয়তা মানুষকে ভীত করে তোলে, আর তৈরি করা জ্ঞান তাকে স্বস্তি দেয়। কিন্তু সত্যের পথ স্বস্তিদায়ক নয়; বরং তা প্রশ্নবাণে জর্জরিত এক নিরবচ্ছিন্ন সংগ্রাম।

সত্য কোনো স্থির বিন্দু নয়, যা একবার খুঁজে পেয়ে পকেটে পুরে ফেলা যায়। সত্য হলো এক বহমান নদী। যা গতকালের সত্য ছিল, আজকের নতুন আবিষ্কার তাকে অসম্পূর্ণ প্রমাণ করতে পারে। তাই প্রকৃত জ্ঞান হলো নিজের অজ্ঞতাকে স্বীকার করার সাহস। সক্রেটিস যেমনটি বলেছিলেন, "আমি কেবল একটি জিনিসই জানি, তা হলো আমি কিছুই জানি না।"

আমরা যখন নিজের বিশ্বাসকে চরম সত্য বলে ধরে নিই, তখন ভাবনার দুয়ার বন্ধ হয়ে যায়। গোঁড়ামি জন্ম নেয় সেখান থেকেই। অথচ মুক্ত মনের প্রধান লক্ষণই হলো সংশয়। সংশয় ধ্বংসের জন্য নয়, বরং সত্যকে খাঁটি করার নিকশ পাথর।',
    '/images/rakib-asrar/articles/knowledge-cover.jpg',
    'দর্শন ও চিন্তন',
    'bn',
    '2026-03-24T00:00:00Z',
    8,
    '৮ মিনিট পাঠ',
    true,
    'রাকিব আসরার',
    ARRAY['দর্শন', 'মনস্তত্ত্ব', 'জ্ঞানতত্ত্ব', 'চিন্তা']::TEXT[],
    'https://asrarbd.vercel.app/article/gyan-bibhrom-o-sotter-sondhan',
    'জ্ঞান, বিভ্রম ও সত্যের সন্ধান · রাকিব আসরার | Essays',
    'আমরা যা জানি বলে বিশ্বাস করি, তা কি আসলেই সত্য—নাকি কেবল আমাদের বিশ্বাস আর অভিজ্ঞতার তৈরি এক গ্রহণযোগ্য ব্যাখ্যা?'
),
(
    'mrito-nokkhotrer-bari',
    'মৃত নক্ষত্রের বাড়ি',
    'অস্তিত্ব, সময় ও মহাজাগতিক একাকিত্ব',
    'রাতের আকাশে যেসব তারার আলো আমাদের চোখে এসে পৌঁছায়, তাদের অনেকেই হয়তো কোটি বছর আগেই নিভে গেছে। অথচ তাদের আলো এখনও মহাবিশ্বে পথ চলছে। আমাদের জীবন আর স্মৃতির অস্তিত্বও কি তেমনি নয়?',
    'রাতের আকাশে যেসব তারার আলো আমাদের চোখে এসে পৌঁছায়, তাদের অনেকেই হয়তো কোটি বছর আগেই নিভে গেছে। অথচ তাদের আলো এখনও মহাবিশ্বে পথ চলছে। আমাদের জীবন আর স্মৃতির অস্তিত্বও কি তেমনি নয়?

অন্ধকার রাতের দিকে তাকিয়ে থাকলে এক অদ্ভুত শূন্যতা চেপে ধরে। মাথার ওপরে কোটি কোটি আলোকবর্ষ দূরের যে আলোকবিন্দুগুলো মিটমিট করে, তারা আসলে এক একটি সুদূর অতীত। আমরা যখন আকাশের দিকে তাকাই, আমরা বাস্তবে আকাশের দিকে তাকাই না—আমরা তাকাই সময়ের ইতিহাসের দিকে।

যে তারাটি হয়তো এক সেকেন্ড আগে মারা গেল, তার খবর আমাদের কাছে পৌঁছাতে পৌঁছাতে আরও মিলিয়ন বছর লেগে যাবে। অর্থাৎ, যা নেই, তাকে আমরা দেখছি। যা অতীত, তাকে আমরা বর্তমান বলে অনুভব করছি।

মানুষের মনস্তত্ত্বও ঠিক এই মৃত নক্ষত্রগুলোর মতোই। আমাদের ভেতরে এমন অনেক অনুভূতি, এমন অনেক সম্পর্ক, এমন অনেক স্মৃতি এখনও জ্বলজ্বল করে আলো দেয়—যেগুলো বাস্তবে বহু আগেই শেষ হয়ে গেছে। সেই মানুষটি হয়তো আমাদের জীবনে আর নেই, সেই ঘটনাটি হয়তো হারিয়ে গেছে কালের অতলে; তবুও তার ফেলে যাওয়া আলোর দ্যুতি আমাদের বর্তমানকে প্রভাবিত করে।

আমরা প্রতিদিন কতগুলো মৃত নক্ষত্রের আলো বুকে নিয়ে হেঁটে বেড়াই?

স্মৃতি হলো মানুষের তৈরি মহাকাশ। সেখানে আলো কখনও মরে না। এমনকি যে তারা ধ্বংস হয়ে ব্ল্যাক হোলে পরিণত হয়েছে, সেও তার চারপাশের স্থান-কালকে বাঁকিয়ে দেয়। আমাদের অতীতের আঘাতগুলোও ঠিক তেমনি। আপাতদৃষ্টিতে মনে হয় সময় সবকিছু সারিয়ে দিয়েছে, কিন্তু ভেতরে ভেতরে তা আমাদের চিন্তা, আমাদের দৃষ্টিভঙ্গি এবং আমাদের সিদ্ধান্ত নেওয়ার ক্ষমতাকে চিরতরে বদলে দেয়।

মৃত নক্ষত্ররা আমাদের শেখায়—স্থায়িত্ব কোনো বস্তুগত সত্য নয়। যা চলে গেছে তাও বেঁচে থাকে তার রেখে যাওয়া স্পন্দনে। আমরাও হয়তো একদিন থাকব না, কিন্তু আমাদের করা সামান্য ভালো কাজ, কারও জন্য বলা এক ফোঁটা সান্ত্বনার বাক্য মহাবিশ্বের অদৃশ্য স্মৃতিকোঠায় আলো হয়ে পথ চলতে থাকবে বহু বহু বছর।',
    '/images/rakib-asrar/articles/stars-cover.jpg',
    'জীবনবোধ ও স্মৃতি',
    'bn',
    '2026-03-21T00:00:00Z',
    6,
    '৬ মিনিট পাঠ',
    true,
    'রাকিব আসরার',
    ARRAY['মহাবিশ্ব', 'স্মৃতি', 'সময়', 'অস্তিত্ব']::TEXT[],
    'https://asrarbd.vercel.app/article/mrito-nokkhotrer-bari',
    'মৃত নক্ষত্রের বাড়ি · রাকিব আসরার | Essays',
    'রাতের আকাশে যেসব তারার আলো আমাদের চোখে এসে পৌঁছায়, তাদের অনেকেই হয়তো কোটি বছর আগেই নিভে গেছে।'
),
(
    'adorsho-bonam-manush',
    'আদর্শ বনাম মানুষ',
    'নৈতিকতা, সমাজ ও বাস্তবতার টানাপোড়েন',
    'আমরা মানুষকে ভালোবাসি নাকি তার ভেতরের কোনো কাল্পনিক আদর্শকে পূজা করি? যখন একজন মানুষ তার আদর্শের মানদণ্ড থেকে বিচ্যুত হয়, তখন আমরা কেন তাকে এতো সহজে ক্ষমা করতে পারি না?',
    'আমরা মানুষকে ভালোবাসি নাকি তার ভেতরের কোনো কাল্পনিক আদর্শকে পূজা করি? যখন একজন মানুষ তার আদর্শের মানদণ্ড থেকে বিচ্যুত হয়, তখন আমরা কেন তাকে এতো সহজে ক্ষমা করতে পারি না?

সমাজ সবসময় মানুষকে একটা ছাঁচে ফেলতে চায়। একজন ভালো পিতা, একজন সৎ নাগরিক, একজন অনুগত বন্ধু, একজন নির্লোভ নেতা—আমাদের মগজে প্রতিটি সম্পর্কের এক একটি কঠোর সংজ্ঞা তৈরি করা আছে। আমরা যখন কোনো মানুষের সান্নিধ্যে আসি, আমরা সেই রক্তমাংসের মানুষটিকে দেখার চেয়ে বেশি ব্যস্ত থাকি আমাদের তৈরি সংজ্ঞার সাথে তাকে মিলিয়ে দেখতে।

যতক্ষণ সে আমাদের সংজ্ঞার সাথে খাপ খেয়ে চলে, ততক্ষণ সে মহান। কিন্তু যেই মুহূর্তে তার ভেতরকার দুর্বলতা বা মানবিক সীমাবদ্ধতা প্রকাশ পেয়ে যায়, অমনি আমরা তাকে কাঠগড়ায় দাঁড় করিয়ে দিই।

অথচ মানুষ কোনো পাথরে খোদাই করা মূর্তি নয়। মানুষের সবচেয়ে বড় বৈশিষ্ট্যই হলো সে ত্রুটিপূর্ণ। সে একাধারে মহৎ হতে পারে, আবার কোনো এক দুর্বল মুহূর্তে ক্ষুদ্রতম স্বার্থপরতার পরিচয়ও দিতে পারে। একই হৃদয়ে আলো এবং অন্ধকার পাশাপাশি বসবাস করে।

আদর্শকে মানুষের ওপরে স্থান দেওয়ার বিপদ এখানেই। ইতিহাস সাক্ষী, যখনই কোনো মতবাদ বা আদর্শকে মানুষের চেয়ে বড় করে দেখা হয়েছে, তখনই পৃথিবীতে সবচেয়ে বড় বড় রক্তপাত ঘটেছে। ধর্মের নামে, রাজনীতির নামে, জাতিগত শ্রেষ্ঠত্বের নামে মানুষকে বলি দেওয়া হয়েছে কোনো এক অমূর্ত আদর্শের বেদিতে।

আদর্শ থাকা ভালো, তা মানুষকে দিকনির্দেশনা দেয়। কিন্তু সেই আদর্শ যদি মানুষকে ভালোবাসতে না শেখায়, সহমর্মী হতে না শেখায়, তবে তা কেবলই এক অন্ধ কুসংস্কার। মানুষের ভুল করার অধিকারকে স্বীকার না করলে কোনো সমাজ সুস্থ হতে পারে না। ক্ষমা এবং বোঝাপড়া আদর্শের চেয়েও অনেক বেশি শক্তিশালী মানবিক হাতিয়ার।',
    '/images/rakib-asrar/articles/ideal-cover.jpg',
    'সমাজ ও রাজনীতি',
    'bn',
    '2026-03-30T00:00:00Z',
    7,
    '৭ মিনিট পাঠ',
    false,
    'রাকিব আসরার',
    ARRAY['আদর্শ', 'নৈতিকতা', 'সমাজ', 'মনুষ্যত্ব']::TEXT[],
    'https://asrarbd.vercel.app/article/adorsho-bonam-manush',
    'আদর্শ বনাম মানুষ · রাকিব আসরার | Essays',
    'আমরা মানুষকে ভালোবাসি নাকি তার ভেতরের কোনো কাল্পনিক আদর্শকে পূজা করি?'
),
(
    'manush-boi-keno-porte-chay-na',
    'মানুষ বই কেন পড়তে চায় না',
    'ডিজিটাল যুগ, মনোযোগের সংকট ও বই পড়ার ভবিষ্যৎ',
    'সোশ্যাল মিডিয়ার অ্যালগরিদম আর ইনস্ট্যান্ট গ্র্যাটিফিকেশনের এই যুগে মানুষের মন কেন গভীর মনোযোগের বই পড়া থেকে দূরে সরে যাচ্ছে? এর মনস্তাত্ত্বিক কারণ ও ভবিষ্যৎ প্রভাব।',
    'সোশ্যাল মিডিয়ার অ্যালগরিদম আর ইনস্ট্যান্ট গ্র্যাটিফিকেশনের এই যুগে মানুষের মন কেন গভীর মনোযোগের বই পড়া থেকে দূরে সরে যাচ্ছে? এর মনস্তাত্ত্বিক কারণ ও ভবিষ্যৎ প্রভাব।

আজকের দিনে প্রায়ই আক্ষেপ শোনা যায়—মানুষ আর আগের মতো বই পড়ে না। তরুণ প্রজন্ম বইবিমুখ। বইমেলার ভিড় থাকলেও বিক্রি হওয়া বইয়ের তুলনায় ছবি তোলার মানুষের সংখ্যাই বেশি। কিন্তু এই পরিস্থিতির জন্য কি কেবল ব্যক্তি মানুষকে দোষ দেওয়া যায়, নাকি আমাদের পুরো সমাজ ও প্রযুক্তিগত পরিকাঠামোই আমাদের মস্তিষ্ককে বদলে দিচ্ছে?

বই পড়া কোনো প্রাকৃতিক দক্ষতা নয়। কথা বলা মানুষ প্রাকৃতিকভাবে শেখে, কিন্তু পড়া একটি কৃত্রিমভাবে অর্জিত অভ্যাস যা মস্তিষ্কে নতুন নিউরাল পাথওয়ে তৈরি করে। একটি বই পড়তে হলে গভীর মনোযোগ বা ''Deep Focus'' প্রয়োজন হয়। পৃষ্ঠা উল্টাতে হয়, বাক্যগুলোর ভেতরে ডুব দিতে হয়, লেখক যা লিখেছেন তার চেয়েও বেশি নিজের কল্পনায় দৃশ্য তৈরি করতে হয়। এটি সক্রিয় শ্রমের কাজ।

অন্যদিকে, আমাদের হাতের স্মার্টফোনটি ডিজাইন করাই হয়েছে মানুষকে নিষ্ক্রিয় ভোক্তা বানিয়ে রাখার জন্য। টিকটক, ইনস্টাগ্রাম রিলস বা ইউটিউব শর্টস—প্রতি ১০-১৫ সেকেন্ডে আমাদের মস্তিষ্কে ডোপামিনের এক একটি ছোট বিস্ফোরণ ঘটায়। খুব সামান্য পরিশ্রমে যখন উচ্চমাত্রার উত্তেজনা বা আনন্দ পাওয়া যায়, তখন মস্তিষ্ক আর বইয়ের মতো ধীরগতির আনন্দ বেছে নিতে চায় না।

আমরা এখন বাস করছি ''Hyper-distracted'' বা অতি-বিক্ষিপ্ত এক পৃথিবীতে। এখানে দীর্ঘ কোনো টেক্সট পড়া মানসিক যন্ত্রণার মতো মনে হয়। মানুষ কোনো বিষয় গভীরভাবে জানার চেয়ে দ্রুত সারসংক্ষেপ জানতে বেশি আগ্রহী।

কিন্তু বই পড়ার অভ্যাস হারিয়ে যাওয়া মানে কেবল একটা বিনোদনের মাধ্যম হারানো নয়। বই মানুষের ভেতর সহমর্মিতা (Empathy) তৈরি করে। অন্যের দৃষ্টিভঙ্গি দিয়ে পৃথিবীকে দেখার ক্ষমতা বাড়ায়। যখন সমাজ বই পড়া ছেড়ে দেয়, তখন সেই সমাজে অসহিষ্ণুতা বাড়ে, জটিল বিষয়কে অতি-সরলীকরণ করার প্রবণতা তৈরি হয় এবং মানুষ সহজে প্রোপাগান্ডার শিকার হয়।

বই পড়া টিকিয়ে রাখার লড়াই তাই কেবল সাহিত্যের লড়াই নয়; এটি আমাদের মনোযোগ, চিন্তা করার স্বাধীনতা এবং মানবিক গভীরতা রক্ষা করার এক নীরব প্রতিরোধ।',
    '/images/rakib-asrar/articles/reading-cover.jpg',
    'শিক্ষা ও সংস্কৃতি',
    'bn',
    '2026-04-08T00:00:00Z',
    9,
    '৯ মিনিট পাঠ',
    false,
    'রাকিব আসরার',
    ARRAY['বই পড়া', 'মনোযোগ', 'ডিজিটাল সমাজ', 'সংস্কৃতি']::TEXT[],
    'https://asrarbd.vercel.app/article/manush-boi-keno-porte-chay-na',
    'মানুষ বই কেন পড়তে চায় না · রাকিব আসরার | Essays',
    'সোশ্যাল মিডিয়ার অ্যালগরিদম আর ইনস্ট্যান্ট গ্র্যাটিফিকেশনের এই যুগে মানুষের মন কেন গভীর মনোযোগের বই পড়া থেকে দূরে সরে যাচ্ছে?'
),
(
    'be-like-syler',
    'Be Like Syler',
    'দৃষ্টিভঙ্গি ও আত্মউন্নয়নমূলক কথিকা',
    'সেদিন খাটে শুয়ে শুয়ে মোবাইলে রিল দেখছিলাম। স্ক্রল করতে বসলে হরেক রকমের কনটেন্ট চোখে পড়ে। তবে সব রিল মাথায় দাগ কেটে যায় না। কিন্তু সেদিন একটা সাধারণ ভিডিও দেখে অনেকক্ষণ থমকে থাকতে হয়েছিল।',
    'সেদিন খাটে শুয়ে শুয়ে মোবাইলে রিল দেখছিলাম। স্ক্রল করতে বসলে হরেক রকমের কনটেন্ট চোখে পড়ে। তবে সব রিল মাথায় দাগ কেটে যায় না। কিন্তু সেদিন একটা সাধারণ ভিডিও দেখে অনেকক্ষণ থমকে থাকতে হয়েছিল।

ভিডিওটা ছিল একটা সাইবেরিয়ান হাস্কি কুকুরের। তার নাম সাইলার। সে বরফের ওপর দৌড়াচ্ছিল। একপর্যায়ে বরফের একটা বিপজ্জনক খাদে তার প্রিয় বলটা পড়ে যায়। সাধারণ যে কোনো কুকুর হয়তো ঘেউ ঘেউ করত, কিংবা হতাশ হয়ে ফিরে আসত। কিন্তু সাইলারের হাবভাব ছিল একদম আলাদা।

সে প্রথমে শান্তভাবে খাদের কিনারায় দাঁড়াল। পরিস্থিতি পর্যবেক্ষণ করল। কয়েকবার পা দিয়ে বরফের গভীরতা মাপার চেষ্টা করল। তারপর এমন এক কোণ দিয়ে নিঃশব্দে নিচে নেমে গেল, যা দেখে মনে হবে সে কোনো প্রশিক্ষিত পর্বতারোহী। বলটা মুখে নিয়ে যখন সে বীরদর্পে ওপরে উঠে এল, তখন তার চোখেমুখে কোনো বাড়াবাড়ি অহংকার ছিল না—ছিল এক শান্ত আত্মবিশ্বাস।

আমি ভাবলাম, মানুষের জীবনেও তো সাইলারের মতো হওয়া কতটা জরুরি!

আমরা যখন কোনো বাধার মুখে পড়ি, আমাদের প্রথম প্রতিক্রিয়া কী হয়? আমরা আতঙ্কিত হয়ে পড়ি, অভিযোগ করতে শুরু করি, ভাগ্যকে দোষ দিই কিংবা সোশ্যাল মিডিয়ায় গিয়ে বিরক্তি প্রকাশ করি। অথচ বাধা জীবনের অন্যতম স্বাভাবিক উপাদান। বাধা না থাকলে কোনো লক্ষ্য অর্জনের আসল তৃপ্তি আসতেই পারে না।

"Be Like Syler"—এর অর্থ হলো নিজের আবেগকে নিয়ন্ত্রণে রাখা। যখন সংকট আসবে, তখন চিৎকার না করে শান্ত হওয়া। সমস্যার গভীরতা বোঝা এবং ধাপে ধাপে সমাধানের পথ খোঁজা। যে মানুষ প্রতিকূলতার ভেতর নিজের মানসিক স্থিতি বজায় রাখতে পারে, পৃথিবী শেষ পর্যন্ত তার কাছেই মাথা নত করে।',
    '/images/rakib-asrar/articles/syler-cover.jpg',
    'জীবনবোধ ও দৃষ্টিভঙ্গি',
    'bn',
    '2026-05-14T00:00:00Z',
    5,
    '৫ মিনিট পাঠ',
    false,
    'রাকিব আসরার',
    ARRAY['দৃষ্টিভঙ্গি', 'আত্মউন্নয়ন', 'ধৈর্য', 'জীবনদর্শন']::TEXT[],
    'https://asrarbd.vercel.app/article/be-like-syler',
    'Be Like Syler · রাকিব আসরার | Essays',
    'সেদিন খাটে শুয়ে শুয়ে মোবাইলে রিল দেখছিলাম। স্ক্রল করতে বসলে হরেক রকমের কনটেন্ট চোখে পড়ে। তবে সব রিল মাথায় দাগ কেটে যায় না।'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    cover_image_url = EXCLUDED.cover_image_url,
    category = EXCLUDED.category,
    language = EXCLUDED.language,
    published_at = EXCLUDED.published_at,
    reading_time_minutes = EXCLUDED.reading_time_minutes,
    reading_time_text = EXCLUDED.reading_time_text,
    featured = EXCLUDED.featured,
    author = EXCLUDED.author,
    tags = EXCLUDED.tags,
    source_url = EXCLUDED.source_url,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

-- ------------------------------------------------------------------------------
-- 6. AUTHOR PROFILES (Rakib Asrar)
-- ------------------------------------------------------------------------------
INSERT INTO public.author_profiles (
    name,
    display_name,
    legal_name,
    role,
    tagline,
    short_bio,
    biography,
    profile_image_url,
    education,
    profession,
    birth_date,
    birth_place,
    literary_interests,
    social_links,
    timeline,
    testimonials,
    contact_email,
    contact_phone,
    contact_address,
    website_url,
    is_primary
) VALUES (
    'রাকিব আসরার',
    'রাকিব আসরার (Rakib Asrar)',
    'রাকিবুল হাসান',
    'লেখক · কথাসাহিত্যিক · ক্রিয়েটর',
    'শব্দের ভেতর দিয়ে মানুষকে খুঁজে পাই—আর গল্পের ভেতর দিয়ে নিজেকে।',
    'রাকিব আসরার (রাকিবুল হাসান) একজন বাংলাদেশী প্রকৌশলী, কথাসাহিত্যিক এবং গল্পকার। লেখালেখির পাশাপাশি কাজ করছেন প্রযুক্তি ও সৃজনশীল মাধ্যমে।',
    'রাকিব আসরার (রাকিবুল হাসান) একজন বাংলাদেশী প্রকৌশলী, লেখক এবং গল্পকার। রাকিব আসরারের (রাকিবুল হাসান) জন্ম ১৯৯২ সালের ১৭ই এপ্রিল, চট্টগ্রামের সাতকানিয়া থানার উত্তর কালিয়াইশ গ্রামে। তাঁর শৈশব কেটেছে সাতকানিয়ারই আরেকটি গ্রাম করইয়া নগরে। তিনি বাবা রমিজ আহামদ ও মা আছপিয়া বেগমের একমাত্র সন্তান।
তিনি ২০১৫ সালে চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (চুয়েট) থেকে পুরকৌশলে স্নাতক সম্পন্ন করেন। এরপর ২০১৬ থেকে ২০১৮ সাল পর্যন্ত কাজ করেছেন একটি বেসরকারি পরামর্শক প্রতিষ্ঠানে কোয়ালিটি কন্ট্রোল ইঞ্জিনিয়ার হিসেবে। বর্তমানে তিনি বাংলাদেশ ব্যাংকে সহকারী পরিচালক পদে কর্মরত।
লেখালেখির জগতে রাকিব আসরারের আগ্রহ মূলত ঘুরপাক খায় মানুষের মনস্তত্ত্ব, জটিল সম্পর্ক, সমাজের দ্বন্দ্ব আর অস্তিত্ববাদী নানা প্রশ্নকে ঘিরে। তাঁর প্রথম বই ‘পরজীবী’ প্রকাশের পর পাঠকদের মাঝে ইতিবাচক সাড়া ফেলেছিল, এটি তাঁকে সমসাময়িক বাংলা সাহিত্যে একজন উদীয়মান এবং সম্ভাবনাময় লেখক হিসেবে পরিচিতি পেতে সাহায্য করেছে।',
    '/images/rakib-asrar/author/portrait.jpg',
    'বি.এস.সি ইন পুরকৌশল (Civil Engineering), চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (চুয়েট), ২০১৫',
    'সহকারী পরিচালক, বাংলাদেশ ব্যাংক',
    '১৭ এপ্রিল ১৯৯২',
    'উত্তর কালিয়াইশ গ্রাম, সাতকানিয়া, চট্টগ্রাম',
    ARRAY[
        'মানুষের মনস্তত্ত্ব ও মানবীয় আবেগ',
        'জটিল মানবিক সম্পর্ক ও টানাপোড়েন',
        'সামাজিক দ্বন্দ্ব ও সমকালীন বাস্তবতা',
        'অস্তিত্ববাদী নানা প্রশ্ন ও দর্শন'
    ]::TEXT[],
    '[
        {"platform": "facebook", "url": "https://www.facebook.com/rakibasrarbd", "label": "Facebook"},
        {"platform": "goodreads", "url": "https://www.goodreads.com/author/show/51760431.Rakib_Asrar", "label": "Goodreads"},
        {"platform": "rokomari", "url": "https://www.rokomari.com/author/109403/rakib-asrar", "label": "Rokomari Author Profile"}
    ]'::JSONB,
    '[
        {"year": "১৯৯২", "title": "জন্ম ও শৈশব", "description": "১৭ এপ্রিল চট্টগ্রামের সাতকানিয়া থানার উত্তর কালিয়াইশ গ্রামে জন্ম।"},
        {"year": "২০১৫", "title": "চুয়েট থেকে পুরকৌশল ডিগ্রি", "description": "চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (চুয়েট) থেকে সিভিল ইঞ্জিনিয়ারিংয়ে স্নাতক সম্পন্ন।"},
        {"year": "২০১৮", "title": "বাংলাদেশ ব্যাংক এ যোগদান", "description": "সহকারী পরিচালক হিসেবে বাংলাদেশ ব্যাংকে পেশাগত যাত্রা শুরু।"},
        {"year": "২০২৫", "title": "প্রথম গল্পগ্রন্থ প্রকাশ", "description": "অমর একুশে বইমেলা ২০২৫ এ অক্ষরবৃত্ত প্রকাশনা থেকে প্রকাশিত হয় লেখকের প্রথম বই ''পরজীবী''।"},
        {"year": "২০২৬", "title": "লেখকের প্রথম উপন্যাস", "description": "অমর একুশে বইমেলা ২০২৬ এ অক্ষরবৃত্ত প্রকাশনা থেকে লেখকের প্রথম উপন্যাস ''তিলের ছায়া'' প্রকাশিত হয়।"}
    ]'::JSONB,
    '[
        {
            "id": "t1772465800411",
            "readerName": "নাইমুর রহমান",
            "readerRole": "উপপরিচালক, বাংলাদেশ ব্যাংক",
            "content": "পরজীবী বইটি বেশ ডাইনামিক মনে হয়েছে। একই বইয়ে বিভিন্ন রকমের গল্পের সমাহার। এককথায় বলতে গেলে একের ভেতর সব। বইয়ের ভাষা বেশ প্রাঞ্জল। বই পড়ুয়াদের জন্য মোস্ট রিকোমেন্ডেট।"
        },
        {
            "id": "t1772465364726",
            "readerName": "মাহফুজুর রহমান",
            "readerRole": "সাহিত্য সমালোচক",
            "content": "সমকালীন যেসব লেখকদের কথাসাহিত্য পড়ে আরাম পাওয়া যায়, তাদের মধ্যে রাকিব আসরার অন্যতম। ''তিলের ছায়া'' উপন্যাসটিতে পাওয়া শ্রেষ্ঠ সংলাপ \"সব সত্যি সবসময় প্রকাশ করতে হয় না; কিছু সত্যি গোপন করে রাখাটাও একধরনের দায়িত্বের মধ্যে পড়ে\"। দুজন নিরীহ প্রেমিক-প্রেমিকা রায়ান আর রাফিয়ার জীবনের এই অভাবনীয় সংকট কি আদৌ কোন সমাধান খুঁজে পাবে সেই কৌতূহল পাঠক হিসেবে আমাকে উৎকণ্ঠার সাথে নিয়ে গেছে উপন্যাসের শেষ অবধি।"
        },
        {
            "id": "t1772465416395",
            "readerName": "অভিজিৎ দত্ত",
            "readerRole": "পাঠক ও প্রকৌশলী",
            "content": "''তিলের ছায়া'' বইটি পড়ে অদ্ভুত এক অনুভূতির সাথে পরিচয় হলো। দুজন ভিন্ন মানুষের ভাগ্য কীভাবে একই বিন্দুতে মিলে যায়, দুজন ভিন্ন সত্ত্বার সত্য কীভাবে নতুন পরিচয়ের সাথে পরিচিত করে তোলে তার এক আশ্চর্য মিশ্রন এই লেখায়। মানুষ তার অবচেতন মনে যে সত্যকে অনুভব করতে পারে এবং সেই সত্য তাকে খানিকটা হলেও পূর্বাভাস দেয় তা জানা যায় এই লেখায়।"
        }
    ]'::JSONB,
    'rakibasrarbd@gmail.com',
    '+৮৮০ ১৩৪৪৮৩০৪০৪',
    '',
    'https://asrarbd.vercel.app/',
    true
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 7. SITE SETTINGS
-- ------------------------------------------------------------------------------
INSERT INTO public.site_settings (
    key,
    company_name,
    tagline,
    core_message,
    contact_email,
    contact_phone,
    whatsapp_number,
    location,
    social_links,
    default_locale,
    default_theme,
    logo_url,
    favicon_url,
    default_seo_title,
    default_seo_description
) VALUES (
    'default',
    'BDCON Labs',
    'Software & Digital Products',
    'Engineering practical software, modern web applications, and intuitive digital tools.',
    'contact@bdconlabs.com',
    '+880 1344830404',
    '+880 1344830404',
    'Dhaka, Bangladesh',
    '[
        {"platform": "github", "url": "https://github.com/bdconlabs"},
        {"platform": "linkedin", "url": "https://linkedin.com/company/bdconlabs"},
        {"platform": "twitter", "url": "https://twitter.com/bdconlabs"}
    ]'::JSONB,
    'en',
    'system',
    '/images/bdcon-logo.svg',
    '/favicon.ico',
    'BDCON Labs — Software & Digital Products',
    'Engineering practical software, modern web applications, and intuitive digital tools.'
)
ON CONFLICT (key) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    tagline = EXCLUDED.tagline,
    core_message = EXCLUDED.core_message,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone,
    whatsapp_number = EXCLUDED.whatsapp_number,
    location = EXCLUDED.location,
    social_links = EXCLUDED.social_links,
    default_locale = EXCLUDED.default_locale,
    default_theme = EXCLUDED.default_theme;
