import { type ForwardRefExoticComponent, type RefAttributes } from 'react'
import * as z from 'zod'
import { type LucideProps } from 'lucide-react'
import { type SearchParams } from 'nuqs'

import { multiSelectVariants } from '~/components/ui/multi-select/multiSelectVariants'
import { type FileRejection, type DropEvent } from 'react-dropzone'
import { type VariantProps } from 'class-variance-authority'
import { type Post, type Categories } from '@prisma/client'
import type { TZDate } from '@date-fns/tz'
// eslint-disable-next-line import/no-cycle
import {
  LogInSchema,
  ManagePostSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetSchema,
  SettingsSchema,
  SingleCategorySchema
} from '~/schemas'

/**
 * Global store interfaces
 */
export interface IPostsSlice {
  posts: TDeserializedPost[] | string
  postsCount: number | null
  singlePost: FullPost | null
  recentPosts: TDeserializedPost[] | string

  getFilteredPostsWithPag: (props: IFetchPostsFunctionProps) => void
  setFilteredPostsWithPag: (posts: TDeserializedPost[] | []) => void
  getSinglePostById: (postId: string) => void
  getRecentPosts: () => Promise<void>
  setSinglePost: (post: FullPost | {} | TDeserializedPost) => void
  deleteSinglePost: (postId: string) => void
}

export interface ICategoriesSlice {
  categories: Categories[] | string | []
  categoriesCount: number | null
  editableCategory: Categories | {}

  getFilteredCategoriesWithPag: (props: IFetchDataFunctionProps) => void
  setEditableCategory: (category: Categories | {}) => void
  deleteSingleCategory: (categoryId: string) => void
}

export interface IUsersSlice {
  users: TDeserializedUser[] | string
  usersCount: number | null

  getFilteredUsersWithPag: (props: IFetchUsersFunctionProps) => void
  deleteSingleUser: (userId: string) => void
}

export interface IVisitsSlice {
  usersVisits: IUserVisit[] | null
  browserStats: IBrowserStats[] | null

  getUsersVisits: (startDate?: Date, endDate?: Date) => void
}

export interface ICookiesSlice {
  cookiesConsent: boolean
  isConsentModalOpen: boolean

  setCookiesConsent: (cookiesConsent: boolean) => void
  setIsConsentModalOpen: (open: boolean) => void
}

export interface ISlugPageParamsProps {
  params: {
    slug: string
  }
}

/**
 * Validations schemas types
 */

export type TManageLoginForm = z.infer<typeof LogInSchema>

export type TManageRegisterForm = z.infer<typeof RegisterSchema>

export type TManagePasswordForm = z.infer<typeof NewPasswordSchema>

export type TManageResetPasswordForm = z.infer<typeof ResetSchema>

export type TManagePostForm = z.infer<typeof ManagePostSchema>

export type TManageCategoryForm = z.infer<typeof SingleCategorySchema>

export type TManageUserForm = z.infer<typeof SettingsSchema>

/**
 * Props for MultiSelect component
 */
export interface IMultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string
    /** The unique value associated with the option. */
    value: string
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>
  }[]

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange:
    | ((value: string[]) => void)
    | ((...event: any[]) => void)
    | ((value: string) => void)

  /** The value of the field from react-hook-form. */
  fieldValue?: string[]

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string
}

/**
 * Common types and interfaces
 */

export interface INavLink {
  href: string
  label?: string
  icon?: React.ElementType
}

export type TFileError = {
  fileName?: string
  message: string
}

export type TActionReturn = Promise<
  | {
      error: string
      success?: undefined
    }
  | {
      success: string
      error?: undefined
    }
  | null
>

export type PostsData =
  | {
      posts: TDeserializedPost[]
      postsCount: number
    }
  | string

export type TListItem = TDeserializedPost | Categories | null

export type TItemType = {
  isPost?: boolean
  isCategory?: boolean
}

export type TItemSize = {
  isRegular?: boolean
  isTruncated?: boolean
}

export type TSkeletonItems = {
  firstItem?: TListItem
  secondItem?: TListItem
  thirdItem?: TListItem
  fourthItem?: TListItem
}

export type OnDropType =
  | (<T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => void)
  | undefined

export interface IPageWithSearchParamsProps {
  searchParams: SearchParams
}

export interface IRCWithSearchParamsKeyProps {
  searchParamsKey: string
}

export type TAdminSidebarItem = {
  title: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  path: string
}

export type TFullTZDate = TZDate & { internal: Date }

export type TVisitsByDate = Record<
  string,
  { date: string; desktop: number; mobile: number }
>

export interface IUserVisit {
  date: string
  desktop: number
  mobile: number
}

export interface IBrowserStats {
  browser: string
  visitors: number
  fill: string
}

export interface IFetchDataFunctionProps {
  limit: number
  searchQuery?: string | null
  currentPage?: number
  page?: number
  offset?: number
}

export interface IFetchPostsFunctionProps extends IFetchDataFunctionProps {
  categoriesFilter?: string | null
  statusFilter?: string | null
  authorFilter?: string | null
}

export interface IFetchUsersFunctionProps extends IFetchDataFunctionProps {
  providerFilter: string | null
}

export type TDeserializedUser = {
  id: string
  image: string | null
  name: string | null
  email: string
  provider: string
}

export type TTruncatedCategories = {
  id: string
  name: string
  slug: string
}

export type TTruncatedAuthors = {
  id: string
  name: string
}

export type TDeserializedPost = Omit<Post, 'authorId' | 'updatedAt'> & {
  author: TTruncatedAuthors | string | null
  categories: TCategoryOptions[] | null
}
