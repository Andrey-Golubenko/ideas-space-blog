import { NextRequest, NextResponse } from 'next/server'

import { getSinglePost } from '~/services/posts/posts.server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request?.url)

  const query = searchParams?.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Missing query parameter' },
      { status: 400 }
    )
  }

  if (query) {
    try {
      const singlePost: FullPost | null = await getSinglePost(query)

      return NextResponse.json(singlePost)
    } catch (error) {
      console.error('Error :', error)

      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
}
