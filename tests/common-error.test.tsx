import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, screen } from '@testing-library/react'

import { customRender } from '~/tests/test-utils'
import CommonErrorPageView from '~/views/CommonErrorPageView'

describe('AuthErrorPageView Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()
  })

  it('renders error message', () => {
    customRender(<CommonErrorPageView />)

    expect(
      screen.getByText(/an unexpected error has occurred/i)
    ).toBeInTheDocument()
  })

  it('displays return to home link', () => {
    customRender(<CommonErrorPageView />)

    const homeButton = screen.getByRole('button', { name: /go home/i })
    const backButton = screen.getByRole('button', { name: /go back/i })
    expect(homeButton).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
  })
})
