"use client";

import { useReportDraftStore } from "../../../lib/stores/reportDraftStore";

export function SpaZustandRoute() {
  const driverName = useReportDraftStore((s) => s.driverName);
  const vehiclePlate = useReportDraftStore((s) => s.vehiclePlate);
  const notes = useReportDraftStore((s) => s.notes);
  const setDriverName = useReportDraftStore((s) => s.setDriverName);
  const setVehiclePlate = useReportDraftStore((s) => s.setVehiclePlate);
  const setNotes = useReportDraftStore((s) => s.setNotes);
  const reset = useReportDraftStore((s) => s.reset);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Zustand</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A tiny global store for an accident report draft.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">Driver name</label>
          <input
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Vehicle plate</label>
          <input
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            className="min-h-28 w-full resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium dark:border-zinc-800"
          onClick={reset}
        >
          Reset store
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Current store snapshot</h3>
        <pre className="overflow-auto rounded-xl bg-zinc-950 p-4 text-xs text-zinc-50">
          {JSON.stringify({ driverName, vehiclePlate, notes }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
