'use server'

import { cache } from 'react'

import { db } from '~/libs/db'
import { type Post } from '@prisma/client'
import {
  type PostsData,
  type IFetchPostsFunctionProps,
  type TDeserializedPost
} from '~/types'

export const getSinglePost = cache(
  async (slug: string): Promise<FullPost | null> => {
    try {
      const initPost = await db.post.findUnique({
        where: { id: slug },
        include: {
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true
                }
              }
            }
          }
        }
      })

      if (!initPost) return null

      const categories = initPost.categories.map((singleCategory) => {
        return {
          categoryId: singleCategory?.category?.id,
          categoryName: singleCategory?.category?.name,
          categorySlug: singleCategory?.category?.slug
        }
      })

      const post: FullPost = { ...initPost, categories }

      return post
    } catch (error) {
      console.error('Error fetching single post:', error)

      return null
    }
  }
)

export const getPostsByCategory = cache(
  async (categoryId: string): Promise<PostsData | null> => {
    try {
      const dbPosts = await db.post.findMany({
        where: {
          categories: {
            some: { categoryId }
          }
        }
      })

      const data = dbPosts?.length
        ? { posts: dbPosts, postsCount: dbPosts.length }
        : 'It seems there are no posts yet.'

      return data
    } catch (error) {
      console.error('Error fetching posts by category:', error)

      return null
    }
  }
)

export const fetchRecentPosts = async (): Promise<{
  recentPosts: Post[] | string
}> => {
  try {
    const posts = await db.post.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    })

    if (!posts || !posts.length) {
      return { recentPosts: 'It seems there are no posts yet.' }
    }

    return { recentPosts: posts }
  } catch (error) {
    console.error('Error fetching recent posts:', error)

    throw new Error('Failed to fetch recent posts')
  }
}

/**
 * Fetches a paginated and filtered list of posts from the database for tables.
 *
 * @param {Object} param - The function parameters.
 * @param {number} param.limit - The number of posts to fetch.
 * @param {number} param.offset - The starting position for fetching posts.
 * @param {string} [param.categoriesFilter] - A dot-separated list of category IDs to filter posts by.
 * @param {string} [param.publishedFilter] - A string indicating the publish status filter (`"draft"` or `"published"`).
 * @param {string} [param.searchQuery] - A search query to filter posts by title.
 * @returns {Promise<{posts: TDeserializedPost[], postsCount: number} | null>}
 * A promise that resolves to an object containing the filtered posts and the total count of posts,
 * or `null` if an error occurs.
 */
export const fetchFilteredTablePostsWithPag = async ({
  limit,
  offset,
  categoriesFilter,
  publishedFilter,
  searchQuery
}: IFetchPostsFunctionProps): Promise<{
  posts: TDeserializedPost[]
  postsCount: number
} | null> => {
  const catFilters = categoriesFilter?.split('.') || []
  const isPublishFilter = publishedFilter !== 'draft'

  try {
    const filteredPosts = await db.post.findMany({
      where: {
        title: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined,
        categories: categoriesFilter
          ? {
              some: {
                category: {
                  slug: { in: catFilters }
                }
              }
            }
          : undefined,
        published: publishedFilter ? isPublishFilter : undefined
      },
      take: limit,
      skip: offset as number,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrls: true,
        published: true,
        createdAt: true,
        author: {
          select: {
            name: true
          }
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      }
    })

    const postsCount = await db.post.count({
      where: {
        title: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined,
        categories: categoriesFilter
          ? {
              some: {
                category: {
                  slug: { in: catFilters }
                }
              }
            }
          : undefined,
        published: publishedFilter ? isPublishFilter : undefined
      }
    })

    const posts: TDeserializedPost[] = filteredPosts.map((post) => {
      const { author, categories, ...restValues } = post

      const authorName = author?.name

      const formatedCategories = categories.map((singleCategory) => {
        return {
          categoryId: singleCategory?.category?.id,
          categoryName: singleCategory?.category?.name,
          categorySlug: singleCategory?.category?.slug
        }
      })

      return {
        ...restValues,
        author: authorName,
        categories: formatedCategories
      }
    })

    return { posts, postsCount }
  } catch (error) {
    console.error('Failed to fetch filtered posts:', error)
    return null
  }
}

/**
Fetches paginated and filtered posts from the database for a simple post list.
 *
 * @param {Object} param - The function parameters.
 * @param {number} param.limit - The maximum number of posts to fetch.
 * @param {number} param.offset - The starting position for fetching posts (used for pagination).
 * @param {string} [param.categoriesFilter] - A dot-separated string of category IDs to filter posts by.
 * @param {string} [param.publishedFilter] - A string indicating the publish status filter (`"draft"` or `"published"`).
 * @param {string} [param.searchQuery] - A search query to filter posts by title (case insensitive).
 * @returns {Promise<{posts: Post[], postsCount: number} | null>}
 * A promise that resolves to an object containing the filtered posts and their total count,
 * or `null` if an error occurs.
 */
export const fetchFilteredPostsWithPag = async ({
  limit,
  offset,
  categoriesFilter,
  publishedFilter,
  searchQuery
}: IFetchPostsFunctionProps): Promise<{
  posts: Post[]
  postsCount: number
} | null> => {
  const catFilters = categoriesFilter?.split('.') || []
  const isPublishFilter = publishedFilter !== 'draft'

  try {
    const filteredPosts = await db.post.findMany({
      where: {
        title: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined,
        categories: categoriesFilter
          ? {
              some: {
                category: {
                  slug: { in: catFilters }
                }
              }
            }
          : undefined,
        published: publishedFilter ? isPublishFilter : undefined
      },
      take: limit,
      skip: offset as number,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrls: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true
          }
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      }
    })

    const postsCount = await db.post.count({
      where: {
        title: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined,
        categories: categoriesFilter
          ? {
              some: {
                category: {
                  slug: { in: catFilters }
                }
              }
            }
          : undefined,
        published: publishedFilter ? isPublishFilter : undefined
      }
    })

    const posts: Post[] = filteredPosts.map((post) => {
      const { author, categories, ...restValues } = post

      const authorId = author?.id

      const formatedCategories = categories.map((singleCategory) => {
        return {
          categoryId: singleCategory?.category?.id,
          categoryName: singleCategory?.category?.name,
          categorySlug: singleCategory?.category?.slug
        }
      })

      return {
        ...restValues,
        authorId,
        categories: formatedCategories
      }
    })

    return { posts, postsCount }
  } catch (error) {
    console.error('Failed to fetch filtered posts:', error)
    return null
  }
}
