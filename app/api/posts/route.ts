import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'
import { type Post } from '@prisma/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('q')

  try {
    const posts: Post[] = await db.post.findMany({
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

    if (posts?.length === 0) {
      return NextResponse.json(
        { error: 'Posts not found' },
        { status: 404 }
      )
    }

    const data = { posts, postsCount: posts.length }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching posts:', error)

    return NextResponse.json(
      { error: 'Failed to fetch posts!' },
      { status: 500 }
    )
  }
}
