'use client'

import { type TransitionStartFunction } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useStore from '~/store'
import { deletePost } from '~/actions/delete-post'
import { destroyImagesInCloudinary } from '~/services/imagesProcessing'
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
import {
  CLOUDINARY_POSTS_IMAGES_FOLDER,
  PATHS
} from '~/utils/constants'

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
  const [setSinglePost] = useStore((state) => {
    return [state.setSinglePost]
  })

  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      if (postId && isPostManageable) {
        if (imageUrls?.length) {
          try {
            await destroyImagesInCloudinary(
              imageUrls,
              CLOUDINARY_POSTS_IMAGES_FOLDER
            )
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

            setSinglePost({})
            router.push(PATHS.blog)
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
          className={`h-10 w-[40%] min-w-[90px] rounded-lg bg-red-800 hover:bg-red-800/90 md:w-[35%] lg:w-[25%] ${isPending ? 'grayscale' : ''}`}
        >
          Delete post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            Delete post
          </DialogTitle>
          <DialogDescription className="!mb-4 text-base">
            This action cannot be undone. This will permanently delete your
            post and remove its data.
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={handleDelete}
                className="bg-red-800 hover:bg-red-700"
              >
                Permanently delete post
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeletePostButton
