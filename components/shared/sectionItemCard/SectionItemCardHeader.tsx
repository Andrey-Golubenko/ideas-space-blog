'use client'

import Link from 'next/link'

import { CardHeader } from '~/components/ui/card'
import PostMeta from '~/components/posts/PostMeta'
import { PATHS } from '~/utils/constants'
import { fontPoppins } from '~/utils/constants/fonts'
import { type TItemType } from '~/types'

interface ISectionItemCardHeaderProps {
  itemSlug: string
  itemTitle: string
  authorId?: string
  itemCreatedAt?: string
  itemType: TItemType
}

const SectionItemCardHeader = ({
  itemSlug,
  itemTitle,
  authorId,
  itemCreatedAt,
  itemType
}: ISectionItemCardHeaderProps) => {
  const { isPost, isCategory } = itemType

  return (
    <CardHeader className="w-full pb-8">
      <Link
        href={
          (isPost && `${PATHS.blog}/${itemSlug}`) ||
          (isCategory && `${PATHS.categories}/${itemSlug}`) ||
          '#'
        }
      >
        <h2
          className={`line-clamp-2 w-full text-2xl hover:text-black/60 ${isCategory ? 'text-center' : 'text-start'} 
          ${fontPoppins.className}`}
        >
          {itemTitle}
        </h2>
      </Link>

      {isPost && authorId && itemCreatedAt && (
        <PostMeta
          authorId={authorId}
          itemCreatedAt={itemCreatedAt}
        />
      )}
    </CardHeader>
  )
}

export default SectionItemCardHeader
