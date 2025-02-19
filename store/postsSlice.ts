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
  singlePost: null,
  recentPosts: null,

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

    const postsCount = typeof data === 'string' ? null : data?.postsCount

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
  }
})
