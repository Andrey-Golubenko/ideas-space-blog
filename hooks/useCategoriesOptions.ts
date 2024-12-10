import { useState, useEffect, useCallback } from 'react'

import useStore from '~/store'
import { fetchAllCategoriesTruncated } from '~/services/categories'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { type IMultiSelectProps, type TTRuncatedCategories } from '~/types'

export const useCategoriesOptions = () => {
  const [categoriesOptions, setCategoriesOptions] = useState<
    IMultiSelectProps['options']
  >([])

  const [categories] = useStore((state) => {
    return [state.categories]
  })

  const runFetchCategories = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    if (!categories?.length) {
      runFetchCategories()
    } else {
      const options = categories?.map((category) => {
        const categoryName = toUpperCaseFirstChar(category?.name)

        return {
          value: category?.id,
          label: categoryName
        }
      })

      setCategoriesOptions(options)
    }
  }, [runFetchCategories])

  return { categoriesOptions }
}
