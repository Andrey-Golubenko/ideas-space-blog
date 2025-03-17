import * as React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import { cleanup } from '~/tests/test-utils'
import useGlobalStore from '~/store'
import AdminCategoriesPageView from '~/views/AdminCategoriesPageView'

// Mock next-auth
vi.mock('next-auth', () => ({
  default: vi.fn(),
  getServerSession: vi.fn(() => null)
}))

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: { user: { role: 'ADMIN' } },
    status: 'authenticated'
  }))
}))

// Move all mocks to the top level
vi.mock('~/hooks/useCategoriesFilters', () => ({
  useCategoriesFilters: () => ({
    searchQuery: '',
    setSearchQuery: vi.fn(),
    page: 1,
    setPage: vi.fn(),
    resetFilters: vi.fn(),
    isAnyFilterActive: false
  })
}))

vi.mock('~/hooks/useDataCategories', () => ({
  useDataCategories: vi.fn()
}))

vi.mock(
  '~/components/admin/AdminCategories/CategoriesTable/CategoriesTableFiltersBox',
  () => ({
    default: () => <div role="search">Admin Categories Filters</div>
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
      return <div>No categories found</div>
    }
    return <div>Categories Table with {totalItems} items</div>
  }
}))

vi.mock('~/components/ui/table/DataTableSkeleton', () => ({
  DataTableSkeleton: () => <div>Loading Table...</div>
}))

vi.mock('~/components/shared/AddNewItemButton', () => ({
  default: () => (
    <a
      type="button"
      href="/admin/admin-categories/new-category"
    >
      Add New
    </a>
  )
}))

vi.mock('~/store', () => ({
  default: vi.fn()
}))

describe('Admin Categories Page Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()

    // Setup mock store values
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      const mockCategories = [
        {
          id: '1',
          name: 'Test Category',
          slug: 'test-category',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      return selector({
        categories: mockCategories,
        categoriesCount: mockCategories.length,
        isLoading: false
      })
    })
  })

  it('renders the admin categories page without crashing', () => {
    const { container } = render(
      <AdminCategoriesPageView searchParamsKey="test" />,
      {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      }
    )

    expect(container).toBeInTheDocument()
  })

  it('renders the admin categories page with key components', () => {
    render(<AdminCategoriesPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(
      screen.getByText('Admin Categories Filters')
    ).toBeInTheDocument()
    expect(screen.getByText('Add New')).toBeInTheDocument()
  })

  it('renders categories management page header', () => {
    render(<AdminCategoriesPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Manage categories')).toBeInTheDocument()
  })

  it('displays add new category button', () => {
    render(<AdminCategoriesPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    const addButton = screen.getByText('Add New')
    expect(addButton).toBeInTheDocument()
    expect(addButton).toHaveAttribute(
      'href',
      expect.stringContaining('/admin/admin-categories/new-category')
    )
  })

  it('shows loading state when data is loading', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        categories: [],
        categoriesCount: 0,
        isLoading: true
      })
    })

    render(<AdminCategoriesPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('Loading Table...')).toBeInTheDocument()
  })

  it('shows categories table with data when available', () => {
    render(<AdminCategoriesPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(
      screen.getByText('Categories Table with 1 items')
    ).toBeInTheDocument()
  })

  it('shows empty state when no categories are available', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        categories: [],
        categoriesCount: 0,
        isLoading: false
      })
    })

    render(<AdminCategoriesPageView searchParamsKey="test" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
    })

    expect(screen.getByText('No categories found')).toBeInTheDocument()
  })
})
