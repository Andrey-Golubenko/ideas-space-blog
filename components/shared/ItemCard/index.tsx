'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useListItemProps } from '~/hooks/useListItemProps'
import { Card } from '~/components/ui/card'
import ItemCardHeader from '~/components/shared/ItemCard/ItemCardHeader'
import ItemCardContent from '~/components/shared/ItemCard/ItemCardContent'
import ItemCardFooter from '~/components/shared/ItemCard/ItemCardFooter'
import { cn } from '~/libs/utils'
import { type TItemSize, type TItemType, type TListItem } from '~/types'

interface IItemCardProps {
  itemType?: TItemType
  itemSize?: TItemSize
  item?: TListItem
  isLoading?: boolean
}

const ItemCard = ({
  itemType,
  itemSize = {
    isRegular: true,
    isTruncated: false
  },
  item,
  isLoading
}: IItemCardProps) => {
  const [autoAnimateRef] = useAutoAnimate()

  const { itemContent, itemSlug } = useListItemProps(item)

  const hasContent = item ? item && !isLoading : false

  const isPost = itemType?.isPost
  const isCategory = itemType?.isCategory

  const { isRegular, isTruncated } = itemSize

  return (
    <Card
      ref={autoAnimateRef}
      className={cn(
        'flex min-h-max flex-col !border-0',
        isPost && 'rounded-lg shadow-md hover:rounded-t-lg',
        isCategory && isTruncated && 'bg-transparent shadow-none'
      )}
    >
      <ItemCardHeader
        hasContent={hasContent}
        item={item}
        itemType={{ isPost, isCategory }}
      />

      {isRegular && !isTruncated && (
        <>
          <ItemCardContent
            hasContent={hasContent}
            itemContent={itemContent}
            itemType={{ isPost, isCategory }}
          />

          <ItemCardFooter
            hasContent={hasContent}
            itemSlug={itemSlug}
            itemType={{ isPost, isCategory }}
          />
        </>
      )}
    </Card>
  )
}

export default ItemCard
