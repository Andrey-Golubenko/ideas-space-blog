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
import {
  fetchAllCategories,
  fetchCurrentPageOfFilteredCategories
} from '~/services/categories'
import {
  fetchCurrentPageOfFilteredPosts,
  fetchRecentPosts
} from '~/services/posts/posts.server'
import { fetchUsersVisits } from '~/services/userVisits/visitsData'
import { fetchCurrentPageOfFilteredUsers } from '~/services/user'
import {
  type TDeserializedPost,
  type IBrowserStats,
  type IUserVisit,
  type TDeserializedUser,
  type IFetchPostsFunctionProps,
  type IFetchUsersFunctionProps,
  type IFetchDataFunctionProps
} from '~/types'

interface IUseStore {
  posts: Post[] | string
  postsCount: number | null
  singlePost: FullPost | {}
  recentPosts: Post[] | null | string

  categories: Categories[] | null | []
  editableCategory: Categories | {}

  usersVisits: IUserVisit[] | null
  browserStats: IBrowserStats[] | null

  dataTablePosts: TDeserializedPost[]
  dataTableUsers: TDeserializedUser[] | []
  dataTableCategories: Categories[]

  isLoading: boolean

  getAllPosts: () => Promise<void>
  getPostsBySearch: (search: string) => Promise<void>
  getPostsByUserId: (userId: string) => Promise<void>
  getSinglePostById: (postId: string) => void
  setSinglePost: (post: FullPost | {} | TDeserializedPost) => void
  getRecentPosts: () => Promise<void>

  getAllCategories: () => Promise<void>
  setCategories: (categories: Categories[]) => void
  setEditableCategory: (category: Categories | {}) => void

  getDataTableUsers: (props: IFetchUsersFunctionProps) => void
  getDataTablePosts: (props: IFetchPostsFunctionProps) => void
  getDataTableCategories: (props: IFetchDataFunctionProps) => void

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
          recentPosts: null,

          categories: null,
          editableCategory: {},

          usersVisits: [],
          browserStats: [],

          dataTableUsers: [],
          dataTablePosts: [],
          dataTableCategories: [],

          isLoading: false,

          getAllPosts: async () => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchPosts()

            const posts = typeof data === 'string' ? data : data?.posts

            const postsCount =
              typeof data === 'string' ? null : data?.postsCount
            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          },

          getPostsBySearch: async (search: string) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchPostsBySearch(search)

            const posts = typeof data === 'string' ? data : data?.posts

            const postsCount =
              typeof data === 'string' ? null : data?.postsCount

            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          },

          getPostsByUserId: async (userId: string) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchPostsByUserId(userId)

            const posts = typeof data === 'string' ? data : data?.posts

            const postsCount =
              typeof data === 'string' ? null : data?.postsCount

            set((state) => {
              return { ...state, posts, postsCount, isLoading: false }
            })
          },

          getRecentPosts: async () => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchRecentPosts()

            const { recentPosts } = data

            set((state) => {
              return {
                ...state,
                recentPosts,
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
            const { categories } = data

            set((state) => {
              return {
                ...state,
                categories,
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
          },

          getDataTableUsers: async ({
            limit,
            offset,
            searchQuery,
            providerFilter
          }: IFetchUsersFunctionProps) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            try {
              const users = await fetchCurrentPageOfFilteredUsers({
                limit,
                offset,
                searchQuery,
                providerFilter
              })

              if (users) {
                set((state) => {
                  return { ...state, dataTableUsers: users }
                })
              }
            } catch (error) {
              console.error('Error fetching users:', error)
            } finally {
              set((state) => {
                return { ...state, isLoading: false }
              })
            }
          },

          getDataTablePosts: async ({
            limit,
            offset,
            searchQuery,
            categoriesFilter,
            publishedFilter
          }: IFetchPostsFunctionProps) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            try {
              const posts = await fetchCurrentPageOfFilteredPosts({
                limit,
                offset,
                searchQuery,
                categoriesFilter,
                publishedFilter
              })

              if (posts) {
                set((state) => {
                  return { ...state, dataTablePosts: posts }
                })
              }
            } catch (error) {
              console.error('Error fetching posts:', error)
            } finally {
              set((state) => {
                return { ...state, isLoading: false }
              })
            }
          },

          getDataTableCategories: async ({
            limit,
            offset,
            searchQuery
          }: IFetchDataFunctionProps) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            try {
              const categories =
                await fetchCurrentPageOfFilteredCategories({
                  limit,
                  offset,
                  searchQuery
                })

              if (categories) {
                set((state) => {
                  return { ...state, dataTableCategories: categories }
                })
              }
            } catch (error) {
              console.error('Error fetching posts:', error)
            } finally {
              set((state) => {
                return { ...state, isLoading: false }
              })
            }
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
