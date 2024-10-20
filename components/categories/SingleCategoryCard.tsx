'use client'

import { type Post } from '@prisma/client'
import { useEffect, useState } from 'react'
import PostsList from '~/components/posts/PostsList'

interface ISingleCategoryCardProps {
  posts: Post[] | null
}

const SingleCategoryCard = ({ posts }: ISingleCategoryCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const postsCount = posts?.length as number

  useEffect(() => {
    setIsLoading((prev) => {
      return !prev
    })
  }, [posts?.length])

  return (
    <div className="flex flex-col items-center justify-center">
      <PostsList
        posts={posts as Post[]}
        postsCount={postsCount}
        isLoading={isLoading}
      />
    </div>
  )
}

export default SingleCategoryCard
