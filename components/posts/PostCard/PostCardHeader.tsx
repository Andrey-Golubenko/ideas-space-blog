'use client'

import { CardHeader } from '~/components/ui/card'
import { cn } from '~/libs/utils'
import { fontPoppins } from '~/utils/constants/fonts'
import LoadableImage from './LoadableImage'

interface IPostCardHeaderProps {
  postImage: string
  postTitle: string
  postId: string
}

const PostCardHeader = ({
  postImage,
  postTitle,
  postId
}: IPostCardHeaderProps) => {
  return (
    <>
      <LoadableImage
        postImage={postImage}
        postId={postId}
      />

      <CardHeader className="pb-4">
        <h2
          className={cn(
            'w-full truncate text-2xl font-semibold',
            fontPoppins.className
          )}
        >
          {postTitle}
        </h2>
      </CardHeader>
    </>
  )
}

export default PostCardHeader
