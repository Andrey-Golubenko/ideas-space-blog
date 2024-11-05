import { useItemType } from '~/hooks/useItemType'
import { IMAGES_PATHS } from '~/utils/constants/constants'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'
import { type Post, type Categories } from '@prisma/client'
import { type TListItem } from '~/types/types'

export const useItemProps = (item?: TListItem) => {
  const { isCategory, isPost } = useItemType(item)

  let itemImage = ''
  let itemTitle = ''
  let itemContent = ''
  let itemSlug = ''
  let itemCreatedAt = ''
  let authorId = ''

  if (isPost) {
    const post = item as Post

    itemImage = post?.imageUrls?.length
      ? post?.imageUrls[0]
      : IMAGES_PATHS.noImages

    itemTitle = toUpperCaseFirstChar(post?.title) ?? ''

    itemContent = post?.content
      ? `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`
      : ''

    itemSlug = post?.id ?? ''

    authorId = post?.authorId ?? ''

    itemCreatedAt =
      new Date(post?.createdAt)?.toLocaleDateString('de') ?? ''
  }

  if (isCategory) {
    const category = item as Categories

    itemImage = category?.imageUrl?.length
      ? category?.imageUrl
      : IMAGES_PATHS.noImages

    itemTitle = toUpperCaseFirstChar(category?.name)

    itemContent = category?.description
      ? `${toUpperCaseFirstChar(category?.description)}`
      : ''

    itemSlug = category?.slug
  }

  return {
    itemImage,
    itemTitle,
    itemContent,
    itemSlug,
    authorId,
    itemCreatedAt
  }
}
