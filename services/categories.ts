'use server'

import { db } from '~/libs/db'

export const fetchAllCategories = async () => {
  try {
    const categories = await db.categories.findMany()

    return categories
  } catch (error) {
    throw new Error('Somthing went wrong!')
  }
}

export const fetchSinglePostCategories = async (postId: string) => {
  try {
    const singlePostCategories = await db.postCategories.findMany({
      where: {
        postId
      },
      include: {
        category: true
      }
    })

    const categories = singlePostCategories.map((postCategory) => {
      return postCategory.category
    })

    return categories
  } catch (error) {
    throw new Error('Somthing went wrong!')
  }
}
