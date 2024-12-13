'use client'

import Link from 'next/link'
import { cn } from '~/libs/utils'

import { useItemProps } from '~/hooks/useItemProps'
import { CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import PostMeta from '~/components/posts/PostMeta'
import { fontPoppins } from '~/utils/constants/fonts'
import { PATHS } from '~/utils/constants'
import { type TListItem, type TItemType } from '~/types'

interface IItemCardHeaderProps {
  item?: TListItem
  imagePriority?: boolean
  itemType: TItemType
}

const ItemCardHeader = ({
  item,
  itemType,
  imagePriority
}: IItemCardHeaderProps) => {
  const { itemImage, itemTitle, itemSlug, itemCreatedAt, authorId } =
    useItemProps(item)

  const { isPost, isCategory } = itemType

  return (
    <>
      <Link
        href={
          (isPost && `${PATHS.blog}/${itemSlug}`) ||
          (isCategory && `${PATHS.categories}/${itemSlug}`) ||
          '#'
        }
        className={`overflow-hidden border-b ${isCategory ? 'mx-auto mt-6 h-[200px] w-[200px] rounded-full' : 'w-full rounded-md'}`}
      >
        <LoadableImage
          src={itemImage}
          alt={`${itemTitle} image`}
          containerHeight={250}
          priority={imagePriority}
          imageClassNames="object-cover rounded-md"
          containerClassNames={`duration-700 hover:scale-110 ${isCategory ? 'rounded-full' : 'rounded-md'}`}
        />
      </Link>

      <CardHeader className="pb-4">
        <h2
          className={cn(
            'line-clamp-2 w-full text-2xl font-semibold',
            fontPoppins.className,
            isCategory ? 'text-center' : ''
          )}
        >
          {itemTitle}
        </h2>

        {isPost && (
          <div className="w-full pt-4">
            <PostMeta
              authorId={authorId}
              itemCreatedAt={itemCreatedAt}
            />
          </div>
        )}
      </CardHeader>
    </>
  )
}

export default ItemCardHeader
