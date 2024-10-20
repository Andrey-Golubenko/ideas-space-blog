import SkeletonCard from '~/components/shared/ItemCard/SkeletonCard'
import { TSkeletonItems } from '~/types/types'

interface ISkeletonsListProps {
  skeletonItems: TSkeletonItems
  isLoading: boolean
}

const SkeletonsList = ({
  skeletonItems,
  isLoading
}: ISkeletonsListProps) => {
  const { firstItem, secondItem, thirdItem } = skeletonItems

  return (
    <div className="mb-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      <SkeletonCard
        item={firstItem}
        isLoading={isLoading}
      />
      {firstItem && !secondItem ? null : (
        <SkeletonCard
          item={secondItem}
          isLoading={isLoading}
        />
      )}

      {firstItem && !thirdItem ? null : (
        <SkeletonCard
          item={thirdItem}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default SkeletonsList
