import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'
import ResetPasswordPageView from '~/views/ResetPasswordPageView'

// Import the mocked function after defining the mock
import { passwordReset } from '~/actions/reset-password'

// Important: vi.mock must be at the top level, before any variable declarations
vi.mock('~/actions/reset-password', () => ({
  passwordReset: vi.fn().mockResolvedValue({ success: true })
}))

describe('ResetPasswordPageView Integration Tests', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks() // Clear mocks between tests

    // Reset the mock implementation for each test
    vi.mocked(passwordReset).mockResolvedValue({
      success: 'Reset email sent!'
    })
  })

  it('renders reset password form', () => {
    customRender(<ResetPasswordPageView />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /send reset email/i })
    ).toBeInTheDocument()
  })

  it('handles reset password request', async () => {
    customRender(<ResetPasswordPageView />)

    // Fill in the email field
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })

    // Submit the form
    fireEvent.click(
      screen.getByRole('button', { name: /send reset email/i })
    )

    // Wait for the mock to be called
    await waitFor(() => {
      expect(passwordReset).toHaveBeenCalledWith({
        email: 'test@example.com'
      })
    })
  })

  it('shows success message after submission', async () => {
    customRender(<ResetPasswordPageView />)

    // Fill in the email field
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })

    // Submit the form
    fireEvent.click(
      screen.getByRole('button', { name: /send reset email/i })
    )

    // Wait for success message to appear
    await waitFor(() => {
      expect(screen.getByText(/reset email sent/i)).toBeInTheDocument()
    })
  })
})
