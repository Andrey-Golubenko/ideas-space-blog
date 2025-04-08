'use server'

import { db } from '~/libs/db'
import { DEFAULT_CATEGORY } from '~/utils/constants'
import { type Categories } from '@prisma/client'
import {
  type IFetchDataFunctionProps,
  type TTruncatedCategories
} from '~/types'

/**
 * @server-function - Fetches filtered categories with pagination.
 *
 * This function retrieves a list of categories from the database, applying optional search filtering
 * and pagination constraints. It excludes the default category from the results.
 *
 * @param {Object} params - The function parameters.
 * @param {number} params.limit - The number of categories to retrieve.
 * @param {number} params.offset - The offset for pagination.
 * @param {string} [params.searchQuery] - An optional search query to filter categories by name.
 * @returns {Promise<{ categories: Categories[], categoriesCount: number } | null>}
 * Returns an object containing the filtered categories and their total count. If an error occurs, returns `null`.
 */
export const fetchFilteredCategoriesWithPag = async ({
  limit,
  offset,
  searchQuery
}: IFetchDataFunctionProps): Promise<{
  categories: Categories[]
  categoriesCount: number
} | null> => {
  try {
    const dbCategories: Categories[] | null = await db.categories.findMany(
      {
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
      }
    )

    if (!dbCategories || dbCategories?.length <= 0) {
      return { categories: [], categoriesCount: 0 }
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

    return { categories: dbCategories, categoriesCount }
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return null
  }
}

/**
 * @server-function - Fetches a list of all categories with truncated details.
 *
 * This function retrieves all categories from the database, selecting only their `id`, `name`, and `slug`.
 * It excludes the default category from the results.
 *
 * @returns {Promise<TTruncatedCategories[] | [] | null>}
 * Returns an array of truncated category objects. If no categories are found, returns an empty array.
 * If an error occurs, returns `null`.
 */
export const fetchCategoriesTruncated = async (): Promise<
  TTruncatedCategories[] | [] | null
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

/**
 * @server-function - Fetches a single category by its unique identifier.
 *
 * @param {string} categoryId - The unique ID of the category to fetch.
 * @returns {Promise<{ id: string, name: string, slug: string, imageUrl: string | null, description: string | null } | null>}
 *   A promise that resolves to the category object if found, or null if not found or an error occurs.
 */
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
    return null
  }
}

/**
 * @server-function - Checks whether a category with the given slug exists in the database.
 *
 * @param {string} slug - The slug of the category to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the category exists, false otherwise.
 */
export const categoryExists = async (slug: string): Promise<boolean> => {
  try {
    const count = await db.categories.count({
      where: { slug }
    })

    return count > 0
  } catch (error) {
    return false
  }
}

/**
 * @server-function - Fetches the "Uncategorized" category based on a default slug.
 *
 * @returns {Promise<{ id: string, name: string, slug: string, imageUrl: string | null, description: string | null } | null>}
 *   A promise that resolves to the Uncategorized category if found, or null if not found or an error occurs.
 */
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
    return null
  }
}

/**
 * @server-function - Fetches the IDs of all posts associated with the specified category.
 *
 * @param {string} categoryId - The unique identifier of the category.
 * @returns {Promise<Array<{ postId: string }> | null>}
 *   A promise that resolves to an array of objects containing the post IDs, or null if an error occurs.
 */
export const fetchCategoryPostsIds = async (
  categoryId: string
): Promise<
  | {
      postId: string
    }[]
  | null
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
    return null
  }
}
