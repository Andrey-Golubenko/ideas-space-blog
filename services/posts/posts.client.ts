import { type Post } from '@prisma/client'

export const fetchPosts = async (): Promise<{
  posts: Post[]
  postsCount: number
}> => {
  const response = await fetch('http://localhost:3000/api/posts', {
    next: {
      revalidate: 600 // sec
    }
  })

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
  const response = await fetch(`/api/posts?q=${search}`)

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
  const respons = await fetch(`/api/profile?q=${userId}`)

  if (!respons.ok) {
    throw new Error('Unable fetch posts! An unexpected error has occured!')
  }

  return respons.json()
}
