'use client'

import WithCategoryData from '~/components/hoc/WithCategoryData'
import SectionItemCard from '~/components/shared/SectionItemCard'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import SkeletonSectionItemCard from '~/components/shared/SectionItemCard/SkeletonSectionItemCard'

const SectionCategoriesList = () => {
  return (
    <WithCategoryData>
      <WithSkeletonsList>
        <SkeletonSectionItemCard />
      </WithSkeletonsList>

      <SectionItemCard />
    </WithCategoryData>
  )
}

export default SectionCategoriesList
