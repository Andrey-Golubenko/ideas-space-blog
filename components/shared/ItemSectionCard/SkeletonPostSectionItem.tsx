'use client'

import { type Post } from '@prisma/client'

import { useItemProps } from '~/hooks/useItemProps'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import SectionItemCardImage from '~/components/shared/ItemSectionCard/SectionItemCardImage'
import SectionItemCardHeader from '~/components/shared/ItemSectionCard/SectionItemCardHeader'
import PostMeta from '~/components/posts/PostMeta'

interface ISkeletonPostSectionItemProps {
  item?: Post
  isLoading?: boolean
}

const SkeletonPostSectionItem = ({
  item,
  isLoading
}: ISkeletonPostSectionItemProps) => {
  const hasContent = item && !isLoading

  const { itemImage, itemTitle, itemSlug, itemCreatedAt, authorId } =
    useItemProps(item)

  return (
    <Card className="flex min-h-max flex-col items-center justify-center">
      {hasContent ? (
        <SectionItemCardImage
          itemSlug={itemSlug}
          itemTitle={itemTitle}
          itemImage={itemImage}
          itemType={{ isPost: true, isCategory: false }}
        />
      ) : (
        <Skeleton className="mb-8 h-[300px] w-full overflow-hidden" />
      )}

      {hasContent ? (
        <SectionItemCardHeader
          itemSlug={itemSlug}
          itemTitle={itemTitle}
          itemType={{ isPost: true, isCategory: false }}
        />
      ) : (
        <Skeleton className="mb-6 h-8 w-5/6" />
      )}

      {hasContent ? (
        <div className="mb-6 w-full px-6">
          <PostMeta
            authorId={authorId}
            itemCreatedAt={itemCreatedAt}
          />
        </div>
      ) : (
        <div className="!mt-4 mb-8 w-full px-6">
          <div className="mb-2 flex items-center">
            <Skeleton className="mr-2 h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mb-2 flex items-center pl-1.5">
            <Skeleton className="mr-3 h-3 w-5 " />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      )}
    </Card>
  )
}

export default SkeletonPostSectionItem
