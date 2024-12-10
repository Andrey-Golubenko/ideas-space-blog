import { useCallback, useEffect } from 'react'

import useStore from '~/store'
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

  const offset = currentPage ? (currentPage - 1) * limit : 10

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
    fetchPosts()
  }, [fetchPosts])
}
