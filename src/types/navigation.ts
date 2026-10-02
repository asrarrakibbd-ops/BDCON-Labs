export interface NavItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  path: string;
  isExternal?: boolean;
  children?: NavItem[];
}

export interface RouteConfig {
  path: string;
  name: string;
  category: 'public' | 'author' | 'admin';
  description: string;
  isParametric?: boolean;
}
