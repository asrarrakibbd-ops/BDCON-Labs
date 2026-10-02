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
