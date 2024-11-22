'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants'
import { type Categories } from '@prisma/client'

interface IEditCategoryButtonProps {
  category: Categories
  setEditableCategory: (category: Categories) => void
  isPending: boolean
}
const EditCategoryButton = ({
  category,
  setEditableCategory,
  isPending
}: IEditCategoryButtonProps) => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    setEditableCategory(category)

    router.push(PATHS.editCategory)
  }, [category])

  return (
    <Button
      variant="outline"
      disabled={isPending}
      className={`h-10 w-full rounded-lg text-white ${!isPending ? 'bg-blue-700 hover:bg-blue-700/90 hover:text-white' : ''}`}
      onClick={handleClick}
    >
      Edit category
    </Button>
  )
}

export default EditCategoryButton
