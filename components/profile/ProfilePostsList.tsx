'use client'

import WithDataList from '~/components/hoc/WithDataList'
import ItemCard from '~/components/shared/ItemCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { PostStatus } from '@prisma/client'
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
  if (noItems) {
    return <NoItemsCard itemName="posts" />
  }

  const publishedPosts =
    data?.filter((post) => {
      return post?.status === PostStatus.PUBLISHED
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
