'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { deletePost } from '~/actions/delete-post'
import { Button } from '~/components/ui/button'
import usePosts from '~/store'
import { PATHS } from '~/utils/constants/constants'

interface IPostDeleteButtonProps {
  postId?: string
  isManageablePost: boolean
}
const DeletePostButton = ({
  postId,
  isManageablePost
}: IPostDeleteButtonProps) => {
  const router = useRouter()
  const [setEditablePost] = usePosts((state) => {
    return [state.setEditablePost]
  })

  const handleDelete = () => {
    if (postId && isManageablePost) {
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
        }
      })

      router.push(PATHS.blog)
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
