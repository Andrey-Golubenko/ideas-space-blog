'use client'

import WithCategoryData from '~/components/hoc/WithCategoryData'
import SectionItemCard from '~/components/shared/SectionItemCard'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import SkeletonCatSectionItem from '~/components/shared/SectionItemCard/SkeletonCatSectionItem'

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
