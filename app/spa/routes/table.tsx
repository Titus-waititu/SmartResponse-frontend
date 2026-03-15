"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { type AccidentReport, getSeedReports } from "../../../lib/fakeApi";

const columns: ColumnDef<AccidentReport>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Date", accessorKey: "date" },
  { header: "Location", accessorKey: "location" },
  { header: "Severity", accessorKey: "severity" },
  { header: "Status", accessorKey: "status" },
];

export function SpaTableRoute() {
  const data = React.useMemo(() => getSeedReports(), []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">TanStack Table</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A minimal, headless table rendering.
        </p>
      </div>

      <div className="overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap border-b border-zinc-200 px-3 py-2 text-left font-semibold dark:border-zinc-800"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/30"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap border-b border-zinc-200 px-3 py-2 dark:border-zinc-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
