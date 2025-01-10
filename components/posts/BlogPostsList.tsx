'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { type Post } from '@prisma/client'

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

  const noItems = isEmptyOrUnpublished(posts as Post[])

  if (noItems) {
    return <NoItemsCard itemName="published posts" />
  }

  return (
    <WithPostData
      posts={posts as Post[]}
      postsCount={postsCount}
      isLoading={isLoading}
    >
      <WithSkeletonsList>
        <SkeletonPostCard />
      </WithSkeletonsList>

      <ItemCard />
    </WithPostData>
  )
}

export default BlogPostsList
