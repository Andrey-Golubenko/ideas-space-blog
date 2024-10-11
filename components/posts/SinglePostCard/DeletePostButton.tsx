'use client'

import { type TransitionStartFunction } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useStore from '~/store'
import { deletePost } from '~/actions/delete-post'
import { destroyImagesInCloudinary } from '~/services/posts/imagesProcessing.client'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

interface IPostDeleteButtonProps {
  postId?: string
  imageUrls: string[]
  isPostManageable: boolean
  isPending: boolean
  startTransition: TransitionStartFunction
}
const DeletePostButton = ({
  postId,
  imageUrls,
  isPostManageable,
  isPending,
  startTransition
}: IPostDeleteButtonProps) => {
  const [setEditablePost] = useStore((state) => {
    return [state.setEditablePost]
  })

  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      if (postId && isPostManageable) {
        if (imageUrls?.length) {
          try {
            await destroyImagesInCloudinary(imageUrls)
          } catch (error) {
            return
          }
        }

        deletePost(postId).then((data) => {
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

            setEditablePost({})
            router.push(PATHS.blog)
          }
        })
      }
    })
  }

  return (
    <Button
      variant={isPending ? 'outline' : 'destructive'}
      size="sm"
      disabled={isPending}
      className="min-w-[90px]"
      onClick={handleDelete}
    >
      Delete post
    </Button>
  )
}

export default DeletePostButton
