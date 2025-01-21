import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useStore from '~/store'
import { POSTS_PER_PAGE } from '~/utils/constants'
import { type IFetchPostsFunctionProps } from '~/types'

export const useDataPosts = ({
  page,
  limit,
  categoriesFilter,
  publishedFilter,
  searchQuery
}: IFetchPostsFunctionProps) => {
  const [getFilteredPostsWithPag] = useStore((state) => {
    return [state.getFilteredPostsWithPag]
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = page ? (page - 1) * limit : POSTS_PER_PAGE

  const fetchPosts = useCallback(async () => {
    await getFilteredPostsWithPag({
      limit,
      offset,
      categoriesFilter,
      publishedFilter,
      searchQuery: debouncedSearchQuery
    })
  }, [
    limit,
    offset,
    categoriesFilter,
    debouncedSearchQuery,
    publishedFilter,
    getFilteredPostsWithPag
  ])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
}
