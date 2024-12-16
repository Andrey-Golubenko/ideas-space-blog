import { useCallback, useEffect } from 'react'

import useStore from '~/store'
import { type IFetchDataFunctionProps } from '~/types'

export const useDataTableCategories = ({
  currentPage,
  limit,
  searchQuery
}: IFetchDataFunctionProps) => {
  const [getDataTableCategories] = useStore((state) => {
    return [state.getDataTableCategories]
  })

  const offset = currentPage ? (currentPage - 1) * limit : 10

  const fetchCategories = useCallback(async () => {
    await getDataTableCategories({
      limit,
      offset,
      searchQuery
    })
  }, [getDataTableCategories, limit, offset, searchQuery])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])
}
