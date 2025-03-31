import * as React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'

import { PostStatus } from '@prisma/client'
import { cleanup } from '~/tests/test-utils'
import useGlobalStore from '~/store'
import AdminPostsPageView from '~/views/AdminPostsPageView'

describe('Admin Posts Page Integration Tests', () => {
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
      useDataPosts: vi.fn()
    }))

    // Mock components
    vi.mock(
      '~/components/admin/AdminPosts/PostsTable/PostsTableFiltersBox',
      () => ({
        default: () => <div role="search">Admin Posts Filters</div>
      })
    )

    vi.mock('~/components/ui/table/DataTable', () => ({
      default: ({
        data,
        totalItems
      }: {
        data: Array<{ title: string }>
        totalItems: number
      }) => {
        if (data.length === 0) {
          return <div>No posts found</div>
        }
        return <div>Posts Table with {totalItems} items</div>
      }
    }))

    vi.mock('~/components/ui/table/DataTableSkeleton', () => ({
      DataTableSkeleton: () => <div>Loading Table...</div>
    }))

    vi.mock('~/components/shared/AddNewItemButton', () => ({
      default: () => (
        <a
          type="button"
          href="/admin/admin-posts/new-post"
        >
          Add New
        </a>
      )
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
          title: 'Admin Test Post',
          content: 'Test content',
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

  it('renders the admin posts page without crashing', () => {
    const { container } = render(
      <AdminPostsPageView searchParamsKey="test" />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(container).toBeInTheDocument()
  })

  it('renders the admin posts page with key components', () => {
    render(<AdminPostsPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('Admin Posts Filters')).toBeInTheDocument()
    expect(screen.getByText('Add New')).toBeInTheDocument()
  })

  it('renders posts management page header', () => {
    render(<AdminPostsPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('Manage posts')).toBeInTheDocument()
  })

  it('displays add new post button', () => {
    render(<AdminPostsPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    const addButton = screen.getByText('Add New')
    expect(addButton).toBeInTheDocument()
    expect(addButton).toHaveAttribute(
      'href',
      expect.stringContaining('/admin/admin-posts/new-post')
    )
  })

  it('shows loading state when data is loading', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        posts: [],
        postsCount: 0,
        isLoading: true
      })
    })

    render(<AdminPostsPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Loading Table...')).toBeInTheDocument()
  })

  it('shows posts table with data when available', () => {
    render(<AdminPostsPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(
      screen.getByText('Posts Table with 1 items')
    ).toBeInTheDocument()
  })

  it('shows empty state when no posts are available', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        posts: [],
        postsCount: 0,
        isLoading: false
      })
    })

    render(<AdminPostsPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('No posts found')).toBeInTheDocument()
  })
})
