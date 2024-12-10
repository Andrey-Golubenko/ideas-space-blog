'use server'

import { db } from '~/libs/db'
import { DEFAULT_CATEGORY } from '~/utils/constants'
import { type TTRuncatedCategories } from '~/types'

export const fetchAllCategories = async (): Promise<{
  categories: {
    id: string
    name: string
    slug: string
    imageUrl: string | null
    description: string | null
  }[]
}> => {
  try {
    const categories = await db.categories.findMany({
      where: {
        slug: {
          not: `${DEFAULT_CATEGORY.slug}`
        }
      }
    })

    return { categories }
  } catch (error) {
    throw new Error('Failed to get categories!')
  }
}

export const fetchAllCategoriesTruncated = async (): Promise<
  TTRuncatedCategories[] | [] | null
> => {
  try {
    const categories = await db.categories.findMany({
      select: {
        id: true,
        name: true
      }
    })

    return categories ?? []
  } catch (error) {
    console.error('Failed to fetch categories!', error)
    return null
  }
}

export const fetchSingleCategoryById = async (
  categoryId: string
): Promise<{
  id: string
  name: string
  slug: string
  imageUrl: string | null
  description: string | null
} | null> => {
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

export const fetchSingleCategoryBySlug = async (
  categorySlug: string
): Promise<{
  id: string
  name: string
  slug: string
  imageUrl: string | null
  description: string | null
} | null> => {
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

export const fetchSinglePostCategories = async (
  postId: string
): Promise<
  {
    id: string
    name: string
    slug: string
    imageUrl: string | null
    description: string | null
  }[]
> => {
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

export const fetchUncategorizedCategory = async (): Promise<{
  id: string
  name: string
  slug: string
  imageUrl: string | null
  description: string | null
} | null> => {
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

export const fetchPostsIdsInCategory = async (
  categoryId: string
): Promise<
  {
    postId: string
  }[]
> => {
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
