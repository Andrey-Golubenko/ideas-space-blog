'use client'

import WithDataList from '~/components/hoc/WithDataList'
import ItemCard from '~/components/shared/ItemCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { type Categories } from '@prisma/client'

interface ICategoriesListProps<TData> {
  data: TData[]
  totalItems: number | null
  noItems: boolean
  isLoading: boolean
}

const CategoriesList = ({
  data,
  totalItems,
  noItems = false,
  isLoading
}: ICategoriesListProps<Categories>) => {
  if (noItems) {
    return <NoItemsCard itemName="published posts" />
  }

  return (
    <WithDataList
      itemType={{
        isCategory: true
      }}
      itemSize={{
        isRegular: true
      }}
      items={data}
      itemsCount={totalItems}
      isLoading={isLoading}
      dataContainerClasses="!my-0"
    >
      <ItemCard />
    </WithDataList>
  )
}

export default CategoriesList
