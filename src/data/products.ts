import { Product } from '../types/product';
import { getProductsService, getFeaturedProductsService, getProductBySlugService } from '../lib/supabase/services/products';

/**
 * BDCON Labs Products Repository
 * 
 * Strict compliance with Stage 1 rules:
 * - Real software products only:
 *   1. SalaryBD (বেতন নির্ধারণ ২০২৬) — Order 1, Featured
 *   2. CivilDesk — Order 2
 *   3. Civil Estimator BD — Order 3
 *   4. BuildEst BD — Order 4 (Existing information preserved intact)
 * - Factual descriptions only (no unverified claims, fake ratings, or fake user statistics).
 * - Multi-platform support (Web, Android).
 */
export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-salary-bd',
    name: 'বেতন নির্ধারণ ২০২৬',
    slug: 'salary-bd',
    tagline: 'SalaryBD / Pay Determination 2026',
    type: 'Web Application',
    shortDescription: 'বাংলাদেশ-কেন্দ্রিক বেতন ও পে নির্ধারণ ওয়েব অ্যাপ্লিকেশন — মাসিক গ্রস ও নেট বেতন, বাড়িভাড়া, চিকিৎসা ভাতা ও কর কর্তন হিসাব।',
    description: 'বেতন নির্ধারণ ২০২৬ (SalaryBD) একটি বিশেষায়িত ওয়েব অ্যাপ্লিকেশন, যা বাংলাদেশের সরকারি ও বেসরকারি চাকরিজীবীদের বেতন কাঠামো, বাড়িভাড়া ভাতা, চিকিৎসা ভাতা, প্রভিডেন্ট ফান্ড ও কর কর্তন নির্ভুলভাবে হিসাব করতে সহায়তা করে।',
    category: 'Financial & Payroll Tools',
    platforms: ['web'],
    platform: 'web',
    status: 'available',
    featured: true,
    websiteUrl: 'https://salarybd.online/',
    liveUrl: 'https://salarybd.online/',
    order: 1,
    displayOrder: 1,
    problem: 'বাংলাদেশের বেতন কাঠামো, বিভিন্ন গ্রেডের বাড়িভাড়া ও চিকিৎসা ভাতা এবং প্রযোজ্য করের হিসাব ম্যানুয়ালি করা সময়সাপেক্ষ ও জটিল।',
    solution: 'সহজ ইনপুট ফরম এবং সুনির্দিষ্ট নিয়মের ভিত্তিতে স্বয়ংক্রিয়ভাবে মাসিক ও বাৎসরিক বেতন কাঠামো এবং নেট প্রাপ্তি হিসাব করার কার্যকর প্ল্যাটফর্ম।',
    whoIsItFor: [
      'বাংলাদেশী চাকরিজীবী ও পেশাজীবী',
      'এইচআর ও পেরোল কর্মকর্তা',
      'অ্যাকাউন্টস টিম',
      'বেতন ও কর সংক্রান্ত হিসাব পরিচালনাকারী',
    ],
    features: [
      'বেতন ও পে নির্ধারণ ক্যালকুলেটর',
      'বাড়িভাড়া ও চিকিৎসা ভাতা সমন্বয়',
      'প্রভিডেন্ট ফান্ড ও কর্তন হিসাব',
      'সহজ ও মোবাইল-বান্ধব ওয়েব ইন্টারফেস',
    ],
    detailedFeatures: [
      {
        id: 'feat-sbd-1',
        title: 'মাসিক ও বাৎসরিক বেতন নির্ধারণ',
        description: 'মূল বেতন, গ্রেড ও ভাতাসমূহের সঠিক সমন্বয়ে মোট প্রাপ্তি ও কর্তন নির্ধারণ।',
      },
      {
        id: 'feat-sbd-2',
        title: 'ভাতা ও কর কর্তন গাইড',
        description: 'বাড়িভাড়া, চিকিৎসা সুবিধা ও ভবিষ্যৎ তহবিল (PF) সংক্রান্ত প্রচলিত নিয়মানুযায়ী বিশ্লেষণ।',
      },
      {
        id: 'feat-sbd-3',
        title: 'তাত্ক্ষণিক ফলাফল ও সামারি',
        description: 'কোনো জটিলতা ছাড়াই ব্রাউজারে সরাসরি দ্রুত ফলাফল পাওয়ার সুবিধা।',
      },
    ],
    faqs: [
      {
        id: 'faq-sbd-1',
        question: 'বেতন নির্ধারণ ২০২৬ (SalaryBD) কী?',
        answer: 'এটি বাংলাদেশ প্রেক্ষাপটে কর্মকর্তা ও কর্মচারীদের বেতন ও পে নির্ধারণের জন্য তৈরি একটি নির্ভরযোগ্য ওয়েব অ্যাপ্লিকেশন।',
      },
      {
        id: 'faq-sbd-2',
        question: 'এটি ব্যবহারের জন্য কি কোনো সফটওয়্যার ইন্সটল করতে হয়?',
        answer: 'না, এটি সরাসরি যেকোনো ওয়েব ব্রাউজার থেকে https://salarybd.online/ ঠিকানায় ব্যবহার করা যায়।',
      },
    ],
    metaTitle: 'বেতন নির্ধারণ ২০২৬ (SalaryBD) — বেতন ও পে ক্যালকুলেটর | BDCON Labs',
    metaDescription: 'বাংলাদেশ-কেন্দ্রিক বেতন ও পে নির্ধারণ ওয়েব অ্যাপ্লিকেশন — নির্ভুল মাসিক গ্রস, নেট বেতন ও ভাতা হিসাবের সহজ সমাধান।',
    seo: {
      title: 'বেতন নির্ধারণ ২০২৬ (SalaryBD) — বেতন ও পে ক্যালকুলেটর | BDCON Labs',
      description: 'বাংলাদেশ-কেন্দ্রিক বেতন ও পে নির্ধারণ ওয়েব অ্যাপ্লিকেশন — নির্ভুল মাসিক গ্রস, নেট বেতন ও ভাতা হিসাবের সহজ সমাধান।',
    },
  },
  {
    id: 'prod-civildesk',
    name: 'CivilDesk',
    slug: 'civildesk',
    tagline: 'Professional Civil Engineering & Estimation Platform',
    type: 'Web Application',
    shortDescription: 'বাংলাদেশ ব্যাংকের কর্মকর্তাদের জন্য ডেভেলপকৃত পেশাদার সিভিল ইঞ্জিনিয়ারিং ও এস্টিমেশন ওয়েব অ্যাপ্লিকেশন।',
    description: 'CivilDesk বাংলাদেশ ব্যাংকের প্রকৌশল সংশ্লিষ্ট কর্মকর্তাদের প্রাতিষ্ঠানিক কাজের সুবিধার্থে তৈরি একটি বিশেষায়িত ওয়েব প্ল্যাটফর্ম। এটি পরিমাপ মাত্রা সংরক্ষণ, পিডব্লিউডি শিডিউল রেট ম্যাপিং ও অডিট-সম্মত প্রাক্কলন প্রস্তুতির কাজকে সুশৃঙ্খল করে।',
    category: 'Engineering & Institutional',
    platforms: ['web'],
    platform: 'web',
    status: 'available',
    featured: false,
    websiteUrl: 'https://cdesk.xyz/',
    liveUrl: 'https://cdesk.xyz/',
    order: 2,
    displayOrder: 2,
    problem: 'প্রাতিষ্ঠানিক সিভিল ইঞ্জিনিয়ারিং কাজ, পরিমাপ শিট তৈরি এবং শিডিউল রেট যাচাইকরণের প্রচলিত ম্যানুয়াল পদ্ধতি সময়সাপেক্ষ এবং নিরীক্ষায় অসঙ্গতির ঝুঁকি থাকে।',
    solution: 'পরিমাপের সুনির্দিষ্ট মাত্রা সংরক্ষণ, শিডিউল রেট সংযুক্তি এবং নিরীক্ষা-উপযোগী বিওকিউ (BOQ) তৈরির জন্য একটি সংগঠিত ওয়েব প্ল্যাটফর্ম।',
    whoIsItFor: [
      'বাংলাদেশ ব্যাংকের প্রকৌশল কর্মকর্তা',
      'সিভিল ইঞ্জিনিয়ার ও কোয়ান্টিটি সার্ভেয়ার',
      'সরকারি ও প্রাতিষ্ঠানিক প্রকল্প মূল্যায়নকারী',
      'বিল ও প্রাক্কলন প্রস্তুতকারক',
    ],
    features: [
      'পরিমাপ মাত্রা নির্ভুল সংরক্ষণ',
      'রেট অ্যানালাইসিস ও শিডিউল ম্যাপিং',
      'অডিট-সম্মত বিওকিউ ও এস্টিমেট প্রস্তুতি',
      'প্রাতিষ্ঠানিক নিরাপত্তা ও নির্ভরযোগ্য ডেটা স্ট্রাকচার',
    ],
    detailedFeatures: [
      {
        id: 'feat-cd-1',
        title: 'পরিমাপ ও ডায়মেনশন এন্ট্রি',
        description: 'কাঠামোগত উপাদান ও সাইট পরিমাপের জন্য মানসম্মত এন্ট্রি কাঠামো।',
      },
      {
        id: 'feat-cd-2',
        title: 'রেট বিশ্লেষণ ও প্রাক্কলন',
        description: 'প্রকৌশল শিডিউলের সাথে সামঞ্জস্য রেখে আইটেমভিত্তিক রেট যাচাই ও মোট খরচের হিসাব।',
      },
      {
        id: 'feat-cd-3',
        title: 'অডিট-কমপ্লায়েন্ট রিপোর্ট',
        description: 'প্রাতিষ্ঠানিক পর্যালোচনার উপযোগী ফরম্যাটে বিস্তারিত বিবরণ ও শিট উপস্থাপন।',
      },
    ],
    faqs: [
      {
        id: 'faq-cd-1',
        question: 'CivilDesk কাদের জন্য তৈরি করা হয়েছে?',
        answer: 'CivilDesk মূলত বাংলাদেশ ব্যাংকের কর্মকর্তাদের প্রাতিষ্ঠানিক প্রকৌশল ও এস্টিমেশন কার্যক্রম পরিচালনার উদ্দেশ্যে তৈরি করা হয়েছে।',
      },
      {
        id: 'faq-cd-2',
        question: 'CivilDesk-এর মূল কাজ কী?',
        answer: 'সিভিল ইঞ্জিনিয়ারিং পরিমাপের হিসাব, রেট বিশ্লেষণ এবং প্রাতিষ্ঠানিক নিরীক্ষা-সম্মত প্রাক্কলন প্রস্তুত করা।',
      },
    ],
    metaTitle: 'CivilDesk — Engineering & BOQ Web Platform | BDCON Labs',
    metaDescription: 'বাংলাদেশ ব্যাংকের কর্মকর্তাদের জন্য তৈরি পেশাদার সিভিল ইঞ্জিনিয়ারিং, রেট অ্যানালাইসিস ও এস্টিমেশন প্ল্যাটফর্ম।',
    seo: {
      title: 'CivilDesk — Engineering & BOQ Web Platform | BDCON Labs',
      description: 'বাংলাদেশ ব্যাংকের কর্মকর্তাদের জন্য তৈরি পেশাদার সিভিল ইঞ্জিনিয়ারিং, রেট অ্যানালাইসিস ও এস্টিমেশন প্ল্যাটফর্ম।',
    },
  },
  {
    id: 'prod-civil-estimator-bd',
    name: 'Civil Estimator BD',
    slug: 'civil-estimator-bd',
    tagline: 'Civil Engineering & Building Estimation Mobile App',
    type: 'Android Application',
    shortDescription: 'সিভিল ইঞ্জিনিয়ারিং ও ভবন নির্মাণের বাস্তব পরিমাপ ও প্রাক্কলনের জন্য তৈরি একটি নির্ভরযোগ্য অ্যান্ড্রয়েড অ্যাপ্লিকেশন।',
    description: 'Civil Estimator BD একটি বাস্তবমুখী অ্যান্ড্রয়েড অ্যাপ্লিকেশন যা নির্মাণ সাইট ও অফিসে কর্মরত সিভিল ইঞ্জিনিয়ার, সাইট সুপারভাইজার ও ঠিকাদারদের দ্রুত ও নির্ভুলভাবে রড, সিমেন্ট, বালি, ইট ও কংক্রিটের পরিমাণ হিসাব করতে সহায়তা করে।',
    category: 'Mobile Engineering Tools',
    platforms: ['android'],
    platform: 'android',
    status: 'available',
    featured: false,
    order: 3,
    displayOrder: 3,
    problem: 'নির্মাণ সাইটে সার্বক্ষণিক কম্পিউটার বা জটিল সফটওয়্যার ব্যবহারের সুযোগ থাকে না, ফলে দ্রুত মালামালের হিসাব করতে গিয়ে ভুলের সম্ভাবনা থাকে।',
    solution: 'স্মার্টফোনের মাধ্যমে সরাসরি সাইটেই কংক্রিট, ব্রিকওয়ার্ক, প্লাস্টার ও রডের সুনির্দিষ্ট পরিমাণ বের করার উপযোগী ডেডিকেটেড মোবাইল অ্যাপ।',
    whoIsItFor: [
      'সাইট ইঞ্জিনিয়ার ও সুপারভাইজার',
      'সিভিল ডিপ্লোমা ও গ্র্যাজুয়েট প্রকৌশলী',
      'নির্মাণ ঠিকাদার ও রাজমিস্ত্রি পরিচালনা দল',
      'ব্যক্তিগত বাড়ি নির্মাণকারী',
    ],
    features: [
      'কংক্রিট ভলিউম ও ঢালাই উপাদান হিসাব',
      'ব্রিকওয়ার্ক ও প্লাস্টারিং মসলা পরিমাপ',
      'রড/রিবার ওজোন ও কাটিং দৈর্ঘ্য হিসাব',
      'অফলাইন ব্যবহারযোগ্য মোবাইল আর্কিটেকচার',
    ],
    detailedFeatures: [
      {
        id: 'feat-ce-1',
        title: 'সাইট-রেডি ক্যালকুলেটর',
        description: 'নির্মাণ সাইটের জরুরি প্রয়োজনে তাৎক্ষণিকভাবে মালামালের পরিমাণ নির্ণয়।',
      },
      {
        id: 'feat-ce-2',
        title: 'রড ও ম্যাটেরিয়ালস রিকোয়ারমেন্ট',
        description: 'বিভিন্ন ব্যাসের রডের ওজন, পরিমাণ ও অপচয় হিসাবের সুনির্দিষ্ট টুল।',
      },
      {
        id: 'feat-ce-3',
        title: 'মোবাইল ইন্টারফেস',
        description: 'সহজ ও স্পষ্ট ইন্টারফেস যা ফিল্ড কন্ডিশনেও দ্রুত পরিচালনা করা সম্ভব।',
      },
    ],
    faqs: [
      {
        id: 'faq-ce-1',
        question: 'Civil Estimator BD কোন প্ল্যাটফর্মে ব্যবহারযোগ্য?',
        answer: 'এটি অ্যান্ড্রয়েড ডিভাইসের জন্য তৈরি একটি ডেডিকেটেড মোবাইল অ্যাপ্লিকেশন।',
      },
      {
        id: 'faq-ce-2',
        question: 'অ্যাপটির মাধ্যমে কী কী হিসাব করা যায়?',
        answer: 'কংক্রিট, রড, ইট, বালি, সিমেন্ট, প্লাস্টার ও পেইন্টিং কাজের প্রয়োজনীয় সামগ্রী নির্ভুলভাবে হিসাব করা যায়।',
      },
    ],
    metaTitle: 'Civil Estimator BD — Android Civil Engineering App | BDCON Labs',
    metaDescription: 'সিভিল ইঞ্জিনিয়ার ও নির্মাণ কাজের জন্য তৈরি অ্যান্ড্রয়েড এস্টিমেশন অ্যাপ — সাইট ও অফিস কাজের নির্ভুল সহযোগী।',
    seo: {
      title: 'Civil Estimator BD — Android Civil Engineering App | BDCON Labs',
      description: 'সিভিল ইঞ্জিনিয়ার ও নির্মাণ কাজের জন্য তৈরি অ্যান্ড্রয়েড এস্টিমেশন অ্যাপ — সাইট ও অফিস কাজের নির্ভুল সহযোগী।',
    },
  },
  {
    id: 'prod-buildest-bd',
    name: 'BuildEst BD',
    slug: 'buildest-bd',
    tagline: 'Professional building estimation and quantity surveying software',
    type: 'Software Product / Web Application',
    platform: 'web',
    shortDescription: 'Professional software for construction estimation, quantity surveying, measurement, and BOQ generation for construction professionals and builders.',
    description: 'BuildEst BD is a purpose-built software product developed by BDCON Labs for construction estimation, quantity surveying, structural measurement, and automated BOQ preparation. Designed specifically to solve accurate cost forecasting and takeoff workflows for construction professionals.',
    category: 'Construction & Estimation',
    platforms: ['web', 'android'],
    status: 'in_development',
    featured: false,
    problem: 'Manual construction estimating and material takeoff are slow, error-prone, and lead to costly budget overruns on job sites due to formula discrepancies and unstandardized calculation sheets.',
    solution: 'BuildEst BD delivers a structured quantity surveying and estimation engine that automates measurement analysis, streamlines takeoff routines, and generates standardized BOQs with speed and precision.',
    whoIsItFor: [
      'Civil Engineers',
      'Quantity Surveyors',
      'Estimators',
      'Contractors',
      'Construction Professionals',
    ],
    features: [
      'Construction estimation',
      'Quantity surveying & measurement',
      'Automated BOQ generation',
      'Civil engineering workflows',
    ],
    detailedFeatures: [
      {
        id: 'feat-1',
        title: 'Construction Estimation Engine',
        description: 'Structured calculation workflows designed specifically for building construction, structural elements, masonry, reinforcement, and architectural finishes.',
      },
      {
        id: 'feat-2',
        title: 'Quantity Surveying & Takeoff',
        description: 'Automated calculation routines converting structural dimensions and site measurements into reliable, audit-ready material takeoff schedules.',
      },
      {
        id: 'feat-3',
        title: 'Automated BOQ Generation',
        description: 'Instantly compiles standardized Bill of Quantities with itemized rate analyses, formatted measurement sheets, and clear cost summaries.',
      },
      {
        id: 'feat-4',
        title: 'Multi-Platform Accessibility',
        description: 'Engineered for seamless productivity across modern Web browsers in the office and Android devices on the construction job site.',
      },
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'What is BuildEst BD?',
        answer: 'BuildEst BD is a professional software product developed by BDCON Labs specifically for building construction estimation, structural quantity surveying, and automated BOQ preparation.',
      },
      {
        id: 'faq-2',
        question: 'Which platforms are supported by BuildEst BD?',
        answer: 'BuildEst BD is engineered as a responsive Web application accessible from desktop browsers and an Android application for on-site field calculations.',
      },
      {
        id: 'faq-3',
        question: 'Who should use BuildEst BD?',
        answer: 'The software is built for civil engineers, quantity surveyors, building contractors, estimators, site supervisors, and construction project firms.',
      },
      {
        id: 'faq-4',
        question: 'How does it help with Bill of Quantities (BOQ)?',
        answer: 'BuildEst BD automates the transformation of dimensional measurements into formatted BOQ schedules, reducing manual transposition errors and saving hours of repetitive spreadsheet entry.',
      },
    ],
    metaTitle: 'BuildEst BD — Construction Estimation Software | BDCON Labs',
    metaDescription: 'Professional building estimation, quantity surveying, and automated BOQ software by BDCON Labs for civil engineers, contractors, and construction professionals.',
    seo: {
      title: 'BuildEst BD — Construction Estimation Software | BDCON Labs',
      description: 'Professional building estimation, quantity surveying, and automated BOQ software by BDCON Labs for civil engineers, contractors, and construction professionals.',
    },
    websiteUrl: '',
    androidUrl: '',
    order: 4,
    displayOrder: 4,
  },
];

export async function getProducts(): Promise<Product[]> {
  const products = await getProductsService();
  return [...products].sort((a, b) => (a.order ?? a.displayOrder ?? 99) - (b.order ?? b.displayOrder ?? 99));
}

export async function getFeaturedProduct(): Promise<Product | null> {
  const featured = await getFeaturedProductsService();
  return featured[0] || (await getProducts())[0] || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return getProductBySlugService(slug);
}
