'use client'

import { type Post } from '@prisma/client'

import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'

interface IBlogPostsListProps<TData> {
  data: TData[] | string
  totalItems: number | null
  noItems: boolean
  isLoading: boolean
}

const BlogPostsList = ({
  data,
  totalItems,
  noItems = false,
  isLoading
}: IBlogPostsListProps<Post>) => {
  if (noItems) {
    return <NoItemsCard itemName="published posts" />
  }

  return (
    <WithPostData
      posts={data as Post[]}
      postsCount={totalItems}
      isLoading={isLoading}
      dataContainerClasses="!mb-0"
    >
      <WithSkeletonsList>
        <SkeletonPostCard />
      </WithSkeletonsList>

      <ItemCard />
    </WithPostData>
  )
}

export default BlogPostsList
