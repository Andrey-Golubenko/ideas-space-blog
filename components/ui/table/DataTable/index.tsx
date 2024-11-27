'use client'

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState
} from '@tanstack/react-table'
import { Options } from 'nuqs'

import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { Table } from '~/components/ui/table'
import DataTableHeader from '~/components/ui/table/DataTable/DataTableHeader'
import DataTableBody from '~/components/ui/table/DataTable/DataTableBody'
import DataTableFooter from '~/components/ui/table/DataTable/DataTableFooter'

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  totalItems: number | null
  currentPage: number
  setCurrentPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
  pageSize: number
  setPageSize: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
  pageSizeOptions?: number[]
}

const DataTable = <TData, TValue>({
  columns,
  data,
  totalItems,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  pageSizeOptions
}: IDataTableProps<TData, TValue>) => {
  const paginationState = {
    pageIndex: currentPage - 1, // zero-based index for React Table
    pageSize
  }

  const pageCount = totalItems ? Math.ceil(totalItems / pageSize) : 0

  const handlePaginationChange = (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState)
  ) => {
    const pagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(paginationState)
        : updaterOrValue

    // converting zero-based index to one-based
    setCurrentPage(pagination.pageIndex + 1)

    setPageSize(pagination.pageSize)
  }

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: paginationState
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true
  })

  return (
    <div className="space-y-4">
      <ScrollArea className="grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
        <Table className="relative">
          <DataTableHeader table={table} />

          <DataTableBody
            table={table}
            columns={columns}
          />
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <DataTableFooter
        table={table}
        paginationState={paginationState}
        pageSizeOptions={pageSizeOptions}
        totalItems={totalItems ?? 0}
      />
    </div>
  )
}

export default DataTable
