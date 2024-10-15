import { useCallback, type Dispatch, type SetStateAction } from 'react'
import { type FieldValues, type UseFormSetValue } from 'react-hook-form'

import { MAX_FILES_COUNT } from '~/utils/constants/constants'
import { getImageNames } from '~/utils/helpers/helpers'
import { SingleFileSchema } from '~/schemas'
import { type OnDropType, type TFileError } from '~/types/types'

interface IuseOnDropProps {
  fieldName: string
  multiple: boolean
  files?: File[]
  imageUrls: string[]
  setFilesErrors: Dispatch<SetStateAction<[] | TFileError[]>>
  setFilesDuplicate?: Dispatch<SetStateAction<[] | string[]>>
  setValue: UseFormSetValue<FieldValues>
}

export const useOnDrop = ({
  fieldName,
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
