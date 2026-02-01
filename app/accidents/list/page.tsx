/**
 * Accidents List Page
 * Display all accidents with filtering and sorting using TanStack Table
 */

'use client';

import { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { accidentService, type Accident, AccidentSeverity, AccidentStatus } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';

export default function AccidentsListPage() {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadAccidents();
  }, []);

  const loadAccidents = async () => {
    setIsLoading(true);
    try {
      const response = await accidentService.getAccidents();
      setAccidents(response.data);
    } catch (error) {
      toast.error('Failed to load accidents');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: AccidentSeverity) => {
    switch (severity) {
      case AccidentSeverity.CRITICAL:
        return 'bg-red-100 text-red-800 border-red-200';
      case AccidentSeverity.HIGH:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case AccidentSeverity.MEDIUM:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case AccidentSeverity.LOW:
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: AccidentStatus) => {
    switch (status) {
      case AccidentStatus.REPORTED:
        return 'bg-blue-100 text-blue-800';
      case AccidentStatus.DISPATCHED:
        return 'bg-purple-100 text-purple-800';
      case AccidentStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800';
      case AccidentStatus.RESOLVED:
        return 'bg-green-100 text-green-800';
      case AccidentStatus.CLOSED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: ColumnDef<Accident>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ getValue }) => {
        const id = getValue() as string;
        return (
          <span className="font-mono text-xs text-gray-600">
            {id.substring(0, 8)}...
          </span>
        );
      },
    },
    {
      accessorKey: 'reportedAt',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-2 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date & Time
            <ArrowUpDown size={14} />
          </button>
        );
      },
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <div>
            <div className="font-medium">{format(date, 'MMM dd, yyyy')}</div>
            <div className="text-sm text-gray-500">{format(date, 'HH:mm')}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'location.address',
      header: 'Location',
      cell: ({ row }) => {
        const address = row.original.location?.address || 'N/A';
        return (
          <span className="text-sm text-gray-700 max-w-xs truncate block">
            {address}
          </span>
        );
      },
    },
    {
      accessorKey: 'severity',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-2 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Severity
            <ArrowUpDown size={14} />
          </button>
        );
      },
      cell: ({ getValue, row }) => {
        const severity = getValue() as AccidentSeverity;
        const score = row.original.severityScore;
        return (
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                severity
              )}`}
            >
              {severity}
            </span>
            <span className="text-xs text-gray-500">({score})</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as AccidentStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              status
            )}`}
          >
            {status.replace('_', ' ')}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <button
            onClick={() => router.push(`/accidents/${row.original.id}`)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={18} />
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: accidents,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={32} />
              Accident Reports
            </h1>
            <p className="text-gray-600 mt-2">View and manage all accident reports</p>
          </div>
          <button
            onClick={() => router.push('/accidents/report')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Report New Accident
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search accidents..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        <span className="ml-3 text-gray-600">Loading accidents...</span>
                      </div>
                    </td>
                  </tr>
                ) : table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center">
                      <p className="text-gray-500">No accidents found</p>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/accidents/${row.original.id}`)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && table.getRowModel().rows.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>{' '}
                of{' '}
                <span className="font-medium">
                  {table.getFilteredRowModel().rows.length}
                </span>{' '}
                results
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft size={20} />
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-700 px-4">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
