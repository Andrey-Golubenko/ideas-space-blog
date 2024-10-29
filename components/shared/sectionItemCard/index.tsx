import Link from 'next/link'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type Categories } from '@prisma/client'

import { Card, CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import { PATHS } from '~/utils/constants/constants'
import { fontPoppins } from '~/utils/constants/fonts'

interface ICategoriesSectionItemProps {
  item?: Categories
}

const SectionItemCard = ({ item }: ICategoriesSectionItemProps) => {
  const [autoAnimateRef] = useAutoAnimate()

  return (
    <Card
      ref={autoAnimateRef}
      className="flex min-h-max flex-col items-center justify-center !border-0 bg-transparent shadow-none"
    >
      <Link
        href={`${PATHS.categories}/${item?.slug}`}
        className="w-[200px] overflow-hidden rounded-full"
      >
        <LoadableImage
          src={item?.imageUrl as string}
          alt="Post image"
          containerHeight={200}
          priority
          imageClassNames="rounded-full object-cover"
          containerClassNames="rounded-full duration-700 hover:scale-110"
        />
      </Link>

      <CardHeader className="pb-4">
        <Link href={`${PATHS.categories}/${item?.slug}`}>
          <h2
            className={`
            text-outline-white line-clamp-2 w-full text-2xl font-semibold 
            ${fontPoppins.className}`}
          >
            {item?.name}
          </h2>
        </Link>
      </CardHeader>
    </Card>
  )
}

export default SectionItemCard
