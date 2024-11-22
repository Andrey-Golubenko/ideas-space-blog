'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { FaUser } from 'react-icons/fa'

import { Checkbox } from '~/components/ui/checkbox'
import CellAction from '~/components/admin/AdminUsers/UsersTable/CellAction'
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '~/components/ui/avatar'
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
      return (
        <>
          <Avatar>
            <AvatarImage src={row.getValue('image') || ''} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          {/* <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            className="rounded-lg"
          /> */}
        </>
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
      const provider = row.getValue<string | null>('provider')

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
