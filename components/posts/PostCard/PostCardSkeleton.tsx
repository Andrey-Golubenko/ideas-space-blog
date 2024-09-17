'use client'

import { type Post } from '@prisma/client'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import PostCardHeader from '~/components/posts/PostCard/PostCardHeader'
import PostCardContent from '~/components/posts/PostCard/PostCardContent'
import PostCardFooter from '~/components/posts/PostCard/PostCardFooter'
import { IMAGES_PATHS } from '~/utils/constants/constants'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface IPostCardSkeletonProps {
  post?: Post
  isLoading: boolean
}

const PostCardSkeleton = ({ post, isLoading }: IPostCardSkeletonProps) => {
  const postImage = post?.imageUrls.length
    ? post?.imageUrls[0]
    : IMAGES_PATHS.noImages

  const hasContent = post && !isLoading

  const postTitle = toUpperCaseFirstChar(post?.title)

  const postContent = `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`

  return (
    <Card className="flex min-h-[290px] flex-col rounded-md shadow-md">
      {hasContent ? (
        <PostCardHeader
          postImage={postImage}
          postTitle={postTitle}
          postId={post?.id || ''}
        />
      ) : (
        <CardHeader className="pb-8">
          <Skeleton className="mb-4 h-[260px] w-full" />
          <Skeleton className="h-7 w-full" />
        </CardHeader>
      )}

      {hasContent ? (
        <PostCardContent postContent={postContent} />
      ) : (
        <CardContent className="space-y-2 pb-4 text-justify">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
        </CardContent>
      )}

      {hasContent ? (
        <PostCardFooter postId={post?.id || ''} />
      ) : (
        <CardFooter className="flex justify-end">
          <Skeleton className="h-2 w-8" />
        </CardFooter>
      )}
    </Card>
  )
}

export default PostCardSkeleton
