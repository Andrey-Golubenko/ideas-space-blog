import Link from 'next/link'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type Categories } from '@prisma/client'

import { useItemType } from '~/hooks/useItemType'
import { useItemProps } from '~/hooks/useItemProps'
import { Card, CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import { PATHS } from '~/utils/constants/constants'
import { fontPoppins } from '~/utils/constants/fonts'

interface ICategoriesSectionItemProps {
  item?: Categories
}

const SectionItemCard = ({ item }: ICategoriesSectionItemProps) => {
  const [autoAnimateRef] = useAutoAnimate()

  const { isPost, isCategory } = useItemType(item)

  const { itemImage, itemTitle, itemContent, itemSlug } =
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
            className={`
              text-outline-white line-clamp-2 w-full text-2xl hover:text-black/60 ${isCategory ? 'font-semibold' : 'font-bold'} 
              ${fontPoppins.className}`}
          >
            {itemTitle}
          </h2>
        </Link>
      </CardHeader>
    </Card>
  )
}

export default SectionItemCard
