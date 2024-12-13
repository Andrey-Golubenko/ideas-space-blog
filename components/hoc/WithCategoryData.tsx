'use client'

import {
  cloneElement,
  useEffect,
  type ReactNode,
  type ReactElement
} from 'react'

import useStore from '~/store'
import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import NoItemsCard from '~/components/posts/NoItemsCard'

const WithCategoryData = ({
  children
}: Readonly<{ children: ReactNode[] }>) => {
  const [categories, getAllCategories, isLoading] = useStore((state) => {
    return [state.categories, state.getAllCategories, state.isLoading]
  })

  useEffect(() => {
    if (!categories) getAllCategories()
  }, [getAllCategories])

  const { skeletonItems, restItems, fourthItemInList, noItems } =
    useListItemsDistribution(categories, categories?.length)

  const itemType = { isPost: false, isCategory: true }

  return (
    <section className="w-full @container md:my-20">
      {!noItems ? (
        // Passing skeletonItems and isLoading as a props in children

        cloneElement(children[0] as ReactElement, {
          skeletonItems,
          isLoading,
          itemType
        })
      ) : (
        <NoItemsCard itemName="categories" />
      )}

      {!isLoading && (restItems?.length > 0 || fourthItemInList) && (
        <div
          className={`mb-5 grid w-full grid-cols-1 gap-5 @md:grid-cols-2 @3xl:grid-cols-3 ${itemType?.isPost ? '' : '@4xl:grid-cols-4'}`}
        >
          {[...restItems, fourthItemInList]?.map((item) => {
            if (item) {
              // Passing the key and item as a props in children

              return cloneElement(children[1] as ReactElement, {
                key: item?.id,
                item
              })
            }

            return undefined
          })}
        </div>
      )}
    </section>
  )
}

export default WithCategoryData
