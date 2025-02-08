'use client'

import { cloneElement, useRef, type ReactElement } from 'react'

import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import { cn } from '~/libs/utils'
import { type Categories } from '@prisma/client'

interface IWithCategoryDataProps {
  children: ReactElement[]
  categories: Categories[]
  categoriesCount: number | null
  isLoading: boolean
  dataContainerClasses?: string
  postsGridClasses?: string
}

/**
 * @component WithCategoryData
 *
 * A client-side high-order component to manage the display of categories with skeleton loading and dynamic grid rendering.
 *
 * This component takes a list of categories, their count, and a loading state to display skeletons initially,
 * transforming them into actual category elements once the data is loaded. It dynamically adjusts the layout and handles fallback scenarios when no categories are present.
 *
 * The primary functionality includes:
 * - Distribution of skeleton items and actual categories for rendering.
 * - Dynamic grid layout adjustments based on container size and provided configurations.
 * - Graceful handling of scenarios with no available categories by rendering a fallback component.
 *
 * The first child passed to this component is expected to be the `WithSkeletonsList` component, which manages the skeleton rendering logic.
 * The second child is the individual category/item component rendered after the data is loaded.
 *
 * @param {IWithCategoryDataProps} props - The component props.
 * @param {ReactElement[]} props.children - Two child components:
 *   1. `WithSkeletonsList` to handle skeleton loading.
 *   2. The component used for displaying individual items (e.g., `CategoryCard`).
 * @param {Categories[]} props.categories - The list of categories to display.
 * @param {number | null} props.categoriesCount - The total number of categories to manage display logic.
 * @param {boolean} props.isLoading - Whether the categories are still being loaded.
 * @param {string} [props.dataContainerClasses] - Custom CSS classes for the data container.
 * @param {string} [props.postsGridClasses] - Custom CSS classes for the grid layout of categories.
 *
 * @returns {JSX.Element} - The rendered `WithCategoryData` component.
 */
const WithCategoryData = ({
  children,
  categories,
  categoriesCount,
  isLoading,
  dataContainerClasses,
  postsGridClasses
}: IWithCategoryDataProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { skeletonItems, restItems, fourthItemInList } =
    useListItemsDistribution(categories, categoriesCount, containerRef)

  const itemType = { isPost: false, isCategory: true }

  return (
    <section
      className={cn('my-20 w-full @container', dataContainerClasses)}
      ref={containerRef}
    >
      {cloneElement(children[0] as ReactElement, {
        skeletonItems,
        isLoading,
        itemType
      })}

      {!isLoading && (restItems?.length > 0 || fourthItemInList) && (
        <div
          className={cn(
            'mb-5 grid w-full grid-cols-1 gap-5 @lg:grid-cols-2 @3xl:grid-cols-3 @4xl:grid-cols-4',
            postsGridClasses
          )}
        >
          {[fourthItemInList, ...restItems]?.map((item) => {
            if (item) {
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
