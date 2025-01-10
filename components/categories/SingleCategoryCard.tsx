'use client'

import { useEffect, useState } from 'react'

import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { type Post } from '@prisma/client'

interface ISingleCategoryCardProps {
  posts: Post[]
}

const SingleCategoryCard = ({ posts }: ISingleCategoryCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const postsCount = posts?.length as number

  useEffect(() => {
    setIsLoading((prev) => {
      return !prev
    })
  }, [posts?.length])

  const noItems = isEmptyOrUnpublished(posts as Post[])

  if (noItems) {
    return <NoItemsCard itemName="published posts" />
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      id="posts-container"
    >
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
    </div>
  )
}

export default SingleCategoryCard
