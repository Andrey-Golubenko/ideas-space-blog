'use client'

import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import { type Categories } from '@prisma/client'

import { Checkbox } from '~/components/ui/checkbox'
import CellAction from '~/components/admin/AdminCategories/CellAction'
import LoadableImage from '~/components/shared/LoadableImage'
import { PATHS, IMAGES_PATHS } from '~/utils/constants'

export const columns: ColumnDef<Categories>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            return table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            return row.toggleSelected(!!value)
          }}
          aria-label="Select row"
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'imageUrl',
    header: 'IMAGE',
    cell: ({ row }) => {
      const categorieSlug = row?.original?.slug

      const imageUrl =
        row.getValue<string>('imageUrl') ?? IMAGES_PATHS.noImages

      return (
        <Link
          href={`${PATHS.category(categorieSlug)}`}
          className="hover:brightness-110"
        >
          <LoadableImage
            src={imageUrl}
            alt={row.getValue('name') ?? 'Post'}
            containerHeight={44}
            containerClassNames="aspect-square !w-11 rounded-lg"
          />
        </Link>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'NAME',
    cell({ row }) {
      const name = row.getValue<string | null>('name') ?? ''

      return (
        <span className="line-clamp-2 max-w-48 whitespace-nowrap">
          {name}
        </span>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    cell: ({ row }) => {
      const description = row.getValue<string | null>('description') ?? ''

      return <span className="line-clamp-2">{description}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellAction categoryId={row?.original?.id} />
    }
  }
]
