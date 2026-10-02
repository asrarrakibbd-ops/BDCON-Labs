import React from 'react';
import { 
  Globe, 
  LayoutDashboard, 
  Smartphone, 
  Code2, 
  Palette, 
  MessageSquare,
  LucideProps
} from 'lucide-react';
import { ServiceIconType } from '../../types/service';
import { cn } from '../../lib/utils';

export interface ServiceIconProps extends LucideProps {
  name: ServiceIconType;
  className?: string;
}

const ICON_MAP: Record<ServiceIconType, React.FC<LucideProps>> = {
  globe: Globe,
  'layout-dashboard': LayoutDashboard,
  smartphone: Smartphone,
  code: Code2,
  palette: Palette,
  'message-square': MessageSquare,
};

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className, ...props }) => {
  const IconComponent = ICON_MAP[name] || Code2;
  return <IconComponent className={cn('w-5 h-5', className)} {...props} aria-hidden="true" />;
};
