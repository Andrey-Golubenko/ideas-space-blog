import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

import { cleanup } from '~/tests/test-utils'
import CategoriesPageView from '~/views/CategoriesPageView'
import useGlobalStore from '~/store'

import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'

describe('CategoriesPageView Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()

    vi.mock('~/hooks/useCategoriesFilters', () => ({
      useCategoriesFilters: () => ({
        searchQuery: '',
        setSearchQuery: vi.fn(),
        resetFilters: vi.fn(),
        isAnyFilterActive: false
      })
    }))

    vi.mock('~/hooks/useDataCategories', () => ({
      useDataCategories: vi.fn(() => ({
        data: [],
        isLoading: false
      }))
    }))

    // Mock components
    vi.mock('~/components/categories/CategoriesFiltersBox', () => ({
      default: () => <div role="search">Categories Filters</div>
    }))

    vi.mock('~/components/categories/CategoriesList', () => ({
      default: ({
        data,
        isLoading
      }: {
        data: Array<{ name: string }>
        isLoading: boolean
      }) => {
        if (isLoading) {
          return <div>Loading...</div>
        }
        if (data.length === 0) {
          return (
            <div>Unfortunately, we did not find any categories yet.</div>
          )
        }
        return <div>{data[0].name}</div>
      }
    }))

    // Mock the global store
    vi.mock('~/store', () => ({
      default: vi.fn(() => ({
        categories: [],
        categoriesCount: 0,
        isLoading: false
      }))
    }))

    // Reset all mocks before each test
    vi.clearAllMocks()
  })

  it('renders the categories page without crashing', () => {
    const { container } = render(<CategoriesPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: 'q=""' })
    })

    expect(container).toBeInTheDocument()
  })

  it('renders the categories page without throwing an error', () => {
    expect(() =>
      render(<CategoriesPageView />, {
        wrapper: withNuqsTestingAdapter({ searchParams: '?page=1' })
      })
    ).not.toThrow()
  })

  it('renders CategoriesFiltersBox', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      const mockCategories:
        | {
            id: number
            name: string
          }[]
        | [] = []

      return selector({
        categories: mockCategories,
        categoriesCount: 0,
        isLoading: true
      })
    })

    render(<CategoriesPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: 'q=""' })
    })

    expect(screen.getByText(/Categories Filters/i)).toBeInTheDocument()
  })

  it('displays loading state', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      const mockCategories:
        | {
            id: number
            name: string
          }[]
        | [] = []

      return selector({
        categories: mockCategories,
        categoriesCount: 0,
        isLoading: true
      })
    })

    render(<CategoriesPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: 'q=""' })
    })

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('displays no items message when there are no categories', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        categories: [],
        categoriesCount: 0,
        isLoading: false
      })
    })

    render(<CategoriesPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: 'q=""' })
    })

    expect(
      screen.getByText(
        /unfortunately, we did not find any categories yet/i
      )
    ).toBeInTheDocument()
  })

  it('displays categories when available', () => {
    vi.mocked(useGlobalStore).mockImplementation((selector: any) => {
      return selector({
        categories: [{ id: 1, name: 'Category 1' }],
        categoriesCount: 1,
        isLoading: false
      })
    })

    render(<CategoriesPageView />, {
      wrapper: withNuqsTestingAdapter({ searchParams: 'q=""' })
    })

    expect(screen.getByText('Category 1')).toBeInTheDocument()
  })
})
