'use server'

import { PostStatus } from '@prisma/client'
import { db } from '~/libs/db'
import {
  type IFetchPostsFunctionProps,
  type TDeserializedPost
} from '~/types'

/**
 * @function fetchFilteredPostsWithPag
 * @description Fetches paginated and filtered posts from the database for a post list and a post table.
 *
 * @param {Object} param - The function parameters.
 * @param {number} param.limit - The maximum number of posts to fetch.
 * @param {number} param.offset - The starting position for fetching posts (used for pagination).
 * @param {string} [param.categoriesFilter] - A dot-separated string of category IDs to filter posts by.
 * @param {string} [param.authFilter] - A dot-separated string of author IDs to filter posts by.
 * @param {string} [param.statusFilter] - A string indicating the publish status filter (`"draft"` or `"published"`).
 * @param {string} [param.searchQuery] - A search query to filter posts by title (case insensitive).
 * @returns {Promise<{posts: TDeserializedPost[], postsCount: number} | null>}
 * A promise that resolves to an object containing the filtered posts and their total count,
 * or `null` if an error occurs.
 */
export const fetchFilteredPostsWithPag = async ({
  limit,
  offset,
  categoriesFilter,
  statusFilter,
  authorFilter,
  searchQuery
}: IFetchPostsFunctionProps): Promise<{
  posts: TDeserializedPost[]
  postsCount: number
} | null> => {
  const catFilters = categoriesFilter?.split('.')
  const authFilters = authorFilter?.split('.')
  const statFilters = statusFilter
    ?.split('.')
    .map((filter) => filter.toUpperCase())

  try {
    const dbPosts = await db.post.findMany({
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
        status: statusFilter
          ? { in: statFilters as [PostStatus] }
          : PostStatus.PUBLISHED,
        authorId: authorFilter ? { in: authFilters } : undefined
      },
      take: limit,
      skip: offset as number,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrls: true,
        status: true,
        createdAt: true,
        author: {
          select: {
            id: true,
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

    if (dbPosts?.length <= 0) {
      return { posts: [], postsCount: 0 }
    }

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
        status: statusFilter
          ? { in: statFilters as [PostStatus] }
          : PostStatus.PUBLISHED,
        authorId: authorFilter ? { in: authFilters } : undefined
      }
    })

    const posts: TDeserializedPost[] = dbPosts.map((post) => {
      const { author, categories, ...restValues } = post

      const authorData = author
        ? { id: author.id, name: author.name || '' }
        : null

      const formattedCategories = categories.map((singleCategory) => {
        return {
          categoryId: singleCategory?.category?.id,
          categoryName: singleCategory?.category?.name,
          categorySlug: singleCategory?.category?.slug
        }
      })

      return {
        ...restValues,
        author: authorData,
        categories: formattedCategories
      }
    })

    return { posts, postsCount }
  } catch (error) {
    console.error('Failed to fetch filtered posts:', error)
    return null
  }
}

export const getSinglePost = async (
  slug: string
): Promise<FullPost | null> => {
  try {
    const dbPost = await db.post.findUnique({
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

    if (!dbPost) return null

    const categories = dbPost.categories.map((singleCategory) => {
      return {
        categoryId: singleCategory?.category?.id,
        categoryName: singleCategory?.category?.name,
        categorySlug: singleCategory?.category?.slug
      }
    })

    const post: FullPost = { ...dbPost, categories }

    return post
  } catch (error) {
    console.error('Error fetching single post:', error)

    return null
  }
}

export const fetchRecentPosts = async (): Promise<{
  recentPosts: TDeserializedPost[] | string
}> => {
  try {
    const dbPosts = await db.post.findMany({
      where: {
        status: PostStatus.PUBLISHED
      },
      take: 3,
      select: {
        id: true,
        title: true,
        content: true,
        imageUrls: true,
        status: true,
        createdAt: true,
        author: {
          select: {
            id: true,
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
      },
      orderBy: { createdAt: 'desc' }
    })

    if (!dbPosts || !dbPosts.length) {
      return { recentPosts: 'It seems there are no posts yet.' }
    }

    const deserializedPosts: TDeserializedPost[] = dbPosts.map((post) => {
      return {
        ...post,
        author: post.author
          ? { id: post.author.id, name: post.author.name || '' }
          : null,
        categories: post.categories.map((category) => {
          return {
            categoryId: category.category.id,
            categoryName: category.category.name,
            categorySlug: category.category.slug
          }
        })
      }
    })
    return { recentPosts: deserializedPosts }
  } catch (error) {
    console.error('Error fetching recent posts:', error)

    return { recentPosts: 'It seems there are no posts yet.' }
  }
}
