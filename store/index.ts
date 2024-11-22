import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { type Categories, type Post } from '@prisma/client'

import {
  fetchPosts,
  fetchPostsBySearch,
  fetchPostsByUserId,
  fetchSinglePostById
} from '~/services/posts/posts.client'
import { fetchAllCategories } from '~/services/categories'
import { fetchRecentPosts } from '~/services/posts/posts.server'
import { fetchUsersVisits } from '~/services/userVisits/visitsData'
import { type IBrowserStats, type IUserVisit } from '~/types'

interface IUseStore {
  posts: Post[]
  postsCount: number | null
  singlePost: FullPost | {}
  recentPosts: Post[]
  recentPostsCount: number | null

  categories: Categories[]
  categoriesCount: number | null
  editableCategory: Categories | {}

  usersVisits: IUserVisit[] | null
  browserStats: IBrowserStats[] | null

  isLoading: boolean

  getAllPosts: () => Promise<void>
  getPostsBySearch: (search: string) => Promise<void>
  getPostsByUserId: (userId: string) => Promise<void>
  getSinglePostById: (postId: string) => void
  setSinglePost: (post: FullPost | {}) => void
  getRecentPosts: () => Promise<void>

  getAllCategories: () => Promise<void>
  setCategories: (categories: Categories[]) => void
  setCategoriesCount: (categoriesLength: number) => void
  setEditableCategory: (category: Categories | {}) => void

  getUsersVisits: (startDate?: Date, endDate?: Date) => void
}

const useStore = createWithEqualityFn<
  IUseStore,
  [['zustand/devtools', never], ['zustand/persist', IUseStore]]
>(
  devtools(
    // persist() - to enable state persistence across page reloads or browser sessions
    persist(
      (set) => {
        return {
          posts: [],
          postsCount: null,
          singlePost: {},
          recentPosts: [],
          recentPostsCount: null,
          categories: [],
          categoriesCount: null,
          editableCategory: {},
          usersVisits: [],
          browserStats: [],
          isLoading: false,

          getAllPosts: async () => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchPosts()
            const { posts, postsCount } = data

            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          },

          getPostsBySearch: async (search: string) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchPostsBySearch(search)
            const { posts, postsCount } = data

            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          },

          getPostsByUserId: async (userId: string) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchPostsByUserId(userId)

            const { posts, postsCount } = data

            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          },

          getRecentPosts: async () => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchRecentPosts()

            const { recentPosts, recentPostsCount } = data

            set((state) => {
              return {
                ...state,
                recentPosts,
                recentPostsCount,
                isLoading: false
              }
            })
          },

          getSinglePostById: async (postId: string) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const singlePost = await fetchSinglePostById(postId)

            set((state) => {
              return { ...state, singlePost, isLoading: false }
            })
          },

          setSinglePost: (post: FullPost | {}) => {
            set((state) => {
              return { ...state, singlePost: post }
            })
          },

          getAllCategories: async () => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchAllCategories()
            const { categories, categoriesCount } = data

            set((state) => {
              return {
                ...state,
                categories,
                categoriesCount,
                isLoading: false
              }
            })
          },

          // After deliting one category
          setCategories: (categories: Categories[]) => {
            set((state) => {
              return { ...state, categories }
            })
          },

          setCategoriesCount: (categoriesLength: number) => {
            set((state) => {
              return { ...state, categoriesCount: categoriesLength }
            })
          },

          setEditableCategory: (category: Categories | {}) => {
            set((state) => {
              return { ...state, editableCategory: category }
            })
          },

          getUsersVisits: async (startDate?: Date, endDate?: Date) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const visitsData = await fetchUsersVisits(startDate, endDate)

            set((state) => {
              return {
                ...state,
                usersVisits: visitsData?.visitsByDate ?? [],
                browserStats: visitsData?.browserStats ?? [],
                isLoading: false
              }
            })
          }
        }
      },
      {
        name: 'storage',
        storage: createJSONStorage(() => {
          return sessionStorage
        })
      }
    ),
    shallow
  )
)

export default useStore
