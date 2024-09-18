/* eslint-disable prettier/prettier */
import { useRef, useState } from 'react'
import Image, { type ImageProps } from 'next/image'

import { useOnScreen } from '~/hooks/useOnScreen'

interface ILoadableImageProps extends ImageProps {
  containerClassNames?: string
  imageClassNames?: string
}

const LoadableImage = ({
  src,
  alt,
  width,
  height,
  containerClassNames,
  imageClassNames
}: ILoadableImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const isVisible = useOnScreen(containerRef)

  return (
    <div
      ref={containerRef}
      className={`relative box-border h-full min-h-[${height}px] overflow-hidden bg-[linear-gradient(101.42deg,_#b7dbff_-0.04%,_rgba(223,_239,_255,_0.27)_94.2%)]
        before:absolute before:left-[-110%] before:top-0 before:block before:h-full before:w-full before:animate-image-on-load before:bg-gradient-to-r before:from-transparent before:via-[#07629317] before:to-transparent before:content-['']
        ${isLoaded ? 'before:animate-none before:bg-none bg-none' : ''}  
        ${containerClassNames || ''}`}
    >
      {(isVisible || isLoaded) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => {
            return setIsLoaded(true)
          }}
          className={`opacity-0 transition-opacity duration-500 ease-in-out 
            ${isLoaded ? '!opacity-100' : ''} 
            ${imageClassNames || ''}`}
        />
      )}
    </div>
  )
}

export default LoadableImage
