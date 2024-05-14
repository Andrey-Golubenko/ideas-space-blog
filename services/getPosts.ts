import { IPost } from '~/types'

export const getAllPosts = async (): Promise<IPost[]> => {
  // const response = await fetch(
  //   // imitation of an error,
  //   // 'https://jsonplaceholder.typicode.com/posts222222222'
  //   'https://jsonplaceholder.typicode.com/posts',
  //   {
  //     next: {
  //       // revalidate date every minutes
  //       revalidate: 50 // sec
  //     }
  //   }
  // )

  // own API-service
  const response = await fetch('/api/posts', {
    next: {
      revalidate: 50 // sec
    }
  })

  if (!response.ok)
    throw new Error('Unable fetch posts! An unexpected error has occured!')

  return response.json()
}

export const getPostBySearch = async (
  search: string
): Promise<IPost[]> => {
  // const response = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts?q=${search}`
  // )

  // own API-service
  const response = await fetch(`/api/posts?q=${search}`)

  if (!response.ok)
    throw new Error('Unable fetch posts! An unexpected error has occured!')

  return response.json()
}

export async function getSinglePost(slug: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${slug}`,
    {
      next: {
        revalidate: 60 // sec
      }
    }
  )

  return response.json()
}
