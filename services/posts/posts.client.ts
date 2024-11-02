import { type Post } from '@prisma/client'

export const fetchPosts = async (): Promise<{
  posts: Post[]
  postsCount: number
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`,
    {
      next: {
        revalidate: 600 // sec
      }
    }
  )

  if (!response.ok) {
    throw new Error('Unable fetch posts!')
  }

  return response.json()
}

export const fetchPostsBySearch = async (
  search: string
): Promise<{
  posts: Post[]
  postsCount: number
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/posts?q=${search}`
  )

  if (!response.ok)
    throw new Error('Unable fetch posts! An unexpected error has occured!')

  return response.json()
}

export const fetchPostsByUserId = async (
  userId: string
): Promise<{
  posts: Post[]
  postsCount: number
}> => {
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/profile?q=${userId}`
  )

  if (!respons.ok) {
    throw new Error('Unable fetch posts! An unexpected error has occured!')
  }

  return respons.json()
}

export const fetchSinglePostById = async (
  postId: string
): Promise<FullPost> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/single-post?q=${postId}`
    )

    if (!response?.ok) {
      throw new Error(
        'Failed to fetch the post!  An unexpected error has occurred!'
      )
    }

    const post = await response.json()

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
