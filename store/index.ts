import { persist, devtools } from 'zustand/middleware'
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

const usePosts = createWithEqualityFn<
  UsePosts,
  [['zustand/devtools', never], ['zustand/persist', UsePosts]]
>(
  devtools(
    persist(
      (set) => ({
        posts: [],
        isLoading: false,
        getAllPosts: async () => {
          set((state) => ({ ...state, isLoading: true }))

          const posts = await getAllPosts()
          set((state) => ({ ...state, posts, isLoading: false }))
        },
        getPostsBySearch: async (search: string) => {
          set((state) => ({ ...state, isLoading: true }))

          const posts = await getPostBySearch(search)
          set((state) => ({ ...state, posts, isLoading: false }))
        }
      }),
      shallow
    )
  )
)

export default usePosts
