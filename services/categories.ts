'use server'

import { db } from '~/libs/db'
import { DEFAULT_CATEGORY } from '~/utils/constants'

export const fetchAllCategories = async () => {
  try {
    const categories = await db.categories.findMany({
      where: {
        slug: {
          not: `${DEFAULT_CATEGORY.slug}`
        }
      }
    })

    return { categories, categoriesCount: categories?.length }
  } catch (error) {
    throw new Error('Failed to get categories!')
  }
}

export const fetchSingleCategoryById = async (categoryId: string) => {
  try {
    const category = db.categories.findUnique({
      where: {
        id: categoryId
      }
    })

    return await category
  } catch (error) {
    throw new Error('Failed to fetch category!')
  }
}

export const fetchSingleCategoryBySlug = async (categorySlug: string) => {
  try {
    const category = db.categories.findUnique({
      where: {
        slug: categorySlug
      }
    })

    return await category
  } catch (error) {
    throw new Error('Failed to get category!')
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
    throw new Error('Failed to get categories!')
  }
}

export const fetchUncategorizedCategory = async () => {
  try {
    const uncategorizedCategory = await db.categories.findUnique({
      where: {
        slug: `${DEFAULT_CATEGORY.slug}`
      }
    })

    return uncategorizedCategory
  } catch (error) {
    throw new Error(`Failed to fetch '${DEFAULT_CATEGORY.name}' category!`)
  }
}

export const fetchPostsIdsInCategory = async (categoryId: string) => {
  try {
    const postsInCategory = await db.postCategories.findMany({
      where: {
        categoryId
      },
      select: {
        postId: true
      }
    })

    return postsInCategory
  } catch (error) {
    throw new Error('Failed to fetch post IDs for category!')
  }
}
