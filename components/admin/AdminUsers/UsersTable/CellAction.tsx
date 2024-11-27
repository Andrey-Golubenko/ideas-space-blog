'use client'

import { useState, useTransition } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useCurrentUser } from '~/hooks/useCurrentUser'
import { useDisplayedUsers } from '~/hooks/useDisplayedUsers'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import AlertModal from '~/components/shared/Modal/AlertModal'
import { deleteUser } from '~/actions/delete-user'
import { logOut } from '~/actions/logout'
import { PATHS } from '~/utils/constants'

interface ICellActionProps {
  userId: string
}

const CellAction = ({ userId }: ICellActionProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const currentUser = useCurrentUser()

  const { refreshUsers } = useDisplayedUsers({
    currentPage: 1,
    limit: 10,
    authProviderFilter: null,
    searchQuery: null
  })

  const onConfirm = () => {
    startTransition(async () => {
      try {
        const data = await deleteUser(userId)

        if (data?.error) {
          toast.error(data?.error, { richColors: true, closeButton: true })
        } else if (data?.success) {
          toast.success(data?.success, {
            richColors: true,
            closeButton: true
          })

          setOpen(false)

          if (currentUser?.id === userId) {
            await logOut()
          }

          await refreshUsers()
        }
      } catch (error) {
        console.error('Error deleting user:', error)
        toast.error('Failed to delete user.')
      }
    })
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          return setOpen(false)
        }}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              return router.push(`${PATHS.adminEditUsers}${userId}`)
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              return setOpen(true)
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
