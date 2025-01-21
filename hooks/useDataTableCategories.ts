import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useStore from '~/store'
import { ITEMS_PER_PAGE_DEFAULT_LIMIT } from '~/utils/constants'
import { type IFetchDataFunctionProps } from '~/types'

export const useDataTableCategories = ({
  currentPage,
  limit,
  searchQuery
}: IFetchDataFunctionProps) => {
  const [getDataTableCategories] = useStore((state) => {
    return [state.getDataTableCategories]
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = currentPage
    ? (currentPage - 1) * limit
    : ITEMS_PER_PAGE_DEFAULT_LIMIT

  const fetchCategories = useCallback(async () => {
    await getDataTableCategories({
      limit,
      offset,
      searchQuery: debouncedSearchQuery
    })
  }, [getDataTableCategories, limit, offset, debouncedSearchQuery])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])
}
