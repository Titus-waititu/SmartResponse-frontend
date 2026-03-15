"use client";

import { useQuery } from "@tanstack/react-query";

import { listAccidentReports } from "../../../lib/fakeApi";

export function SpaQueryRoute() {
  const reportsQuery = useQuery({
    queryKey: ["accidentReports"],
    queryFn: listAccidentReports,
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">TanStack Query</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Cached request with loading and refetch.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
          onClick={() => reportsQuery.refetch()}
          disabled={reportsQuery.isFetching}
        >
          {reportsQuery.isFetching ? "Refreshing…" : "Refetch"}
        </button>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Status: {reportsQuery.status}
          {reportsQuery.isFetching ? " (fetching)" : ""}
        </div>
      </div>

      {reportsQuery.isLoading ? (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">Loading…</div>
      ) : reportsQuery.isError ? (
        <div className="text-sm text-red-600">
          Failed: {String(reportsQuery.error)}
        </div>
      ) : (
        <ul className="space-y-2">
          {(reportsQuery.data ?? []).map((r) => (
            <li
              key={r.id}
              className="rounded-xl border border-zinc-200 p-3 text-sm dark:border-zinc-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium">
                  {r.location} • {r.date}
                </div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {r.severity} • {r.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
