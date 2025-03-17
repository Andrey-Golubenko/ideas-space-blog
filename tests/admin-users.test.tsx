import * as React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'

import { cleanup } from '~/tests/test-utils'
import useGlobalStore from '~/store'
import AdminUsersPageView from '~/views/AdminUsersPageView'

describe('Admin Users Page Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()

    vi.mock('~/hooks/useUsersFilters', () => ({
      useUsersFilters: () => ({
        searchQuery: '',
        setSearchQuery: vi.fn(),
        authProviderFilter: '',
        setAuthProviderFilter: vi.fn(),
        page: 1,
        setPage: vi.fn(),
        resetFilters: vi.fn(),
        isAnyFilterActive: false
      })
    }))

    vi.mock('~/hooks/useDataUsers', () => ({
      useDataUsers: vi.fn()
    }))

    // Mock components
    vi.mock(
      '~/components/admin/AdminUsers/UsersTable/UsersFiltersBox',
      () => ({
        default: () => <div role="search">Users Filters</div>
      })
    )

    vi.mock('~/components/ui/table/DataTable', () => ({
      default: ({
        data,
        totalItems
      }: {
        data: Array<{ name: string }>
        totalItems: number
      }) => {
        if (data.length === 0) {
          return <div>No users found</div>
        }
        return <div>Users Table with {totalItems} items</div>
      }
    }))

    vi.mock('~/components/ui/table/DataTableSkeleton', () => ({
      DataTableSkeleton: () => <div>Loading Table...</div>
    }))

    // Mock the global store
    vi.mock('~/store', () => ({
      default: vi.fn()
    }))

    // Setup mock store values
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      const mockUsers = [
        {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          provider: 'credentials'
        }
      ]

      return selector({
        users: mockUsers,
        usersCount: mockUsers.length,
        isLoading: false
      })
    })
  })

  it('renders the admin users page without crashing', () => {
    const { container } = render(
      <AdminUsersPageView searchParamsKey="test" />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(container).toBeInTheDocument()
  })

  it('renders the admin users page with key components', () => {
    render(<AdminUsersPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Users Filters')).toBeInTheDocument()
    expect(screen.getByText('Manage users')).toBeInTheDocument()
  })

  it('renders users management page header', () => {
    render(<AdminUsersPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Manage users')).toBeInTheDocument()
  })

  it('shows loading state when data is loading', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        users: [],
        usersCount: 0,
        isLoading: true
      })
    })

    render(<AdminUsersPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Loading Table...')).toBeInTheDocument()
  })

  it('shows users table with data when available', () => {
    render(<AdminUsersPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(
      screen.getByText('Users Table with 1 items')
    ).toBeInTheDocument()
  })

  it('shows empty state when no users are available', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        users: [],
        usersCount: 0,
        isLoading: false
      })
    })

    render(<AdminUsersPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('No users found')).toBeInTheDocument()
  })
})
