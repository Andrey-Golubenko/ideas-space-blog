import { IFetchPostsFunctionProps, type PostsData } from '~/types'

export const fetchPosts = async ({
  limit,
  offset,
  categoriesFilter,
  publishedFilter,
  authorFilter,
  searchQuery
}: IFetchPostsFunctionProps): Promise<PostsData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts?limit=${limit}&offset=${offset}&categories=${categoriesFilter}&published=${publishedFilter}&authors=${authorFilter}&q=${searchQuery}`,
      {
        next: {
          revalidate: 60 // sec
        }
      }
    )

    if (!response.ok) {
      throw new Error('Unable fetch posts!')
    }

    const data: PostsData = await response.json()

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
): Promise<FullPost> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/single-post?q=${postId}`,
      {
        next: {
          revalidate: 600
        }
      }
    )

    if (!response?.ok) {
      throw new Error(
        'Failed to fetch the post!  An unexpected error has occurred!'
      )
    }

    const post: FullPost = await response.json()

    if (!post || !post?.id) {
      throw new Error('Invalid post data received!')
    }

    return post
  } catch (error) {
    console.error(error)

    throw new Error(
      (error as Error)?.message || 'An unknown error occurred!'
    )
  }
}
