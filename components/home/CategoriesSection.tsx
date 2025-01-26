'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { useDataCategories } from '~/hooks/useDataCategories'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import WithCategoryData from '~/components/hoc/WithCategoryData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import SectionItemCard from '~/components/shared/ItemSectionCard'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import SkeletonCatSectionItem from '~/components/shared/ItemSectionCard/SkeletonCatSectionItem'

const CategoriesSection = () => {
  const [categories, categoriesCount, isLoading] = useGlobalStore(
    (state) => {
      return [state.categories, state.categoriesCount, state.isLoading]
    }
  )

  const noItems = typeof categories === 'string'
  const displayedCategories = noItems ? [] : categories

  const dataCategoriesProps = useMemo(() => {
    return {
      page: 1,
      limit: 12
    }
  }, [])

  useDataCategories(dataCategoriesProps)

  return (
    <Card className="h-full w-full border-transparent bg-slate-100 shadow-md">
      <CardHeader className="pb-0 pt-20">
        <CardHeaderContent
          title="Topic Highlights"
          label="Blog Themes"
        />
      </CardHeader>

      <CardContent>
        <WithCategoryData
          categories={displayedCategories}
          categoriesCount={categoriesCount}
          isLoading={isLoading}
          dataContainerClasses="!mb-10 !mt-15"
        >
          <WithSkeletonsList>
            <SkeletonCatSectionItem />
          </WithSkeletonsList>

          <SectionItemCard />
        </WithCategoryData>
      </CardContent>
    </Card>
  )
}

export default CategoriesSection
