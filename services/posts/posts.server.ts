'use server'

import { db } from '~/libs/db'

export const getSinglePost = async (
  slug: string
): Promise<PostDTO | null> => {
  try {
    const post = await db.post.findUnique({
      where: { id: slug },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    return post
  } catch {
    return null
  }
}
