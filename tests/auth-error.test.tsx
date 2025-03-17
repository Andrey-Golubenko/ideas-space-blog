import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, screen } from '@testing-library/react'

import { customRender } from '~/tests/test-utils'
import AuthErrorPageView from '~/views/AuthErrorPageView'

describe('AuthErrorPageView Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()
  })

  it('renders error message', () => {
    customRender(<AuthErrorPageView />)

    expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument()
  })

  it('displays return to home link', () => {
    customRender(<AuthErrorPageView />)

    const loginLink = screen.getByRole('link', { name: /back to login/i })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/auth')
  })
})
