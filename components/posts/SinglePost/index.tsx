'use client'

import { useEffect } from 'react'

import useGlobalStore from '~/store'
import { usePage } from '~/hooks/usePage'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { useSingleItemProps } from '~/hooks/useSingleItemProps'
import { Card } from '~/components/ui/card'
import SinglePostHeader from '~/components/posts/SinglePost/SinglePostHeader'
import SinglePostContent from '~/components/posts/SinglePost/SinglePostContent'
import SinglePostFooter from '~/components/posts/SinglePost/SinglePostFooter'
import SinglePostSlider from '~/components/posts/SinglePost/SinglePostSlider'
import { cn } from '~/libs/utils'

interface ISinglePostCardProps {
  postId: string
  serverSinglePost?: FullPost | null
}

const SinglePost = ({
  postId,
  serverSinglePost
}: ISinglePostCardProps) => {
  const { singlePost, setSinglePost } = useGlobalStore((state) => {
    return {
      singlePost: state.singlePost,
      setSinglePost: state.setSinglePost
    }
  })

  const currentUser = useCurrentUser()

  useEffect(() => {
    if (serverSinglePost) {
      setSinglePost(serverSinglePost as FullPost)
    }
  }, [serverSinglePost, setSinglePost])

  const { isAdminPage } = usePage()

  const {
    isPostExist,
    isPostManageable,
    singlePostTitle,
    singlePostImageUrls,
    singlePostCategories,
    singlePostCreatedAt,
    singlePostContent
  } = useSingleItemProps({ post: singlePost, user: currentUser })

  const hasContent = isPostExist

  return (
    <Card
      className={cn(
        'flex min-h-[70svh] w-full flex-col items-center justify-between rounded-md border-none shadow-md',
        !isAdminPage && 'md:my-12'
      )}
    >
      <SinglePostSlider
        hasContent={hasContent}
        imageUrls={singlePostImageUrls}
        isAdminPage={isAdminPage}
      />

      <SinglePostHeader
        hasContent={hasContent}
        singlePostTitle={singlePostTitle}
      />

      <SinglePostContent
        hasContent={hasContent}
        singlePostCategories={singlePostCategories}
        singlePostCreatedAt={singlePostCreatedAt}
        singlePostContent={singlePostContent}
      />

      <SinglePostFooter
        hasContent={hasContent}
        singlePostId={postId}
        singlePostImageUrls={singlePostImageUrls}
        isPostManageable={isPostManageable}
      />
    </Card>
  )
}

export default SinglePost
