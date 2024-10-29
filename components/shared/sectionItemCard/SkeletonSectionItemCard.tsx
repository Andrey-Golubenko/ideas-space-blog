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
    <Card className="flex min-h-max flex-col items-center justify-center !border-0 bg-transparent shadow-none">
      {hasContent ? (
        <Link
          href={
            (isPost && `${PATHS.blog}/${itemSlug}`) ||
            (isCategory && `${PATHS.categories}/${itemSlug}`) ||
            '#'
          }
          className="w-[200px] overflow-hidden rounded-full"
        >
          <LoadableImage
            src={itemImage}
            alt="Post image"
            containerHeight={200}
            priority
            imageClassNames="rounded-full object-cover"
            containerClassNames="rounded-full duration-700 hover:scale-110"
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
              text-outline-white line-clamp-2 w-full text-2xl font-semibold 
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
