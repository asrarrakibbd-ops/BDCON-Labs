export interface AuthorSocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface AuthorTimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AuthorTestimonial {
  id: string;
  readerName: string;
  readerRole?: string;
  content: string;
  avatarUrl?: string;
}

export interface AuthorProfile {
  name: string;
  displayName: string;
  legalName: string;
  role: string;
  tagline: string;
  shortBio: string;
  biography: string;
  profileImage: string;
  education: string;
  profession: string;
  birthDate: string;
  birthPlace: string;
  literaryInterests: string[];
  socialLinks: AuthorSocialLink[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  timeline: AuthorTimelineEvent[];
  testimonials: AuthorTestimonial[];
}

export const AUTHOR_PROFILE: AuthorProfile = {
  name: "রাকিব আসরার",
  displayName: "রাকিব আসরার",
  legalName: "রাকিবুল হাসান",
  role: "লেখক · কথাসাহিত্যিক · ক্রিয়েটর",
  tagline: "শব্দের ভেতর দিয়ে মানুষকে খুঁজে পাই—আর গল্পের ভেতর দিয়ে নিজেকে।",
  shortBio: "রাকিব আসরার (রাকিবুল হাসান) একজন বাংলাদেশী প্রকৌশলী, কথাসাহিত্যিক এবং গল্পকার। লেখালেখির পাশাপাশি কাজ করছেন প্রযুক্তি ও সৃজনশীল মাধ্যমে।",
  biography: "রাকিব আসরার (রাকিবুল হাসান) একজন বাংলাদেশী প্রকৌশলী, লেখক এবং গল্পকার। রাকিব আসরারের (রাকিবুল হাসান) জন্ম ১৯৯২ সালের ১৭ই এপ্রিল, চট্টগ্রামের সাতকানিয়া থানার উত্তর কালিয়াইশ গ্রামে। তাঁর শৈশব কেটেছে সাতকানিয়ারই আরেকটি গ্রাম করইয়া নগরে। তিনি বাবা রমিজ আহামদ ও মা আছপিয়া বেগমের একমাত্র সন্তান।\nতিনি ২০১৫ সালে চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (চুয়েট) থেকে পুরকৌশলে স্নাতক সম্পন্ন করেন। এরপর ২০১৬ থেকে ২০১৮ সাল পর্যন্ত কাজ করেছেন একটি বেসরকারি পরামর্শক প্রতিষ্ঠানে কোয়ালিটি কন্ট্রোল ইঞ্জিনিয়ার হিসেবে। বর্তমানে তিনি বাংলাদেশ ব্যাংকে সহকারী পরিচালক পদে কর্মরত।\nলেখালেখির জগতে রাকিব আসরারের আগ্রহ মূলত ঘুরপাক খায় মানুষের মনস্তত্ত্ব, জটিল সম্পর্ক, সমাজের দ্বন্দ্ব আর অস্তিত্ববাদী নানা প্রশ্নকে ঘিরে। তাঁর প্রথম বই ‘পরজীবী’ প্রকাশের পর পাঠকদের মাঝে ইতিবাচক সাড়া ফেলেছিল, এটি তাঁকে সমসাময়িক বাংলা সাহিত্যে একজন উদীয়মান এবং সম্ভাবনাময় লেখক হিসেবে পরিচিতি পেতে সাহায্য করেছে।",
  profileImage: "/images/rakib-asrar/author/portrait.jpg",
  education: "বি.এস.সি ইন পুরকৌশল, চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (চুয়েট), ২০১৫",
  profession: "সহকারী পরিচালক, বাংলাদেশ ব্যাংক",
  birthDate: "১৭ এপ্রিল ১৯৯২",
  birthPlace: "উত্তর কালিয়াইশ গ্রাম, সাতকানিয়া, চট্টগ্রাম",
  literaryInterests: [
    "মানুষের মনস্তত্ত্ব ও মানবীয় আবেগ",
    "জটিল মানবিক সম্পর্ক ও টানাপোড়েন",
    "সামাজিক দ্বন্দ্ব ও সমকালীন বাস্তবতা",
    "অস্তিত্ববাদী নানা প্রশ্ন ও দর্শন"
  ],
  socialLinks: [
    { platform: "Facebook", url: "https://www.facebook.com/rakibulhasanbb/", label: "ফেসবুক প্রোফাইল" },
    { platform: "Facebook Page", url: "https://www.facebook.com/rakibasrar/", label: "লেখক পেজ" },
    { platform: "YouTube", url: "https://www.youtube.com/@TheBoiFM/videos", label: "The Boi FM" },
    { platform: "Instagram", url: "https://www.instagram.com/raaaakibul_hasan/", label: "ইনস্টাগ্রাম" },
    { platform: "Telegram", url: "https://t.me/rakibasrar", label: "টেলিগ্রাম" }
  ],
  contactEmail: "rakibcuetce40@gmail.com",
  contactPhone: "+৮৮০ ১৩৪৪৮৩০৪০৪",
  contactAddress: "প্রকৌশল বিভাগ (৪র্থ তলা), বাংলাদেশ ব্যাংক, আলকরণ মোড়, কোতোয়ালী, চট্টগ্রাম।",
  timeline: [
    {
      year: "২০২৫",
      title: "প্রথম বই প্রকাশ",
      description: "অমর একুশে বইমেলা ২০২৫ এ দাড়িকমা প্রকাশনী থেকে 'পরজীবী' নামের প্রথম গল্পসংকলন প্রকাশিত।"
    },
    {
      year: "২০২৬",
      title: "লেখকের প্রথম উপন্যাস",
      description: "অমর একুশে বইমেলা ২০২৬ এ অক্ষরবৃত্ত প্রকাশনা থেকে লেখকের প্রথম উপন্যাস 'তিলের ছায়া' প্রকাশিত হয়"
    },
  ],
  testimonials: [
    {
      id: "t1772465800411",
      readerName: "নাইমুর রহমান",
      readerRole: "উপপরিচালক, বাংলাদেশ ব্যংক",
      content: "পরজীবী বইটি বেশ ডাইনামিক মনে হয়েছে। একই বইয়ে বিভিন্ন রকমের গল্পের সমাহার। এককথায় বলতে গেলে একের ভেতর সব। বইয়ের ভাষা বেশ প্রাঞ্জল। বই পড়ুয়াদের জন্য মোস্ট রিকোমেন্ডেট।"
    },
    {
      id: "t1772465364726",
      readerName: "মাহফুজুর রহমান",
      readerRole: "সাহিত্য সমালোচক",
      content: "সমকালীন যেসব লেখকদের কথাসাহিত্য পড়ে আরাম পাওয়া যায়, তাদের মধ্যে রাকিব আসরার অন্যতম।\n'তিলের ছায়া' উপন্যাসটিতে পাওয়া শ্রেষ্ঠ সংলাপ \"সব সত্যি সবসময় প্রকাশ করতে হয় না; কিছু সত্যি গোপন করে রাখাটাও একধরনের দায়িত্বের মধ্যে পড়ে\"।\nদুজন নিরীহ প্রেমিক-প্রেমিকা রায়ান আর রাফিয়ার জীবনের এই অভাবনীয় সংকট কি আদৌ কোন সমাধান খুঁজে পাবে সেই কৌতূহল পাঠক হিসেবে আমাকে উৎকণ্ঠার সাথে নিয়ে গেছে উপন্যাসের শেষ অবধি।"
    },
    {
      id: "t1772465416395",
      readerName: "অভিজিৎ দত্ত",
      readerRole: "পাঠক ও প্রকৌশলী",
      content: "'তিলের ছায়া' বইটি পড়ে অদ্ভুত এক অনুভূতির সাথে পরিচয় হলো। দুজন ভিন্ন মানুষের ভাগ্য কীভাবে একই বিন্দুতে মিলে যায়, দুজন ভিন্ন সত্ত্বার সত্য কীভাবে নতুন পরিচয়ের সাথে পরিচিত করে তোলে তার এক আশ্চর্য মিশ্রন এই লেখায়। মানুষ তার অবচেতন মনে যে সত্যকে অনুভব করতে পারে এবং সেই সত্য তাকে খানিকটা হলেও পূর্বাভাস দেয় তা জানা যায় এই লেখায়।"
    },
  ]
};

import { getAuthorProfileService } from '../lib/supabase/services/author';

export async function getAuthorProfile(): Promise<AuthorProfile> {
  return getAuthorProfileService();
}
