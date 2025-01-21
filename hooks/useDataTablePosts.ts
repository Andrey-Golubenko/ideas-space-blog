import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useStore from '~/store'
import { ITEMS_PER_PAGE_DEFAULT_LIMIT } from '~/utils/constants'
import { type IFetchPostsFunctionProps } from '~/types'

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

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = currentPage
    ? (currentPage - 1) * limit
    : ITEMS_PER_PAGE_DEFAULT_LIMIT

  const fetchPosts = useCallback(async () => {
    await getDataTablePosts({
      limit,
      offset,
      searchQuery: debouncedSearchQuery,
      categoriesFilter,
      publishedFilter
    })
  }, [
    categoriesFilter,
    debouncedSearchQuery,
    getDataTablePosts,
    limit,
    offset,
    publishedFilter
  ])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
}
