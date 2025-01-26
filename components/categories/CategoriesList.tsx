'use client'

import WithCategoryData from '~/components/hoc/WithCategoryData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonCatCard from '~/components/shared/ItemCard/SkeletonCatCard'
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
    <WithCategoryData
      categories={data}
      categoriesCount={totalItems}
      isLoading={isLoading}
      dataContainerClasses="!my-0"
    >
      <WithSkeletonsList>
        <SkeletonCatCard />
      </WithSkeletonsList>

      <ItemCard />
    </WithCategoryData>
  )
}

export default CategoriesList
