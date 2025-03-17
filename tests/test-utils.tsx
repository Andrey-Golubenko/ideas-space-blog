import { type ReactNode } from 'react'
import { afterEach, vi, expect, beforeAll, afterAll } from 'vitest'
import {
  render,
  RenderResult,
  cleanup,
  waitFor
} from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import React from 'react'
import { handlers as mswHandlers } from './mocks/handlers'

// Setup MSW with imported handlers
export const server = setupServer(...mswHandlers)

// Start server before tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

// Clean up after all tests
afterAll(() => server.close())

// Define spies before mocking
const spies = {
  router: {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn()
  },
  toast: {
    error: vi.fn(),
    success: vi.fn()
  }
}

// Mock auth before any other imports or usage
vi.mock('~/libs/auth/auth', () => ({
  default: {
    auth: vi.fn(() => ({
      session: null,
      user: null
    }))
  }
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => spies.router,
  usePathname: () => '/mocked-path',
  useSearchParams: () => ({
    get: vi.fn()
  })
}))

// Mock next-auth
vi.mock('next-auth', () => ({
  default: vi.fn(),
  getServerSession: vi.fn(() => null)
}))

// Custom render function to include any necessary providers
const customRender = (
  ui: ReactNode,
  options = {}
): RenderResult & { user: UserEvent } => {
  const user = userEvent.setup()
  const renderResult = render(ui, { ...options })
  return { ...renderResult, user }
}

export function renderWithAuth(
  ui: React.ReactElement,
  { isAuthenticated = false } = {}
) {
  return render(ui)
}

// Helper to create mock tokens for auth tests
export const createMockToken = () => 'valid-token'

export const createTestToken = () => 'valid-token'

export const setupSpies = () => {
  const mockSpies = {
    router: {
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn()
    },
    verifyEmail: vi.fn().mockResolvedValue({ success: true }),
    newPassword: vi.fn().mockResolvedValue({ success: true }),
    updateUser: vi.fn().mockResolvedValue({ success: true }),
    createPost: vi.fn().mockResolvedValue({ success: true }),
    updatePost: vi.fn().mockResolvedValue({ success: true })
  }

  vi.mock('next/navigation', () => ({
    useRouter: () => spies.router,
    usePathname: () => '/mocked-path',
    useSearchParams: () => ({
      get: () => 'valid-token',
      toString: vi.fn()
    })
  }))

  return {
    spies: mockSpies,
    waitForRouterPush: () =>
      waitFor(() => expect(mockSpies.router.push).toBeCalled()),
    waitForRouterBack: () =>
      waitFor(() => expect(mockSpies.router.back).toBeCalled())
  }
}

// Update mockNextAuthWithUser
export const mockNextAuthWithUser = (role = 'USER') => {
  const handlers = {
    GET: vi.fn(),
    POST: vi.fn()
  }

  vi.mock('next-auth', () => ({
    handlers,
    default: vi.fn(() => ({ handlers })),
    auth: vi.fn(() => Promise.resolve({ user: { role } })),
    signIn: vi.fn(),
    signOut: vi.fn(),
    useSession: vi.fn(() => ({
      data: { user: { role } },
      status: 'authenticated'
    }))
  }))
}

// Add helper for testing error messages
export const findByTextWithin = async (
  element: HTMLElement,
  text: string | RegExp
) => {
  return waitFor(() => {
    const el = element.querySelector(
      `*:not(script):not(style):contains('${text}')`
    )
    if (!el) throw new Error(`Text "${text}" not found`)
    return el
  })
}

// Define local handlers array for MSW
const localHandlers = [
  // Add MSW handlers here
]

export * from '@testing-library/react'
export { customRender, spies }
