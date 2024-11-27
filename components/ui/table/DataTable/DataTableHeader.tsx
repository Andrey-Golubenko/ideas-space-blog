import { type Table, flexRender } from '@tanstack/react-table'

import { TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface IDataTableHeaderProps<TData> {
  table: Table<TData>
}

const DataTableHeader = <TData,>({
  table
}: IDataTableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => {
        return (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        )
      })}
    </TableHeader>
  )
}

export default DataTableHeader
