'use server'

import { cache } from 'react'

import { db } from '~/libs/db'
import { type Post } from '@prisma/client'
import {
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
  async (categoryId: string): Promise<Post[] | null> => {
    try {
      const posts = await db.post.findMany({
        where: {
          categories: {
            some: { categoryId }
          }
        }
      })

      if (!posts || !posts.length) {
        return null
      }

      return posts
    } catch (error) {
      console.error('Error fetching posts by category:', error)

      return null
    }
  }
)

export const fetchRecentPosts = async (): Promise<{
  recentPosts: Post[]
}> => {
  try {
    const posts = await db.post.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    })

    if (!posts || !posts.length) {
      return { recentPosts: [] }
    }

    return { recentPosts: posts }
  } catch (error) {
    console.error('Error fetching recent posts:', error)

    throw new Error('Failed to fetch recent posts')
  }
}

export const fetchCurrentPageOfFilteredPosts = async ({
  limit,
  offset,
  categoriesFilter,
  publishedFilter,
  searchQuery
}: IFetchPostsFunctionProps) => {
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
                  id: { in: catFilters }
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
                name: true
              }
            }
          }
        }
      }
    })

    const posts: TDeserializedPost[] = filteredPosts.map((post) => {
      const { author, categories, ...restValues } = post

      const authorName = author?.name

      const formatedCategories = categories.map((singleCategory) => {
        return {
          categoryId: singleCategory?.category?.id,
          categoryName: singleCategory?.category?.name
        }
      })

      return {
        ...restValues,
        author: authorName,
        categories: formatedCategories
      }
    })

    return posts
  } catch (error) {
    console.error('Failed to fetch filtered posts:', error)
    return null
  }
}
