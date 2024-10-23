'use client'

import { Card } from '~/components/ui/card'
import ItemCardHeader from '~/components/shared/ItemCard/ItemCardHeader'
import ItemCardContent from '~/components/shared/ItemCard/ItemCardContent'
import ItemCardFooter from '~/components/shared/ItemCard/ItemCardFooter'
import { useItemProps } from '~/hooks/useItemProps'
import { useItemType } from '~/hooks/useItemType'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TListItem } from '~/types/types'

interface IItemCardProps {
  item: TListItem
}

const ItemCard = ({ item }: IItemCardProps) => {
  const { itemImage, itemTitle, itemContent, itemSlug } =
    useItemProps(item)

  const { isPost, isCategory } = useItemType(item)

  const [autoAnimateRef] = useAutoAnimate()

  return (
    <Card
      ref={autoAnimateRef}
      className="flex min-h-max flex-col rounded-md !border-0 shadow-md hover:rounded-t-md"
    >
      <ItemCardHeader
        itemImage={itemImage}
        itemTitle={itemTitle}
        itemSlug={itemSlug}
        itemType={{ isPost, isCategory }}
      />

      <ItemCardContent itemContent={itemContent} />

      <ItemCardFooter
        itemSlug={itemSlug}
        itemType={{ isPost, isCategory }}
      />
    </Card>
  )
}

export default ItemCard
