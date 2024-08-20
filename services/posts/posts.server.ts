'use server'

import { type Post } from '@prisma/client'
import { db } from '~/libs/db'

export const getSinglePost = async (
  slug: string
): Promise<Post | null> => {
  try {
    const post = await db.post.findUnique({
      where: { id: slug }
    })

    return post
  } catch {
    return null
  }
}
