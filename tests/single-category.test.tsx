import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'

import { PostStatus } from '@prisma/client'
import useGlobalStore from '~/store'
import SingleCategoryPageView from '~/views/SingleCategoryPageView'

describe('SingleCategoryPageView Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cleanup()

    vi.mock('~/hooks/usePostsFilters', () => ({
      usePostsFilters: () => ({
        searchQuery: '',
        setSearchQuery: vi.fn(),
        page: 1,
        setPage: vi.fn(),
        resetFilters: vi.fn(),
        isAnyFilterActive: false
      })
    }))

    vi.mock('~/hooks/useDataCategory', () => ({
      useDataCategory: vi.fn(() => ({
        data: {
          id: 1,
          name: 'Test Category',
          description: 'Test Description',
          posts: []
        },
        isLoading: false
      }))
    }))

    // Mock components
    vi.mock('~/components/categories/SingleCategoryPostsList', () => ({
      default: ({
        data,
        isLoading
      }: {
        data: Array<{ title: string }> | undefined
        isLoading: boolean
      }) => {
        if (isLoading) {
          return <div>Loading...</div>
        }
        if (!data || data.length === 0) {
          return <div>No posts available in this category.</div>
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
        isLoading: false,
        getFilteredPostsWithPag: vi.fn().mockResolvedValue({
          posts: mockPosts,
          count: mockPosts.length
        })
      })
    })
  })

  it('renders the single category page without crashing', () => {
    const { container } = render(
      <SingleCategoryPageView categorySlug="test-category" />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(container).toBeInTheDocument()
  })

  it('shows loading state when category data is loading', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: [],
        postsCount: 0,
        isLoading: true,
        getFilteredPostsWithPag: vi
          .fn()
          .mockResolvedValue({ posts: [], count: 0 })
      })
    )

    render(<SingleCategoryPageView categorySlug="test-category" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays posts when available in category', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: [{ id: '1', title: 'Test Post 1' }],
        postsCount: 1,
        isLoading: false,
        getFilteredPostsWithPag: vi.fn().mockResolvedValue({
          posts: [{ id: '1', title: 'Test Post 1' }],
          count: 1
        })
      })
    )

    render(<SingleCategoryPageView categorySlug="test-category" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
  })

  it('shows empty state when no posts are available', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: [],
        postsCount: 0,
        isLoading: false,
        getFilteredPostsWithPag: vi
          .fn()
          .mockResolvedValue({ posts: [], count: 0 })
      })
    )

    render(<SingleCategoryPageView categorySlug="test-category" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(
      screen.getByText(/no posts available in this category/i)
    ).toBeInTheDocument()
  })

  it('renders pagination when posts exist', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: [{ id: '1', title: 'Test Post 1' }],
        postsCount: 1,
        isLoading: false,
        getFilteredPostsWithPag: vi.fn().mockResolvedValue({
          posts: [{ id: '1', title: 'Test Post 1' }],
          count: 1
        })
      })
    )

    render(<SingleCategoryPageView categorySlug="test-category" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Pagination')).toBeInTheDocument()
  })

  // Add new test for invalid slug format
  it('handles invalid slug format gracefully', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: [],
        postsCount: 0,
        isLoading: false,
        getFilteredPostsWithPag: vi
          .fn()
          .mockResolvedValue({ posts: [], count: 0 })
      })
    )

    render(<SingleCategoryPageView categorySlug="invalid@slug!" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(
      screen.getByText(/no posts available in this category/i)
    ).toBeInTheDocument()
  })
})
