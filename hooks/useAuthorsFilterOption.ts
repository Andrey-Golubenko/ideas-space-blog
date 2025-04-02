import { useState, useEffect } from 'react'

import { fetchAllAuthorsTruncated } from '~/services/user'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { withOfflineHandler } from '~/utils/helpers/network'
import { type TTruncatedAuthors, type IMultiSelectProps } from '~/types'

export const useAuthorsFilterOptions = () => {
  const [authorsOptions, setAuthorsOptions] = useState<
    IMultiSelectProps['options']
  >([])

  useEffect(() => {
    const runFetchAuthors = async () => {
      if (authorsOptions.length > 0) return

      try {
        const truncatedAuthors: TTruncatedAuthors[] =
          (await withOfflineHandler(fetchAllAuthorsTruncated)()) ?? []

        const options = truncatedAuthors?.map((author) => {
          const authorName = toUpperCaseFirstChar(author?.name)

          return {
            value: author?.id,
            label: authorName
          }
        })

        setAuthorsOptions(options)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    runFetchAuthors()
  }, [])

  return { authorsOptions }
}
