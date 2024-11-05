import Link from 'next/link'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type Categories } from '@prisma/client'

import { Card, CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import PostMeta from '~/components/posts/PostMeta'
import { useItemType } from '~/hooks/useItemType'
import { useItemProps } from '~/hooks/useItemProps'
import { PATHS } from '~/utils/constants/constants'
import { fontPoppins } from '~/utils/constants/fonts'

interface ICategoriesSectionItemProps {
  item?: Categories
}

const SectionItemCard = ({ item }: ICategoriesSectionItemProps) => {
  const [autoAnimateRef] = useAutoAnimate()

  const { isPost, isCategory } = useItemType(item)

  const { itemImage, itemTitle, itemSlug, authorId, itemCreatedAt } =
    useItemProps(item)

  return (
    <Card
      ref={autoAnimateRef}
      className={`flex min-h-max flex-col items-center justify-center ${isCategory ? '!border-0 bg-transparent shadow-none' : ''}`}
    >
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

      <CardHeader className="pb-4">
        <Link
          href={
            (isPost && `${PATHS.blog}/${itemSlug}`) ||
            (isCategory && `${PATHS.categories}/${itemSlug}`) ||
            '#'
          }
        >
          <h2
            className={`line-clamp-2 w-full text-2xl hover:text-black/60 ${isCategory ? 'text-center' : 'text-start font-bold'} 
              ${fontPoppins.className}`}
          >
            {itemTitle}
          </h2>
        </Link>

        {isPost && (
          <PostMeta
            authorId={authorId}
            itemCreatedAt={itemCreatedAt}
          />
        )}
      </CardHeader>
    </Card>
  )
}

export default SectionItemCard
