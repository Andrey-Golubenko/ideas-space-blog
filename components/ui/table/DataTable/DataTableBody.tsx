import {
  type Table,
  type ColumnDef,
  flexRender
} from '@tanstack/react-table'

import { TableBody, TableCell, TableRow } from '~/components/ui/table'

interface IDataTableBodyProps<TData, TValue> {
  table: Table<TData>
  columns: ColumnDef<TData, TValue>[]
}

const DataTableBody = <TData, TValue>({
  table,
  columns
}: IDataTableBodyProps<TData, TValue>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => {
          return (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          )
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
  )
}

export default DataTableBody
