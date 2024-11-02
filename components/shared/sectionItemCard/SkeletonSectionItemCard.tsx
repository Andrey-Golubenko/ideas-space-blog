import Link from 'next/link'

import { Card, CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import { Skeleton } from '~/components/ui/skeleton'
import { useItemProps } from '~/hooks/useItemProps'
import { useItemType } from '~/hooks/useItemType'
import { fontPoppins } from '~/utils/constants/fonts'
import { PATHS } from '~/utils/constants/constants'
import { type Categories } from '@prisma/client'

interface ICategoriesSectionItemProps {
  item?: Categories
  isLoading?: boolean
}

const SkeletonSectionItemCard = ({
  item,
  isLoading
}: ICategoriesSectionItemProps) => {
  const hasContent = item && !isLoading

  const { itemImage, itemTitle, itemSlug } = useItemProps(item)

  const { isPost, isCategory } = useItemType(item)

  return (
    <Card
      className={`flex min-h-max flex-col items-center justify-center ${isCategory ? '!border-0 bg-transparent shadow-none' : ''}`}
    >
      {hasContent ? (
        <Link
          href={
            (isPost && `${PATHS.blog}/${itemSlug}`) ||
            (isCategory && `${PATHS.categories}/${itemSlug}`) ||
            '#'
          }
          className={`overflow-hidden ${isCategory ? 'w-[200px] rounded-full' : 'w-full rounded-lg border-b'}`}
        >
          <LoadableImage
            src={itemImage}
            alt={`${itemTitle} image`}
            containerHeight={isCategory ? 200 : 250}
            priority
            imageClassNames={`object-cover ${isCategory ? 'rounded-full' : 'rounded-lg'}`}
            containerClassNames={` duration-700 hover:scale-110 ${isCategory ? 'rounded-full' : 'rounded-lg'}`}
          />
        </Link>
      ) : (
        <Skeleton className="mb-8 h-[200px] w-[200px] overflow-hidden rounded-full" />
      )}

      {hasContent ? (
        <CardHeader className="pb-4">
          <Link
            href={
              (isPost && `${PATHS.blog}/${itemSlug}`) ||
              (isCategory && `${PATHS.categories}/${itemSlug}`) ||
              '#'
            }
          >
            <h2
              className={`
              text-outline-white line-clamp-2 w-full text-2xl hover:text-black/60 ${isCategory ? 'font-semibold' : 'font-bold'} 
              ${fontPoppins.className}`}
            >
              {itemTitle}
            </h2>
          </Link>
        </CardHeader>
      ) : (
        <Skeleton className="h-8 w-3/4 pb-4" />
      )}
    </Card>
  )
}

export default SkeletonSectionItemCard
