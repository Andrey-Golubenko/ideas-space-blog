import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'

import { PostStatus } from '@prisma/client'
import SinglePostPageView from '~/views/SinglePostPageView'
import { customRender } from '~/tests/test-utils'

describe('Single Post Page Integration Tests', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'Test content',
    imageUrls: [],
    author: 'author1',
    categories: [],
    status: PostStatus.PUBLISHED,
    createdAt: new Date()
  }

  beforeEach(() => {
    cleanup()

    vi.mock('~/services/posts/posts.server', () => ({
      getSinglePost: vi.fn().mockResolvedValue({
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        imageUrls: [],
        author: 'author1',
        categories: [],
        status: PostStatus.PUBLISHED,
        createdAt: new Date()
      })
    }))

    vi.mock('~/components/posts/SinglePost', () => ({
      default: vi.fn().mockImplementation(({ serverSinglePost }) => (
        <div data-testid="single-post">
          <h1>{serverSinglePost?.title}</h1>
          <p>{serverSinglePost?.content}</p>
        </div>
      ))
    }))

    vi.clearAllMocks()
  })

  it('renders the single post page without crashing', async () => {
    const { getByTestId } = await customRender(
      <SinglePostPageView
        postId="1"
        serverSinglePost={mockPost}
      />
    )

    expect(getByTestId('single-post')).toBeInTheDocument()
  })

  it('displays the post title and content', async () => {
    const { getByText } = await customRender(
      <SinglePostPageView
        postId="1"
        serverSinglePost={mockPost}
      />
    )

    expect(getByText('Test Post')).toBeInTheDocument()
    expect(getByText('Test content')).toBeInTheDocument()
  })

  it('handles error state', async () => {
    vi.mocked(
      (await import('~/services/posts/posts.server')).getSinglePost
    ).mockRejectedValueOnce(new Error('Error fetching post'))

    render(<SinglePostPageView postId="1" />)

    await waitFor(() => {
      expect(screen.queryByText('Test Post')).not.toBeInTheDocument()
    })
  })
})
