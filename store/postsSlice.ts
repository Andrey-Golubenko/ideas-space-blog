import { type StateCreator } from 'zustand/vanilla'
import {
  fetchPosts,
  fetchSinglePostById
} from '~/services/posts/posts.client'
import { fetchRecentPosts } from '~/services/posts/posts.server'
import { withNetworkCheck } from '~/utils/helpers/network'
import {
  type IPostsSlice,
  type TDeserializedPost,
  type IFetchPostsFunctionProps,
  type TTruncatedAuthors
} from '~/types'

export const postsSlice: StateCreator<IPostsSlice, [], [], IPostsSlice> = (
  set,
  get
) => ({
  posts: [],
  postsCount: null,
  singlePost: {},
  recentPosts: [],

  getFilteredPostsWithPag: async ({
    limit,
    offset,
    categoriesFilter,
    statusFilter,
    authorFilter,
    searchQuery
  }: IFetchPostsFunctionProps) => {
    set((state) => {
      return { ...state, isLoading: true }
    })

    try {
      await withNetworkCheck(
        // Online action
        async () => {
          const data = await fetchPosts({
            limit,
            offset,
            categoriesFilter,
            statusFilter,
            authorFilter,
            searchQuery
          })

          const posts = typeof data === 'string' ? data : data?.posts
          const postsCount =
            typeof data === 'string' ? null : data?.postsCount

          set((state) => {
            return { ...state, posts, postsCount }
          })
        },
        // Offline action - use cached data
        () => {
          // If we already have data in the store, we use it.
          const currentPosts = get().posts

          if (
            currentPosts &&
            Array.isArray(currentPosts) &&
            currentPosts.length > 0
          ) {
            // Filtering logic
            const catFilters = categoriesFilter?.split('.') ?? []

            const filteredPosts = currentPosts.filter((post) => {
              let matches = true

              if (categoriesFilter && catFilters.length > 0) {
                matches =
                  matches &&
                  catFilters.some((cat) =>
                    post.categories?.some(
                      (postCat) => postCat?.categorySlug === cat
                    )
                  )
              }

              if (statusFilter) {
                matches = matches && post.status === statusFilter
              }

              if (authorFilter) {
                matches =
                  matches &&
                  (post.author as TTruncatedAuthors)?.id === authorFilter
              }

              if (searchQuery) {
                const query = searchQuery.toLowerCase()
                matches =
                  matches &&
                  (post.title.toLowerCase().includes(query) ||
                    post.content.toLowerCase().includes(query))
              }

              return matches
            })

            // Apply pagination
            const paginatedPosts = filteredPosts.slice(
              offset,
              offset! + limit
            )

            set((state) => {
              return {
                ...state,
                posts: paginatedPosts,
                postsCount: filteredPosts.length
              }
            })
          } else {
            console.warn(
              'There is no cached data to display in offline mode.'
            )
          }
        }
      )
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      set((state) => {
        return { ...state, isLoading: false }
      })
    }
  },

  getRecentPosts: async () => {
    set((state) => {
      return { ...state, isLoading: true }
    })

    try {
      await withNetworkCheck(
        // Online action
        async () => {
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
        // Offline action
        () => {
          const currentRecentPosts = get().recentPosts

          if (
            !currentRecentPosts &&
            !Array.isArray(currentRecentPosts) &&
            !(currentRecentPosts.length > 0)
          ) {
            console.warn(
              'There is no cached data to display recent posts offline.'
            )
          }
        }
      )
    } catch (error) {
      console.error('Error fetching recent posts:', error)
    } finally {
      set((state) => {
        return { ...state, isLoading: false }
      })
    }
  },

  getSinglePostById: async (postId: string) => {
    set((state) => {
      return { ...state, isLoading: true }
    })

    try {
      await withNetworkCheck(
        // Online action
        async () => {
          const singlePost = await fetchSinglePostById(postId)

          set((state) => {
            return { ...state, singlePost }
          })
        },
        // Offline action
        () => {
          // Checking if this post is already in the cache
          const currentSinglePost = get().singlePost

          if (
            currentSinglePost &&
            (currentSinglePost as FullPost).id === postId
          ) {
            return
          }

          // If not, check if it is in the list of all posts.
          const allPosts = get().posts
          if (Array.isArray(allPosts)) {
            const foundPost = allPosts.find((post) => post.id === postId)
            if (foundPost) {
              set((state) => {
                return { ...state, singlePost: foundPost }
              })

              return
            }
          }

          // Check in recent posts
          const { recentPosts } = get()
          if (Array.isArray(recentPosts)) {
            const foundPost = recentPosts.find(
              (post) => post.id === postId
            )
            if (foundPost) {
              set((state) => {
                return { ...state, singlePost: foundPost }
              })

              return
            }
          }

          console.warn(
            'The cached post was not found for offline display.'
          )
        }
      )
    } catch (error) {
      console.error('error :>> ', error)
    } finally {
      set((state) => {
        return { ...state, isLoading: false }
      })
    }
  },

  setFilteredPostsWithPag: (posts: TDeserializedPost[] | []) => {
    set((state) => {
      return { ...state, posts }
    })
  },

  setSinglePost: (post: FullPost | {}) => {
    set((state) => {
      return { ...state, singlePost: post }
    })
  },

  deleteSinglePost: (postId: string) => {
    set((state) => {
      const posts = Array.isArray(state?.posts)
        ? (state?.posts as TDeserializedPost[])?.filter((post) => {
            return post.id !== postId
          })
        : []

      return { ...state, posts }
    })
  }
})
