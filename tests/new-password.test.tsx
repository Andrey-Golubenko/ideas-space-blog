import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'
import NewPasswordPageView from '~/views/NewPasswordPageView'
import { newPassword } from '~/actions/new-password'

vi.mock('~/actions/new-password')
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('token=valid-token')
}))

describe('NewPasswordPageView Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()
    vi.mocked(newPassword).mockReset()
  })

  it('renders new password form', () => {
    customRender(<NewPasswordPageView />)

    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /reset password/i })
    ).toBeInTheDocument()
  })

  it('handles password reset submission', async () => {
    vi.mocked(newPassword).mockResolvedValue({
      success: 'Password has been updated!'
    })

    customRender(<NewPasswordPageView />)

    const passwordInput = screen.getByLabelText(/new password/i)
    fireEvent.change(passwordInput, {
      target: { value: 'newPassword123!' }
    })

    const submitButton = screen.getByRole('button', {
      name: /reset password/i
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(newPassword).toHaveBeenCalled()
    })
  })

  it('should handle password reset error', async () => {
    vi.mocked(newPassword).mockResolvedValue({
      error: 'Invalid reset token'
    })

    customRender(<NewPasswordPageView />)

    const passwordInput = screen.getByLabelText(/new password/i)
    fireEvent.change(passwordInput, {
      target: { value: 'newPassword123!' }
    })

    const submitButton = screen.getByRole('button', {
      name: /reset password/i
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Invalid reset token/i)).toBeInTheDocument()
    })

    expect(newPassword).toHaveBeenCalledWith(
      { password: 'newPassword123!' },
      'valid-token'
    )
  })
})
