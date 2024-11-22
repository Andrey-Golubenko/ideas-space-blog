'use client'

import Link from 'next/link'

import { CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import { Skeleton } from '~/components/ui/skeleton'
import { useItemProps } from '~/hooks/useItemProps'
import { fontPoppins } from '~/utils/constants/fonts'
import { PATHS } from '~/utils/constants'
import { type Categories } from '@prisma/client'

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
        <Link
          href={`${PATHS.categories}/${itemSlug}`}
          className="w-[200px] overflow-hidden rounded-full"
        >
          <LoadableImage
            src={itemImage}
            alt={`${itemTitle} image`}
            containerHeight={200}
            priority
            imageClassNames="object-cover rounded-full"
            containerClassNames="duration-700 hover:scale-110 rounded-full"
          />
        </Link>
      ) : (
        <Skeleton className="mb-8 h-[200px] w-[200px] overflow-hidden rounded-full" />
      )}

      {hasContent ? (
        <CardHeader className="w-full pb-8">
          <Link href={`${PATHS.categories}/${itemSlug}`}>
            <h2
              className={`line-clamp-2 w-full text-center text-2xl hover:text-black/60  
              ${fontPoppins.className}`}
            >
              {itemTitle}
            </h2>
          </Link>
        </CardHeader>
      ) : (
        <Skeleton className="mb-6 h-8 w-5/6" />
      )}
    </div>
  )
}

export default SkeletonCatSectionItem
