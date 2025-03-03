import * as React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ParallaxProvider } from 'react-scroll-parallax'

import BlogPageView from '~/views/BlogPageView'
import useGlobalStore from '~/store'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import { PostStatus } from '@prisma/client'

describe('Blog Page Integration Tests', () => {
  beforeEach(() => {
    vi.mock('~/hooks/usePostsFilters', () => ({
      usePostsFilters: () => ({
        searchQuery: '',
        setSearchQuery: vi.fn(),
        categoriesFilter: '',
        setCategoriesFilter: vi.fn(),
        statusFilter: '',
        setStatusFilter: vi.fn(),
        authorFilter: null,
        setAuthorFilter: vi.fn(),
        page: 1,
        setPage: vi.fn(),
        resetFilters: vi.fn(),
        isAnyFilterActive: false
      })
    }))

    vi.mock('~/hooks/useDataPosts', () => ({
      useDataPosts: vi.fn(() => ({
        data: [],
        isLoading: false
      }))
    }))

    // Mock components
    vi.mock('~/components/posts/BlogPostsFiltersBox', () => ({
      default: () => <div role="search">Blog Filters</div>
    }))

    vi.mock('~/components/posts/BlogPostsList', () => ({
      default: ({
        data,
        isLoading
      }: {
        data: Array<{ title: string }>
        isLoading: boolean
      }) => <div>{isLoading ? 'Loading...' : data[0]?.title}</div>
    }))

    vi.mock('~/components/shared/DataManagement/DataPagination', () => ({
      default: () => <nav>Pagination</nav>
    }))

    // Mock utils
    vi.mock('~/utils/helpers', () => ({
      isEmptyOrUnpublished: vi.fn().mockReturnValue(false)
    }))

    // Mock the global store
    vi.mock('~/store', () => ({
      default: vi.fn()
    }))

    // Setup mock store values
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      const mockPosts = [
        {
          id: '1',
          title: 'Test Post 1',
          content: 'Test content 1',
          status: PostStatus.PUBLISHED
        }
      ]

      return selector({
        posts: mockPosts,
        postsCount: mockPosts.length,
        isLoading: false
      })
    })

    // Reset all mocks before each test
    vi.clearAllMocks()
  })
  it('renders the blog page without crashing', () => {
    const { container } = render(
      <ParallaxProvider>
        <BlogPageView />
      </ParallaxProvider>,
      { wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' }) }
    )

    expect(container).toBeInTheDocument()
  })

  it('renders the blog page with key components', () => {
    render(
      <ParallaxProvider>
        <BlogPageView />
      </ParallaxProvider>,
      { wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' }) }
    )

    expect(screen.getAllByText('Blog Filters')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Pagination')[0]).toBeInTheDocument()
  })

  it('renders the blog page without throwing an error', () => {
    expect(() =>
      render(
        <ParallaxProvider>
          <BlogPageView />
        </ParallaxProvider>,
        { wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' }) }
      )
    ).not.toThrow()
  })

  it('renders the BlogPostsList component with posts', () => {
    render(
      <ParallaxProvider>
        <BlogPageView />
      </ParallaxProvider>,
      { wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' }) }
    )
    expect(screen.getAllByText('Test Post 1')[0]).toBeInTheDocument()
    expect(
      screen.queryByText(/no posts available/i)
    ).not.toBeInTheDocument()
  })

  it('renders the DataPagination component when posts exist', () => {
    render(
      <ParallaxProvider>
        <BlogPageView />
      </ParallaxProvider>,
      { wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' }) }
    )
    expect(screen.getAllByText('Pagination')[0]).toBeInTheDocument()
  })

  it('shows loading state when data is loading', () => {
    // Update mock store to show loading state
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        posts: [],
        postsCount: 0,
        isLoading: true
      })
    })

    render(
      <ParallaxProvider>
        <BlogPageView />
      </ParallaxProvider>,
      { wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' }) }
    )
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('shows empty state when no posts are available', () => {
    // Update mock store to show empty state
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        posts: [],
        postsCount: 0,
        isLoading: false
      })
    })

    render(
      <ParallaxProvider>
        <BlogPageView />
      </ParallaxProvider>,
      { wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' }) }
    )

    waitFor(() => {
      expect(
        screen.getByText(/unfortunately, we did not find any posts yet/i)
      ).toBeInTheDocument()
    })
  })
})
