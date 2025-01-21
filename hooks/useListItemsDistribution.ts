import { type Post, type Categories } from '@prisma/client'
import { type RefObject } from 'react'
import { useItemType } from '~/hooks/useItemType'
import { useContainerWidth } from '~/hooks/useContainerWidth'
import { useIsMobile } from '~/hooks/useMobile'
import { type TSkeletonItems, type TDeserializedPost } from '~/types'

export const useListItemsDistribution = (
  items: (Post | TDeserializedPost)[] | Categories[] | null | [],
  itemsCount?: number | null,
  containerRef?: RefObject<HTMLElement>
) => {
  const { isMobile, isSmallScreen } = useIsMobile()

  const { isMediumWidth } = useContainerWidth(containerRef)

  const { isCategory, isPost } = useItemType(items?.[0])

  const noItems = typeof itemsCount === 'number' && items?.length === 0

  if (isPost) {
    const [firstItem, secondItem, thirdItem, ...restItems] = items || []

    const shouldPlaceThirdItem = !isMediumWidth && itemsCount! >= 3

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

    const shouldPlaceFourthItem =
      (!isMobile || isSmallScreen) && itemsCount! >= 4

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
