import {
  useCallback,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction
} from 'react'
import { toast } from 'sonner'

import { deleteCategory } from '~/actions/delete-category'
import { destroyImagesInCloudinary } from '~/services/imagesProcessing'
import AlertModal from '~/components/shared/Modal/AlertModal'
import { CLOUDINARY_CATEGORIES_IMAGES_FOLDER } from '~/utils/constants'

interface IDeleteCategoryHandlerProps {
  categoryId: string
  imageUrl: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onCategorytDeleteSuccess: () => void
}

const DeleteCategoryHandler = ({
  categoryId,
  imageUrl,
  isOpen,
  setIsOpen,
  onCategorytDeleteSuccess
}: IDeleteCategoryHandlerProps) => {
  const [complDelOpen, setComplDelOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const onCategoryDelete = useCallback(async () => {
    startTransition(async () => {
      try {
        const data = await deleteCategory(categoryId)
        if (data?.error) {
          toast.error(data?.error, {
            richColors: true,
            closeButton: true
          })
        } else if (data?.success) {
          toast.success(data?.success, {
            richColors: true,
            closeButton: true
          })
          onCategorytDeleteSuccess()
        }
      } catch (error) {
        console.error('Error deleting category:', error)

        toast.error('Failed to delete category.')
      } finally {
        setIsOpen(false)
        setComplDelOpen(false)
      }
    })
  }, [onCategorytDeleteSuccess, categoryId])

  const onConfirm = () => {
    startTransition(async () => {
      if (categoryId) {
        if (imageUrl?.length) {
          try {
            await destroyImagesInCloudinary(
              [imageUrl],
              CLOUDINARY_CATEGORIES_IMAGES_FOLDER,
              setComplDelOpen
            )
          } catch (error) {
            console.error('Error destroying images:', error)

            return
          } finally {
            setIsOpen(false)
          }
        }
        await onCategoryDelete()
      }
    })
  }

  const onCompletelyConfirm = () => {
    startTransition(async () => {
      if (categoryId) {
        await onCategoryDelete()
      }
    })
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => {
          return setIsOpen(false)
        }}
        onConfirm={onConfirm}
        loading={isPending}
      />

      <AlertModal
        isOpen={complDelOpen}
        onClose={() => {
          return setComplDelOpen(false)
        }}
        onConfirm={onCompletelyConfirm}
        loading={isPending}
        modalTitle="Image not deleted"
        modalDescription="Image was not deleted. Do you want to delete the category anyway?"
      />
    </>
  )
}

export default DeleteCategoryHandler
