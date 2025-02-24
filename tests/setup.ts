import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import React from 'react'

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
class MockObserver {
  // IntersectionObserver properties
  observe = vi.fn()

  unobserve = vi.fn()

  disconnect = vi.fn()

  root = null

  rootMargin = ''

  thresholds = []

  takeRecords = vi.fn()

  // ResizeObserver properties
  resizeObserve = vi.fn()

  resizeUnobserve = vi.fn()

  resizeDisconnect = vi.fn()
}

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

global.IntersectionObserver = MockObserver
global.ResizeObserver = MockObserver

// Mock react-scroll-parallax with all necessary exports
