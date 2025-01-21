import { NextRequest, NextResponse } from 'next/server'

import { fetchFilteredPostsWithPag } from '~/services/posts/posts.server'
import { POSTS_PER_PAGE } from '~/utils/constants'
import { type Post } from '@prisma/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const limit = searchParams.get('limit')
  const offset = searchParams.get('offset')
  const categoriesFilter = searchParams.get('categories')
  const publishedFilter = searchParams.get('published')
  const searchQuery = searchParams.get('q')

  const dataPostsProps = {
    limit: Number(limit) ?? POSTS_PER_PAGE,
    offset: Number(offset) ?? 0,
    categoriesFilter,
    publishedFilter,
    searchQuery
  }

  try {
    const dbPosts: {
      posts: Post[]
      postsCount: number
    } | null = await fetchFilteredPostsWithPag(dataPostsProps)

    const data = dbPosts?.posts?.length
      ? { posts: dbPosts?.posts, postsCount: dbPosts?.postsCount }
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
