import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { getAllPosts, getPostBySearch } from '~/services/getPosts'
import { IPost } from '~/types'

interface UsePosts {
  posts: IPost[]
  isLoading: boolean
  getAllPosts: () => Promise<void>
  getPostsBySearch: (search: string) => Promise<void>
}

const usePosts = createWithEqualityFn<UsePosts>(
  (set, get) => ({
    posts: [],
    isLoading: false,
    getAllPosts: async () => {
      set({ isLoading: true })

      const posts = await getAllPosts()
      set({ posts, isLoading: false })
    },
    getPostsBySearch: async (search: string) => {
      set({ isLoading: true })

      const posts = await getPostBySearch(search)
      set({ posts, isLoading: false })
    }
  }),
  shallow
)

export default usePosts
