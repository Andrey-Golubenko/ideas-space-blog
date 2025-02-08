'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type Categories } from '@prisma/client'

import { useItemType } from '~/hooks/useItemType'
import { useItemProps } from '~/hooks/useItemProps'
import { cn } from '~/libs/utils'
import { Card } from '~/components/ui/card'
import SectionItemCardImage from '~/components/shared/ItemSectionCard/SectionItemCardImage'
import SectionItemCardHeader from '~/components/shared/ItemSectionCard/SectionItemCardHeader'

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
      className={cn(
        'flex min-h-max flex-col items-center justify-center',
        isCategory && '!border-0 bg-transparent shadow-none'
      )}
    >
      <SectionItemCardImage
        itemSlug={itemSlug}
        itemTitle={itemTitle}
        itemImage={itemImage}
        itemType={{ isPost, isCategory }}
      />

      <SectionItemCardHeader
        itemSlug={itemSlug}
        itemTitle={itemTitle}
        authorId={authorId}
        itemCreatedAt={itemCreatedAt}
        itemType={{ isPost, isCategory }}
      />
    </Card>
  )
}

export default SectionItemCard
