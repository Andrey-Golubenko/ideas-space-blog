import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'

describe('Login Page Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    vi.resetAllMocks()
    cleanup()

    vi.doMock('next/navigation', () => ({
      useSearchParams: () =>
        new URLSearchParams('callbackUrl=/dashboard&error=')
    }))
  })

  it('Should render the Login form', async () => {
    const { default: LoginPageView } = await import(
      '~/views/LoginPageView'
    )

    customRender(<LoginPageView />)

    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/Email/i)[0]).toBeInTheDocument()
    expect(screen.getAllByLabelText(/Password/i)[0]).toBeInTheDocument()
  })

  it('Should handle successful login', async () => {
    vi.doMock('~/services/user', () => ({
      getUserByEmail: vi.fn(() =>
        Promise.resolve({
          id: 'user-1',
          email: 'mail@example.com',
          password: 'hashed-password',
          emailVerified: new Date(),
          role: 'USER'
        })
      )
    }))

    vi.doMock('~/libs/auth/auth', () => ({
      signIn: vi.fn(() => Promise.resolve({ success: 'Login successful' }))
    }))

    const { default: LoginPageView } = await import(
      '~/views/LoginPageView'
    )
    const { user } = customRender(<LoginPageView />)

    await user.type(
      screen.getAllByLabelText(/Email/i)[0],
      'mail@example.com'
    )
    await user.type(
      screen.getAllByLabelText(/Password/i)[0],
      'password123'
    )

    await user.click(screen.getAllByRole('button', { name: /Login/i })[0])

    await waitFor(
      () => {
        expect(screen.getByText(/Login successful/i)).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })

  it('Should handle login error', async () => {
    vi.doMock('~/libs/auth/auth', () => ({
      signIn: vi.fn(() =>
        Promise.resolve({ error: 'User does not exist' })
      )
    }))

    vi.doMock('~/services/user', () => ({
      getUserByEmail: vi.fn(() => Promise.resolve(null))
    }))

    const { default: LoginPageView } = await import(
      '~/views/LoginPageView'
    )
    const { user } = customRender(<LoginPageView />)

    await user.type(
      screen.getAllByLabelText(/Email/i)[0],
      'wrong@example.com'
    )
    await user.type(
      screen.getAllByLabelText(/Password/i)[0],
      'wrong-password'
    )

    await user.click(screen.getAllByRole('button', { name: /Login/i })[0])

    await waitFor(
      () => {
        expect(
          screen.getByText(/User does not exist/i)
        ).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })
})
