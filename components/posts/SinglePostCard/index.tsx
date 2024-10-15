'use client'

import { useEffect, useTransition } from 'react'
import { ClockIcon } from '@radix-ui/react-icons'

import useStore from '~/store'
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

interface ISinglePostCardProps {
  post: PostDTO | null
}

const SinglePostCard = ({ post }: ISinglePostCardProps) => {
  const user = useCurrentUser()

  const [setEditablePost] = useStore((state) => {
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

  const { imageUrls = [] } = post as PostDTO

  const postCategories = post?.categories?.map((categoriesItem) => {
    return categoriesItem?.category?.name
  })

  return (
    <Card className="my-12 flex w-full flex-col items-center justify-between rounded-md border-none shadow-md">
      {!!imageUrls?.length && <SinglePostSlider imageUrls={imageUrls} />}

      <CardHeader className="text-2xl font-semibold">
        {singlePostTitle}
      </CardHeader>

      <CardContent>
        <div>
          <p>
            <span className="text-sm italic text-slate-500">
              Categories:{' '}
            </span>
            {!!postCategories?.length &&
              postCategories.map((categoryName, index) => {
                return (
                  // TODO: Change to <Link> to category pages
                  <span
                    className="text-yellow-600/90"
                    key={categoryName}
                  >
                    {categoryName}
                    {!(postCategories.length - 1 === index) && (
                      <span className="text-black">, </span>
                    )}
                  </span>
                )
              })}
          </p>
          <p className="flex">
            <ClockIcon className="mr-4" />
            <span className="text-sm italic">
              {post?.createdAt.toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 px-2 text-justify">
          {post?.content}
        </div>
      </CardContent>

      <CardFooter className="w-full sm:w-2/3">
        {isPostManageable && (
          <div className="flex w-full flex-row items-center justify-between gap-x-6">
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
