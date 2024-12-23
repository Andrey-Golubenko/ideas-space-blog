'use client'

import WithCategoryData from '~/components/hoc/WithCategoryData'
import SectionItemCard from '~/components/shared/ItemSectionCard'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import SkeletonCatSectionItem from '~/components/shared/ItemSectionCard/SkeletonCatSectionItem'

const SectionCategoriesList = () => {
  return (
    <WithCategoryData>
      <WithSkeletonsList>
        <SkeletonCatSectionItem />
      </WithSkeletonsList>

      <SectionItemCard />
    </WithCategoryData>
  )
}

export default SectionCategoriesList
