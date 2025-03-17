import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'

// Мок для next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () =>
    new URLSearchParams('callbackUrl=/dashboard&error=')
}))

// Мок для ~/services/user
vi.mock('~/services/user', () => ({
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

// Мок для функции signIn
const signInMock = vi.fn()
vi.mock('~/libs/auth/auth', () => ({
  signIn: signInMock
}))

// Мок для функции logIn из ~/actions/login
const logInMock = vi.fn()
vi.mock('~/actions/login', () => ({
  default: logInMock,
  logIn: logInMock
}))

describe('Login Page Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()

    // Сбрасываем состояние моков перед каждым тестом
    signInMock.mockReset()
    logInMock.mockReset()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Should render the Login form', async () => {
    const { default: LoginPageView } = await import(
      '~/views/LoginPageView'
    )

    customRender(<LoginPageView />)

    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument()

    const emailInput = screen.queryByLabelText(/Email/i)
    expect(emailInput).toBeInTheDocument()

    const passwordInput = screen.queryByLabelText(/Password/i)
    expect(passwordInput).toBeInTheDocument()
  })

  it('Should handle successful login', async () => {
    // Настраиваем мок logIn на успешный результат
    logInMock.mockResolvedValueOnce({ success: 'Login successful' })

    const { default: LoginPageView } = await import(
      '~/views/LoginPageView'
    )

    const { user } = customRender(<LoginPageView />)

    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/Password/i)

    // Вводим данные
    await user.type(emailInput, 'mail@example.com')
    await user.type(passwordInput, 'password123')

    // Нажимаем кнопку логина
    const loginButton = screen.getByRole('button', { name: /Login/i })
    await user.click(loginButton)

    // Ждем, пока logIn будет вызван
    await waitFor(() => {
      expect(logInMock).toHaveBeenCalled()
    })

    // Ожидаем появления сообщения об успешном входе
    await waitFor(
      () => {
        expect(screen.getByText(/Login successful/i)).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  })

  it('Should handle login error', async () => {
    // Настраиваем мок logIn на ошибку
    logInMock.mockResolvedValueOnce({ error: 'User does not exist' })

    const { default: LoginPageView } = await import(
      '~/views/LoginPageView'
    )

    const { user } = customRender(<LoginPageView />)

    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/Password/i)

    // Вводим неверные данные
    await user.type(emailInput, 'wrong@example.com')
    await user.type(passwordInput, 'wrong-password')

    // Нажимаем кнопку логина
    const loginButton = screen.getByRole('button', { name: /Login/i })
    await user.click(loginButton)

    // Ждем, пока logIn будет вызван
    await waitFor(() => {
      expect(logInMock).toHaveBeenCalled()
    })

    // Ожидаем появления сообщения об ошибке
    await waitFor(
      () => {
        expect(
          screen.getByText(/User does not exist/i)
        ).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  })
})
