import { NextRequest, NextResponse } from 'next/server'

import { fetchFilteredPostsWithPag } from '~/services/posts/posts.server'
import { DEFAULT_POSTS_PER_PAGE } from '~/utils/constants'
import {
  type IFetchPostsFunctionProps,
  type TDeserializedPost
} from '~/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const limit = searchParams.get('limit')
  const offset = searchParams.get('offset')
  const categoriesFilter = searchParams.get('categories')
  const statusFilter = searchParams.get('status')
  const authorFilter = searchParams.get('authors')
  const searchQuery = searchParams.get('q')

  const dataPostsProps: IFetchPostsFunctionProps = {
    limit: Number(limit) ?? DEFAULT_POSTS_PER_PAGE,
    offset: Number(offset) ?? 0,
    categoriesFilter,
    statusFilter,
    authorFilter,
    searchQuery
  }

  try {
    const dbPosts: {
      posts: TDeserializedPost[]
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
