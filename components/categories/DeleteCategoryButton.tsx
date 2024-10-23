'use client'

import { type TransitionStartFunction } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useStore from '~/store'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '~/components/ui/dialog'
import { destroyImagesInCloudinary } from '~/services/posts/imagesProcessing.client'
import { deleteCategory } from '~/actions/delete-category'
import { PATHS } from '~/utils/constants/constants'

interface ICategoryDeleteButtonProps {
  categoryId?: string
  imageUrl: string | null
  isAdmin: boolean
  isPending: boolean
  startTransition: TransitionStartFunction
}

const DeleteCategoryButton = ({
  categoryId,
  imageUrl,
  isAdmin,
  isPending,
  startTransition
}: ICategoryDeleteButtonProps) => {
  const [categories, setCategories] = useStore((state) => {
    return [state.categories, state.setCategories]
  })

  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      if (categoryId && isAdmin) {
        const newCategories = categories?.filter((category) => {
          return category?.id !== categoryId
        })

        setCategories(newCategories)

        if (imageUrl) {
          try {
            await destroyImagesInCloudinary([imageUrl])
          } catch (error) {
            return
          }
        }

        deleteCategory(categoryId).then((data) => {
          if (data?.error) {
            toast.error(data?.error, {
              richColors: true,
              closeButton: true
            })
          }
          if (data?.success) {
            toast.success(data.success, {
              richColors: true,
              closeButton: true
            })

            router.push(PATHS.categories)
          }
        })
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          className={`h-10 w-full rounded-lg bg-red-800 hover:bg-red-800/90 ${isPending ? 'grayscale' : ''}`}
        >
          Delete category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            Delete category
          </DialogTitle>
          <DialogDescription className="!mb-4 text-base">
            This action cannot be undone. This will permanently delete your
            category and remove its data.
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={handleDelete}
                className="bg-red-800 hover:bg-red-700"
              >
                Permanently delete category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCategoryButton
