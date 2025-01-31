'use client'

import { useEffect } from 'react'

import useGlobalStore from '~/store'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import SinglePostHeader from '~/components/posts/SinglePost/SinglePostHeader'
import SinglePostContent from '~/components/posts/SinglePost/SinglePostContent'
import SinglePostFooter from '~/components/posts/SinglePost/SinglePostFooter'
import SinglePostSlider from '~/components/posts/SinglePost/SinglePostSlider'
import { toUpperCaseFirstChar } from '~/utils/helpers'

interface ISinglePostCardProps {
  postId: string
  user: UserDTO | {}
  serverSinglePost: FullPost | null
}

const SinglePostCard = ({
  postId,
  user,
  serverSinglePost
}: ISinglePostCardProps) => {
  const [singlePost, getSinglePostById, setSinglePost, isLoading] =
    useGlobalStore((state) => {
      return [
        state.singlePost,
        state.getSinglePostById,
        state.setSinglePost,
        state.isLoading
      ]
    })

  useEffect(() => {
    if (!serverSinglePost && postId) {
      getSinglePostById(postId)
    } else {
      setSinglePost(serverSinglePost as FullPost)
    }
  }, [serverSinglePost, postId, getSinglePostById, setSinglePost])

  const isPostExist: boolean = !!Object.values(singlePost)?.length

  const hasContent = isPostExist && !isLoading

  const isPostManageable =
    (singlePost as FullPost)?.authorId === ((user as UserDTO)?.id ?? '')

  const singlePostTitle: string | '' = toUpperCaseFirstChar(
    (singlePost as FullPost)?.title
  )

  const singlePostImageUrls = (singlePost as FullPost)?.imageUrls ?? []

  const singlePostCategories = (singlePost as FullPost)?.categories ?? []

  const singlePostCreatedAt = (singlePost as FullPost)?.createdAt
    ? new Date((singlePost as FullPost)?.createdAt!)?.toLocaleDateString(
        'de'
      )
    : ''

  const singlePostContent = (singlePost as FullPost)?.content ?? ''

  return (
    <Card className="flex min-h-[70svh] w-full flex-col items-center justify-between rounded-md border-none shadow-md md:my-12">
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
          <div className="mb-5 flex w-full flex-col items-start justify-start px-5 lg:px-20">
            <Skeleton className="mb-4 h-5 w-1/2" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="mb-6 w-full p-6 px-5 pt-0 lg:px-20">
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
          <Skeleton className="h-10 w-[45%]" />
          <Skeleton className="h-10 w-[45%]" />
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
