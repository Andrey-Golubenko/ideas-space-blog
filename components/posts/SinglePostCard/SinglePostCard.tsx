'use client'

import { useEffect } from 'react'
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

  const isManageablePost = post?.authorId === user?.id

  useEffect(() => {
    if (user && post && isManageablePost) {
      setEditablePost(post)
    }
  }, [user, post, isManageablePost, setEditablePost])

  const singlePostTitle: string | '' = toUpperCaseFirstChar(post?.title)

  const { imageUrls = [] } = post as Post

  return (
    <Card className="my-12 flex w-full flex-col items-center justify-between rounded-md shadow-md">
      <SinglePostSlider imageUrls={imageUrls} />

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
              imageUrls={imageUrls}
              isManageablePost={isManageablePost}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default SinglePostCard
