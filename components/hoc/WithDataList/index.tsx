'use client'

import { cloneElement, useRef, type ReactElement } from 'react'

import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import SkeletonsList from '~/components/hoc/WithDataList/SkeletonsList'
import { cn } from '~/libs/utils'
import { type Categories } from '@prisma/client'
import {
  type TItemType,
  type TItemSize,
  type TDeserializedPost
} from '~/types'

interface IWithDataListProps {
  children: ReactElement
  itemType: TItemType
  itemSize: TItemSize
  items: Categories[] | TDeserializedPost[]
  itemsCount: number | null
  isLoading: boolean
  dataContainerClasses?: string
  postsGridClasses?: string
}

/**
 * @component WithDataList
 *
 * A client-side high-order component to manage the display of categorized items with skeleton loading and dynamic grid rendering.
 *
 * This component takes a list of items, their count, and a loading state to display skeletons initially,
 * transforming them into actual item elements once the data is loaded. It dynamically adjusts the layout
 * based on the container's width and provided configurations.
 *
 * The primary functionality includes:
 * - Filtering items based on their type (posts or categories).
 * - Managing the distribution of skeleton items and the remaining items for display.
 * - Dynamically applying styles and layouts based on the container's size.
 *
 * The first child passed to this component is expected to be the `SkeletonsList` component, which handles
 * the skeleton rendering logic. The second child is the individual item component rendered after data is loaded.
 *
 * @param {IWithDataListProps} props - The component props.
 * @param {ReactElement[]} props.children - Two child components:
 *   1. `SkeletonsList` to handle skeleton loading.
 *   2. The component used for displaying individual items (e.g., `ItemCard`).
 * @param {TItemType} props.itemType - The type of item being rendered (post or category).
 * @param {TItemSize} props.itemSize - The size variant for individual items.
 * @param {(Categories[] | TDeserializedPost[])} props.items - The list of items to display.
 * @param {number | null} props.itemsCount - The total number of items to manage display logic.
 * @param {boolean} props.isLoading - Whether the items are still being loaded.
 * @param {string} [props.dataContainerClasses] - Custom CSS classes for the data container.
 * @param {string} [props.postsGridClasses] - Custom CSS classes for the grid layout of items.
 *
 * @returns {JSX.Element} - The rendered `WithDataList` component.
 */
const WithDataList = ({
  children,
  itemType,
  itemSize,
  items,
  itemsCount,
  isLoading,
  dataContainerClasses,
  postsGridClasses
}: IWithDataListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { skeletonItems, restItems, thirdItemInList, fourthItemInList } =
    useListItemsDistribution({ itemType, items, itemsCount, containerRef })

  const { isPost, isCategory } = itemType

  const itemToAdd =
    (isPost && thirdItemInList) || (isCategory && fourthItemInList)

  return (
    <section
      className={cn(
        'w-full @container',
        isPost && 'mb-8',
        isCategory && 'my-20',
        dataContainerClasses
      )}
      ref={containerRef}
    >
      <SkeletonsList
        skeletonItems={skeletonItems}
        itemType={itemType}
        itemSize={itemSize}
        isLoading={isLoading}
      />

      {!isLoading && (restItems?.length > 0 || itemToAdd) && (
        <div
          className={cn(
            'mb-5 grid w-full grid-cols-1 gap-5 @lg:grid-cols-2 @3xl:grid-cols-3',
            isCategory && '@4xl:grid-cols-4',
            postsGridClasses
          )}
        >
          {[itemToAdd, ...restItems]?.map((item) => {
            if (item) {
              return cloneElement(children as ReactElement, {
                key: item?.id,
                itemType,
                itemSize,
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

export default WithDataList
