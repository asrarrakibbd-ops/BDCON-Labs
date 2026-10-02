import { PortfolioProject, PortfolioCategory } from '../types/portfolio';
import { 
  getPortfolioProjectsService, 
  getFeaturedProjectsService, 
  getPortfolioProjectBySlugService 
} from '../lib/supabase/services/portfolio';

/**
 * BDCON Labs Portfolio Projects Repository
 * 
 * Strict compliance with Stage 1 rules:
 * - Real projects only:
 *   1. SalaryBD (বেতন নির্ধারণ ২০২৬) — Order 1, Featured
 *   2. CivilDesk — Order 2, Live
 *   3. Civil Estimator BD — Order 3, Live Android
 *   4. BuildEst BD — Order 4, In Development (existing preserved)
 *   5. Rakib Asrar Website — Order 5, Personal/Author Website (Not in product catalogue)
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-salary-bd',
    slug: 'salary-bd',
    title: 'বেতন নির্ধারণ ২০২৬',
    shortDescription: 'বাংলাদেশ-কেন্দ্রিক বেতন ও পে নির্ধারণ ওয়েব অ্যাপ্লিকেশন — মাসিক গ্রস ও নেট বেতন, বাড়িভাড়া, চিকিৎসা ভাতা ও কর কর্তন হিসাব।',
    description: 'বেতন নির্ধারণ ২০২৬ (SalaryBD) একটি বিশেষায়িত ওয়েব অ্যাপ্লিকেশন, যা বাংলাদেশের সরকারি ও বেসরকারি পেশাজীবীদের বেতন কাঠামো, প্রযোজ্য ভাতা এবং কর কর্তন দ্রুত ও নির্ভুলভাবে হিসাব করতে সহায়তা করে।',
    category: 'web-application',
    projectType: 'Web Application / Financial Calculator',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    platforms: ['web'],
    featured: true,
    liveUrl: 'https://salarybd.online/',
    year: 2026,
    status: 'live',
    order: 1,
    displayOrder: 1,
    challenge: 'বাংলাদেশের বেতন কাঠামোতে বিভিন্ন গ্রেড, অবস্থানভেদে বাড়িভাড়া ভাতার পার্থক্য এবং কর কর্তনের ম্যানুয়াল হিসাব সময়সাপেক্ষ ও জটিল।',
    solution: 'একটি পরিচ্ছন্ন ও স্বয়ংক্রিয় ওয়েব ইন্টারফেস যেখানে ব্যবহারকারী মূল বেতন ও সংশ্লিষ্ট তথ্য দিয়ে এক ক্লিকে সম্পূর্ণ বিশ্লেষণ দেখতে পারেন।',
    keyFeatures: [
      'মাসিক ও বাৎসরিক পে নির্ধারণ ক্যালকুলেটর',
      'বাড়িভাড়া ও চিকিৎসা ভাতা সমন্বয়',
      'প্রভিডেন্ট ফান্ড ও প্রযোজ্য কর কর্তন গাইড',
      'মোবাইল ও ডেস্কটপ সব ডিভাইসে দ্রুত ব্যবহারের উপযোগী',
    ],
    seo: {
      title: 'বেতন নির্ধারণ ২০২৬ — Portfolio & Case Study | BDCON Labs',
      description: 'Explore SalaryBD: Bangladesh-focused salary and pay determination web application by BDCON Labs.',
    },
  },
  {
    id: 'proj-civildesk',
    slug: 'civildesk',
    title: 'CivilDesk',
    shortDescription: 'বাংলাদেশ ব্যাংকের কর্মকর্তাদের জন্য ডেভেলপকৃত প্রাতিষ্ঠানিক সিভিল ইঞ্জিনিয়ারিং, পিডব্লিউডি রেট অ্যানালাইসিস ও এস্টিমেশন প্ল্যাটফর্ম।',
    description: 'CivilDesk একটি উচ্চ-নির্ভুলতাসম্পন্ন প্রকৌশল ওয়েব অ্যাপ্লিকেশন যা বাংলাদেশ ব্যাংকের সংশ্লিষ্ট কর্মকর্তাদের কাজের প্রয়োজনে ডেভেলপ করা হয়েছে। এটি কাঠামোগত পরিমাপ মাত্রা সংরক্ষণ, রেট বিশ্লেষণ এবং অডিট-সম্মত বিওকিউ তৈরিতে সহায়ক।',
    category: 'web-application',
    projectType: 'Enterprise Engineering Web Application',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    platforms: ['web'],
    featured: false,
    clientName: 'Bangladesh Bank Officials',
    clientVisible: true,
    liveUrl: 'https://cdesk.xyz/',
    year: 2025,
    status: 'live',
    order: 2,
    displayOrder: 2,
    challenge: 'প্রাতিষ্ঠানিক পর্যায়ে সিভিল এস্টিমেশন প্রস্তুত ও নিরীক্ষার ক্ষেত্রে বিভিন্ন শিডিউলের সাথে পরিমাপের ক্রস-ভেরিফিকেশন ম্যানুয়ালি করা অত্যন্ত শ্রমসাধ্য।',
    solution: 'পরিমাপের সুনির্দিষ্ট কাঠামো, পিডব্লিউডি শিডিউল রেট ম্যাপিং এবং নিরীক্ষা-বান্ধব প্রতিবেদন তৈরির সমন্বিত সমাধান।',
    keyFeatures: [
      'পরিমাপ মাত্রা নির্ভুল সংরক্ষণ ও সংগঠন',
      'রেট অ্যানালাইসিস ও শিডিউল রেট ম্যাপিং',
      'অডিট-সম্মত বিওকিউ (BOQ) ও এস্টিমেট জেনারেশন',
      'প্রাতিষ্ঠানিক ডাটা ইন্টিগ্রিটি ও সুরক্ষা',
    ],
    seo: {
      title: 'CivilDesk — Portfolio & Case Study | BDCON Labs',
      description: 'CivilDesk: Professional civil engineering and BOQ web application developed for Bangladesh Bank officials.',
    },
  },
  {
    id: 'proj-civil-estimator-bd',
    slug: 'civil-estimator-bd',
    title: 'Civil Estimator BD',
    shortDescription: 'সিভিল ইঞ্জিনিয়ারিং হিসাব ও ভবন নির্মাণের মাঠপর্যায়ের প্রাক্কলনের জন্য তৈরি লাইভ অ্যান্ড্রয়েড অ্যাপ্লিকেশন।',
    description: 'Civil Estimator BD সাইট ও অফিসের সিভিল ইঞ্জিনিয়ার, ঠিকাদার ও সুপারভাইজারদের জন্য একটি নির্ভরযোগ্য মোবাইল সমাধান, যা রড, সিমেন্ট, বালি, ইট ও ঢালাই কাজের দ্রুত হিসাব প্রদান করে।',
    category: 'mobile-application',
    projectType: 'Android Mobile Application',
    technologies: ['Android', 'Java/Kotlin', 'SQLite'],
    platforms: ['android'],
    featured: false,
    year: 2024,
    status: 'live',
    order: 3,
    displayOrder: 3,
    challenge: 'নির্মাণ সাইটে মালামালের হিসাব তাৎক্ষণিকভাবে বের করা এবং সূত্রগত ভুলের কারণে অপচয় রোধ করা।',
    solution: 'সাইটেই দ্রুত ইনপুট দিয়ে ম্যাটেরিয়ালসের সঠিক চাহিদা ও রডের ওজন হিসাবের স্ট্যান্ডঅ্যালোন মোবাইল অ্যাপ্লিকেশন।',
    keyFeatures: [
      'কংক্রিট ও ঢালাই উপাদান (সিমেন্ট, বালি, খোয়া) হিসাব',
      'গাঁথুনি ও প্লাস্টারের মসলা নির্ণয়',
      'রড/রিবারের ওজন ও সাইট রিকোয়ারমেন্ট শিট',
      'অফলাইন ব্যবহারযোগ্য মোবাইল আর্কিটেকচার',
    ],
    seo: {
      title: 'Civil Estimator BD — Portfolio & Case Study | BDCON Labs',
      description: 'Civil Estimator BD: Live Android application for civil engineering building estimation and site takeoff.',
    },
  },
  {
    id: 'proj-buildest-bd',
    slug: 'buildest-bd',
    title: 'BuildEst BD',
    shortDescription: 'Professional building estimation and quantity surveying software engineered for civil engineers, quantity surveyors, and construction builders.',
    description: 'BuildEst BD is a purpose-built software product developed by BDCON Labs for construction estimation, quantity surveying, structural measurement, and automated BOQ preparation. Designed specifically to solve accurate cost forecasting and takeoff workflows for construction professionals.',
    category: 'product',
    projectType: 'Proprietary Software Product',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Android', 'Vite'],
    platforms: ['web', 'android'],
    featured: false,
    clientVisible: false,
    year: 2026,
    challenge: 'Manual construction estimating and material takeoff are slow, error-prone, and lead to costly budget overruns on job sites due to formula discrepancies and unstandardized calculation sheets.',
    solution: 'BuildEst BD delivers a structured quantity surveying and estimation engine that automates measurement analysis, streamlines takeoff routines, and generates standardized BOQs with speed and precision.',
    keyFeatures: [
      'Construction estimation calculation workflows',
      'Quantity surveying & audit-ready material takeoff schedules',
      'Automated BOQ generation and rate analyses',
      'Multi-platform accessibility across Web and Android devices',
    ],
    status: 'in-development',
    order: 4,
    displayOrder: 4,
    seo: {
      title: 'BuildEst BD — Case Study & Project Details | BDCON Labs',
      description: 'Explore BuildEst BD: Professional construction estimation and automated BOQ generation software engineered by BDCON Labs.',
    },
  },
  {
    id: 'proj-rakib-asrar',
    slug: 'rakib-asrar',
    title: 'Rakib Asrar',
    shortDescription: 'লেখক ও গবেষক রাকিব আসরারের অফিসিয়াল ওয়েবসাইট — সাহিত্যকর্ম, চিন্তাশীল রচনা ও প্রকাশিত বই সংক্রান্ত পোর্টফোলিও প্ল্যাটফর্ম।',
    description: 'রাকিব আসরারের অফিসিয়াল ব্যক্তিগত ও লেখক ওয়েবসাইট, যা তার প্রকাশিত বই, চিন্তাশীল রচনা, শিল্প-সাহিত্য ও বুদ্ধিবৃত্তিক কাজের একটি মার্জিত অনলাইন উপস্থিতি গড়ে তোলে। এটি বিডিকন ল্যাবসের সাথে সংযুক্ত একটি বিশেষ পোর্টফোলিও প্রকল্প।',
    category: 'website',
    projectType: 'Author / Personal Website',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    platforms: ['web'],
    featured: false,
    liveUrl: 'https://asrarbd.vercel.app/',
    year: 2025,
    status: 'live',
    order: 5,
    displayOrder: 5,
    challenge: 'একজন লেখক ও গবেষকের বহুমুখী সাহিত্যকর্ম, চিন্তাধারা ও বইসমূহকে পরিচ্ছন্ন, নান্দনিক এবং সহজপাঠ্য উপায়ে তুলে ধরা।',
    solution: 'মার্জিত টাইপোগ্রাফি, পাঠ-উপযোগী বিন্যাস এবং বিষয়ভিত্তিক আর্কাইভের সমন্বয়ে নির্মিত একটি শান্ত ও পরিশীলিত সম্পাদকীয় ওয়েবসাইট।',
    keyFeatures: [
      'লেখক পরিচিতি ও প্রকাশিত বইয়ের ক্যাটালগ',
      'প্রবন্ধ ও সাহিত্যকর্মের পাঠ-উপযোগী বিন্যাস',
      'মার্জিত বাংলা ও ইংরেজি টাইপোগ্রাফিক হায়ারার্কি',
      'সহজ ও দ্রুত লোডিং রেসপনসিভ ওয়েব ডিজাইন',
    ],
    seo: {
      title: 'Rakib Asrar — Author Website Portfolio | BDCON Labs',
      description: 'Official personal and author website for Rakib Asrar — connected portfolio project by BDCON Labs.',
    },
  },
];

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const projects = await getPortfolioProjectsService();
  return [...projects].sort((a, b) => (a.order ?? a.displayOrder ?? 99) - (b.order ?? b.displayOrder ?? 99));
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  const all = await getPortfolioProjects();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : [all[0]];
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  return getPortfolioProjectBySlugService(slug);
}

export async function getProjectsByCategory(category: PortfolioCategory): Promise<PortfolioProject[]> {
  const projects = await getPortfolioProjects();
  if (category === 'all') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}
