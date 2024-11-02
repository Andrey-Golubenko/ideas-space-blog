'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import { Card } from '~/components/ui/card'
import SinglePostHeader from '~/components/posts/SinglePost/SinglePostHeader'
import SinglePostContent from '~/components/posts/SinglePost/SinglePostContent'
import SinglePostFooter from '~/components/posts/SinglePost/SinglePostFooter'
import SinglePostSlider from '~/components/posts/SinglePost/SinglePostSlider'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'
import { Skeleton } from '~/components/ui/skeleton'

interface ISinglePostCardProps {
  postId: string
  user: UserDTO
}

const SinglePostCard = ({ postId, user }: ISinglePostCardProps) => {
  const [singlePost, getSinglePostById, isLoading] = useStore((state) => {
    return [state.singlePost, state.getSinglePostById, state.isLoading]
  })

  useEffect(() => {
    if (postId) getSinglePostById(postId)
  }, [postId, getSinglePostById])

  const isPostExist: boolean = !!Object.values(singlePost)?.length

  const hasContent = isPostExist && !isLoading

  const isPostManageable = (singlePost as FullPost)?.authorId === user?.id

  const singlePostTitle: string | '' = toUpperCaseFirstChar(
    (singlePost as FullPost)?.title
  )

  const singlePostImageUrls = (singlePost as FullPost)?.imageUrls ?? []

  const singlePostCategories =
    (singlePost as FullPost)?.categories?.map((category) => {
      return { categoryName: category?.name, categorySlug: category?.slug }
    }) ?? []

  const singlePostCreatedAt = (singlePost as FullPost)?.createdAt
    ? new Date((singlePost as FullPost)?.createdAt!)?.toLocaleDateString(
        'de'
      )
    : ''

  const singlePostContent = (singlePost as FullPost)?.content ?? ''

  return (
    <Card className="my-12 flex min-h-[70svh] w-full flex-col items-center justify-between rounded-md border-none shadow-md">
      {!hasContent ? (
        <>
          <Skeleton className="mx-auto !mb-8 h-[500px] w-full" />
          <div className="flex justify-center space-x-3 px-3 py-0 xs:w-[90%] sm:w-[82%] md:w-[75%]">
            <Skeleton className="h-[100px] w-1/4" />
            <Skeleton className="h-[100px] w-1/4" />
            <Skeleton className="h-[100px] w-1/4" />
          </div>
        </>
      ) : (
        !!singlePostImageUrls?.length && (
          <SinglePostSlider imageUrls={singlePostImageUrls} />
        )
      )}

      {!hasContent ? (
        <Skeleton className="m-6 mx-auto mb-4 mt-10 h-8 w-4/5" />
      ) : (
        <SinglePostHeader singlePostTitle={singlePostTitle} />
      )}

      {!hasContent ? (
        <>
          <div className="mb-5 flex w-full flex-col items-start justify-start px-20">
            <Skeleton className="mb-4 h-5 w-1/2" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="mb-6 w-full p-6 px-20 pt-0">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </>
      ) : (
        <SinglePostContent
          singlePostCategories={singlePostCategories}
          singlePostCreatedAt={singlePostCreatedAt}
          singlePostContent={singlePostContent}
        />
      )}

      {!hasContent ? (
        <div className="flex w-full items-center justify-between p-6 pb-16 pt-0 sm:w-2/3">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-44" />
        </div>
      ) : (
        <SinglePostFooter
          singlePostId={postId}
          singlePostImageUrls={singlePostImageUrls}
          isPostManageable={isPostManageable}
        />
      )}
    </Card>
  )
}

export default SinglePostCard
