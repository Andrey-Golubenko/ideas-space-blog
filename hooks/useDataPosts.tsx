import { useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useGlobalStore from '~/store'
import { type IFetchPostsFunctionProps } from '~/types'

export const useDataPosts = ({
  page,
  limit,
  categoriesFilter,
  statusFilter,
  authorFilter,
  searchQuery
}: IFetchPostsFunctionProps) => {
  const { getFilteredPostsWithPag } = useGlobalStore((state) => {
    return {
      getFilteredPostsWithPag: state.getFilteredPostsWithPag
    }
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = page ? (page - 1) * limit : limit

  useEffect(() => {
    const fetchPosts = async () => {
      getFilteredPostsWithPag({
        limit,
        offset,
        categoriesFilter,
        statusFilter,
        authorFilter,
        searchQuery: debouncedSearchQuery
      })
    }

    fetchPosts()
  }, [
    authorFilter,
    categoriesFilter,
    debouncedSearchQuery,
    limit,
    offset,
    statusFilter,
    getFilteredPostsWithPag
  ])
}
