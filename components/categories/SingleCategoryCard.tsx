'use client'

import { useEffect, useState } from 'react'

import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonItemCard from '~/components/shared/ItemCard/SkeletonItemCard'
import { type Post } from '@prisma/client'

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
      <WithPostData
        posts={posts as Post[]}
        postsCount={postsCount}
        isLoading={isLoading}
      >
        <WithSkeletonsList>
          <SkeletonItemCard />
        </WithSkeletonsList>

        <ItemCard />
      </WithPostData>
    </div>
  )
}

export default SingleCategoryCard
