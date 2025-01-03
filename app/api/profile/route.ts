import { type Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('q')

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing query parameter: userId' },
      { status: 400 }
    )
  }

  try {
    const dbPosts: Post[] = await db.post.findMany({
      where: {
        authorId: userId
      }
    })

    const data = dbPosts?.length
      ? { posts: dbPosts, postsCount: dbPosts.length }
      : 'It seems there are no posts yet.'

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching posts:', error)

    return NextResponse.json(
      { error: 'Failed to fetch posts due to a server error' },
      { status: 500 }
    )
  }
}
