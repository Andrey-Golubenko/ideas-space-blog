import { type Post, type Categories } from '@prisma/client'
import { useItemType } from '~/hooks/useItemType'
import { useIsMobile } from '~/hooks/useMobile'
import { type TSkeletonItems } from '~/types'

export const useListItemsDistribution = (
  items: Post[] | Categories[] | null | [],
  itemsCount?: number | null
) => {
  const { isMobile, isSmallScreen } = useIsMobile()

  const { isCategory, isPost } = useItemType(items?.[0])

  const noItems = typeof itemsCount === 'number' && items?.length === 0

  if (isPost) {
    const [firstItem, secondItem, thirdItem, ...restItems] = items || []

    const shouldPlaceThirdItem = !isMobile && itemsCount! >= 3

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
