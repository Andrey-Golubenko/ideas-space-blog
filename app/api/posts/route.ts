import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'
import { type Post } from '@prisma/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('q')

  try {
    const dbPosts: Post[] = await db.post.findMany({
      take: 9,
      where: query
        ? {
            OR: [
              { content: { contains: query } },
              { title: { contains: query } }
            ]
          }
        : undefined
    })

    const data = dbPosts?.length
      ? { posts: dbPosts, postsCount: dbPosts.length }
      : 'It seems there are no posts yet.'

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching posts:', error)

    return NextResponse.json(
      { error: 'Failed to fetch posts!' },
      { status: 500 }
    )
  }
}
