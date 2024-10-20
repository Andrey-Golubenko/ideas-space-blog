import { Post, type Categories } from '@prisma/client'
import { useIsMobile } from '~/hooks/useIsMobile'
import { TSkeletonItems } from '~/types/types'

export const useListItemsDistribution = (
  items: Post[] | Categories[],
  itemsCount?: number | null
) => {
  const isMobile = useIsMobile()

  const [firstItem, secondItem, thirdItem, ...restItems] = items || []

  const thirdItemPlace = !isMobile && itemsCount! > 3

  const isThirdItemInSkeleton = thirdItemPlace ? thirdItem : undefined

  const thirdItemInList = !thirdItemPlace ? thirdItem : undefined

  const noItems = typeof itemsCount === 'number' && itemsCount === 0

  const skeletonItems: TSkeletonItems = {
    firstItem,
    secondItem,
    thirdItem: isThirdItemInSkeleton
  }

  return {
    skeletonItems,
    restItems,
    thirdItemInList,
    noItems
  }
}
