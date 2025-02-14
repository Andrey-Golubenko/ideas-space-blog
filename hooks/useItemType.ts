import { type TItemType, type TListItem } from '~/types'

/**
 * useItemType - A custom hook to determine the type of a given item.
 *
 * @param {TListItem} [item] - The item to be checked, which can be of various types.
 *
 * @returns {Object} An object containing:
 * - `isPost` (`boolean`): Indicates whether the item is a post (determined by the presence of a `title` property).
 * - `isCategory` (`boolean`): Indicates whether the item is a category (determined by the presence of a `name` property).
 */
export const useItemType = (item?: TListItem): TItemType => {
  const isPost: boolean = (item && 'title' in item) || false
  const isCategory: boolean = (item && 'name' in item) || false

  return { isCategory, isPost }
}
