import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request?.url)

  const query = searchParams.get('q')

  let posts

  if (query) {
    try {
      posts = await db.post.findMany({
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
    } catch {
      throw new Error('Somthing went wrong!')
    }
  } else {
    try {
      posts = await db.post.findMany({
        take: 9
      })
    } catch {
      throw new Error('Somthing went wrong!')
    }
  }

  return NextResponse.json(posts)
}
