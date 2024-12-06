import { useState, useEffect } from 'react'
import { fetchAllCategoriesTruncated } from '~/services/categories'

export const useCategoriesOptions = () => {
  const [categoriesOptions, setCategoriesOptions] = useState<
    { value: string; label: string }[]
  >([])

  useEffect(() => {
    const runFetchCategories = async () => {
      const truncatedCategories =
        (await fetchAllCategoriesTruncated()) ?? []
      const options = truncatedCategories?.map((category) => {
        return {
          value: category?.slug,
          label: category?.name
        }
      })

      setCategoriesOptions((prev) => {
        return JSON.stringify(prev) !== JSON.stringify(options)
          ? options
          : prev
      })
    }

    runFetchCategories()
  }, [])

  return categoriesOptions
}
