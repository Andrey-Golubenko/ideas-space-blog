import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/libs/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request?.url)

  const query = searchParams?.get('q')

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

      const categories = initPost?.categories?.map((singleCategory) => {
        return singleCategory?.category
      })

      const singlePost: FullPost = { ...initPost, categories }

      return NextResponse.json(singlePost)
    } catch (error) {
      console.error('Error :', error)

      throw new Error('Faild to fetch the post!')
    }
  }
}
