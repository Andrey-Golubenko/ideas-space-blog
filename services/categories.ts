'use server'

import { cache } from 'react'

import { db } from '~/libs/db'
import { type Categories } from '@prisma/client'
import { DEFAULT_CATEGORY } from '~/utils/constants'
import {
  type IFetchDataFunctionProps,
  type TTRuncatedCategories
} from '~/types'

export const fetchAllCategories = cache(
  async (): Promise<{
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

      if (!categories || !categories?.length) {
        return { categories: [] }
      }

      return { categories }
    } catch (error) {
      throw new Error('Failed to get categories!')
    }
  }
)

export const fetchAllCategoriesTruncated = cache(
  async (): Promise<TTRuncatedCategories[] | [] | null> => {
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
)

export const fetchCurrentPageOfFilteredCategories = async ({
  limit,
  offset,
  searchQuery
}: IFetchDataFunctionProps) => {
  try {
    const filteredCategories: Categories[] = await db.categories.findMany({
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

    return filteredCategories
  } catch (error) {
    console.error('Failed to fetch filtered posts:', error)
    return null
  }
}

export const fetchSingleCategoryById = cache(
  async (
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
)

export const fetchSingleCategoryBySlug = cache(
  async (
    categorySlug: string
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
          slug: categorySlug
        }
      })

      return category
    } catch (error) {
      throw new Error('Failed to get category!')
    }
  }
)

export const fetchSinglePostCategories = cache(
  async (
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
)

export const fetchUncategorizedCategory = cache(
  async (): Promise<{
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
      throw new Error(
        `Failed to fetch '${DEFAULT_CATEGORY.name}' category!`
      )
    }
  }
)

export const fetchPostsIdsInCategory = cache(
  async (
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
)
