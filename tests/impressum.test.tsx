import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'
import ImpressumPageView from '~/views/ImpressumPageView'

describe('ImpressumPageView Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()
  })

  it('renders impressum content', () => {
    customRender(<ImpressumPageView />)

    expect(screen.getByText(/impressum/i)).toBeInTheDocument()
    expect(screen.getAllByText(/email/i)[0]).toBeInTheDocument()
  })

  it('displays disclaimer and note', () => {
    customRender(<ImpressumPageView />)

    expect(screen.getByText(/disclaimer/i)).toBeInTheDocument()
    expect(screen.getByText(/note/i)).toBeInTheDocument()
  })
})
