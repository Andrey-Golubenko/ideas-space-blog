'use client'

import { useEffect } from 'react'

import usePosts from '~/store'
import PostCard from '~/components/posts/PostCard'
import PostsCardsSkeleton from '~/components/posts/PostsCardsSkeleton'

const PostsLists: React.FC = () => {
  const [posts, isLoading, getAllPosts] = usePosts((state) => {
    return [state.posts, state.isLoading, state.getAllPosts]
  })

  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  const [firstPost, secondPost, thirdPost, ...restPosts] = posts

  return (
    <section className="mb-8 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      <PostsCardsSkeleton
        post={firstPost}
        isLoading={isLoading}
      />
      <PostsCardsSkeleton
        post={secondPost}
        isLoading={isLoading}
      />
      <PostsCardsSkeleton
        post={thirdPost}
        isLoading={isLoading}
      />
      {!isLoading &&
        restPosts?.map((post) => {
          return (
            <PostCard
              key={post?.id}
              post={post}
            />
          )
        })}
    </section>
  )
}

export default PostsLists
