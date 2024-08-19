import { type Post } from '@prisma/client'
import { db } from '~/libs/db'

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('http://localhost:3000/api/posts', {
    next: {
      revalidate: 50 // sec
    }
  })

  if (!response.ok) {
    throw new Error('Unable fetch posts!')
  }

  return response.json()
}

export const getSinglePost = async (
  slug: string
): Promise<Post | null> => {
  try {
    const post = await db.post.findFirst({
      where: { id: slug }
    })

    return post
  } catch {
    return null
  }
}

export const getPostBySearching = async (
  search: string
): Promise<Post[]> => {
  const response = await fetch(`/api/posts?q=${search}`)

  if (!response.ok)
    throw new Error('Unable fetch posts! An unexpected error has occured!')

  return response.json()
}

export const getPostsByUserId = () => {}
