'use client'

import { useState } from 'react'
import Image from 'next/image'

import { useScreen } from '~/hooks/useScreen'
import { cn } from '~/libs/utils'
import heroBanner from '~/public/images/hero-banner.webp'
import heroBannerMobil from '~/public/images/hero-banner-mobile.webp'

const HeroBanner = () => {
  const { isMobile } = useScreen()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const imageSizes = isMobile ? '670px' : '1200px'

  return (
    <div className="relative h-[600px] w-full">
      <Image
        alt="Hero banner"
        src={isMobile ? heroBannerMobil : heroBanner}
        fill
        sizes={imageSizes}
        className={cn(
          'z-10 h-auto object-cover',
          isLoaded && '!animate-banner-scale'
        )}
        placeholder="blur"
        priority
        blurDataURL="data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAQAgCdASoKAAoAAgA0JZgCdAEXp3lylhIAAP7KsKWv42ehK4gexFd/mMp9P1D29jHuXh7uTzoyMaHVtroI2lnQUWH8f7cgHo8BG4bw+535jIhdKCEGpKUAAAA="
        onLoad={() => setTimeout(() => setIsLoaded(true), 500)}
      />
    </div>
  )
}

export default HeroBanner
