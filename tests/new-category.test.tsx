import { describe, beforeEach, it, expect, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'
import userEvent from '@testing-library/user-event'
import NewCategoryPageView from '~/views/NewCategoryPageView'
import { mockUseRouter } from './mocks/nextNavigation'

const mockUsers = vi.hoisted(() => ({
  admin: {
    id: '1',
    role: 'ADMIN',
    email: 'admin@test.com'
  },
  regular: {
    id: '2',
    role: 'USER',
    email: 'user@test.com'
  }
}))

const mockCurrentUser = vi.hoisted(() => ({
  current: mockUsers.admin
}))

const mockNewCategory = vi.hoisted(() => vi.fn())
const mockSaveImages = vi.hoisted(() => vi.fn())
const mockBack = vi.hoisted(() => vi.fn())

vi.mock('~/hooks/useCurrentUser', () => ({
  useCurrentUser: () => mockCurrentUser.current
}))

vi.mock('~/actions/new-category', () => ({
  newCategory: mockNewCategory
}))

vi.mock('~/services/imagesProcessing', () => ({
  saveImagesToCld: (
    files: File[],
    path: string,
    errorHandler: Function
  ) => {
    return mockSaveImages(files, path, errorHandler)
  }
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
    push: vi.fn()
  })
}))

describe('NewCategoryPageView Integration Tests', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
    mockUseRouter()

    mockCurrentUser.current = mockUsers.admin

    mockNewCategory.mockClear()
    mockNewCategory.mockResolvedValue({
      success: 'Category created successfully'
    })

    mockSaveImages.mockResolvedValue(['new-image-url.jpg'])
  })

  it('renders the new category page without throwing an error', () => {
    expect(() => customRender(<NewCategoryPageView />)).not.toThrow()
  })

  it('renders create form when user is admin', async () => {
    customRender(<NewCategoryPageView />)

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /create/i })
      ).toBeInTheDocument()
    })
  })

  it('does not render form for non-admin users', async () => {
    mockCurrentUser.current = mockUsers.regular

    customRender(<NewCategoryPageView />)

    await waitFor(() => {
      expect(
        screen.getByText(/You do not have permission/i)
      ).toBeInTheDocument()
      expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
    })
  })

  it('submits form with new category values', async () => {
    const user = userEvent.setup()
    customRender(<NewCategoryPageView />)

    const nameInput = screen.getByLabelText(/name/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const slugInput = screen.getByLabelText(/slug/i)

    await user.type(nameInput, 'New Test Category')
    await user.type(descriptionInput, 'New Test Description')
    await user.type(slugInput, 'new-test-category')

    const submitButton = screen.getByRole('button', { name: /create/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockNewCategory).toHaveBeenCalledWith({
        name: 'New Test Category',
        description: 'New Test Description',
        slug: 'new-test-category',
        imageUrl: ''
      })
    })
  })

  it('handles file selection correctly', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    customRender(<NewCategoryPageView />)

    const fileInput = screen.getByTestId('file')
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => {
      const input = screen.getByTestId('file') as HTMLInputElement
      expect(input.files).toBeTruthy()
      expect(input.files?.[0]).toBeTruthy()
      expect(input.files?.[0].name).toBe('test.jpg')
    })
  })

  it('submits form with image', async () => {
    const user = userEvent.setup()
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    mockSaveImages.mockResolvedValue(['new-image-url.jpg'])
    mockNewCategory.mockResolvedValue({ success: true })

    customRender(<NewCategoryPageView />)

    const nameInput = screen.getByLabelText(/name/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const slugInput = screen.getByLabelText(/slug/i)

    await user.type(nameInput, 'Test Category')
    await user.type(descriptionInput, 'Test Description')
    await user.type(slugInput, 'test-category')

    const fileInput = screen.getByTestId('file')
    fireEvent.change(fileInput, { target: { files: [file] } })

    const submitButton = screen.getByRole('button', { name: /create/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockNewCategory).toHaveBeenCalled()
    })
  })
})
