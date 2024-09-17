'use client'

import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type FormHTMLAttributes
} from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import {
  type Merge,
  type FieldError,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import usePosts from '~/store'
import FormError from '~/components/FormError'
import DuplicatesFilesList from '~/components/shared/FilesField/DuplicatesFilesList'
import FilesList from '~/components/shared/FilesField/FilesList'
import {
  ECCEPTED_IMAGES_EXTENTIONS,
  MAX_FILE_SIZE
} from '~/utils/constants/constants'
import { useOnDrop } from '~/hooks/useOnDrop'
import { TFileError, type TManagePostForm } from '~/types/types'

interface IFilesFieldProps {
  name: string
  type?: string
  filesDuplicates: string[]
  setFilesDuplicate: Dispatch<SetStateAction<[] | string[]>>
  validateErrors?: Merge<FieldError, (FieldError | undefined)[]>
  isPending: boolean
}

const FilesField = ({
  name,
  filesDuplicates,
  setFilesDuplicate,
  validateErrors,
  isPending,
  ...props
}: IFilesFieldProps & FormHTMLAttributes<HTMLInputElement>) => {
  const [filesErrors, setFilesErrors] = useState<TFileError[]>([])

  const [editablePost, setEditablePost] = usePosts((state) => {
    return [state.editablePost, state.setEditablePost]
  })

  const { register, unregister, setValue } =
    useFormContext<TManagePostForm>()

  const files = useWatch<TManagePostForm, 'files'>({ name: 'files' })
  const imageUrls =
    useWatch<TManagePostForm, 'imageUrls'>({
      name: 'imageUrls'
    }) || []

  const { onDrop } = useOnDrop({
    fieldName: name,
    files,
    imageUrls,
    setFilesErrors,
    setFilesDuplicate,
    setValue
  })

  useEffect(() => {
    register(name as 'files')
    return () => {
      unregister(name as 'files')
    }
  }, [register, unregister, name])

  useEffect(() => {
    if (Array.isArray(validateErrors) && validateErrors?.length) {
      validateErrors.forEach((error) => {
        setFilesErrors((prev) => {
          return [...prev, { message: error?.message }]
        })
      })
    }
  }, [validateErrors, setFilesErrors])

  const handleOnFileDelete = (fileName: string): void => {
    const newFiles = files?.filter((file) => {
      return file?.name !== fileName
    })
    setValue(name as 'files', newFiles)
  }

  const handleOnImageUrlDelete = (fileName: string): void => {
    const newImageUrls = imageUrls.filter((url) => {
      return !url.includes(fileName)
    })

    setEditablePost({ ...editablePost, imageUrls: newImageUrls })
  }

  const handleDropRejected = (fileRejections: FileRejection[]) => {
    const rejectedFilesNames = fileRejections
      ?.map(({ file }) => {
        return file?.name
      })
      .join(', ')

    const message = `You can't upload images: "${rejectedFilesNames}" with such extensions. Please try to upload images with other extensions.`

    setFilesErrors((prev) => {
      return [...prev, { message }]
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ECCEPTED_IMAGES_EXTENTIONS
    },
    onDrop,
    onDropRejected: handleDropRejected
  })

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
          accept="image/jpeg, image/png, image/heic, image/heif"
          disabled={isPending}
          {...getInputProps({ onChange })}
          {...props}
        />

        <p className="mb-4 text-center text-base font-light leading-7">
          Drag and drop your images here, or click to select files.
        </p>

        <p className="mb-4 text-center text-base font-light italic leading-7">
          The image size should be no more than{' '}
          <span className="text-red-700">
            {(MAX_FILE_SIZE / 1024 / 1024)?.toFixed() || 0} Mb
          </span>
          .
        </p>

        <p className="mb-4 text-center text-base font-light italic leading-7">
          The image extention should be only{' '}
          <span className="text-red-700">
            &quot;{ECCEPTED_IMAGES_EXTENTIONS.join(', ')}&ldquo;
          </span>
          .
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

      {(!!files?.length || !!imageUrls?.length) && (
        <FilesList
          files={files}
          imageUrls={imageUrls}
          handleOnFileDelete={handleOnFileDelete}
          handleOnImageUrlDelete={handleOnImageUrlDelete}
        />
      )}
    </>
  )
}

export default FilesField
