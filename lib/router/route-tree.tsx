/**
 * Route Tree
 * Define all application routes
 */

import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootLayout } from '@/components/layouts/root-layout';

// Root route
export const rootRoute = createRootRoute({
  component: RootLayout,
});

// Public routes
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
});

export const signInRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'signin',
});

export const signUpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'signup',
});

// Protected routes
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
});

export const accidentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'accidents',
});

export const accidentReportRoute = createRoute({
  getParentRoute: () => accidentsRoute,
  path: 'report',
});

export const accidentListRoute = createRoute({
  getParentRoute: () => accidentsRoute,
  path: 'list',
});

export const accidentDetailRoute = createRoute({
  getParentRoute: () => accidentsRoute,
  path: '$accidentId',
});

export const emergencyServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'emergency-services',
});

export const vehiclesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'vehicles',
});

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'profile',
});

// Build the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute.addChildren([signInRoute, signUpRoute]),
  dashboardRoute,
  accidentsRoute.addChildren([
    accidentReportRoute,
    accidentListRoute,
    accidentDetailRoute,
  ]),
  emergencyServicesRoute,
  vehiclesRoute,
  profileRoute,
]);
