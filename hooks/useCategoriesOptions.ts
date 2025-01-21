import { useState, useEffect } from 'react'

import { fetchAllCategoriesTruncated } from '~/services/categories'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { type IMultiSelectProps, type TTRuncatedCategories } from '~/types'

export const useCategoriesOptions = () => {
  const [categoriesOptions, setCategoriesOptions] = useState<
    IMultiSelectProps['options']
  >([])

  useEffect(() => {
    const runFetchCategories = async () => {
      if (categoriesOptions.length > 0) return

      try {
        const truncatedCategories: TTRuncatedCategories[] =
          (await fetchAllCategoriesTruncated()) ?? []

        const options = truncatedCategories.map((category) => {
          const categoryName = toUpperCaseFirstChar(category?.name)

          return {
            value: category?.id,
            label: categoryName
          }
        })

        setCategoriesOptions(options)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    runFetchCategories()
  }, [])

  return { categoriesOptions }
}
