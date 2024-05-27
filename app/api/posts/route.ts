import { NextResponse } from 'next/server'
import { mockPosts } from '~/mockData'

export async function GET(request: Request) {
  const { searchParams } = new URL(request?.url)

  const query = searchParams.get('q')

  let currentPosts = mockPosts

  if (query) {
    currentPosts = mockPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  return NextResponse.json(currentPosts)
}

export async function POST(request: Request) {
  const body = await request.json()

  return NextResponse.json({ body })
}
