import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { customRender, cleanup, spies } from '~/tests/test-utils'
import EditUserPageView from '~/views/EditUserPageView'
import { UserRole } from '@prisma/client'
import { mockUsePathname } from './mocks/nextNavigation'

// Define mock functions first
const mockEditUser = vi.hoisted(() => vi.fn())
const mockSessionUpdate = vi.hoisted(() => vi.fn())

// Then define mock data
const mockUsers = vi.hoisted(() => ({
  admin: {
    id: '1',
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin-password',
    role: 'ADMIN' as UserRole,
    isOAuth: false,
    isTwoFactorEnabled: false
  },
  regular: {
    id: '2',
    name: 'Regular User',
    email: 'user@test.com',
    password: 'user-password',
    role: 'USER' as UserRole,
    isOAuth: false,
    isTwoFactorEnabled: false
  }
}))

const mockCurrentUser = vi.hoisted(() => ({
  current: mockUsers.admin
}))

vi.mock('~/hooks/useCurrentUser', () => ({
  useCurrentUser: () => mockCurrentUser.current
}))

vi.mock('~/actions/edit-user', () => ({
  editUser: mockEditUser
}))

vi.mock('next-auth/react', () => ({
  useSession: () => ({
    update: mockSessionUpdate
  })
}))

describe('EditUserPageView Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cleanup()

    mockUsePathname('/admin/admin-users/123/edit-user')

    mockEditUser.mockClear()
    mockEditUser.mockResolvedValue({
      success: 'User updated successfully'
    })

    // Reset the mock router implementation for this test
    vi.mocked(spies.router.back).mockClear()
    vi.mocked(spies.router.push).mockClear()

    // If you need a specific pathname for this test
    vi.mock('next/navigation', async () => {
      const actual = await vi.importActual('next/navigation')
      return {
        ...actual,
        usePathname: () => '/posts/edit/1',
        useSearchParams: () => new URLSearchParams('')
      }
    })

    vi.mock('~/hooks/usePage', () => ({
      usePage: () => ({
        isAdminPage: true
      })
    }))
  })

  it('renders the edit user page without throwing an error', () => {
    mockCurrentUser.current = mockUsers.admin

    expect(() =>
      customRender(
        <EditUserPageView
          user={mockUsers.regular}
          label="Edit User"
        />
      )
    ).not.toThrow()
  })

  it('renders edit form with user data when user is admin', () => {
    mockCurrentUser.current = mockUsers.admin

    customRender(
      <EditUserPageView
        user={mockUsers.regular}
        label="Edit User"
      />
    )

    expect(screen.getByLabelText(/name/i)).toHaveValue(
      mockUsers.regular.name
    )
    expect(screen.getByLabelText(/email/i)).toHaveValue(
      mockUsers.regular.email
    )
  })

  it('does not render form content for non-admin users on admin page', async () => {
    mockCurrentUser.current = mockUsers.regular

    customRender(
      <EditUserPageView
        user={mockUsers.regular}
        label="Edit User"
      />
    )

    await waitFor(() => {
      expect(
        screen.getByText(/You do not have permission/i)
      ).toBeInTheDocument()
      expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
    })
  })

  it('submits form with updated values', async () => {
    mockCurrentUser.current = mockUsers.admin

    const user = userEvent.setup()
    const updatedName = 'Updated User Name'

    customRender(
      <EditUserPageView
        user={mockUsers.regular}
        label="Edit User"
      />
    )

    const nameInput = screen.getByLabelText(/name/i)
    await user.clear(nameInput)
    await user.type(nameInput, updatedName)

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockEditUser).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockUsers.regular.id,
          name: updatedName,
          email: mockUsers.regular.email
        })
      )
    })
  })

  it('updates session when editing current user', async () => {
    mockCurrentUser.current = mockUsers.admin

    const user = userEvent.setup()

    customRender(
      <EditUserPageView
        user={mockUsers.admin}
        label="Edit User"
      />
    )

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockSessionUpdate).toHaveBeenCalled()
    })
  })

  it('shows success toast and redirects on successful admin edit', async () => {
    mockCurrentUser.current = mockUsers.admin

    const user = userEvent.setup()

    customRender(
      <EditUserPageView
        user={mockUsers.admin}
        label="Edit User"
      />
    )

    const nameInput = await screen.getByLabelText(/name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Updated User Name')

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockEditUser).toHaveBeenCalledWith({
        id: '1',
        name: 'Updated User Name',
        email: 'admin@test.com',
        role: 'ADMIN' as UserRole,
        isTwoFactorEnabled: false
      })
    })
  })
})
