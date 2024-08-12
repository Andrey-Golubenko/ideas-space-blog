import { type Post } from '@prisma/client'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import PostDeleteButton from '~/components/posts/PostDeleteButto'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

interface ISinglePostCardProps {
  post: Post | null
}

const SinglePostCard = async ({ post }: ISinglePostCardProps) => {
  const singlePostTitle: string | '' = toUpperCaseFirstChar(post?.title)

  const user = await getCurrentUser()

  return (
    <Card className="flex flex-col items-center justify-between rounded-md shadow-md">
      <CardHeader className="text-2xl font-semibold">
        {singlePostTitle}
      </CardHeader>
      <CardContent>{post?.content}</CardContent>
      <CardFooter>
        {!!user && <PostDeleteButton postId={post?.id} />}
      </CardFooter>
    </Card>
  )
}

export default SinglePostCard
