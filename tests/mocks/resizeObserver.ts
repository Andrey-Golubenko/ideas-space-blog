import { vi } from 'vitest'

export class MockResizeObserver {
  constructor() {
    this.observe = vi.fn()
    this.unobserve = vi.fn()
    this.disconnect = vi.fn()
  }

  observe = vi.fn()

  unobserve = vi.fn()

  disconnect = vi.fn()
}
