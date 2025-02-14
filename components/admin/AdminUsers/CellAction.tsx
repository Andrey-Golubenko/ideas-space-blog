'use client'

import { useCallback, useState, useTransition } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useGlobalStore from '~/store'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { useUsersFilters } from '~/hooks/useUsersFilters'
import { deleteUser } from '~/actions/delete-user'
import { logOut } from '~/actions/logout'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import AlertModal from '~/components/shared/Modal/AlertModal'
import { PATHS } from '~/utils/constants'

interface ICellActionProps {
  userId: string
}

const CellAction = ({ userId }: ICellActionProps) => {
  const [deleteSingleUser] = useGlobalStore((state) => {
    return [state.deleteSingleUser]
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const currentUser = useCurrentUser()

  const { setPage } = useUsersFilters()

  const handleOnUpdate = useCallback(() => {
    router.push(`${PATHS.adminEditUser(userId)}`)
  }, [router, userId])

  const handleOnDelete = useCallback(() => {
    setOpen(true)
  }, [])

  const onConfirm = useCallback(() => {
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

          deleteSingleUser(userId)

          setPage(1)
        }
      } catch (error) {
        console.error('Error deleting user:', error)

        toast.error('Failed to delete user.')
      }
    })
  }, [currentUser?.id, setPage, userId])

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

          <DropdownMenuItem onClick={handleOnUpdate}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleOnDelete}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
