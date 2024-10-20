'use client'

import Link from 'next/link'

import { cn } from '~/libs/utils'
import { CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import { fontPoppins } from '~/utils/constants/fonts'
import { PATHS } from '~/utils/constants/constants'

interface IItemCardHeaderProps {
  itemImage: string
  itemTitle: string
  itemSlug: string
  itemType: { isPost: boolean; isCategory: boolean }
  imagePriority?: boolean
}

const ItemCardHeader = ({
  itemImage,
  itemTitle,
  itemSlug,
  itemType,
  imagePriority
}: IItemCardHeaderProps) => {
  const { isPost, isCategory } = itemType

  return (
    <>
      <Link
        href={
          (isPost && `${PATHS.blog}/${itemSlug}`) ||
          (isCategory && `${PATHS.categories}/${itemSlug}`) ||
          '#'
        }
        className="w-full overflow-hidden"
      >
        <LoadableImage
          src={itemImage}
          alt="Post image"
          containerHeight={220}
          priority={imagePriority}
          imageClassNames="rounded-t-md object-cover hover:rounded-md"
          containerClassNames="rounded-t-md duration-700 hover:scale-110 hover:rounded-md"
        />
      </Link>

      <CardHeader className="pb-4">
        <h2
          className={cn(
            'w-full truncate text-2xl font-semibold',
            fontPoppins.className
          )}
        >
          {itemTitle}
        </h2>
      </CardHeader>
    </>
  )
}

export default ItemCardHeader
