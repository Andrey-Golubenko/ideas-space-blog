import * as React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'

import { cleanup } from '~/tests/test-utils'
import { PostStatus } from '@prisma/client'
import useGlobalStore from '~/store'
import BlogPageView from '~/views/BlogPageView'

describe('Blog Page Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()

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
      }) => {
        if (isLoading) {
          return <div>Loading...</div>
        }
        if (data.length === 0) {
          return <div>Unfortunately, we did not find any posts yet.</div>
        }
        return <div>{data[0].title}</div>
      }
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
  })

  it('renders the blog page without crashing', () => {
    const { container } = render(<BlogPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(container).toBeInTheDocument()
  })

  it('renders the blog page with key components', () => {
    render(<BlogPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Blog Filters')).toBeInTheDocument()
    expect(screen.getByText('Pagination')).toBeInTheDocument()
  })

  it('renders the blog page without throwing an error', () => {
    expect(() =>
      render(<BlogPageView />, {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      })
    ).not.toThrow()
  })

  it('renders the BlogPostsList component with posts', () => {
    render(<BlogPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    expect(
      screen.queryByText(/no posts available/i)
    ).not.toBeInTheDocument()
  })

  it('renders the DataPagination component when posts exist', () => {
    render(<BlogPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Pagination')).toBeInTheDocument()
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

    render(<BlogPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

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

    render(<BlogPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(
      screen.getByText(/unfortunately, we did not find any posts yet/i)
    ).toBeInTheDocument()
  })
})
