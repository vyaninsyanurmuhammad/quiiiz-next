'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch } from '@/lib/redux/hook';
import { setLoading } from '@/lib/redux/features/quiz/quiz.slice';

interface TableDataSummaryProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isloading: boolean;
}

export function TableDataSummary<TData, TValue>({
  columns,
  data,
  isloading,
}: TableDataSummaryProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const skeletons = [2, 5, 4, 2, 7, 3, 9, 6, 2, 3]; // Set default SSR

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isloading ? (
              skeletons.map((data, index) => (
                <TableRow key={`${data}-${index}`}>
                  <TableCell>
                    <div className="flex w-full justify-center">
                      <Skeleton className={`h-[24px] w-[24px]`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex w-full justify-center">
                      <Skeleton className={`h-[20px] w-[30px]`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex w-full justify-center">
                      <Skeleton
                        className={`h-[20px]`}
                        style={{
                          width: `${data}0%`,
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex w-full justify-center">
                      <Skeleton className={`h-[20px] w-[140px]`} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
