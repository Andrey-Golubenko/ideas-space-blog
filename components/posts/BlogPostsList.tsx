'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonItemCard from '~/components/shared/ItemCard/SkeletonItemCard'

const BlogPostsList = () => {
  const [posts, postsCount, isLoading, getAllPosts] = useStore((state) => {
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
    <WithPostData
      posts={posts}
      postsCount={postsCount}
      isLoading={isLoading}
    >
      <WithSkeletonsList>
        <SkeletonItemCard />
      </WithSkeletonsList>

      <ItemCard />
    </WithPostData>
  )
}

export default BlogPostsList
