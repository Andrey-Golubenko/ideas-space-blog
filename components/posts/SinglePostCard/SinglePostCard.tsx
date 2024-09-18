'use client'

import { useEffect, useTransition } from 'react'
import { type Post } from '@prisma/client'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import SinglePostSlider from '~/components/posts/SinglePostCard/SinglePostSlider'
import EditPostButton from '~/components/posts/SinglePostCard/EditPostButton'
import DeletePostButton from '~/components/posts/SinglePostCard/DeletePostButton'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import usePosts from '~/store'

interface ISinglePostCardProps {
  post: Post | null
}

const SinglePostCard = ({ post }: ISinglePostCardProps) => {
  const user = useCurrentUser()

  const [setEditablePost] = usePosts((state) => {
    return [state.setEditablePost]
  })

  const [isPending, startTransition] = useTransition()

  const isPostManageable = post?.authorId === user?.id

  useEffect(() => {
    if (user && post && isPostManageable) {
      setEditablePost(post)
    }
  }, [user, post, isPostManageable, setEditablePost])

  const singlePostTitle: string | '' = toUpperCaseFirstChar(post?.title)

  const { imageUrls = [] } = post as Post

  return (
    <Card className="my-12 flex w-full flex-col items-center justify-between rounded-md border-none shadow-md">
      {!!imageUrls?.length && <SinglePostSlider imageUrls={imageUrls} />}

      <CardHeader className="text-2xl font-semibold">
        {singlePostTitle}
      </CardHeader>

      <CardContent>
        <div className="rounded-lg bg-slate-100 px-2 text-justify">
          {post?.content}
        </div>
      </CardContent>

      <CardFooter>
        {isPostManageable && (
          <div className="flex flex-row items-center justify-center gap-x-6">
            <EditPostButton
              postId={post?.id}
              isPending={isPending}
            />
            <DeletePostButton
              postId={post?.id}
              imageUrls={imageUrls}
              isPostManageable={isPostManageable}
              isPending={isPending}
              startTransition={startTransition}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default SinglePostCard
