'use client'

import { Card } from '~/components/ui/card'
import ItemCardHeader from '~/components/ItemCard/ItemCardHeader'
import ItemCardContent from '~/components/ItemCard/ItemCardContent'
import ItemCardFooter from '~/components/ItemCard/ItemCardFooter'
import { useItemProps } from '~/hooks/useItemProps'
import { useItemType } from '~/hooks/useItemType'
import { TListItem } from '~/types/types'

interface IItemCardProps {
  item: TListItem
}

const ItemCard = ({ item }: IItemCardProps) => {
  const { itemImage, itemTitle, itemContent } = useItemProps(item)
  const { isPost, isCategory } = useItemType(item)

  return (
    <Card className="flex min-h-max flex-col rounded-md !border-0 shadow-md hover:rounded-t-md">
      <ItemCardHeader
        itemImage={itemImage}
        itemTitle={itemTitle}
        itemId={item?.id}
        itemType={{ isPost, isCategory }}
      />

      <ItemCardContent itemContent={itemContent} />

      <ItemCardFooter
        itemId={item?.id}
        itemType={{ isPost, isCategory }}
      />
    </Card>
  )
}

export default ItemCard
