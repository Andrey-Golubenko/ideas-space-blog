'use client'

import { useEffect } from 'react'
import { type User } from 'next-auth'

import useStore from '~/store'
import PostsHeaderCard from '~/components/profileInfo/PostsHeaderCard'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'

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
