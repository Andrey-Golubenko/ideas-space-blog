import { Post } from '@prisma/client'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface ISinglePostCardProps {
  post: Post | null
}

const SinglePostCard = ({ post }: ISinglePostCardProps) => {
  const singlePostTitle: string | '' = toUpperCaseFirstChar(post?.title)

  return (
    <Card className="flex flex-col items-center justify-between rounded-md shadow-md">
      <CardHeader>{singlePostTitle}</CardHeader>
      <CardContent>{post?.content}</CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          size="sm"
        >
          Delete post
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SinglePostCard
