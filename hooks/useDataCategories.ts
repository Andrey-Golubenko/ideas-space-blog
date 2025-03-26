import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useGlobalStore from '~/store'
import { DEFAULT_CATEGORIES_PER_PAGE } from '~/utils/constants'
import { type IFetchDataFunctionProps } from '~/types'

export const useDataCategories = ({
  page,
  limit,
  searchQuery
}: IFetchDataFunctionProps) => {
  const { getFilteredCategoriesWithPag } = useGlobalStore((state) => {
    return {
      getFilteredCategoriesWithPag: state.getFilteredCategoriesWithPag
    }
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = page ? (page - 1) * limit : DEFAULT_CATEGORIES_PER_PAGE

  const fetchCategories = useCallback(async () => {
    await getFilteredCategoriesWithPag({
      limit,
      offset,
      searchQuery: debouncedSearchQuery
    })
  }, [getFilteredCategoriesWithPag, limit, offset, debouncedSearchQuery])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])
}
