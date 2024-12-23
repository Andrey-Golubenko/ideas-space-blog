'use client'

import { type Categories } from '@prisma/client'

import { useItemProps } from '~/hooks/useItemProps'
import { Skeleton } from '~/components/ui/skeleton'
import SectionItemCardImage from '~/components/shared/ItemSectionCard/SectionItemCardImage'
import SectionItemCardHeader from '~/components/shared/ItemSectionCard/SectionItemCardHeader'

interface ISkeletonCatSectionItemProps {
  item?: Categories
  isLoading?: boolean
}

const SkeletonCatSectionItem = ({
  item,
  isLoading
}: ISkeletonCatSectionItemProps) => {
  const hasContent = item && !isLoading

  const { itemImage, itemTitle, itemSlug } = useItemProps(item)

  return (
    <div className="flex min-h-max flex-col items-center justify-center !border-0 !bg-transparent shadow-none">
      {hasContent ? (
        <SectionItemCardImage
          itemSlug={itemSlug}
          itemTitle={itemTitle}
          itemImage={itemImage}
          itemType={{ isCategory: true, isPost: false }}
        />
      ) : (
        <Skeleton className="mb-8 h-[200px] w-[200px] overflow-hidden rounded-full" />
      )}

      {hasContent ? (
        <SectionItemCardHeader
          itemSlug={itemSlug}
          itemTitle={itemTitle}
          itemType={{ isCategory: true, isPost: false }}
        />
      ) : (
        <Skeleton className="mb-6 h-8 w-5/6" />
      )}
    </div>
  )
}

export default SkeletonCatSectionItem
