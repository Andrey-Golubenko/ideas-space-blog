'use client'

import Link from 'next/link'

import LoadableImage from '~/components/shared/LoadableImage'
import { cn } from '~/libs/utils'
import { PATHS } from '~/utils/constants'
import { type TItemType } from '~/types'

interface ISectionItemCardImageProps {
  itemSlug: string
  itemImage: string
  itemTitle: string
  itemType: TItemType
}

const SectionItemCardImage = ({
  itemSlug,
  itemImage,
  itemTitle,
  itemType
}: ISectionItemCardImageProps) => {
  const { isPost, isCategory } = itemType

  return (
    <Link
      href={
        (isPost && `${PATHS.blog}/${itemSlug}`) ||
        (isCategory && `${PATHS.category(itemSlug)}`) ||
        '#'
      }
      className={cn(
        'overflow-hidden',
        isCategory
          ? 'w-[200px] rounded-full'
          : 'w-full rounded-lg border-b'
      )}
    >
      <LoadableImage
        src={itemImage}
        alt={itemTitle}
        containerHeight={isCategory ? 200 : 250}
        priority
        imageClassNames={`object-cover ${isCategory ? 'rounded-full' : 'rounded-lg'}`}
        containerClassNames={`duration-700 hover:scale-110 ${isCategory ? 'rounded-full' : 'rounded-lg'}`}
      />
      <span className="sr-only">{itemTitle}</span>
    </Link>
  )
}

export default SectionItemCardImage
