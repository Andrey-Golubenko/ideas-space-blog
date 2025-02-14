import { useItemType } from '~/hooks/useItemType'
import { IMAGES_PATHS } from '~/utils/constants'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { type Categories } from '@prisma/client'
import { type TDeserializedPost, type TListItem } from '~/types'

/**
 * useListItemProps - A custom hook for extracting and structuring the properties of a given element, depending on the type of element.
 *
 * @param {TListItem} [item] - The item to extract properties from. It can be a post or a category.
 *
 * @returns {Object} An object containing:
 * - `itemImage` (`string`): The image URL of the item, or a default "no image" path if unavailable.
 * - `itemTitle` (`string`): The title or name of the item with the first character capitalized.
 * - `itemContent` (`string`): A truncated version of the item's content or description (up to 120 characters for posts).
 * - `itemSlug` (`string`): The slug or ID of the item.
 * - `authorId` (`string`): The author's ID (available only for posts).
 * - `isPublishes` (`boolean`): Indicates whether the post is published (available only for posts).
 * - `itemCreatedAt` (`string`): The creation date of the item, formatted as a locale date string in German (only for posts).
 */
export const useListItemProps = (item?: TListItem) => {
  const { isCategory, isPost } = useItemType(item)

  let itemImage = ''
  let itemTitle = ''
  let itemContent = ''
  let itemSlug = ''
  let itemCreatedAt = ''
  let authorId = ''
  let isPublishes = false

  if (isPost) {
    const post = item as TDeserializedPost

    itemImage = post?.imageUrls?.length
      ? post?.imageUrls[0]
      : IMAGES_PATHS.noImages

    itemTitle = toUpperCaseFirstChar(post?.title) ?? ''

    itemContent = post?.content
      ? `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`
      : ''

    itemSlug = post?.id ?? ''

    authorId = (post?.author as { id: string; name: string })?.id ?? ''

    isPublishes = post?.published ?? false

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
    isPublishes,
    itemCreatedAt
  }
}
