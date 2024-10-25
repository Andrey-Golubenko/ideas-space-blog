'use client'

import { useEffect, useTransition } from 'react'
import Link from 'next/link'
import { CalendarIcon, FileTextIcon } from '@radix-ui/react-icons'

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
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'
import { DEFAULT_CATEGORY, PATHS } from '~/utils/constants/constants'

interface ISinglePostCardProps {
  post: FullPost | null
}

const SinglePostCard = ({ post }: ISinglePostCardProps) => {
  const user = useCurrentUser()

  const [setEditablePost] = useStore((state) => {
    return [state.setEditablePost]
  })

  const [isPending, startTransition] = useTransition()

  const isPostManageable = post?.authorId === user?.id

  const checkPostCategoriesChange = post?.categories
    ?.map((category) => {
      return category?.id
    })
    .join(', ')

  useEffect(() => {
    if (user && post && isPostManageable) {
      setEditablePost(post)
    }
  }, [
    user,
    post,
    checkPostCategoriesChange,
    isPostManageable,
    setEditablePost
  ])

  const singlePostTitle: string | '' = toUpperCaseFirstChar(post?.title)

  const { imageUrls = [] } = post as FullPost

  const postCategories = post?.categories?.map((category) => {
    return { categoryName: category?.name, categorySlug: category?.slug }
  })

  return (
    <Card className="my-12 flex w-full flex-col items-center justify-between rounded-md border-none shadow-md">
      {!!imageUrls?.length && <SinglePostSlider imageUrls={imageUrls} />}

      <CardHeader className="pb-8 pt-16 text-2xl font-semibold">
        {singlePostTitle}
      </CardHeader>

      <CardContent className="w-full px-24 pb-12">
        <div className="mb-5">
          <p className="mb-2 flex items-center">
            <FileTextIcon
              height="17px"
              width="17px"
              className="mr-2"
            />
            {!!postCategories?.length &&
              postCategories.map(
                ({ categoryName, categorySlug }, index) => {
                  const isUncategorized =
                    categoryName === DEFAULT_CATEGORY.name

                  return isUncategorized ? (
                    <span
                      key={categorySlug}
                      className="text-yellow-600/90"
                    >
                      {categoryName}
                    </span>
                  ) : (
                    <Link
                      key={categorySlug}
                      href={`${PATHS.categories}/${categorySlug}`}
                    >
                      <span className="text-yellow-600/90">
                        {categoryName}
                        {!(postCategories.length - 1 === index) && (
                          <span className="text-black">, </span>
                        )}
                      </span>
                    </Link>
                  )
                }
              )}
          </p>
          <p className="flex items-center">
            <CalendarIcon
              height="17px"
              width="17px"
              className="mr-2"
            />
            <time
              className="text-sm italic tracking-wider text-slate-500"
              dateTime={`${post && post?.createdAt?.toLocaleDateString()}`}
              suppressHydrationWarning
            >
              {post && post?.createdAt?.toLocaleDateString('de')}
            </time>
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 px-2 text-justify">
          {post?.content}
        </div>
      </CardContent>

      <CardFooter className="w-full pb-16 sm:w-2/3">
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
