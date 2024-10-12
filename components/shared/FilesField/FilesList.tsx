'use client'

import { useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CrossCircledIcon } from '@radix-ui/react-icons'

import LoadableImage from '~/components/shared/LoadableImage'
import { getImageNameFromUrl } from '~/utils/helpers/helpers'

interface IFilesListProps {
  files?: File[]
  imageUrls?: string[]
  handleOnFileDelete: (name: string) => void
  handleOnImageUrlDelete: (name: string) => void
  isPending: boolean
}

const FilesList = ({
  files,
  imageUrls,
  handleOnFileDelete,
  handleOnImageUrlDelete,
  isPending
}: IFilesListProps) => {
  const [filesUrls, setFilesUrls] = useState<string[]>([])

  const [autoAnimateRef] = useAutoAnimate({ duration: 500 })

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (files?.length) {
      const urls = files?.map((file) => {
        return URL.createObjectURL(file)
      })
      setFilesUrls(urls)

      return () => {
        urls.forEach((url) => {
          return URL.revokeObjectURL(url)
        })
      }
    }
  }, [files])

  return (
    <div
      className={`grid gap-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${files && 'xs:min-h-[130px] md:min-h-[145px]'}`}
      ref={autoAnimateRef}
    >
      {!!imageUrls?.length &&
        imageUrls?.map((url) => {
          const imageName = getImageNameFromUrl(url) || ''

          return (
            <div
              key={imageName}
              className="relative"
            >
              <LoadableImage
                src={url}
                alt={imageName}
                containerHeight={130}
                imageClassNames={`border object-cover ${isPending ? 'grayscale' : ''}`}
              />
              {!isPending && (
                <CrossCircledIcon
                  className={`absolute inset-0 h-6 w-6 -translate-x-2/4 -translate-y-2/4 rounded-full bg-white 
                  ${isPending ? 'cursor-default' : 'cursor-pointer'}`}
                  onClick={() => {
                    return handleOnImageUrlDelete(imageName)
                  }}
                />
              )}
            </div>
          )
        })}

      {!!filesUrls?.length &&
        filesUrls?.map((url, index) => {
          const file = files![index]
          const fileName = file?.name

          return (
            <div
              key={url}
              className="relative"
            >
              <LoadableImage
                src={url || URL.createObjectURL(file)}
                alt={fileName}
                containerHeight={130}
                imageClassNames={`border object-cover ${isPending ? 'grayscale' : ''}`}
              />
              {!isPending && (
                <CrossCircledIcon
                  className={`absolute inset-0 h-6 w-6 -translate-x-2/4 -translate-y-2/4 rounded-full bg-white 
                  ${isPending ? 'cursor-default' : 'cursor-pointer'}`}
                  onClick={() => {
                    return handleOnFileDelete(fileName)
                  }}
                />
              )}
            </div>
          )
        })}
    </div>
  )
}

export default FilesList
