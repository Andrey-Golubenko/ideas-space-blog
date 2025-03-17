import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'
import RegisterPageView from '~/views/RegisterPageView'

// Import the mocked function after vi.mock
import { register } from '~/actions/register'

// Mock the register function at the top level
vi.mock('~/actions/register', () => ({
  register: vi.fn()
}))

describe('RegisterPageView Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  it('renders registration form', () => {
    customRender(<RegisterPageView />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('handles registration submission', async () => {
    // Setup mock return value
    vi.mocked(register).mockResolvedValue({
      success: 'Registration successful'
    })

    customRender(<RegisterPageView />)

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' }
    })

    fireEvent.click(
      screen.getByRole('button', { name: /create an account/i })
    )

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
      })
    })
  })

  it('displays OAuth login options', () => {
    customRender(<RegisterPageView />)

    expect(screen.getByText(/continue with google/i)).toBeInTheDocument()
    expect(screen.getByText(/continue with github/i)).toBeInTheDocument()
  })
})
