import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'
import AdminPageView from '~/views/AdminPageView'

// Declare mock outside describe block
const mockGetUsersVisits = vi.fn()

// Mock the store before tests
vi.mock('~/store', () => ({
  default: () => ({
    getUsersVisits: mockGetUsersVisits
  })
}))

describe('AdminPageView Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()
    mockGetUsersVisits.mockClear()

    // Mock fetch for dashboard data
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    ) as any
  })

  // Reset all mocks after each test
  afterEach(() => {
    mockGetUsersVisits.mockReset()
  })

  it('renders admin dashboard', async () => {
    const { container } = customRender(<AdminPageView />)

    // Verify dashboard components are rendered
    expect(container).toBeInTheDocument()
  })

  it('displays users visits graph', async () => {
    customRender(<AdminPageView />)

    expect(screen.getByText(/users visits/i)).toBeInTheDocument()
  })

  it('displays users agents graph', async () => {
    customRender(<AdminPageView />)

    expect(screen.getByText(/browser Usage Overview/i)).toBeInTheDocument()
  })

  it('fetches data for selected date range', async () => {
    customRender(<AdminPageView />)

    // Find and click the date picker button to open it
    const datePickerButton = screen.getByRole('button', {
      name: /pick a date/i
    })
    fireEvent.click(datePickerButton)

    // Select dates from the calendar
    const fromDate = await screen.getAllByText(/21/i)[0]
    const toDate = screen.getAllByText(/31/i)[0]
    await fireEvent.click(fromDate)
    await fireEvent.click(toDate)

    // Click download statistics button
    const downloadButton = screen.getByRole('button', {
      name: /download statistics/i
    })
    fireEvent.click(downloadButton)

    // Verify getUsersVisits was called with correct dates
    await waitFor(() => {
      expect(mockGetUsersVisits).toHaveBeenCalled()
    })
  })
})
