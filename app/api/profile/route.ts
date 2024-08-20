import { type Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request?.url)

  const userId = searchParams.get('q')

  let posts: Post[] = []

  if (userId) {
    try {
      posts = await db.post.findMany({
        where: {
          authorId: userId
        }
      })
    } catch {
      throw new Error('Somthing went wrong!')
    }
  }

  const data = { posts, postsCount: posts.length }

  return NextResponse.json(data)
}
