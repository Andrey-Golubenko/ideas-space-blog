'use client'

import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonPostCard from '~/components/shared/ItemCard/SkeletonPostCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { type TDeserializedPost } from '~/types'

interface IProfilePostsListProps<TData> {
  data: TData[]
  totalItems: number | null
  noItems: boolean
  isLoading: boolean
}

const ProfilePostsList = ({
  data,
  totalItems,
  noItems = false,
  isLoading
}: IProfilePostsListProps<TDeserializedPost>) => {
  if (noItems) {
    return <NoItemsCard itemName="posts" />
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

export default ProfilePostsList
