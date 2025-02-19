import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useGlobalStore from '~/store'
import { type IFetchPostsFunctionProps } from '~/types'

export const useDataPosts = ({
  page,
  limit,
  categoriesFilter,
  publishedFilter,
  authorFilter,
  searchQuery
}: IFetchPostsFunctionProps) => {
  const { getFilteredPostsWithPag } = useGlobalStore((state) => {
    return { getFilteredPostsWithPag: state.getFilteredPostsWithPag }
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = page ? (page - 1) * limit : limit

  const fetchPosts = useCallback(async () => {
    await getFilteredPostsWithPag({
      limit,
      offset,
      categoriesFilter,
      publishedFilter,
      authorFilter,
      searchQuery: debouncedSearchQuery
    })
  }, [
    getFilteredPostsWithPag,
    limit,
    offset,
    categoriesFilter,
    publishedFilter,
    authorFilter,
    debouncedSearchQuery
  ])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
}
