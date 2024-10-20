import { TListItem } from '~/types/types'

export const useItemType = (item?: TListItem) => {
  const isPost: boolean = (item && 'title' in item) || false
  const isCategory: boolean = (item && 'name' in item) || false

  return { isCategory, isPost }
}
