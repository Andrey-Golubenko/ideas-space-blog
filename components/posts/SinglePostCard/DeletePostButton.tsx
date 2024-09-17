'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { deletePost } from '~/actions/delete-post'
import { deleteImagesFromCloudinary } from '~/services/images'
import { Button } from '~/components/ui/button'
import usePosts from '~/store'
import { PATHS } from '~/utils/constants/constants'
import { getImageNameFromUrl } from '~/utils/helpers/helpers'

interface IPostDeleteButtonProps {
  postId?: string
  imageUrls: string[]
  isManageablePost: boolean
}
const DeletePostButton = ({
  postId,
  imageUrls,
  isManageablePost
}: IPostDeleteButtonProps) => {
  const router = useRouter()
  const [setEditablePost] = usePosts((state) => {
    return [state.setEditablePost]
  })

  const handleDelete = async () => {
    if (postId && isManageablePost) {
      if (imageUrls?.length) {
        try {
          const imageDeleteResultsPromises = imageUrls.map((url) => {
            const imageName = getImageNameFromUrl(url)

            return deleteImagesFromCloudinary(imageName!)
          })

          const imageDeleteResult = await Promise.all(
            imageDeleteResultsPromises
          )

          imageDeleteResult.forEach((result) => {
            if (result?.error) {
              toast.error(result?.error, {
                richColors: true,
                closeButton: true
              })

              throw new Error(result?.error)
            }
          })
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error when deleting images:', error)
          return
        }
      }

      await deletePost(postId).then((data) => {
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
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      className="min-w-[90px]"
      onClick={handleDelete}
    >
      Delete post
    </Button>
  )
}

export default DeletePostButton
