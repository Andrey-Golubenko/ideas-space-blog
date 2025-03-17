import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { customRender, cleanup, spies } from '~/tests/test-utils'
import userEvent from '@testing-library/user-event'
import EditPostPageView from '~/views/EditPostPageView'

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

const mockEditPost = vi.hoisted(() => vi.fn())
const mockSaveImages = vi.hoisted(() => vi.fn())
const mockDestroyImages = vi.hoisted(() => vi.fn())
const mockSetSinglePost = vi.hoisted(() => vi.fn())

vi.mock('~/hooks/useCurrentUser', () => ({
  useCurrentUser: () => mockCurrentUser.current
}))

vi.mock('~/actions/edit-post', () => ({
  editPost: mockEditPost
}))

vi.mock('~/services/imagesProcessing', () => ({
  destroyImagesInCld: mockDestroyImages,
  saveImagesToCld: mockSaveImages
}))

vi.mock('~/store', () => ({
  default: (selector: Function) => {
    const state = {
      singlePost: {
        id: '1',
        title: 'Test Post',
        content: 'Test Content',
        imageUrls: ['test-image.jpg'],
        categories: [],
        status: 'DRAFT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      setSinglePost: (...args: any[]) => mockSetSinglePost(...args)
    }
    return selector(state)
  }
}))

describe('EditPostPageView Integration Tests', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()

    mockCurrentUser.current = mockUsers.admin

    mockEditPost.mockClear()
    mockEditPost.mockResolvedValue({
      success: 'Post updated successfully'
    })

    mockSaveImages.mockResolvedValue(['new-image-url.jpg'])
    mockDestroyImages.mockResolvedValue(true)

    // Reset the mock router implementation for this test
    vi.mocked(spies.router.back).mockClear()
    vi.mocked(spies.router.push).mockClear()

    vi.mock('next/navigation', async () => {
      const actual = await vi.importActual('next/navigation')
      return {
        ...actual,
        usePathname: () => '/posts/edit/1',
        useSearchParams: () => new URLSearchParams('')
      }
    })
  })

  it('renders the edit post page without throwing an error', () => {
    expect(() => customRender(<EditPostPageView isLogged />)).not.toThrow()
  })

  it('renders edit form when user is logged in', async () => {
    customRender(<EditPostPageView isLogged />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument()
    })
  })

  it('does not render form for not logged in users', async () => {
    customRender(<EditPostPageView isLogged={false} />)

    await waitFor(() => {
      expect(
        screen.queryByDisplayValue(/test post/i)
      ).not.toBeInTheDocument()
    })
  })

  it('submits form with updated values', async () => {
    const user = userEvent.setup()
    customRender(<EditPostPageView isLogged />)

    const titleInput = await screen.findByDisplayValue('Test Post')
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated Post')

    const submitButton = screen.getByRole('button', {
      name: /edit post/i
    })

    await user.click(submitButton)

    await waitFor(() => {
      expect(mockEditPost).toHaveBeenCalledWith(
        {
          title: 'Updated Post',
          content: 'Test Content',
          imageUrls: ['test-image.jpg'],
          categories: [],
          status: 'DRAFT'
        },
        '1'
      )
    })

    expect(spies.router.back).toHaveBeenCalled()
    expect(mockSetSinglePost).toHaveBeenCalledWith({})
  })

  it('handles image upload during submission', async () => {
    const user = userEvent.setup()
    customRender(<EditPostPageView isLogged />)

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const fileInput = (await screen.findByTestId(
      'file'
    )) as HTMLInputElement

    await user.upload(fileInput, file)

    const submitButton = screen.getByRole('button', { name: /edit post/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockEditPost).toHaveBeenCalled()
    })
  })
})
