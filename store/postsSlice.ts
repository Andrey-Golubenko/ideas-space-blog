import { type StateCreator } from 'zustand/vanilla'

import {
  fetchPosts,
  fetchSinglePostById
} from '~/services/posts/posts.client'
import { fetchRecentPosts } from '~/services/posts/posts.server'
import {
  type IPostsSlice,
  type TDeserializedPost,
  type IFetchPostsFunctionProps
} from '~/types'

export const postsSlice: StateCreator<IPostsSlice, [], [], IPostsSlice> = (
  set
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
      const data = await fetchPosts({
        limit,
        offset,
        categoriesFilter,
        statusFilter,
        authorFilter,
        searchQuery
      })

      const posts = typeof data === 'string' ? data : data?.posts

      const postsCount = typeof data === 'string' ? null : data?.postsCount

      set((state) => {
        return { ...state, posts, postsCount }
      })
    } catch (error) {
      console.error('Error fetching posts:', error)
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

    try {
      const singlePost = await fetchSinglePostById(postId)

      set((state) => {
        return { ...state, singlePost }
      })
    } catch (error) {
      console.error('error :>> ', error)
    } finally {
      set((state) => {
        return { ...state, isLoading: false }
      })
    }
  },

  setSinglePost: (post: FullPost | {}) => {
    set((state) => {
      return { ...state, singlePost: post }
    })
  },

  // After deleting one post
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
