import { useState, useEffect } from 'react'

import { fetchAllCategoriesTruncated } from '~/services/categories'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { type IMultiSelectProps, type TTruncatedCategories } from '~/types'

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
export const useCategoriesOptions = (returnMode: 'id' | 'slug') => {
  const [categoriesOptions, setCategoriesOptions] = useState<
    IMultiSelectProps['options']
  >([])

  const returnCatId: boolean = returnMode === 'id'

  useEffect(() => {
    const runFetchCategories = async () => {
      if (categoriesOptions.length > 0) return

      try {
        const truncatedCategories: TTruncatedCategories[] =
          (await fetchAllCategoriesTruncated()) ?? []

        const options = truncatedCategories.map((category) => {
          const categoryName = toUpperCaseFirstChar(category?.name)

          return {
            label: categoryName,
            value: returnCatId ? category?.id : category?.slug
          }
        })

        setCategoriesOptions(options)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    runFetchCategories()
  }, [returnMode])

  return { categoriesOptions }
}
