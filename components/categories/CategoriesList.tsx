'use client'

import WithCategoryData from '~/components/hoc/WithCategoryData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import ItemCard from '~/components/shared/ItemCard'
import SkeletonCatCard from '~/components/shared/ItemCard/SkeletonCatCard'

const CategoriesList = () => {
  return (
    <WithCategoryData>
      <WithSkeletonsList>
        <SkeletonCatCard />
      </WithSkeletonsList>

      <ItemCard />
    </WithCategoryData>
  )
}

export default CategoriesList
