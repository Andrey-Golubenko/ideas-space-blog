'use client'

import { useEffect } from 'react'
import { type User } from 'next-auth'

import useStore from '~/store'
import PostsList from '~/components/posts/PostsList'
import PostsHeaderCard from '~/components/profileInfo/PostsHeaderCard'

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
      <PostsList
        posts={posts}
        postsCount={postsCount}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ProfilePostsList
