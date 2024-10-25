import { Post, type Categories } from '@prisma/client'
import { useIsMobile } from '~/hooks/useMobile'
import { TSkeletonItems } from '~/types/types'

export const useListItemsDistribution = (
  items: Post[] | Categories[],
  itemsCount?: number | null
) => {
  const isMobile = useIsMobile()

  const [firstItem, secondItem, thirdItem, ...restItems] = items || []

  const shouldPlaceThirdItem = !isMobile && itemsCount! >= 3

  const thirdItemInSkeleton = shouldPlaceThirdItem ? thirdItem : undefined

  const thirdItemInList = !shouldPlaceThirdItem ? thirdItem : undefined

  const noItems = typeof itemsCount === 'number' && items?.length === 0

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
