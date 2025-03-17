import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { customRender, cleanup, spies } from '~/tests/test-utils'

// Imports after mocks
import EmailVerificationPageView from '~/views/EmailVerificationPageView'
import { emailVerification } from '~/actions/email-verification'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
}))
window.IntersectionObserver = mockIntersectionObserver

// Mocks
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('token=valid-token')
}))

vi.mock('~/actions/email-verification', () => ({
  emailVerification: vi.fn()
}))

describe('EmailVerificationPageView Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()
    vi.mocked(emailVerification).mockReset()
    // Reset the mock router implementation for this test
    vi.mocked(spies.router.back).mockClear()
    vi.mocked(spies.router.push).mockClear()
  })

  it('renders verification message', () => {
    customRender(<EmailVerificationPageView />)
    expect(
      screen.getByText('Confirming your verification')
    ).toBeInTheDocument()
  })

  it('handles successful verification', async () => {
    vi.mocked(emailVerification).mockResolvedValue({ success: 'Verified' })

    customRender(<EmailVerificationPageView />)

    await waitFor(() => {
      expect(emailVerification).toHaveBeenCalledWith('valid-token')
    })

    await waitFor(
      () => {
        expect(spies.router.push).toHaveBeenCalled()
      },
      {
        timeout: 2000
      }
    )
  })

  it('displays error on verification failure', async () => {
    vi.mocked(emailVerification).mockResolvedValue({
      error: 'Invalid token'
    })
    customRender(<EmailVerificationPageView />)

    await waitFor(() => {
      expect(screen.getByText('Invalid token')).toBeInTheDocument()
    })
  })
})
