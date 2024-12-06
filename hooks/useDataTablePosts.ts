import { useCallback, useEffect, useState } from 'react'

import useStore from '~/store'
import { fetchAllCategoriesTruncated } from '~/services/categories'
import {
  type IFetchPostsFunctionProps,
  type TTRuncatedCategories
} from '~/types'

export const useDataTablePosts = ({
  currentPage,
  limit,
  categoriesFilter,
  publishedFilter,
  searchQuery
}: IFetchPostsFunctionProps) => {
  const [getDataTablePosts] = useStore((state) => {
    return [state.getDataTablePosts]
  })

  const [categoriesOptions, setCategoriesOptions] = useState<
    { value: string; label: string }[]
  >([])

  const offset = currentPage ? (currentPage - 1) * limit : 10

  const runFetchCategories = useCallback(async () => {
    if (categoriesOptions.length > 0) return

    try {
      const truncatedCategories: TTRuncatedCategories[] =
        (await fetchAllCategoriesTruncated()) ?? []

      const options = truncatedCategories.map((category) => {
        return {
          value: category.slug,
          label: category.name
        }
      })

      setCategoriesOptions(options)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [categoriesOptions])

  const fetchPosts = useCallback(async () => {
    await getDataTablePosts({
      limit,
      offset,
      searchQuery,
      categoriesFilter,
      publishedFilter
    })
  }, [
    getDataTablePosts,
    limit,
    offset,
    searchQuery,
    categoriesFilter,
    publishedFilter
  ])

  useEffect(() => {
    runFetchCategories()
  }, [runFetchCategories])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return {
    categoriesOptions
  }
}
