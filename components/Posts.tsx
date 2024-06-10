'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { PATHS } from '~/constants/constants'
import usePosts from '~/store'

const Posts: React.FC = () => {
  const [posts, isLoading, getAllPosts] = usePosts((state) => [
    state.posts,
    state.isLoading,
    state.getAllPosts
  ])

  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  return (
    <ul className="mb-16 list-disc">
      {isLoading ? (
        <h3 className="text-center text-2xl">Loading...</h3>
      ) : (
        posts?.length &&
        posts?.map((post) => (
          <li key={post?.id}>
            <Link href={`${PATHS.blog}/${post?.id}`}>{post.title}</Link>
          </li>
        ))
      )}
    </ul>
  )
}

export default Posts
