import React from 'react';
import { PortfolioProject } from '../../types/portfolio';
import { ProjectShowcaseVisual } from '../common/ProjectShowcaseVisual';

export interface ProjectVisualProps {
  project: PortfolioProject;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  project,
  className,
  size = 'md',
}) => {
  return (
    <ProjectShowcaseVisual
      slug={project.slug}
      title={project.title}
      subtitle={project.projectType}
      category={project.category}
      coverImage={project.coverImage}
      technologies={project.technologies}
      size={size}
      className={className}
    />
  );
};
