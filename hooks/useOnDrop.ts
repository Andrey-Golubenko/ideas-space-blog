import { useCallback, type Dispatch, type SetStateAction } from 'react'
import { type FieldValues, type UseFormSetValue } from 'react-hook-form'

import { MAX_FILES_COUNT } from '~/utils/constants'
import { getImageNames } from '~/utils/helpers'
import { SingleFileSchema } from '~/schemas'
import { type OnDropType, type TFileError } from '~/types'

interface IuseOnDropProps {
  fieldName: string
  shouldHaveOnlyOneImage?: boolean
  multiple: boolean
  files?: File[]
  imageUrls: string[]
  setFilesErrors: Dispatch<SetStateAction<[] | TFileError[]>>
  setFilesDuplicate?: Dispatch<SetStateAction<[] | string[]>>
  setValue: UseFormSetValue<FieldValues>
}

/**
 * useOnDrop - A React hook for handling file drop events with validation, duplicate checks,
 * and file management in forms using `react-hook-form`.
 *
 * @param {Object} props - The properties required by the hook.
 * @param {string} props.fieldName - The form field name to associate the uploaded files with.
 * @param {boolean} [props.shouldHaveOnlyOneImage=false] - Determines if only a single image is allowed.
 * @param {boolean} props.multiple - Specifies whether multiple files can be uploaded.
 * @param {File[]} [props.files] - The current list of uploaded files.
 * @param {string[]} props.imageUrls - Existing image URLs for duplicate checks.
 * @param {Dispatch<SetStateAction<[] | TFileError[]>>} props.setFilesErrors - State updater for file errors.
 * @param {Dispatch<SetStateAction<[] | string[]>>} [props.setFilesDuplicate] - State updater for duplicate file names.
 * @param {UseFormSetValue<FieldValues>} props.setValue - `react-hook-form`'s `setValue` function for updating form state.
 *
 * @returns {Object} An object containing:
 * - `onDrop` (`Function`): The handler function to process dropped files, validate them, and update the form state.
 */
export const useOnDrop = ({
  fieldName,
  shouldHaveOnlyOneImage = false,
  multiple,
  files,
  imageUrls,
  setFilesErrors,
  setFilesDuplicate,
  setValue
}: IuseOnDropProps) => {
  const onDrop = useCallback<OnDropType & Function>(
    (droppedFiles: File[] = []) => {
      setFilesErrors([])

      const validFiles: File[] = []
      const errors: TFileError[] = []
      const filesCount = (files?.length || 0) + (droppedFiles?.length || 0)
      const maxFileCount = multiple ? MAX_FILES_COUNT : 1

      if (filesCount > maxFileCount) {
        errors.push({
          message: `You can upload up to ${maxFileCount} files only. Try again please.`
        })
      } else if (shouldHaveOnlyOneImage) {
        errors.push({
          message:
            'Should be only 1 image. Try to delete previous image at first.'
        })
      } else {
        droppedFiles.forEach((file) => {
          const validationResult = SingleFileSchema.safeParse(file)
          if (validationResult.success) {
            validFiles.push(file)
          } else {
            errors.push({
              fileName: file.name,
              message: validationResult.error.issues[0].message
            })
          }
        })
      }

      if (errors?.length) {
        setFilesErrors(errors)

        return
      }

      const existingImageNames = getImageNames(imageUrls) || []

      const existingFilesNames = files
        ?.map((file) => {
          return file.name
        })
        .concat(existingImageNames as [])

      const duplicatedFiles =
        validFiles
          .filter((file) => {
            return existingFilesNames?.includes(file?.name)
          })
          .map((file) => {
            return file?.name
          }) || []

      const uniqueFiles = validFiles.filter((file) => {
        return !existingFilesNames?.includes(file?.name)
      })

      if (duplicatedFiles?.length && setFilesDuplicate) {
        setFilesDuplicate(duplicatedFiles)
      }

      if (uniqueFiles.length) {
        const newFiles =
          (!!files?.length && [...files].concat(uniqueFiles)) ||
          uniqueFiles
        setValue(fieldName as 'files', newFiles)
      }
    },
    [files, imageUrls, setValue, fieldName, setFilesDuplicate]
  )

  return { onDrop }
}
