'use client'

import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { type TDeserializedPost } from '~/types'

interface ISingleCategoryPostsListProps<TData> {
  data: TData[] | string
  totalItems: number | null
  noItems: boolean
  isLoading: boolean
}

const SingleCategoryPostsList = ({
  data,
  totalItems,
  noItems = false,
  isLoading
}: ISingleCategoryPostsListProps<TDeserializedPost>) => {
  if (noItems) {
    return <NoItemsCard itemName="published posts" />
  }

  return (
    <WithPostData
      posts={data as TDeserializedPost[]}
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

export default SingleCategoryPostsList
