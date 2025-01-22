'use client'

import {
  cloneElement,
  useEffect,
  useRef,
  type ReactNode,
  type ReactElement
} from 'react'

import useStore from '~/store'
import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import NoItemsCard from '~/components/posts/NoItemsCard'

/**
 * @component WithCategoryData
 *
 * A client-side high-order component that manages the display of categories with skeleton loading and dynamic grid rendering.
 *
 * This component fetches all categories using a global store, calculates the appropriate items to display
 * (including skeletons or placeholders), and dynamically renders a grid of category items. It also gracefully
 * handles scenarios where no categories are available by displaying a fallback component.
 *
 * ### Props
 *
 * @prop {ReactNode[]} children
 * - An array of ReactNode elements. The first child is expected to handle skeleton loading (`WithSkeletonsList`),
 *   and the second child is used to render each individual category (`CategoryCard` or similar component).
 *
 * ### Features
 *
 * - Automatically fetches categories from a global store on mount.
 * - Supports skeleton loading for a smooth user experience.
 * - Dynamically adjusts the grid layout based on the category type and available items.
 * - Displays a fallback `NoItemsCard` if no categories are found.
 *
 * ### Usage
 *
 * ```tsx
 * <WithCategoryData>
 *   <WithSkeletonsList>
 *     <SkeletonCategoryCard />
 *   </WithSkeletonsList>
 *   <CategoryCard />
 * </WithCategoryData>
 * ```
 *
 * ### Internal Logic
 *
 * - **Skeletons and Loading**:
 *   The first child (`WithSkeletonsList`) receives props for `skeletonItems`, `isLoading`, and `itemType`
 *   to manage skeleton loading during data fetch.
 *
 * - **Dynamic Grid Rendering**:
 *   Categories are dynamically displayed in a responsive grid. The grid structure is adjusted based on the
 *   type of items being rendered (`isCategory` in this case).
 *
 * - **Fallback for Empty Data**:
 *   If no categories are available, the component renders a `NoItemsCard` with a descriptive message.
 *
 * ### Example
 *
 * ```tsx
 * <WithCategoryData>
 *   <WithSkeletonsList>
 *     <SkeletonCategoryCard />
 *   </WithSkeletonsList>
 *   <CategoryCard />
 * </WithCategoryData>
 * ```
 *
 * - The first child (`WithSkeletonsList`) is used to manage the display of skeletons.
 * - The second child (`CategoryCard`) renders each category item once the data is loaded.
 *
 * ### Notes
 * - The `cloneElement` function is used to inject additional props into the children components, such as
 *   `skeletonItems`, `isLoading`, and individual category data.
 * - The `NoItemsCard` component is displayed when no categories are available to show a meaningful fallback message.
 *
 * @returns {JSX.Element} A section element containing skeletons, categories, or a fallback.
 */
const WithCategoryData = ({
  children
}: Readonly<{ children: ReactNode[] }>) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [categories, getAllCategories, isLoading] = useStore((state) => {
    return [state.categories, state.getAllCategories, state.isLoading]
  })

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  const { skeletonItems, restItems, fourthItemInList, noItems } =
    useListItemsDistribution(categories, categories?.length, containerRef)

  const itemType = { isPost: false, isCategory: true }

  return (
    <section
      className="my-20 w-full @container"
      ref={containerRef}
    >
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
          className={`mb-5 grid w-full grid-cols-1 gap-5 @lg:grid-cols-2 @3xl:grid-cols-3 ${itemType?.isPost ? '' : '@4xl:grid-cols-4'}`}
        >
          {[fourthItemInList, ...restItems]?.map((item) => {
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
