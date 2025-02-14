'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { toast } from 'sonner'

import useGlobalStore from '~/store'
import { useCategoriesFilters } from '~/hooks/useCategoriesFilters'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import DeleteCategoryHandler from '~/components/shared/DeleteHandlers/DeleteCategoryHandler'
import { PATHS } from '~/utils/constants'
import { type Categories } from '@prisma/client'

interface ICellActionProps {
  categoryId: string
}

const CellAction = ({ categoryId }: ICellActionProps) => {
  const [categories, setEditableCategory] = useGlobalStore((state) => {
    return [state.categories, state.setEditableCategory]
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const { setPage } = useCategoriesFilters()

  const categoryToProcessing =
    (categories as Categories[])?.find((category) => {
      return category?.id === categoryId
    }) ?? null

  const onCategoryDeleteSuccess = useCallback(() => {
    setPage(1)
  }, [])

  const handleOnUpdate = useCallback(() => {
    if (categoryToProcessing) {
      setEditableCategory(categoryToProcessing)

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

  const imageUrl = categoryToProcessing
    ? categoryToProcessing?.imageUrl
    : ''

  return (
    <>
      <DeleteCategoryHandler
        categoryId={categoryId}
        imageUrl={imageUrl || ''}
        isOpen={open}
        setIsOpen={setOpen}
        onCategorytDeleteSuccess={onCategoryDeleteSuccess}
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
