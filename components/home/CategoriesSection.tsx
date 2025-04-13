'use client'

import useGlobalStore from '~/store'
import { useDataCategories } from '~/hooks/useDataCategories'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import WithDataList from '~/components/hoc/WithDataList'
import ItemCard from '~/components/shared/ItemCard'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import { DEFAULT_CATEGORIES_PER_PAGE } from '~/utils/constants'

const CategoriesSection = () => {
  const { categories, categoriesCount, isLoading } = useGlobalStore(
    (state) => {
      return {
        categories: state.categories,
        categoriesCount: state.categoriesCount,
        isLoading: state.isLoading
      }
    }
  )

  const noItems = typeof categories === 'string'
  const displayedCategories = noItems ? [] : categories

  const dataCategoriesProps = {
    page: 1,
    limit: DEFAULT_CATEGORIES_PER_PAGE
  }

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
