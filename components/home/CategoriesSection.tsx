'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { useDataCategories } from '~/hooks/useDataCategories'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import WithDataList from '~/components/hoc/WithDataList'
import ItemCard from '~/components/shared/ItemCard'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'

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
        <WithDataList
          itemType={{
            isCategory: true
          }}
          itemSize={{
            isTruncated: true
          }}
          items={displayedCategories}
          itemsCount={categoriesCount}
          isLoading={isLoading}
          dataContainerClasses="!mb-10 !mt-15"
        >
          <ItemCard />
        </WithDataList>
      </CardContent>
    </Card>
  )
}

export default CategoriesSection
