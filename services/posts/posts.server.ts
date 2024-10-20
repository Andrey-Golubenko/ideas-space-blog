'use server'

import { db } from '~/libs/db'

export const getSinglePost = async (
  slug: string
): Promise<FullPost | null> => {
  try {
    const initPost = await db.post.findUnique({
      where: { id: slug },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    const categories = initPost?.categories?.map((singleCategory) => {
      return singleCategory?.category
    })

    const post: FullPost = { ...initPost, categories }

    return post
  } catch {
    return null
  }
}

export const getPostsByCategory = async (categoryId: string) => {
  try {
    const posts = await db.postCategories.findMany({
      where: {
        categoryId
      },
      include: {
        post: true
      }
    })

    return posts
  } catch {
    return null
  }
}
