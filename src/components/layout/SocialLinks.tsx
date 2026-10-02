import React from 'react';
import { Github, Linkedin, Twitter, Youtube, Globe, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SocialLinksConfig {
  github?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  email?: string;
}

export interface SocialLinksProps {
  links?: SocialLinksConfig;
  className?: string;
  size?: 'sm' | 'md';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links = {},
  className,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5';
  const buttonSize = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';

  // Map only configured, valid URLs.
  // Rule: Do NOT invent fake URLs. If absent, remain unrendered.
  const activeItems: { label: string; url: string; icon: React.ReactNode }[] = [];

  if (links.github && links.github.trim()) {
    activeItems.push({
      label: 'GitHub',
      url: links.github,
      icon: <Github className={iconSize} aria-hidden="true" />,
    });
  }

  if (links.linkedin && links.linkedin.trim()) {
    activeItems.push({
      label: 'LinkedIn',
      url: links.linkedin,
      icon: <Linkedin className={iconSize} aria-hidden="true" />,
    });
  }

  if (links.twitter && links.twitter.trim()) {
    activeItems.push({
      label: 'X (Twitter)',
      url: links.twitter,
      icon: <Twitter className={iconSize} aria-hidden="true" />,
    });
  }

  if (links.youtube && links.youtube.trim()) {
    activeItems.push({
      label: 'YouTube',
      url: links.youtube,
      icon: <Youtube className={iconSize} aria-hidden="true" />,
    });
  }

  if (links.website && links.website.trim()) {
    activeItems.push({
      label: 'Website',
      url: links.website,
      icon: <Globe className={iconSize} aria-hidden="true" />,
    });
  }

  if (links.email && links.email.trim()) {
    activeItems.push({
      label: 'Email',
      url: links.email.startsWith('mailto:') ? links.email : `mailto:${links.email}`,
      icon: <Mail className={iconSize} aria-hidden="true" />,
    });
  }

  // If no configured links exist, do NOT render empty boxes or broken anchors.
  if (activeItems.length === 0) {
    return null;
  }

  return (
    <div
      role="list"
      aria-label="Social and external links"
      className={cn('flex items-center gap-2', className)}
    >
      {activeItems.map((item) => (
        <a
          key={item.label}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={cn(
            'inline-flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] hover:border-[var(--border-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]',
            buttonSize
          )}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};
