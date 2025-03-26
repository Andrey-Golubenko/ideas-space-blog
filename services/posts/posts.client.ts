import { notFound } from 'next/navigation'
import { IFetchPostsFunctionProps, type TPostsData } from '~/types'

export const fetchPosts = async ({
  limit,
  offset,
  categoriesFilter,
  statusFilter,
  authorFilter,
  searchQuery
}: IFetchPostsFunctionProps): Promise<TPostsData> => {
  try {
    const params = new URLSearchParams()

    if (limit !== undefined) params.append('limit', String(limit))
    if (offset !== undefined) params.append('offset', String(offset))
    if (categoriesFilter) params.append('categories', categoriesFilter)
    if (statusFilter) params.append('status', statusFilter)
    if (authorFilter) params.append('authors', authorFilter)
    if (searchQuery) params.append('q', searchQuery)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts?${params.toString()}`,
      {
        next: {
          revalidate: 10 // sec
        }
      }
    )

    if (!response.ok) {
      throw new Error('Unable fetch posts!')
    }

    const data: TPostsData = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(
      (error as Error)?.message || 'An unknown error occurred!'
    )
  }
}

export const fetchSinglePostById = async (
  postId: string
): Promise<FullPost | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/single-post?q=${postId}`,
      {
        next: {
          revalidate: 10
        }
      }
    )

    const post: FullPost = await response.json()

    return post
  } catch (error) {
    console.error(error)
    return null
  }
}
