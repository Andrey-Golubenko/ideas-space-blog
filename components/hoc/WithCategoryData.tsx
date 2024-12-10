'use client'

import {
  cloneElement,
  useEffect,
  type ReactNode,
  type ReactElement
} from 'react'

import useStore from '~/store'
import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import NoPostsCard from '~/components/posts/NoPostsCard'

const WithCategoryData = ({
  children
}: Readonly<{ children: ReactNode[] }>) => {
  const [categories, getAllCategories, isLoading] = useStore((state) => {
    return [state.categories, state.getAllCategories, state.isLoading]
  })

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  const { skeletonItems, restItems, thirdItemInList, noItems } =
    useListItemsDistribution(categories, categories?.length)

  return (
    <section className="my-20 w-full @container">
      {!noItems ? (
        // Passing skeletonItems and isLoading as a props in children

        cloneElement(children[0] as ReactElement, {
          skeletonItems,
          isLoading
        })
      ) : (
        <NoPostsCard itemName="categories" />
      )}

      {!isLoading && restItems?.length > 0 && (
        <div className="mb-5 grid w-full grid-cols-1 gap-5 @md:grid-cols-2 @3xl:grid-cols-3">
          {[...restItems, thirdItemInList]?.map((item) => {
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
