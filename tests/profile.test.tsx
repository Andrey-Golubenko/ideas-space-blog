import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import { UserRole, PostStatus } from '@prisma/client'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import useGlobalStore from '~/store'
import { customRender } from '~/tests/test-utils'
import ProfilePageView from '~/views/ProfilePageView'

describe('ProfilePageView Integration Tests', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'Password123',
    role: UserRole.USER,
    isOAuth: false,
    isTwoFactorEnabled: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
    cleanup()

    // Mock useDataPosts hook
    vi.mock('~/hooks/useDataPosts', () => ({
      useDataPosts: vi.fn()
    }))

    // Mock hooks
    vi.mock('~/hooks/usePostsFilters', () => ({
      usePostsFilters: () => ({
        searchQuery: '',
        setSearchQuery: vi.fn(),
        categoriesFilter: '',
        statusFilter: '',
        page: 1,
        setPage: vi.fn(),
        resetFilters: vi.fn(),
        isAnyFilterActive: false
      })
    }))

    vi.mock('~/hooks/usePage', () => ({
      usePage: () => ({
        isAdminPage: false,
        isProfilePage: true
      })
    }))

    // Mock components
    vi.mock('~/components/profile/ProfileInfo', () => ({
      default: ({ user, label }: { user: any; label: string }) => (
        <div>
          <h2>{label}</h2>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Role: {user.role}</div>
        </div>
      )
    }))

    vi.mock('~/components/profile/ProfilePostsHeader', () => ({
      default: ({ hasFullAccess }: { hasFullAccess: boolean }) => (
        <div>
          Posts Header{' '}
          {hasFullAccess ? '(Full Access)' : '(Limited Access)'}
        </div>
      )
    }))

    vi.mock('~/components/profile/ProfileFiltersBox', () => ({
      default: () => <div>Profile Filters</div>
    }))

    vi.mock('~/components/profile/ProfilePostsList', () => ({
      default: ({
        data,
        isLoading,
        noItems
      }: {
        data: any[]
        isLoading: boolean
        noItems: boolean
      }) => {
        if (isLoading) return <div>Loading posts...</div>
        if (noItems) return <div>No posts available.</div>
        return <div>Posts List: {data.length} posts</div>
      }
    }))

    vi.mock('~/components/shared/DataManagement/DataPagination', () => ({
      default: () => <nav>Pagination</nav>
    }))

    // Mock store with getFilteredPostsWithPag
    vi.mock('~/store', () => ({
      default: vi.fn()
    }))

    // Setup mock store values with getFilteredPostsWithPag
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      const mockPosts = [
        {
          id: '1',
          title: 'Test Post 1',
          content: 'Test content 1',
          status: PostStatus.PUBLISHED
        }
      ]

      const store = {
        posts: mockPosts,
        postsCount: mockPosts.length,
        isLoading: false,
        getFilteredPostsWithPag: vi.fn().mockResolvedValue({
          posts: mockPosts,
          count: mockPosts.length
        }),
        setPosts: vi.fn(),
        setPostsCount: vi.fn(),
        setIsLoading: vi.fn()
      }

      return selector(store)
    })
  })

  it('renders the profile page without crashing', () => {
    const { container } = customRender(
      <ProfilePageView
        user={mockUser}
        hasFullAccess
      />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(container).toBeInTheDocument()
  })

  it('displays user information correctly', () => {
    customRender(
      <ProfilePageView
        user={mockUser}
        hasFullAccess
      />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(screen.getByText('User data')).toBeInTheDocument()
    expect(screen.getByText(`Name: ${mockUser.name}`)).toBeInTheDocument()
    expect(
      screen.getByText(`Email: ${mockUser.email}`)
    ).toBeInTheDocument()
  })

  it('shows loading state when posts are loading', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: [],
        postsCount: 0,
        isLoading: true
      })
    )

    customRender(
      <ProfilePageView
        user={mockUser}
        hasFullAccess
      />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(screen.getByText(/loading posts/i)).toBeInTheDocument()
  })

  it('displays posts when available', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: [{ id: '1', title: 'Test Post 1' }],
        postsCount: 1,
        isLoading: false
      })
    )

    customRender(
      <ProfilePageView
        user={mockUser}
        hasFullAccess
      />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(screen.getByText('Posts List: 1 posts')).toBeInTheDocument()
    expect(screen.getByText('Pagination')).toBeInTheDocument()
  })

  it('shows empty state when no posts are available', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) =>
      selector({
        posts: 'No posts found',
        postsCount: 0,
        isLoading: false
      })
    )

    customRender(
      <ProfilePageView
        user={mockUser}
        hasFullAccess
      />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(screen.getByText(/no posts available/i)).toBeInTheDocument()
  })

  it('renders with limited access', () => {
    customRender(
      <ProfilePageView
        user={mockUser}
        hasFullAccess={false}
      />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(
      screen.getByText('Posts Header (Limited Access)')
    ).toBeInTheDocument()
  })

  it('renders in admin page context', () => {
    vi.mock('~/hooks/usePage', () => ({
      usePage: () => ({
        isAdminPage: true,
        isProfilePage: false
      })
    }))

    customRender(
      <ProfilePageView
        user={mockUser}
        hasFullAccess
      />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(screen.getByText('User data')).toBeInTheDocument()
    expect(screen.getByText('Profile Filters')).toBeInTheDocument()
  })
})
