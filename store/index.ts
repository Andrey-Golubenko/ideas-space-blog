import { persist, devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { getPosts, getPostBySearching } from '~/services/posts'
import { type Post } from '@prisma/client'

interface IUsePosts {
  posts: Post[]
  isLoading: boolean
  getAllPosts: () => Promise<void>
  // getPostsBySearch: (search: string) => Promise<void>
}

const usePosts = createWithEqualityFn<
  IUsePosts,
  [['zustand/devtools', never], ['zustand/persist', IUsePosts]]
>(
  devtools(
    // persist() - to enable state persistence across page reloads or browser sessions
    persist((set) => {
      return {
        posts: [],
        isLoading: false,
        getAllPosts: async () => {
          set((state) => {
            return { ...state, isLoading: true }
          })

          const posts = await getPosts()
          set((state) => {
            return { ...state, posts, isLoading: false }
          })
        }
        // getPostsBySearch: async (search: string) => {
        //   set((state) => {
        //     return { ...state, isLoading: true }
        //   })

        //   const posts = await getPostBySearching(search)
        //   set((state) => {
        //     return { ...state, posts, isLoading: false }
        //   })
        // }
      }
    }, shallow)
  )
)

export default usePosts
