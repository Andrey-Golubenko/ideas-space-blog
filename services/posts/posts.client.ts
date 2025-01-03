import { type PostsData } from '~/types'

export const fetchPosts = async (): Promise<PostsData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`,
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

export const fetchPostsBySearch = async (
  search: string
): Promise<PostsData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts?q=${search}`,
      {
        next: {
          revalidate: 60
        }
      }
    )

    if (!response.ok)
      throw new Error(
        'Unable fetch posts! An unexpected error has occurred!'
      )

    const data: PostsData = await response.json()

    return data
  } catch (error) {
    console.error(error)

    throw new Error(
      (error as Error)?.message || 'An unknown error occurred!'
    )
  }
}

export const fetchPostsByUserId = async (
  userId: string
): Promise<PostsData> => {
  try {
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/profile?q=${userId}`,
      {
        next: {
          revalidate: 600
        }
      }
    )

    if (!respons.ok) {
      throw new Error(
        'Unable fetch posts! An unexpected error has occured!'
      )
    }

    const data: PostsData = await respons.json()

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
