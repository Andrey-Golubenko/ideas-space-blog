import * as z from 'zod'

import { multiSelectVariants } from '~/components/ui/multi-select/multiSelectVariants'
import { type FileRejection, type DropEvent } from 'react-dropzone'
import { type VariantProps } from 'class-variance-authority'
import { type Post, type Categories } from '@prisma/client'
// eslint-disable-next-line import/no-cycle
import { ManagePostSchema, SingleCategorySchema } from '~/schemas'

export interface INavLink {
  label: string
  href: string
}

export interface ICommonErrorCardProps {
  error: Error
}

export type TFileError = {
  fileName?: string
  message: string
}

export type TManagePostForm = z.infer<typeof ManagePostSchema>

export type TManageCategoryForm = z.infer<typeof SingleCategorySchema>

export type TListItem = Post | Categories

export type TSkeletonItems = {
  firstItem?: TListItem
  secondItem?: TListItem
  thirdItem?: TListItem
}

export type OnDropType =
  | (<T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => void)
  | undefined

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
