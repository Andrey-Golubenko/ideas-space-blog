'use client'

import { type Post } from '@prisma/client'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import EditPostButton from '~/components/posts/EditPostButton'
import DeletePostButton from '~/components/posts/DeletePostButton'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { useEffect } from 'react'
import usePosts from '~/store'

interface ISinglePostCardProps {
  post: Post | null
}

const SinglePostCard = ({ post }: ISinglePostCardProps) => {
  const user = useCurrentUser()

  const [setEditablePost] = usePosts((state) => {
    return [state.setEditablePost]
  })

  const isManageablePost = post?.authorId === user?.id

  useEffect(() => {
    if (user && post && isManageablePost) {
      setEditablePost(post)
    }
  }, [user, post])

  const singlePostTitle: string | '' = toUpperCaseFirstChar(post?.title)

  return (
    <Card className="flex flex-col items-center justify-between rounded-md shadow-md">
      <CardHeader className="text-2xl font-semibold">
        {singlePostTitle}
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-slate-100 px-2 text-justify">
          {post?.content}
        </div>
      </CardContent>
      <CardFooter>
        {isManageablePost && (
          <div className="flex flex-row items-center justify-center gap-x-6">
            <EditPostButton postId={post?.id} />
            <DeletePostButton
              postId={post?.id}
              isManageablePost={isManageablePost}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default SinglePostCard
