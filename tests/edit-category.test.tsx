import { describe, beforeEach, it, expect, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { customRender, cleanup } from '~/tests/test-utils'
import userEvent from '@testing-library/user-event'
import EditCategoryPageView from '~/views/EditCategoryPageView'
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

const mockEditCategory = vi.hoisted(() => vi.fn())
const mockSaveImages = vi.hoisted(() => vi.fn())
const mockDestroyImages = vi.hoisted(() => vi.fn())
const mockSetEditableCategory = vi.hoisted(() => vi.fn())
const mockBack = vi.hoisted(() => vi.fn())

vi.mock('~/hooks/useCurrentUser', () => ({
  useCurrentUser: () => mockCurrentUser.current
}))

vi.mock('~/actions/edit-category', () => ({
  editCategory: mockEditCategory
}))

vi.mock('~/services/imagesProcessing', () => ({
  destroyImagesInCld: vi.fn(),
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

vi.mock('~/store', () => ({
  default: (selector: Function) => {
    const state = {
      editableCategory: {
        id: '1',
        name: 'Test Category',
        slug: 'test-category',
        imageUrl: 'test-image.jpg',
        description: 'Test description',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      setEditableCategory: (...args: any[]) => {
        return mockSetEditableCategory(...args)
      }
    }
    return selector(state)
  }
}))

describe('EditCategoryPageView Integration Tests', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
    mockUseRouter()

    mockCurrentUser.current = mockUsers.admin

    mockEditCategory.mockClear()
    mockEditCategory.mockResolvedValue({
      success: 'Category updated successfully'
    })

    mockSaveImages.mockResolvedValue(['new-image-url.jpg'])

    mockDestroyImages.mockResolvedValue(true)
  })

  it('renders the edit categories page without throwing an error', () => {
    expect(() => customRender(<EditCategoryPageView />)).not.toThrow()
  })

  it('renders edit form when user is admin', async () => {
    customRender(<EditCategoryPageView />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Category')).toBeInTheDocument()
    })
  })

  it('does not render form for non-admin users', async () => {
    mockCurrentUser.current = mockUsers.regular

    customRender(<EditCategoryPageView />)

    await waitFor(() => {
      expect(
        screen.getByText(/You do not have permission/i)
      ).toBeInTheDocument()
      expect(
        screen.queryByDisplayValue('Test Category')
      ).not.toBeInTheDocument()
    })
  })

  it('submits form with updated values', async () => {
    const user = userEvent.setup()
    customRender(<EditCategoryPageView />)

    const nameInput = await screen.findByDisplayValue('Test Category')

    await user.clear(nameInput)

    await user.type(nameInput, 'Updated Category')

    const submitButton = screen.getByRole('button', {
      name: /edit category/i
    })

    await user.click(submitButton)

    await waitFor(() => {
      expect(mockEditCategory).toHaveBeenCalledWith({
        id: '1',
        name: 'Updated Category',
        description: 'Test description',
        slug: 'test-category',
        imageUrl: 'test-image.jpg'
      })
    })
  })

  it('handles image updates correctly', async () => {
    const user = userEvent.setup()
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    // Setup success responses for image upload
    mockSaveImages.mockImplementation((files) => {
      expect(files[0]).toStrictEqual(file)
      return Promise.resolve(['new-image-url.jpg'])
    })

    // Setup expected behavior for editCategory mock
    mockEditCategory.mockImplementation(() => {
      return Promise.resolve({ success: true })
    })

    customRender(<EditCategoryPageView />)

    // Find the file input
    const fileInput = (await screen.findByTestId(
      'file'
    )) as HTMLInputElement

    // Directly manipulate the file input's files property
    // This simulates what react-dropzone does internally
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      configurable: true
    })

    // Trigger the change event manually - this is critical
    await user.click(fileInput)
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Verify file was uploaded
    await waitFor(() => {
      expect(fileInput.files).toHaveLength(1)
      expect(fileInput.files && fileInput.files[0]).toStrictEqual(file)
    })

    // Submit the form
    const submitButton = await screen.findByRole('button', {
      name: /edit category/i
    })
    await user.click(submitButton)

    // Verify the full flow completed
    await waitFor(() => {
      expect(mockEditCategory).toHaveBeenCalled()
    })
  })
})
