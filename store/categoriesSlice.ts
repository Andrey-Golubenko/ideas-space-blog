import { type StateCreator } from 'zustand/vanilla'
import {
  fetchCategories,
  fetchCategoriesTruncated
} from '~/services/categories/categories.client'
import { withNetworkCheck } from '~/utils/helpers/network'
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
> = (set, get) => ({
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
      await withNetworkCheck(
        // Online action
        async () => {
          const data = await fetchCategories({
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
        },
        // Offline action - use cached data
        () => {
          // If we already have data in the store, we use it
          const currentCategories = get().categories

          if (
            currentCategories &&
            Array.isArray(currentCategories) &&
            currentCategories.length > 0
          ) {
            // Filtering logic
            let filteredCategories = [...currentCategories]

            if (searchQuery) {
              const query = searchQuery.toLowerCase()
              filteredCategories = filteredCategories.filter(
                (category) =>
                  category.name.toLowerCase().includes(query) ||
                  (category.description &&
                    category.description.toLowerCase().includes(query))
              )
            }

            // Apply pagination
            const paginatedCategories = filteredCategories.slice(
              offset,
              offset! + limit
            )

            set((state) => {
              return {
                ...state,
                categories: paginatedCategories,
                categoriesCount: filteredCategories.length
              }
            })

            console.info(
              'Cached data is used for categories in offline mode.'
            )
          } else {
            console.warn(
              'There is no cached data to display categories offline.'
            )
          }
        }
      )
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
      await withNetworkCheck(
        // Online action
        async () => {
          const truncatedCategories = await fetchCategoriesTruncated()

          set((state) => {
            return { ...state, truncatedCategories }
          })
        },
        // Offline action
        () => {
          const currentTruncatedCategories = get().truncatedCategories

          if (
            currentTruncatedCategories &&
            Array.isArray(currentTruncatedCategories) &&
            currentTruncatedCategories.length > 0
          ) {
            console.info(
              'Cached data is used for abbreviated categories in offline mode.'
            )
          } else {
            // If there are no abbreviated categories, but there are complete categories - create abbreviated ones from the complete ones
            const fullCategories = get().categories
            if (
              fullCategories &&
              Array.isArray(fullCategories) &&
              fullCategories.length > 0
            ) {
              const truncated = fullCategories.map((cat) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug
              }))

              set((state) => {
                return { ...state, truncatedCategories: truncated }
              })

              console.info(
                'Abbreviated categories have been created from the full categories for offline mode'
              )
            } else {
              console.warn(
                'There is no cached data to display abbreviated categories in offline mode.'
              )
            }
          }
        }
      )
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
