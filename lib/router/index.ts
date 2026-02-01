/**
 * Router Configuration
 * TanStack Router setup and route tree
 */

import { createRouter } from '@tanstack/react-router';
import { routeTree } from './route-tree';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// Register router type for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
