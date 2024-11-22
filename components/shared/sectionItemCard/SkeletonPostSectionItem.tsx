'use client'

import Link from 'next/link'

import { Card, CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import { Skeleton } from '~/components/ui/skeleton'
import PostMeta from '~/components/posts/PostMeta'
import { useItemProps } from '~/hooks/useItemProps'
import { fontPoppins } from '~/utils/constants/fonts'
import { PATHS } from '~/utils/constants'
import { type Categories } from '@prisma/client'

interface ISkeletonPostSectionItemProps {
  item?: Categories
  isLoading?: boolean
}

const SkeletonPostSectionItem = ({
  item,
  isLoading
}: ISkeletonPostSectionItemProps) => {
  const hasContent = item && !isLoading

  const { itemImage, itemTitle, itemSlug, itemCreatedAt, authorId } =
    useItemProps(item)

  return (
    <Card className="flex min-h-max flex-col items-center justify-center">
      {hasContent ? (
        <Link
          href={`${PATHS.blog}/${itemSlug}`}
          className="w-full overflow-hidden rounded-lg border-b"
        >
          <LoadableImage
            src={itemImage}
            alt={`${itemTitle} image`}
            containerHeight={250}
            priority
            imageClassNames="object-cover rounded-lg"
            containerClassNames="duration-700 hover:scale-110 rounded-lg"
          />
        </Link>
      ) : (
        <Skeleton className="mb-8 h-[300px] w-full overflow-hidden" />
      )}

      {hasContent ? (
        <CardHeader className="w-full pb-8">
          <Link href={`${PATHS.blog}/${itemSlug}`}>
            <h2
              className={`text-outline-white line-clamp-2 w-full text-start text-2xl font-bold hover:text-black/60 
              ${fontPoppins.className}`}
            >
              {itemTitle}
            </h2>
          </Link>
        </CardHeader>
      ) : (
        <Skeleton className="mb-6 h-8 w-5/6" />
      )}

      {hasContent ? (
        <div className="mb-6 w-full px-6">
          <PostMeta
            authorId={authorId}
            itemCreatedAt={itemCreatedAt}
          />
        </div>
      ) : (
        <div className="!mt-4 mb-8 w-full px-6">
          <div className="mb-2 flex items-center">
            <Skeleton className="mr-2 h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mb-2 flex items-center pl-1.5">
            <Skeleton className="mr-3 h-3 w-5 " />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      )}
    </Card>
  )
}

export default SkeletonPostSectionItem
