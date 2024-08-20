import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { type Post } from '@prisma/client'

import { getPosts, getPostsBySearching } from '~/services/posts'

interface IUsePosts {
  posts: Post[]
  postsCount: number | null
  isLoading: boolean
  editablePost: Post | {}
  getAllPosts: () => Promise<void>
  getPostsBySearch: (search: string) => Promise<void>
  setEditablePost: (post: Post | {}) => void
}

const usePosts = createWithEqualityFn<
  IUsePosts,
  [['zustand/devtools', never], ['zustand/persist', IUsePosts]]
>(
  devtools(
    // persist() - to enable state persistence across page reloads or browser sessions
    persist(
      (set) => {
        return {
          posts: [],
          postsCount: null,
          isLoading: false,
          editablePost: {},
          getAllPosts: async () => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await getPosts()
            const { posts, postsCount } = data

            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          },
          setEditablePost: (post: Post | {}) => {
            set((state) => {
              return { ...state, editablePost: post }
            })
          },
          getPostsBySearch: async (search: string) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await getPostsBySearching(search)
            const { posts, postsCount } = data

            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          }
        }
      },
      {
        name: 'posts-storage',
        storage: createJSONStorage(() => {
          return sessionStorage
        })
      }
    ),
    shallow
  )
)

export default usePosts
