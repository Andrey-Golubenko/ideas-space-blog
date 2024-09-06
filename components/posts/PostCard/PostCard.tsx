'use client'

import { type Post } from '@prisma/client'

import { Card } from '~/components/ui/card'
import PostCardHeader from '~/components/posts/PostCard/PostCardHeader'
import PostCardContent from '~/components/posts/PostCard/PostCardContent'
import PostCardFooter from '~/components/posts/PostCard/PostCardFooter'
import { IMAGES_PATHS } from '~/utils/constants/constants'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface IpostCardProps {
  post: Post
}

const PostCard = ({ post }: IpostCardProps) => {
  const postImage = post?.imageUrls?.length
    ? post?.imageUrls[0]
    : IMAGES_PATHS.noImages

  const postTitle = toUpperCaseFirstChar(post?.title)

  const postContent = `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`

  return (
    <Card className="flex min-h-max flex-col rounded-md border-0 shadow-md">
      <PostCardHeader
        postImage={postImage}
        postTitle={postTitle}
        postId={post?.id}
      />

      <PostCardContent postContent={postContent} />

      <PostCardFooter postId={post?.id} />
    </Card>
  )
}

export default PostCard
