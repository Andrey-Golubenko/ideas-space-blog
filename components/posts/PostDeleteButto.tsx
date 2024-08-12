'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { deletePost } from '~/actions/delete-post'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

interface IPostDeleteButtonProps {
  postId?: string
}
const PostDeleteButton = ({ postId }: IPostDeleteButtonProps) => {
  const router = useRouter()

  const handleDelete = () => {
    if (postId) {
      deletePost(postId).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
        }
      })

      router.push(PATHS.blog)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
    >
      Delete post
    </Button>
  )
}

export default PostDeleteButton
