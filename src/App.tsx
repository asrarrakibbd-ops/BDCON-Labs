import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './i18n/I18nContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { RouterProvider, useRouter, matchPath } from './lib/router';
import { AppLayout } from './components/layout/AppLayout';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AdminRoute } from './components/admin/AdminRoute';
import { SEO } from './components/common/SEO';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Public core pages (eagerly loaded for optimal FCP / LCP performance)
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { EngineeringPage } from './pages/EngineeringPage';
import { EngineeringServicesPage } from './pages/EngineeringServicesPage';
import { EngineeringServiceDetailPage } from './pages/EngineeringServiceDetailPage';
import { EngineeringProjectsPage } from './pages/EngineeringProjectsPage';
import { EngineeringProjectDetailPage } from './pages/EngineeringProjectDetailPage';
import { EngineeringContactPage } from './pages/EngineeringContactPage';
import { StartProjectPage } from './pages/StartProjectPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { RakibAsrarPage } from './pages/rakib-asrar/RakibAsrarPage';
import { RakibAsrarAboutPage } from './pages/rakib-asrar/RakibAsrarAboutPage';
import { BooksPage } from './pages/rakib-asrar/BooksPage';
import { BookDetailPage } from './pages/rakib-asrar/BookDetailPage';
import { WritingPage } from './pages/rakib-asrar/WritingPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages: Code-split via React.lazy to completely isolate admin bundle from public users
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage').then(m => ({ default: m.AdminProductsPage })));
const AdminServicesPage = lazy(() => import('./pages/admin/AdminServicesPage').then(m => ({ default: m.AdminServicesPage })));
const AdminPortfolioPage = lazy(() => import('./pages/admin/AdminPortfolioPage').then(m => ({ default: m.AdminPortfolioPage })));
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage').then(m => ({ default: m.AdminBlogPage })));
const AdminBooksPage = lazy(() => import('./pages/admin/AdminBooksPage').then(m => ({ default: m.AdminBooksPage })));
const AdminProjectRequestsPage = lazy(() => import('./pages/admin/AdminProjectRequestsPage').then(m => ({ default: m.AdminProjectRequestsPage })));
const AdminContactMessagesPage = lazy(() => import('./pages/admin/AdminContactMessagesPage').then(m => ({ default: m.AdminContactMessagesPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

import { ALL_ROUTES } from './pages/routes';
import { RouteConfig } from './types/navigation';
import { AdminDashboardSkeleton } from './components/admin/AdminDashboardSkeleton';

const AdminLoadingFallback: React.FC = () => <AdminDashboardSkeleton />;

const AppRoutes: React.FC = () => {
  const { path } = useRouter();

  // Root Homepage
  if (path === '/') {
    return <HomePage />;
  }

  // Products Catalogue Route (Stage 5)
  if (path === '/products') {
    return <ProductsPage />;
  }

  // Dynamic Product Detail Route (Stage 5)
  const productDetailMatch = matchPath('/products/:slug', path);
  if (productDetailMatch.matches) {
    return <ProductDetailPage />;
  }

  // Services Catalogue Route (Stage 6)
  if (path === '/services') {
    return <ServicesPage />;
  }

  // Dynamic Service Detail Route (Stage 6)
  const serviceDetailMatch = matchPath('/services/:slug', path);
  if (serviceDetailMatch.matches) {
    return <ServiceDetailPage />;
  }

  // BDCON Engineering Ltd Routes
  if (path === '/engineering') {
    return <EngineeringPage />;
  }

  if (path === '/engineering/services') {
    return <EngineeringServicesPage />;
  }

  const engineeringServiceDetailMatch = matchPath('/engineering/services/:slug', path);
  if (engineeringServiceDetailMatch.matches) {
    return <EngineeringServiceDetailPage />;
  }

  if (path === '/engineering/projects') {
    return <EngineeringProjectsPage />;
  }

  const engineeringProjectDetailMatch = matchPath('/engineering/projects/:slug', path);
  if (engineeringProjectDetailMatch.matches) {
    return <EngineeringProjectDetailPage />;
  }

  if (path === '/engineering/contact') {
    return <EngineeringContactPage />;
  }

  // Portfolio Catalogue Route (Stage 8)
  if (path === '/portfolio') {
    return <PortfolioPage />;
  }

  // Dynamic Case Study / Project Detail Route (Stage 8)
  const portfolioDetailMatch = matchPath('/portfolio/:slug', path);
  if (portfolioDetailMatch.matches) {
    return <ProjectDetailPage />;
  }

  // About BDCON Labs Route (Stage 9)
  if (path === '/about') {
    return <AboutPage />;
  }

  // Contact BDCON Labs Route (Stage 9)
  if (path === '/contact') {
    return <ContactPage />;
  }

  // Rakib Asrar Landing Page (Stage 10)
  if (path === '/rakib-asrar') {
    return <RakibAsrarPage />;
  }

  // Rakib Asrar About Page (Stage 10)
  if (path === '/rakib-asrar/about') {
    return <RakibAsrarAboutPage />;
  }

  // Rakib Asrar Books Catalogue (Stage 10)
  if (path === '/rakib-asrar/books') {
    return <BooksPage />;
  }

  // Rakib Asrar Book Detail Route (Stage 10)
  const bookDetailMatch = matchPath('/rakib-asrar/books/:slug', path);
  if (bookDetailMatch.matches) {
    return <BookDetailPage />;
  }

  // Rakib Asrar Writing / Essays Route (Stage 10 & 11)
  if (path === '/rakib-asrar/writing') {
    return <WritingPage />;
  }

  // Rakib Asrar Writing Detail Route (Stage 11)
  const writingDetailMatch = matchPath('/rakib-asrar/writing/:slug', path);
  if (writingDetailMatch.matches) {
    return <WritingPage />;
  }

  // Start Project Inquiry Route (Stage 6)
  if (path === '/start-project') {
    return <StartProjectPage />;
  }

  // ============================================================================
  // ADMIN ROUTES (Stage 14 & 15: Lazy-loaded + strictly unindexed)
  // ============================================================================

  if (path === '/admin/login') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Admin Login — BDCON Labs" noindex={true} canonicalPath="/admin/login" />
        <AdminLoginPage />
      </Suspense>
    );
  }

  if (path === '/admin' || path === '/admin/') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Dashboard — BDCON Labs Admin" noindex={true} canonicalPath="/admin" />
        <AdminRoute>
          <AdminDashboardPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/products') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Products — BDCON Labs Admin" noindex={true} canonicalPath="/admin/products" />
        <AdminRoute>
          <AdminProductsPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/services') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Services — BDCON Labs Admin" noindex={true} canonicalPath="/admin/services" />
        <AdminRoute>
          <AdminServicesPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/portfolio') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Portfolio — BDCON Labs Admin" noindex={true} canonicalPath="/admin/portfolio" />
        <AdminRoute>
          <AdminPortfolioPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/blog') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Writing & Blog — BDCON Labs Admin" noindex={true} canonicalPath="/admin/blog" />
        <AdminRoute>
          <AdminBlogPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/books') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Books — BDCON Labs Admin" noindex={true} canonicalPath="/admin/books" />
        <AdminRoute>
          <AdminBooksPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/project-requests') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Project Requests — BDCON Labs Admin" noindex={true} canonicalPath="/admin/project-requests" />
        <AdminRoute>
          <AdminProjectRequestsPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/messages') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Messages — BDCON Labs Admin" noindex={true} canonicalPath="/admin/messages" />
        <AdminRoute>
          <AdminContactMessagesPage />
        </AdminRoute>
      </Suspense>
    );
  }

  if (path === '/admin/settings') {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <SEO title="Settings — BDCON Labs Admin" noindex={true} canonicalPath="/admin/settings" />
        <AdminRoute>
          <AdminSettingsPage />
        </AdminRoute>
      </Suspense>
    );
  }

  // Find matching route in registered routes table for future stages
  let matchedRoute: RouteConfig | undefined;
  for (const route of ALL_ROUTES) {
    if (route.isParametric) {
      const match = matchPath(route.path, path);
      if (match.matches) {
        matchedRoute = route;
        break;
      }
    } else if (route.path === path) {
      matchedRoute = route;
      break;
    }
  }

  if (matchedRoute) {
    return <PlaceholderPage route={matchedRoute} />;
  }

  // Not Found Route (noindex)
  return <NotFoundPage />;
};

const MainRouter: React.FC = () => {
  const { path } = useRouter();
  const isAdmin = path.startsWith('/admin');
  const shouldReduceMotion = useReducedMotion();

  // Smooth fade-in and slide-up animation configuration
  const pageVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 },
  };

  const pageTransition = {
    duration: 0.26,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  // Admin section handles its own isolated administrative layout shell & login card
  if (isAdmin) {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="w-full flex-1 flex flex-col"
        >
          <AppRoutes />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Public website uses standard navigation bar and footer
  return (
    <AppLayout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="w-full flex-1 flex flex-col"
        >
          <AppRoutes />
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <I18nProvider>
          <RouterProvider>
            <AdminAuthProvider>
              <MainRouter />
            </AdminAuthProvider>
          </RouterProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
