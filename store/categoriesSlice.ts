import { type StateCreator } from 'zustand/vanilla'

import {
  fetchCategories,
  fetchCategoriesTruncated
} from '~/services/categories/categories.client'
import { type Categories } from '@prisma/client'
import {
  type ICategoriesSlice,
  type IFetchDataFunctionProps
} from '~/types'

export const categoriesSlice: StateCreator<
  ICategoriesSlice,
  [],
  [],
  ICategoriesSlice
> = (set) => ({
  categories: [],
  categoriesCount: null,
  truncatedCategories: [],
  editableCategory: {},

  getFilteredCategoriesWithPag: async ({
    limit,
    offset,
    searchQuery
  }: IFetchDataFunctionProps) => {
    set((state) => {
      return { ...state, isLoading: true }
    })

    try {
      const data = await fetchCategories({
        limit,
        offset,
        searchQuery
      })

      const categories = typeof data === 'string' ? data : data?.categories

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

  getTruncatedCategories: async () => {
    set((state) => {
      return { ...state, isLoading: true }
    })

    try {
      const truncatedCategories = await fetchCategoriesTruncated()

      set((state) => {
        return { ...state, truncatedCategories }
      })
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      set((state) => {
        return { ...state, isLoading: false }
      })
    }
  },

  setEditableCategory: (category: Categories | {}) => {
    set((state) => {
      return { ...state, editableCategory: category }
    })
  },

  // After deleting one category
  deleteSingleCategory: (categoryId: string) => {
    set((state) => {
      const categories = Array.isArray(state?.categories)
        ? state?.categories?.filter((category) => {
            return category.id !== categoryId
          })
        : []

      return { ...state, categories }
    })
  }
})
