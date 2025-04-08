import { describe, beforeEach, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { customRender, cleanup, spies } from '~/tests/test-utils'
import userEvent from '@testing-library/user-event'
import NewPostPageView from '~/views/NewPostPageView'

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

const mockNewPost = vi.hoisted(() => vi.fn())
const mockSaveImages = vi.hoisted(() => vi.fn())
// const mockBack = vi.hoisted(() => vi.fn())

vi.mock('~/hooks/useCurrentUser', () => ({
  useCurrentUser: () => mockCurrentUser.current
}))

vi.mock('~/actions/new-post', () => ({
  newPost: mockNewPost
}))

vi.mock('~/services/imagesProcessing', () => ({
  saveImagesToCld: mockSaveImages
}))

vi.mock('~/store', () => ({
  default: () => ({
    categories: [],
    isLoading: false,
    getTruncatedCategories: () => []
  })
}))

vi.mock('uuid', () => ({
  v4: () => 'test-uuid'
}))

describe('NewPostPageView Integration Tests', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()

    mockCurrentUser.current = mockUsers.admin

    mockNewPost.mockClear()
    mockNewPost.mockResolvedValue({
      success: 'Post created successfully'
    })

    mockSaveImages.mockResolvedValue(['new-image-url.jpg'])

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
  })

  it('renders the new post page without throwing an error', () => {
    expect(() => customRender(<NewPostPageView isLogged />)).not.toThrow()
  })

  it('renders new post form when user is logged in', () => {
    customRender(<NewPostPageView isLogged />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /create a new post/i })
    ).toBeInTheDocument()
  })

  it('does not allow submission when user is not logged in', async () => {
    customRender(<NewPostPageView isLogged={false} />)

    await waitFor(() => {
      expect(
        screen.queryByDisplayValue(/create a new post/i)
      ).not.toBeInTheDocument()
    })
  })

  it('submits form with new post values', async () => {
    const user = userEvent.setup()
    customRender(<NewPostPageView isLogged />)

    const titleInput = screen.getByLabelText(/title/i)
    const contentInput = screen.getByLabelText(/content/i)

    await user.type(titleInput, 'New Test Post')
    await user.type(contentInput, 'Test Content')

    const submitButton = screen.getByRole('button', {
      name: /create a new post/i
    })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockNewPost).toHaveBeenCalledWith({
        id: 'test-uuid',
        title: 'New Test Post',
        content: 'Test Content',
        imageUrls: [],
        categories: [],
        status: 'DRAFT'
      })
    })

    expect(spies.router.back).toHaveBeenCalled()
  })

  it('handles file selection correctly', async () => {
    const user = userEvent.setup()
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    customRender(<NewPostPageView isLogged />)

    const fileInput = screen.getByTestId('file') as HTMLInputElement
    await user.upload(fileInput, file)

    await waitFor(() => {
      expect(fileInput.files).toBeTruthy()
      expect(fileInput.files?.[0]).toBeTruthy()
      expect(fileInput.files?.[0].name).toBe('test.jpg')
    })
  })

  it('handles image upload during submission', async () => {
    const user = userEvent.setup()
    customRender(<NewPostPageView isLogged />)

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const fileInput = screen.getByTestId('file') as HTMLInputElement

    await user.upload(fileInput, file)

    const submitButton = screen.getByRole('button', {
      name: /create a new post/i
    })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockNewPost).toHaveBeenCalled()
    })
  })
})
