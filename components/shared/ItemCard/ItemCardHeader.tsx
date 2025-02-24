'use client'

import Link from 'next/link'

import { useListItemProps } from '~/hooks/useListItemProps'
import { CardHeader } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import LoadableImage from '~/components/shared/LoadableImage'
import PostMeta from '~/components/posts/PostMeta'
import { cn } from '~/libs/utils'
import { fontPoppins } from '~/utils/constants/fonts'
import { PATHS } from '~/utils/constants'
import { type TListItem, type TItemType } from '~/types'

interface IItemCardHeaderProps {
  hasContent: boolean
  itemType: TItemType
  item?: TListItem
  imagePriority?: boolean
}

const ItemCardHeader = ({
  hasContent,
  itemType,
  item,
  imagePriority
}: IItemCardHeaderProps) => {
  const {
    itemImage,
    itemTitle,
    itemSlug,
    itemCreatedAt,
    authorId,
    isPublishes
  } = useListItemProps(item)

  const { isPost, isCategory } = itemType

  if (!hasContent) {
    return (
      <>
        <CardHeader className="p-0">
          <Skeleton
            className={cn(
              'overflow-hidden',
              isPost && 'mb-4 min-h-[300px] w-full',
              isCategory &&
                'mx-auto mb-4 mt-6 h-[200px] w-[200px] rounded-full'
            )}
          />
        </CardHeader>

        <CardHeader
          className={cn(
            isPost && 'pb-2 pt-3',
            isCategory && 'px-8 pb-8 pt-3'
          )}
        >
          <Skeleton className="h-7 w-full" />
        </CardHeader>

        {isPost && (
          <>
            <CardHeader className="flex-row items-center space-y-0 pb-1 pt-2">
              <Skeleton className="mr-4 size-10 rounded-full" />
              <Skeleton className="h-3 w-[40%]" />
            </CardHeader>

            <CardHeader className="ml-2 flex-row items-center space-y-0 pb-6 pt-2">
              <Skeleton className="mr-4 size-6" />
              <Skeleton className="h-3 w-[30%]" />
            </CardHeader>
          </>
        )}
      </>
    )
  }

  return (
    <>
      <Link
        href={
          (isPost && itemSlug && `${PATHS.post(itemSlug)}`) ||
          (isCategory && itemSlug && `${PATHS.category(itemSlug)}`) ||
          '#'
        }
        className={cn(
          'overflow-hidden',
          isCategory
            ? 'mx-auto mt-6 size-[200px] rounded-full'
            : 'w-full rounded-lg border-b'
        )}
      >
        <LoadableImage
          src={itemImage}
          alt={`${itemTitle} image`}
          containerHeight={300}
          priority={imagePriority}
          imageClassNames="object-cover rounded-md"
          containerClassNames={`duration-700 hover:scale-110 ${isCategory ? 'rounded-full' : 'rounded-md'}`}
        />
      </Link>

      <CardHeader className="pb-4">
        <h2
          className={cn(
            'line-clamp-1 w-full text-2xl font-semibold',
            fontPoppins.className,
            isCategory ? 'text-center' : ''
          )}
        >
          {itemTitle}
        </h2>

        {isPost && (
          <div className="w-full pt-2">
            <PostMeta
              hasContent
              authorId={authorId}
              itemCreatedAt={itemCreatedAt}
              isPublished={isPublishes}
            />
          </div>
        )}
      </CardHeader>
    </>
  )
}

export default ItemCardHeader
