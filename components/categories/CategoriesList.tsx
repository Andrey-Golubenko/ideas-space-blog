'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import ItemCard from '~/components/ItemCard'
import NoPostsCard from '~/components/posts/NoPostsCard'
import SkeletonsList from '~/components/posts/SkeletonsList'

const CategoriesList = () => {
  const [categories, getAllCategories, categoriesCount, isLoading] =
    useStore((state) => {
      return [
        state.categories,
        state.getAllCategories,
        state.categoriesCount,
        state.isLoading
      ]
    })

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  const { skeletonItems, restItems, thirdItemInList, noItems } =
    useListItemsDistribution(categories, categoriesCount)

  return (
    <section className="my-20 w-full">
      {!noItems ? (
        <SkeletonsList
          skeletonItems={skeletonItems}
          isLoading={isLoading}
        />
      ) : (
        <NoPostsCard itemName="categories" />
      )}

      <div className="mb-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          [...restItems, thirdItemInList]?.map((item) => {
            if (item) {
              return (
                <ItemCard
                  key={item?.id}
                  item={item}
                />
              )
            }

            return undefined
          })}
      </div>
    </section>
  )
}

export default CategoriesList
