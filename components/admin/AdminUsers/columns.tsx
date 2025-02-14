'use client'

import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '~/components/ui/checkbox'
import CellAction from '~/components/admin/AdminUsers/CellAction'
import UserAvatar from '~/components/shared/UserAvatar'
import { PATHS } from '~/utils/constants'
import { type TDeserializedUser } from '~/types'

export const columns: ColumnDef<TDeserializedUser>[] = [
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
    accessorKey: 'image',
    header: 'IMAGE',
    cell: ({ row }) => {
      const userId = row?.original?.id

      const userImage: string = row.getValue('image') ?? ''

      return (
        <Link
          href={PATHS.adminUser(userId)}
          className="hover:brightness-110"
        >
          <UserAvatar userImageUrl={userImage} />
        </Link>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'provider',
    header: 'AUTH PROVIDER',
    cell: ({ row }) => {
      const provider = row.getValue<string | null>('provider') ?? ''

      const formattedProvider = provider
        ? provider.charAt(0).toUpperCase() +
          provider.slice(1).toLowerCase()
        : 'Local'

      return <span>{formattedProvider}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellAction userId={row?.original?.id} />
    }
  }
]
