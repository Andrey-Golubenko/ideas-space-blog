'use client'

import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { type TDeserializedPost } from '~/types'

interface IBlogPostsListProps<TData> {
  data: TData[]
  totalItems: number | null
  noItems: boolean
  isLoading: boolean
}

const BlogPostsList = ({
  data,
  totalItems,
  noItems = false,
  isLoading
}: IBlogPostsListProps<TDeserializedPost>) => {
  if (noItems) {
    return <NoItemsCard itemName="published posts" />
  }

  return (
    <WithPostData
      posts={data}
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
