'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import ProfilePostsHeaderCard from '~/components/profile/ProfilePostsHeaderCard'

interface IProfilePostsListProps {
  currentUser?: CurrentUser
}

const ProfilePostsList = ({ currentUser }: IProfilePostsListProps) => {
  const [posts, postsCount, isLoading, getPostsByUserId] = useStore(
    (state) => {
      return [
        state.posts,
        state.postsCount,
        state.isLoading,
        state.getPostsByUserId
      ]
    }
  )

  const userId = currentUser?.id

  useEffect(() => {
    if (userId) {
      getPostsByUserId(userId)
    }
  }, [userId, getPostsByUserId])

  if (typeof posts === 'string') {
    return (
      <>
        <ProfilePostsHeaderCard />

        <NoItemsCard itemName="posts" />
      </>
    )
  }

  return (
    <>
      <ProfilePostsHeaderCard />

      <WithPostData
        posts={posts}
        postsCount={postsCount}
        isLoading={isLoading}
        dataContainerClasses="mb-0"
        postsGridClasses="mb-0"
      >
        <WithSkeletonsList postsGridClasses="mb-0">
          <SkeletonPostCard />
        </WithSkeletonsList>

        <ItemCard />
      </WithPostData>
    </>
  )
}

export default ProfilePostsList
