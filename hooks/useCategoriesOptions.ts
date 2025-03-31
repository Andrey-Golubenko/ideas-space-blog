import { useState, useEffect } from 'react'

import useGlobalStore from '~/store'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { type IMultiSelectProps } from '~/types'

/**
 * Fetches category options for selection.
 *
 * Allows retrieving a list of categories with a selectable value type (ID or slug).
 *
 * @param {('id' | 'slug')} returnMode - Determines which value to use for the `value` field.
 *    - `'id'` – `value` will be `category.id`.
 *    - `'slug'` – `value` will be `category.slug`.
 *
 * @returns {{
 *   categoriesOptions: IMultiSelectProps['options']
 * }} Object containing an array of category options.
 */
export const useCategoriesOptions = (
  returnMode: 'id' | 'slug',
  refreshParam?: string | null
) => {
  const { truncatedCategories, getTruncatedCategories } = useGlobalStore(
    (state) => ({
      truncatedCategories: state.truncatedCategories,
      getTruncatedCategories: state.getTruncatedCategories
    })
  )

  const [categoriesOptions, setCategoriesOptions] = useState<
    IMultiSelectProps['options']
  >([])

  const returnCatId: boolean = returnMode === 'id'

  useEffect(() => {
    getTruncatedCategories()
  }, [refreshParam, returnCatId])

  useEffect(() => {
    const options = (truncatedCategories || [])?.map((category) => ({
      label: toUpperCaseFirstChar(category?.name),
      value: returnCatId ? category?.id : category?.slug
    }))

    setCategoriesOptions(options)
  }, [truncatedCategories, returnCatId])

  return { categoriesOptions }
}
