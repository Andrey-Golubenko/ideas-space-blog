'use server'

import { db } from '~/libs/db'
import { type Post } from '@prisma/client'

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

    if (!initPost) return null

    const categories = initPost.categories.map((singleCategory) => {
      return singleCategory.category
    })
    const post: FullPost = { ...initPost, categories }

    return post
  } catch (error) {
    console.error('Error fetching single post:', error)

    return null
  }
}

export const getPostsByCategory = async (
  categoryId: string
): Promise<Post[] | null> => {
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

export const fetchRecentPosts = async () => {
  try {
    const posts = await db.post.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    })

    if (!posts || !posts.length) {
      return null
    }

    return { recentPosts: posts, recentPostsCount: posts.length }
  } catch (error) {
    console.error('Error fetching recent posts:', error)

    throw new Error('Failed to fetch recent posts')
  }
}
