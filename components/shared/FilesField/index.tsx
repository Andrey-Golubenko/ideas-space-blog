'use client'

import {
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type FormHTMLAttributes
} from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import {
  useFormContext,
  useWatch,
  type Merge,
  type FieldError
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { UploadIcon } from '@radix-ui/react-icons'
import { useOnDrop } from '~/hooks/useOnDrop'
import NotificationError from '~/components/notifications/NotificationError'
import DuplicatesFilesList from '~/components/shared/FilesField/DuplicatesFilesList'
import FilesList from '~/components/shared/FilesField/FilesList'
import {
  ACCEPTED_IMAGES_EXTENSIONS,
  MAX_FILE_SIZE
} from '~/utils/constants'
import { cn } from '~/libs/utils'
import { type TFileError } from '~/types'

interface IFilesFieldProps {
  name: string
  additionalName: string
  isWithSingleImage?: boolean
  multiple?: boolean
  type?: string
  filesDuplicates?: string[]
  setFilesDuplicate?: Dispatch<SetStateAction<[] | string[]>>
  validateErrors?: Merge<FieldError, (FieldError | undefined)[]>
  isPending: boolean
}

const FilesField = ({
  name,
  additionalName,
  isWithSingleImage = false,
  multiple = false,
  filesDuplicates,
  setFilesDuplicate,
  validateErrors,
  isPending,
  ...props
}: IFilesFieldProps & FormHTMLAttributes<HTMLInputElement>) => {
  const [filesErrors, setFilesErrors] = useState<TFileError[]>([])

  const { register, setValue } = useFormContext()

  useEffect(() => {
    register(name)
    register(additionalName)
  }, [register, name, additionalName])

  useEffect(() => {
    if (Array.isArray(validateErrors) && validateErrors?.length) {
      validateErrors.forEach((error) => {
        setFilesErrors((prev) => {
          return [...prev, { message: error?.message }]
        })
      })
    }
  }, [validateErrors, setFilesErrors])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const files: File[] = useWatch({ name }) || []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const imageUrls: string[] =
    useWatch({
      name: additionalName
    }) || []

  const imageUrlsArray: string[] = Array.isArray(imageUrls)
    ? imageUrls
    : [imageUrls]

  const shouldHaveOnlyOneImage: boolean =
    isWithSingleImage && !!imageUrlsArray?.length

  const { onDrop } = useOnDrop({
    fieldName: name,
    shouldHaveOnlyOneImage,
    multiple,
    files,
    imageUrls: imageUrlsArray,
    setFilesErrors,
    setFilesDuplicate,
    setValue
  })

  const handleOnFileDelete = useCallback(
    (fileName: string): void => {
      const newFiles = files?.filter((file) => {
        return file?.name !== fileName
      })

      setValue('files', newFiles)
    },
    [files, setValue]
  )

  const handleOnImageUrlDelete = useCallback(
    (imageName: string): void => {
      const newImageUrls = imageUrlsArray.filter((url) => {
        return !url.includes(imageName)
      })

      const formFieldNewImageUrls = Array.isArray(imageUrls)
        ? newImageUrls
        : newImageUrls.join()

      setValue(additionalName, formFieldNewImageUrls)
    },
    [imageUrlsArray, setValue]
  )

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
      'image/*': [...ACCEPTED_IMAGES_EXTENSIONS]
    },
    onDrop,
    onDropRejected: handleDropRejected,
    multiple
  })

  const { onChange } = register(name as 'files')

  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center gap-y-4 rounded-md border border-dashed border-slate-400/80 bg-slate-50 px-5 py-7 hover:bg-slate-100',
          isPending ? 'cursor-default' : 'cursor-pointer'
        )}
        {...(isPending ? undefined : getRootProps())}
      >
        <input
          name={name}
          data-testid={name}
          type="file"
          multiple={multiple}
          accept={`image/*,${ACCEPTED_IMAGES_EXTENSIONS.join(',')}`}
          disabled={isPending}
          {...getInputProps({ onChange })}
          {...props}
        />

        <div className="mx-auto inline-flex rounded-full border border-dashed border-slate-400/60 p-3">
          <UploadIcon className="size-7" />
        </div>

        <p className="text-center text-base font-light leading-7">
          Drag and drop your images here, or click to select files.
        </p>

        <p className="text-center text-base font-light italic leading-7">
          The image size should be no more than{' '}
          <span className="whitespace-nowrap text-red-700">
            {(MAX_FILE_SIZE / 1024 / 1024)?.toFixed() || 0} Mb
          </span>
          .
        </p>

        <p className="text-center text-base font-light italic leading-7">
          The image extension should be only{' '}
          <span className="text-red-700">
            &quot;{ACCEPTED_IMAGES_EXTENSIONS.join(', ')}&ldquo;
          </span>
          .
        </p>
      </div>

      {!!filesErrors.length &&
        filesErrors.map(({ fileName, message }) => {
          const key = fileName || uuidv4()

          const completeMessage = fileName
            ? `The size of the "${fileName}" ${message}`
            : message

          return (
            <NotificationError
              key={key}
              message={completeMessage}
            />
          )
        })}

      {!!filesDuplicates?.length && (
        <DuplicatesFilesList filesDuplicates={filesDuplicates} />
      )}

      {(!!files?.length || !!imageUrlsArray?.length) && (
        <FilesList
          files={files}
          imageUrls={imageUrlsArray}
          handleOnFileDelete={handleOnFileDelete}
          handleOnImageUrlDelete={handleOnImageUrlDelete}
          isPending={isPending}
        />
      )}
    </>
  )
}

export default FilesField
