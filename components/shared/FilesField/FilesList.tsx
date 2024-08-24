'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CrossCircledIcon } from '@radix-ui/react-icons'

interface IFilesListProps {
  files: File[]
  handleOnDelete: (name: string) => void
}

const FilesList = ({ files, handleOnDelete }: IFilesListProps) => {
  const [filesURLs, setFilesURLs] = useState<string[] | []>([])

  useEffect(() => {
    const urls = files.map((file) => {
      return URL.createObjectURL(file)
    })

    setFilesURLs(urls)

    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url)
      })
    }
  }, [files])

  return (
    <div className="grid grid-cols-4 gap-5">
      {!!filesURLs?.length &&
        filesURLs?.map((url, index) => {
          const file = files[index]

          return (
            <div
              key={url}
              className="relative"
            >
              <Image
                src={url}
                alt={file?.name}
                width={25}
                height={25}
                className="aspect-square h-32 w-32 border object-cover"
              />
              <CrossCircledIcon
                className="absolute  inset-0 h-6 w-6 -translate-x-2/4 -translate-y-2/4 cursor-pointer rounded-full bg-white"
                onClick={() => {
                  return handleOnDelete(file?.name)
                }}
              />
            </div>
          )
        })}
    </div>
  )
}

export default FilesList
