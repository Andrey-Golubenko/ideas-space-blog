import ItemCard from '~/components/shared/ItemCard'
import { cn } from '~/libs/utils'
import {
  type TItemSize,
  type TItemType,
  type TSkeletonItems
} from '~/types'

interface ISkeletonsListProps {
  skeletonItems?: TSkeletonItems
  itemType?: TItemType
  itemSize?: TItemSize
  isLoading?: boolean
  postsGridClasses?: string
}

const SkeletonsList = ({
  skeletonItems,
  itemType,
  itemSize,
  isLoading,
  postsGridClasses
}: ISkeletonsListProps) => {
  const { firstItem, secondItem, thirdItem, fourthItem } =
    skeletonItems as TSkeletonItems

  const isPost = itemType?.isPost
  const isCategory = itemType?.isCategory

  return (
    <div
      className={cn(
        'mb-5 grid w-full grid-cols-1 gap-5 @lg:grid-cols-2 @3xl:grid-cols-3',
        isCategory && '@4xl:grid-cols-4',
        postsGridClasses
      )}
    >
      <ItemCard
        itemType={itemType}
        itemSize={itemSize}
        item={firstItem}
        isLoading={isLoading}
      />

      {firstItem && !secondItem ? null : (
        <ItemCard
          itemType={itemType}
          itemSize={itemSize}
          item={secondItem}
          isLoading={isLoading}
        />
      )}

      {firstItem && !thirdItem ? null : (
        <ItemCard
          itemType={itemType}
          itemSize={itemSize}
          item={thirdItem}
          isLoading={isLoading}
        />
      )}

      {(!isCategory && isPost) || (firstItem && !fourthItem) ? null : (
        <ItemCard
          itemType={itemType}
          itemSize={itemSize}
          item={fourthItem}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default SkeletonsList
