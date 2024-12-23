'use client'

import { useEffect } from 'react'
import { type User } from 'next-auth'

import useStore from '~/store'
import PostsHeaderCard from '~/components/ProfileInfo/PostsHeaderCard'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'

interface IProfilePostsListProps {
  currentUser?: UserDTO & User
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
      <div className="mb-10">
        <NoItemsCard itemName="posts" />
      </div>
    )
  }

  return (
    <div className="justify-centerpy-10 flex flex-col items-center xs:w-[90%]">
      <PostsHeaderCard />

      <WithPostData
        posts={posts}
        postsCount={postsCount}
        isLoading={isLoading}
      >
        <WithSkeletonsList>
          <SkeletonPostCard />
        </WithSkeletonsList>

        <ItemCard />
      </WithPostData>
    </div>
  )
}

export default ProfilePostsList
