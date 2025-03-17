import { describe, it, expect, beforeEach } from 'vitest'
import { screen, customRender, cleanup } from '~/tests/test-utils'
import NotFoundPageView from '~/views/NotFoundPageView'

describe('NotFoundPageView Integration Tests', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders 404 message', () => {
    customRender(<NotFoundPageView />)

    expect(
      screen.getByText(
        /the link you followed may be broken, or the page may have been removed/i
      )
    ).toBeInTheDocument()
    expect(screen.getByText(/please go to homepage/i)).toBeInTheDocument()
  })

  it('displays return to home link', () => {
    customRender(<NotFoundPageView />)

    const homeLink = screen.getByRole('link', { name: /go home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
