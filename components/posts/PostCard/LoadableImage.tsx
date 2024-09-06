import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Skeleton } from '~/components/ui/skeleton'
import { PATHS } from '~/utils/constants/constants'
import { useOnScreen } from '~/hooks/useOnScreen'

interface ILoadableImageProps {
  postImage: string
  postId: string
}

const LoadableImage = ({ postImage, postId }: ILoadableImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const containerRef = useRef<HTMLAnchorElement | null>(null)

  const imageRef = useRef<HTMLImageElement | null>(null)

  const isVisible = useOnScreen(containerRef)

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return
    }

    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true)
      }
    }
  }, [isLoaded, isVisible])

  return (
    <Link
      ref={containerRef}
      href={`${PATHS.blog}/${postId}`}
      className="w-full duration-500 hover:scale-105"
    >
      {isVisible || isLoaded ? (
        <Image
          ref={imageRef}
          src={postImage}
          alt="Post image"
          priority
          width={130}
          height={100}
          className="aspect-[5/4] h-full w-full rounded-t-md object-cover duration-500 hover:rounded-b-md"
        />
      ) : (
        <Skeleton className="mb-4 h-[260px] w-full" />
      )}
    </Link>
  )
}

export default LoadableImage
