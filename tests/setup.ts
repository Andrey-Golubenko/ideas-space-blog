import {
  expect,
  beforeEach,
  vi,
  afterEach,
  beforeAll,
  afterAll
} from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'
import React from 'react'
import { MockDataTransfer } from './mocks/dataTransfer'
import { MockResizeObserver } from './mocks/resizeObserver'
import {
  mockNextNavigation,
  mockUsePathname
} from './mocks/nextNavigation'
import { server } from './mocks/server'

// Extend vitest's expect with jest-dom matchers
expect.extend(matchers)

// Make DataTransfer available globally
global.DataTransfer = MockDataTransfer as any

// Mock Next.js fonts
vi.mock('next/font/google', () => ({
  Poppins: () => ({
    className: 'mock-poppins',
    style: { fontFamily: 'Poppins' }
  }),
  Playfair_Display: () => ({
    className: 'mock-playfair-display',
    style: { fontFamily: 'Playfair Display' }
  })
}))

// Mock LoadableImage component with a mock image
vi.mock('~/components/shared/LoadableImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) =>
    React.createElement('img', {
      src,
      alt,
      'data-testid': 'mock-loadable-image'
    })
}))

// Mock FilesField component
vi.mock('~/components/shared/FilesField', () => ({
  default: ({ name, onChange, register }: any) => {
    const inputProps = register ? register(name) : {}
    return React.createElement('input', {
      type: 'file',
      'data-testid': 'file',
      name,
      onChange: async (e: any) => {
        if (e.target.files?.length) {
          if (onChange) await onChange(e)
          if (inputProps.onChange) await inputProps.onChange(e)
        }
      },
      multiple: true
    })
  }
}))

// Mock react-dropzone
vi.mock('react-dropzone', () => ({
  useDropzone: () => ({
    getRootProps: () => ({}),
    getInputProps: () => ({}),
    acceptedFiles: []
  })
}))

// Mock React with all original exports plus custom cache
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return {
    ...actual,
    ...(actual as any).default,
    cache: (actual as any).cache || ((fn: any) => fn),
    default: {
      ...(actual as any).default,
      forwardRef: (component: any) => component
    }
  }
})

// Add React to global scope
global.React = (await import('react')).default

// Mock browser APIs
const createMockObserver = () => ({
  // IntersectionObserver properties
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: vi.fn(),
  // ResizeObserver properties
  resizeObserve: vi.fn(),
  resizeUnobserve: vi.fn(),
  resizeDisconnect: vi.fn()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

global.IntersectionObserver = createMockObserver as any

global.ResizeObserver = MockResizeObserver as any

const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
}))
window.IntersectionObserver = mockIntersectionObserver

// Mock next/navigation
mockNextNavigation()

// Set default pathname
mockUsePathname('/')

// Mock fetch
global.fetch = vi.fn()

beforeAll(() => {
  // Start MSW server
  server.listen({ onUnhandledRequest: 'bypass' })
})

afterAll(() => {
  // Clean up
  server.close()
})

beforeEach(() => {
  vi.clearAllMocks()
})

// Mock next/navigation
vi.mock('next/navigation', () => {
  const router = {
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn()
  }

  return {
    useRouter: () => router,
    usePathname: () => '/mocked-path',
    useSearchParams: () => ({
      get: vi.fn().mockReturnValue('valid-token'),
      toString: vi.fn()
    }),
    useServerInsertedHTML: vi.fn()
  }
})

// Mock next-auth
vi.mock('next-auth', () => {
  const handlers = {
    GET: vi.fn(),
    POST: vi.fn()
  }

  return {
    handlers,
    default: vi.fn(() => ({ handlers })),
    auth: vi.fn(() => Promise.resolve({ user: { role: 'USER' } })),
    signIn: vi.fn(),
    signOut: vi.fn(),
    useSession: vi.fn(() => ({
      data: { user: { role: 'USER' } },
      status: 'authenticated'
    }))
  }
})

// Mock next/server for auth tests
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn(),
    redirect: vi.fn()
  }
}))

// Clean up after each test
afterEach(() => {
  // Reset handlers and mocks between tests
  server.resetHandlers()
  vi.clearAllMocks()
})
