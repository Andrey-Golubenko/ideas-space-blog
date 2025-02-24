'use server'

import { db } from '~/libs/db'
import { DEFAULT_CATEGORY } from '~/utils/constants'
import { type Categories } from '@prisma/client'
import {
  type IFetchDataFunctionProps,
  type TTRuncatedCategories
} from '~/types'

/**
 * Fetches filtered categories with pagination.
 *
 * This function retrieves a list of categories from the database, applying optional search filtering
 * and pagination constraints. It excludes the default category from the results.
 *
 * @param {Object} params - The function parameters.
 * @param {number} params.limit - The number of categories to retrieve.
 * @param {number} params.offset - The offset for pagination.
 * @param {string} [params.searchQuery] - An optional search query to filter categories by name.
 * @returns {Promise<{ categories: Categories[], categoriesCount: number } | string | null>}
 * Returns an object containing the filtered categories and their total count. If no categories are found,
 * returns a message string. If an error occurs, returns `null`.
 */
export const fetchFilteredCategoriesWithPag = async ({
  limit,
  offset,
  searchQuery
}: IFetchDataFunctionProps): Promise<
  | {
      categories: Categories[]
      categoriesCount: number
    }
  | string
  | null
> => {
  try {
    const categories: Categories[] =
      (await db.categories.findMany({
        where: {
          slug: {
            not: `${DEFAULT_CATEGORY.slug}`
          },
          name: searchQuery
            ? { contains: searchQuery, mode: 'insensitive' }
            : undefined
        },
        take: limit,
        skip: offset as number
      })) ?? []

    if (categories?.length <= 0) {
      return 'It seems there are no categories yet.'
    }

    const categoriesCount: number = await db.categories.count({
      where: {
        slug: {
          not: `${DEFAULT_CATEGORY.slug}`
        },
        name: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined
      },
      take: limit,
      skip: offset as number
    })

    return { categories, categoriesCount }
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return null
  }
}

/**
 * Fetches a list of all categories with truncated details.
 *
 * This function retrieves all categories from the database, selecting only their `id`, `name`, and `slug`.
 * It excludes the default category from the results.
 *
 * @returns {Promise<TTRuncatedCategories[] | [] | null>}
 * Returns an array of truncated category objects. If no categories are found, returns an empty array.
 * If an error occurs, returns `null`.
 */
export const fetchAllCategoriesTruncated = async (): Promise<
  TTRuncatedCategories[] | [] | null
> => {
  try {
    const categories = await db.categories.findMany({
      where: {
        slug: {
          not: `${DEFAULT_CATEGORY.slug}`
        }
      },
      select: {
        id: true,
        name: true,
        slug: true
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
    const category = await db.categories.findUnique({
      where: {
        id: categoryId
      }
    })

    return category
  } catch (error) {
    throw new Error('Failed to fetch category!')
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
