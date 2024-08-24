import * as z from 'zod'
import { type FileRejection, type DropEvent } from 'react-dropzone'
// eslint-disable-next-line import/no-cycle
import { ManagePostSchema } from '~/schemas'

export interface INavLink {
  label: string
  href: string
}

export interface ICommonErrorCardProps {
  error: Error
}

export type TManagePostForm = z.infer<typeof ManagePostSchema>

export type TFileError = {
  fileName?: string
  message: string
}

export type OnDropType =
  | (<T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => void)
  | undefined
