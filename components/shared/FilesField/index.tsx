'use client'

import {
  useState,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type FormHTMLAttributes
} from 'react'
import { useDropzone } from 'react-dropzone'
import {
  type Merge,
  type FieldError,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import FormError from '~/components/FormError'
import FilesList from '~/components/shared/FilesField/FilesList'
import DuplicatesFilesList from '~/components/shared/FilesField/DuplicatesFilesList'
import {
  MAX_FILES_COUNT,
  MAX_FILE_SIZE
} from '~/utils/constants/constants'
import {
  type TFileError,
  type OnDropType,
  type TManagePostForm
} from '~/types/types'
import { SingleFileSchema } from '~/schemas'

interface IFilesFieldProps {
  name: string
  type?: string
  register: UseFormRegister<TManagePostForm>
  watch: UseFormWatch<TManagePostForm>
  setValue: UseFormSetValue<TManagePostForm>
  filesDuplicates: string[]
  setFilesDuplicate: Dispatch<SetStateAction<[] | string[]>>
  validateErrors?: Merge<FieldError, (FieldError | undefined)[]>
  isPending: boolean
}

const FilesField = ({
  name,
  register,
  watch,
  setValue,
  filesDuplicates,
  setFilesDuplicate,
  validateErrors,
  isPending,
  ...props
}: IFilesFieldProps & FormHTMLAttributes<HTMLInputElement>) => {
  const [filesErrors, setFilesErrors] = useState<TFileError[]>([])

  const files = watch(name as 'files')

  useEffect(() => {
    register(name as 'files')
  }, [register, name])

  useEffect(() => {
    if (Array.isArray(validateErrors) && validateErrors?.length) {
      validateErrors.forEach((error) => {
        setFilesErrors((prev) => {
          return [...prev, { message: error?.message }]
        })
      })
    }
  }, [validateErrors])

  const onDrop = useCallback<OnDropType & Function>(
    (droppedFiles: File[] = []) => {
      const validFiles: File[] = []
      const errors: TFileError[] = []
      const filesCount = files.length + droppedFiles.length

      if (filesCount > MAX_FILES_COUNT) {
        errors.push({
          message: `You can upload up to ${MAX_FILES_COUNT} files only`
        })
      } else {
        droppedFiles.forEach((file) => {
          const result = SingleFileSchema.safeParse(file)
          if (result.success) {
            validFiles.push(file)
          } else {
            errors.push({
              fileName: file.name,
              message: result.error.issues[0].message
            })
          }
        })
      }

      setFilesErrors(errors)

      const filesNames = files?.map((file) => {
        return file.name
      })

      const duplicatedFiles = validFiles
        .filter((file) => {
          return filesNames?.includes(file?.name)
        })
        .map((file) => {
          return file?.name
        })

      const uniqueFiles = validFiles.filter((file) => {
        return !filesNames?.includes(file?.name)
      })

      setFilesDuplicate(duplicatedFiles)

      if (uniqueFiles.length) {
        const newFiles =
          (!!files?.length && [...files].concat(uniqueFiles)) ||
          uniqueFiles
        setValue(name as 'files', newFiles)
      }
    },
    [files, setValue, name, setFilesDuplicate]
  )

  const handleOnDelete = (fileName: string) => {
    const newFiles = files.filter((file) => {
      return file?.name !== fileName
    })
    setValue(name as 'files', newFiles)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const { onChange } = register(name as 'files')

  return (
    <>
      <div
        className="cursor-pointer rounded-md bg-slate-100 px-5 py-7"
        {...getRootProps()}
      >
        <input
          name={name}
          type="file"
          multiple
          accept="image/*"
          disabled={isPending}
          {...getInputProps({ onChange })}
          {...props}
        />
        <p className="text-center text-base font-light leading-7">
          Drag and drop your images here, or click to select files.
        </p>
        <p className="text-center text-base font-light leading-7">
          The file size should be no more than{' '}
          {(MAX_FILE_SIZE / 1024 / 1024)?.toFixed() || 0} Mb.
        </p>
      </div>

      {!!filesErrors.length &&
        filesErrors.map(({ fileName, message }) => {
          const key = fileName || uuidv4()

          const completeMessage = fileName
            ? `The size of the ${fileName} ${message}`
            : message

          return (
            <FormError
              key={key}
              message={completeMessage}
            />
          )
        })}

      {!!filesDuplicates.length && (
        <DuplicatesFilesList filesDuplicates={filesDuplicates} />
      )}

      {!!files?.length && (
        <FilesList
          files={files}
          handleOnDelete={handleOnDelete}
        />
      )}
    </>
  )
}

export default FilesField
