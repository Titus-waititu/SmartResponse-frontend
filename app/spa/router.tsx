"use client";

import * as React from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { SpaIndexRoute } from "./routes/index";
import { SpaFormRoute } from "./routes/form";
import { SpaTableRoute } from "./routes/table";
import { SpaQueryRoute } from "./routes/query";
import { SpaZustandRoute } from "./routes/zustand";

function RootLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              TanStack Demo (inside Next)
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Router + Form + Table + Query + Zustand
            </p>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/form">Form</NavLink>
            <NavLink to="/table">Table</NavLink>
            <NavLink to="/query">Query</NavLink>
            <NavLink to="/zustand">Zustand</NavLink>
          </nav>
        </header>

        <main className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <Outlet />
        </main>
      </div>

      {process.env.NODE_ENV === "development" ? (
        <TanStackRouterDevtools position="bottom-right" />
      ) : null}
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{
        className:
          "rounded-full bg-zinc-950 px-3 py-1.5 text-white dark:bg-white dark:text-black",
      }}
      inactiveProps={{
        className:
          "rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900",
      }}
    >
      {children}
    </Link>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SpaIndexRoute,
});

const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "form",
  component: SpaFormRoute,
});

const tableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "table",
  component: SpaTableRoute,
});

const queryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "query",
  component: SpaQueryRoute,
});

const zustandRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "zustand",
  component: SpaZustandRoute,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  formRoute,
  tableRoute,
  queryRoute,
  zustandRoute,
]);

export const router = createRouter({
  routeTree,
  basepath: "/spa",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
