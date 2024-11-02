import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'
import { type Post } from '@prisma/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request?.url)

  const query = searchParams.get('q')

  let posts: Post[] = []

  if (query) {
    try {
      posts = await db.post.findMany({
        take: 9,
        where: {
          OR: [
            {
              content: {
                contains: query
              }
            },
            {
              title: {
                contains: query
              }
            }
          ]
        }
      })
    } catch (error) {
      console.error('Error :', error)

      throw new Error('Failed to fetch posts!')
    }
  } else {
    try {
      posts = await db.post.findMany({
        take: 9
      })
    } catch (error) {
      console.error('Error :', error)

      throw new Error('Somthing went wrong!')
    }
  }

  const data = { posts, postsCount: posts?.length }

  return NextResponse.json(data)
}
