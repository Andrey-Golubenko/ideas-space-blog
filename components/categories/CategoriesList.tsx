'use client'

import WithCategoryData from '~/components/hoc/WithCategoryData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonItemCard from '~/components/shared/ItemCard/SkeletonItemCard'

const CategoriesList = () => {
  return (
    <WithCategoryData>
      <WithSkeletonsList>
        <SkeletonItemCard />
      </WithSkeletonsList>

      <ItemCard />
    </WithCategoryData>
  )
}

export default CategoriesList
