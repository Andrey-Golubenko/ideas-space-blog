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
}

const FilesList = ({
  files,
  imageUrls,
  handleOnFileDelete,
  handleOnImageUrlDelete
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
      className={`grid grid-cols-4 gap-5 ${files && 'xs:min-h-[45px] sm:min-h-[65px] md:min-h-[140px]'}`}
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
                width={130}
                height={130}
                imageClassNames="aspect-square h-auto w-auto border object-cover"
              />
              <CrossCircledIcon
                className="absolute  inset-0 h-6 w-6 -translate-x-2/4 -translate-y-2/4 cursor-pointer rounded-full bg-white"
                onClick={() => {
                  return handleOnImageUrlDelete(imageName)
                }}
              />
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
                width={130}
                height={130}
                imageClassNames="aspect-square h-auto w-auto border object-cover"
                onLoad={() => {
                  return URL.revokeObjectURL(url)
                }}
              />
              <CrossCircledIcon
                className="absolute  inset-0 h-6 w-6 -translate-x-2/4 -translate-y-2/4 cursor-pointer rounded-full bg-white"
                onClick={() => {
                  return handleOnFileDelete(fileName)
                }}
              />
            </div>
          )
        })}
    </div>
  )
}

export default FilesList
