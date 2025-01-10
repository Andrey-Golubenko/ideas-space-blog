'use client'

import {
  useCallback,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction
} from 'react'
import { toast } from 'sonner'

import { deletePost } from '~/actions/delete-post'
import { destroyImagesInCloudinary } from '~/services/imagesProcessing'
import AlertModal from '~/components/shared/Modal/AlertModal'
import { CLOUDINARY_POSTS_IMAGES_FOLDER } from '~/utils/constants'

interface IDeletePostHandlerProps {
  postId: string
  imageUrls: string[]
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onPostDeleteSuccess: () => void
}

const DeletePostHandler = ({
  postId,
  imageUrls,
  isOpen,
  setIsOpen,
  onPostDeleteSuccess
}: IDeletePostHandlerProps) => {
  const [complDelOpen, setComplDelOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const onPostDelete = useCallback(async () => {
    try {
      const data = await deletePost(postId)

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
        onPostDeleteSuccess()
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post.')
    } finally {
      setIsOpen(false)
      setComplDelOpen(false)
    }
  }, [postId, onPostDeleteSuccess])

  const onConfirm = () => {
    startTransition(async () => {
      if (postId) {
        if (imageUrls?.length) {
          try {
            await destroyImagesInCloudinary(
              imageUrls,
              CLOUDINARY_POSTS_IMAGES_FOLDER,
              setComplDelOpen
            )
          } catch (error) {
            console.error('Error destroying images:', error)

            return
          } finally {
            setIsOpen(false)
          }
        }
        await onPostDelete()
      }
    })
  }

  const onCompletelyConfirm = () => {
    startTransition(async () => {
      if (postId) {
        await onPostDelete()
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
        modalTitle="Images not deleted"
        modalDescription="Some images were not deleted. Do you want to delete the post anyway?"
      />
    </>
  )
}

export default DeletePostHandler
