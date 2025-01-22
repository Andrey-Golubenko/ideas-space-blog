import { type RefObject } from 'react'

import { type Post, type Categories } from '@prisma/client'
import { useItemType } from '~/hooks/useItemType'
import { useContainerWidth } from '~/hooks/useContainerWidth'
import { type TSkeletonItems, type TDeserializedPost } from '~/types'

/**
 * useListItemsDistribution - A custom hook for distributing and managing lists of items (posts or categories)
 * based on the container width and the type of items.
 *
 * @param {Array} items - An array of items which can be `Post`, `TDeserializedPost`, or `Categories`. It can also be `null` or an empty array.
 * @param {number | null} [itemsCount] - The total number of items in the list.
 * @param {RefObject<HTMLElement>} [containerRef] - A reference to the container element to determine its width.
 *
 * @returns {Object} An object containing:
 * - `skeletonItems` (`TSkeletonItems`): A structured object of items (e.g., first, second, third, or fourth items) for rendering skeleton placeholders.
 * - `restItems` (`Array`): The remaining items in the list after extracting the skeleton items.
 * - `thirdItemInList` (`Object | undefined`): The third item to display when not placed in the skeleton (for posts).
 * - `fourthItemInList` (`Object | undefined`): The fourth item to display when not placed in the skeleton (for categories).
 * - `noItems` (`boolean`): Indicates whether there are no items available despite a provided `itemsCount`.
 */
export const useListItemsDistribution = (
  items: (Post | TDeserializedPost)[] | Categories[] | null | [],
  itemsCount?: number | null,
  containerRef?: RefObject<HTMLElement>
) => {
  const { isContainerMobile, isContainerMedium } =
    useContainerWidth(containerRef)

  const { isCategory, isPost } = useItemType(items?.[0])

  const noItems = typeof itemsCount === 'number' && items?.length === 0

  if (isPost) {
    const [firstItem, secondItem, thirdItem, ...restItems] = items || []

    const shouldPlaceThirdItem: boolean =
      !isContainerMobile && itemsCount! >= 3

    const thirdItemInSkeleton = shouldPlaceThirdItem
      ? thirdItem
      : undefined

    const thirdItemInList = !shouldPlaceThirdItem ? thirdItem : undefined

    const skeletonItems: TSkeletonItems = {
      firstItem,
      secondItem,
      thirdItem: thirdItemInSkeleton
    }

    return {
      skeletonItems,
      restItems,
      thirdItemInList,
      noItems
    }
  }

  if (isCategory) {
    const [firstItem, secondItem, thirdItem, fourthItem, ...restItems] =
      items || []

    const shouldPlaceFourthItem: boolean =
      (isContainerMobile || isContainerMedium) && itemsCount! >= 4

    const fourthItemInSkeleton = shouldPlaceFourthItem
      ? fourthItem
      : undefined

    const fourthItemInList = !shouldPlaceFourthItem
      ? fourthItem
      : undefined

    const skeletonItems: TSkeletonItems = {
      firstItem,
      secondItem,
      thirdItem,
      fourthItem: fourthItemInSkeleton
    }

    return {
      skeletonItems,
      restItems,
      fourthItemInList,
      noItems
    }
  }

  return {
    skeletonItems: {},
    restItems: [],
    fourthItemInList: undefined,
    noItems: false
  }
}
