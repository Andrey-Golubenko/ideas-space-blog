import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'

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
      const initPost = await db.post.findUnique({
        where: { id: query },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      })

      if (!initPost) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }

      const categories = initPost?.categories?.map((singleCategory) => {
        return singleCategory?.category
      })

      const singlePost: FullPost = { ...initPost, categories }

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
