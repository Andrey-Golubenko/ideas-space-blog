'use client'

import { useCallback, useState, useTransition } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useStore from '~/store'
import { deleteCategory } from '~/actions/delete-category'
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
  categoryId: string
}

const CellAction = ({ categoryId }: ICellActionProps) => {
  const [
    dataTableCategories,
    setEditableCategory,
    getDataTableCategories
  ] = useStore((state) => {
    return [
      state.dataTableCategories,
      state.setEditableCategory,
      state.getDataTableCategories
    ]
  })

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleOnUpdate = useCallback(() => {
    const currentCategory = dataTableCategories?.find((category) => {
      return category?.id === categoryId
    })

    if (currentCategory) {
      setEditableCategory(currentCategory)

      router.push(`${PATHS.adminEditCategory}`)
    } else {
      toast.info('Failed to find category for edit', {
        richColors: true,
        closeButton: true
      })
    }
  }, [categoryId])

  const handleOnDelete = useCallback(() => {
    setOpen(true)
  }, [])

  const onConfirm = useCallback(() => {
    startTransition(async () => {
      try {
        const data = await deleteCategory(categoryId)

        if (data?.error) {
          toast.error(data?.error, { richColors: true, closeButton: true })
        } else if (data?.success) {
          toast.success(data?.success, {
            richColors: true,
            closeButton: true
          })

          setOpen(false)

          await getDataTableCategories({
            currentPage: 1,
            limit: 10,
            searchQuery: null
          })
        }
      } catch (error) {
        console.error('Error deleting user:', error)

        toast.error('Failed to delete user.')
      }
    })
  }, [getDataTableCategories, categoryId])

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
