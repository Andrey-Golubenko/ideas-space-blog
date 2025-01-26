import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import {
  fetchPosts,
  fetchSinglePostById
} from '~/services/posts/posts.client'
import { fetchFilteredCategoriesWithPag } from '~/services/categories'
import { fetchRecentPosts } from '~/services/posts/posts.server'
import { fetchUsersVisits } from '~/services/userVisits/visitsData'
import { fetchCurrentPageOfFilteredUsers } from '~/services/user'
import { type Categories } from '@prisma/client'
import {
  type TDeserializedPost,
  type IBrowserStats,
  type IUserVisit,
  type TDeserializedUser,
  type IFetchPostsFunctionProps,
  type IFetchUsersFunctionProps,
  type IFetchDataFunctionProps
} from '~/types'

interface IUseGlobalStore {
  posts: TDeserializedPost[] | string
  postsCount: number | null
  singlePost: FullPost | {}
  recentPosts: TDeserializedPost[] | null | string

  categories: Categories[] | string
  categoriesCount: number | null
  editableCategory: Categories | {}

  usersVisits: IUserVisit[] | null
  browserStats: IBrowserStats[] | null

  dataTableUsers: TDeserializedUser[] | []

  isLoading: boolean

  getFilteredPostsWithPag: (props: IFetchPostsFunctionProps) => void
  getSinglePostById: (postId: string) => void
  getRecentPosts: () => Promise<void>
  setSinglePost: (post: FullPost | {} | TDeserializedPost) => void
  deleteSinglePost: (postId: string) => void

  getFilteredCategoriesWithPag: (props: IFetchDataFunctionProps) => void
  setEditableCategory: (category: Categories | {}) => void
  deleteSingleCategory: (categoryId: string) => void

  getDataTableUsers: (props: IFetchUsersFunctionProps) => void

  getUsersVisits: (startDate?: Date, endDate?: Date) => void
}

const useGlobalStore = createWithEqualityFn<
  IUseGlobalStore,
  [['zustand/devtools', never], ['zustand/persist', IUseGlobalStore]]
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

          categories: [],
          categoriesCount: null,
          editableCategory: {},

          usersVisits: [],
          browserStats: [],

          dataTableUsers: [],

          isLoading: false,

          getFilteredPostsWithPag: async ({
            limit,
            offset,
            categoriesFilter,
            publishedFilter,
            authorFilter,
            searchQuery
          }: IFetchPostsFunctionProps) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            const data = await fetchPosts({
              limit,
              offset,
              categoriesFilter,
              publishedFilter,
              authorFilter,
              searchQuery
            })

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

          // After deliting one post
          deleteSinglePost: (postId: string) => {
            set((state) => {
              const posts = Array.isArray(state?.posts)
                ? (state?.posts as TDeserializedPost[])?.filter((post) => {
                    return post.id !== postId
                  })
                : []

              return { ...state, posts }
            })
          },

          getFilteredCategoriesWithPag: async ({
            limit,
            offset,
            searchQuery
          }: IFetchDataFunctionProps) => {
            set((state) => {
              return { ...state, isLoading: true }
            })

            try {
              const data = await fetchFilteredCategoriesWithPag({
                limit,
                offset,
                searchQuery
              })

              const categories =
                typeof data === 'string' ? data : data?.categories

              const categoriesCount =
                typeof data === 'string' ? null : data?.categoriesCount

              set((state) => {
                return { ...state, categories, categoriesCount }
              })
            } catch (error) {
              console.error('Error fetching categories:', error)
            } finally {
              set((state) => {
                return { ...state, isLoading: false }
              })
            }
          },

          // After deliting one category
          deleteSingleCategory: (categoryId: string) => {
            set((state) => {
              const categories = Array.isArray(state?.categories)
                ? state?.categories?.filter((category) => {
                    return category.id !== categoryId
                  })
                : []

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

export default useGlobalStore
