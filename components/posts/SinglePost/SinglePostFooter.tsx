import { CardFooter } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import DeletePostButton from '~/components/posts/SinglePost/DeletePostButton'
import EditPostButton from '~/components/posts/SinglePost/EditPostButton'

interface ISinglePostFooterProps {
  hasContent: boolean
  singlePostId: string
  singlePostImageUrls: string[]
  isPostManageable: boolean
}

const SinglePostFooter = ({
  hasContent,
  singlePostId,
  singlePostImageUrls,
  isPostManageable
}: ISinglePostFooterProps) => {
  if (!hasContent) {
    return (
      <div className="flex w-full items-center justify-between p-6 pb-16 pt-0 sm:w-2/3">
        <Skeleton className="h-10 w-[45%]" />
        <Skeleton className="h-10 w-[45%]" />
      </div>
    )
  }

  return (
    <CardFooter className="w-full pb-16 sm:w-2/3">
      {isPostManageable && (
        <div className="flex w-full flex-row items-center justify-between gap-x-6">
          <EditPostButton postId={singlePostId} />

          <DeletePostButton
            postId={singlePostId}
            imageUrls={singlePostImageUrls}
          />
        </div>
      )}
    </CardFooter>
  )
}

export default SinglePostFooter
