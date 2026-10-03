export interface EngineeringProjectGalleryItem {
  id: string;
  url: string;
  titleEn?: string;
  titleBn?: string;
  captionEn?: string;
  captionBn?: string;
  type: 'photo' | 'architectural_drawing' | 'engineering_drawing' | 'estimation_document';
}

export interface EngineeringProject {
  slug: string;
  titleEn: string;
  titleBn: string;
  projectTypeEn: string;
  projectTypeBn: string;
  locationEn?: string;
  locationBn?: string;
  servicesProvidedEn: string[];
  servicesProvidedBn: string[];
  shortDescEn: string;
  shortDescBn: string;
  overviewEn: string;
  overviewBn: string;
  clientEn?: string;
  clientBn?: string;
  year?: number | string;
  statusEn?: string;
  statusBn?: string;
  coverImage?: string;
  gallery: EngineeringProjectGalleryItem[];
}
