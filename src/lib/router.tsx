import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';

export interface RouterContextType {
  path: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  params: Record<string, string>;
  isCurrent: (to: string, exact?: boolean) => boolean;
}

export const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Pattern matcher for routes with parameters like /products/:slug
export function matchPath(pattern: string, actualPath: string): { matches: boolean; params: Record<string, string> } {
  const patternSegments = pattern.replace(/\/+$/, '').split('/');
  const actualSegments = actualPath.replace(/\/+$/, '').split('/');

  // Root case
  if (pattern === '/' && actualPath === '/') {
    return { matches: true, params: {} };
  }

  if (patternSegments.length !== actualSegments.length) {
    return { matches: false, params: {} };
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegments.length; i++) {
    const pSeg = patternSegments[i];
    const aSeg = actualSegments[i];

    if (pSeg.startsWith(':')) {
      const paramName = pSeg.slice(1);
      params[paramName] = decodeURIComponent(aSeg);
    } else if (pSeg !== aSeg) {
      return { matches: false, params: {} };
    }
  }

  return { matches: true, params };
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;

    if (to === currentPath) return;

    if (options?.replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrent = (to: string, exact: boolean = false): boolean => {
    if (exact || to === '/') {
      return currentPath === to;
    }
    return currentPath === to || currentPath.startsWith(`${to}/`);
  };

  const value = useMemo(() => ({
    path: currentPath,
    navigate,
    params: {},
    isCurrent,
  }), [currentPath]);

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  activeClassName?: string;
  exact?: boolean;
  children: ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  to,
  replace = false,
  className = '',
  activeClassName = '',
  exact = false,
  children,
  onClick,
  ...props
}) => {
  const { path, navigate, isCurrent } = useRouter();
  const isActive = isCurrent(to, exact);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Allow default for modifier keys or external protocols
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
      return;
    }

    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:')) {
      return;
    }

    e.preventDefault();
    navigate(to, { replace });
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`.trim()}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};
