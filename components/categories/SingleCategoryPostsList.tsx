'use client'

import WithDataList from '~/components/hoc/WithDataList'
import ItemCard from '~/components/shared/ItemCard'
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
    <WithDataList
      itemType={{
        isPost: true
      }}
      itemSize={{
        isRegular: true
      }}
      // the check occurs above according 'noItems', but TS don't see it, so we use 'as'
      items={data as TDeserializedPost[]}
      itemsCount={totalItems}
      isLoading={isLoading}
      dataContainerClasses="!mb-0"
    >
      <ItemCard />
    </WithDataList>
  )
}

export default SingleCategoryPostsList
