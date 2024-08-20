'use client'

import { useEffect } from 'react'

import usePosts from '~/store'
import PostsList from '~/components/posts/PostsList'

const BlogPostsList = () => {
  const [posts, postsCount, isLoading, getAllPosts] = usePosts((state) => {
    return [
      state.posts,
      state.postsCount,
      state.isLoading,
      state.getAllPosts
    ]
  })

  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  return (
    <PostsList
      posts={posts}
      postsCount={postsCount}
      isLoading={isLoading}
    />
  )
}

export default BlogPostsList
