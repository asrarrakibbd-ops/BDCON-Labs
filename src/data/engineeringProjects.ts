import { EngineeringProject } from '../types/engineeringProject';

/**
 * BDCON Engineering Ltd — Real Engineering Projects Repository
 * 
 * Strict E3 Compliance:
 * - Only verified real BDCON Engineering civil projects, drawings, and documents are stored here.
 * - Absolutely NO invented project names, fake locations, fake clients, fake values, or stock photos.
 * - When empty, the portfolio cleanly renders a polished placeholder state ready to receive real project data.
 */
export const ENGINEERING_PROJECTS: EngineeringProject[] = [];

export async function getEngineeringProjects(): Promise<EngineeringProject[]> {
  return ENGINEERING_PROJECTS;
}

export async function getEngineeringProjectBySlug(slug: string): Promise<EngineeringProject | undefined> {
  return ENGINEERING_PROJECTS.find((p) => p.slug === slug);
}
