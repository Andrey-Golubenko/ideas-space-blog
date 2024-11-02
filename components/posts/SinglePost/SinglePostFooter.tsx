import { useTransition } from 'react'

import { CardFooter } from '~/components/ui/card'
import DeletePostButton from '~/components/posts/SinglePost/DeletePostButton'
import EditPostButton from '~/components/posts/SinglePost/EditPostButton'

interface ISinglePostFooterProps {
  singlePostId: string
  singlePostImageUrls: string[]
  isPostManageable: boolean
}

const SinglePostFooter = ({
  singlePostId,
  singlePostImageUrls,
  isPostManageable
}: ISinglePostFooterProps) => {
  const [isPending, startTransition] = useTransition()

  return (
    <CardFooter className="w-full pb-16 sm:w-2/3">
      {isPostManageable && (
        <div className="flex w-full flex-row items-center justify-between gap-x-6">
          <EditPostButton
            postId={singlePostId}
            isPending={isPending}
          />
          <DeletePostButton
            postId={singlePostId}
            imageUrls={singlePostImageUrls}
            isPostManageable={isPostManageable}
            isPending={isPending}
            startTransition={startTransition}
          />
        </div>
      )}
    </CardFooter>
  )
}

export default SinglePostFooter
