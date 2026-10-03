export interface EngineeringWorkflowStep {
  step: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
}

export interface EngineeringService {
  slug: string;
  number: string;
  titleEn: string;
  titleBn: string;
  shortDescEn: string;
  shortDescBn: string;
  introductionEn: string;
  introductionBn: string;
  whatWeProvideEn: string[];
  whatWeProvideBn: string[];
  deliverablesEn: string[];
  deliverablesBn: string[];
  workflow: EngineeringWorkflowStep[];
  iconName: 'building' | 'drafting' | 'calculator' | 'spreadsheet' | 'hardhat' | 'compass';
}
