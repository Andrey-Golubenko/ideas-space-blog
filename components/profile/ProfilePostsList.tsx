'use client'

import WithDataList from '~/components/hoc/WithDataList'
import ItemCard from '~/components/shared/ItemCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { type TDeserializedPost } from '~/types'

interface IProfilePostsListProps<TData> {
  data: TData[]
  totalItems: number | null
  noItems: boolean
  hasFullAccess: boolean
  isLoading: boolean
}

const ProfilePostsList = ({
  data,
  totalItems,
  noItems = false,
  hasFullAccess,
  isLoading
}: IProfilePostsListProps<TDeserializedPost>) => {
  if (noItems && !hasFullAccess) {
    return <NoItemsCard itemName="posts" />
  }

  const publishedPosts =
    data?.filter((post) => {
      return post.published
    }) || []

  const displayedPosts = hasFullAccess ? data : publishedPosts

  return (
    <WithDataList
      itemType={{
        isPost: true
      }}
      itemSize={{
        isRegular: true
      }}
      items={displayedPosts}
      itemsCount={totalItems}
      isLoading={isLoading}
      dataContainerClasses="!mb-0"
    >
      <ItemCard />
    </WithDataList>
  )
}

export default ProfilePostsList
