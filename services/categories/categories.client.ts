import {
  type TCategoriesData,
  type IFetchDataFunctionProps,
  type TTruncatedCategories
} from '~/types'

export const fetchCategories = async ({
  limit,
  offset,
  searchQuery
}: IFetchDataFunctionProps): Promise<TCategoriesData> => {
  try {
    const params = new URLSearchParams()

    if (limit !== undefined) params.append('limit', String(limit))
    if (offset !== undefined) params.append('offset', String(offset))
    if (searchQuery) params.append('q', searchQuery)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categories?${params.toString()}`,
      {
        next: {
          revalidate: 10 // sec
        }
      }
    )

    if (!response.ok) {
      throw new Error('Unable fetch categories!')
    }

    const data: TCategoriesData = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(
      (error as Error)?.message || 'An unknown error occurred!'
    )
  }
}

export const fetchCategoriesTruncated = async (): Promise<
  TTruncatedCategories[]
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/truncated-categories`,
      {
        next: {
          revalidate: 10 // sec
        }
      }
    )

    if (!response.ok) {
      console.error('Unable fetch categories!')

      return []
    }

    const data: TTruncatedCategories[] = await response.json()
    return data
  } catch (error) {
    console.error(error)

    return []
  }
}
