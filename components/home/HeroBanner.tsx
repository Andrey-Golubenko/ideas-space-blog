'use client'

import { useScreen } from '~/hooks/useScreen'
import Image from 'next/image'
import heroBanner from '~/public/images/hero-banner.webp'
import heroBannerMobil from '~/public/images/hero-banner-mobile.webp'

const HeroBanner = () => {
  const { isMobile } = useScreen()

  const imageSizes = isMobile ? '670px' : '1200px'

  return (
    <div
      className="relative size-full"
      style={{
        width: '100%',
        height: '600px'
      }}
    >
      <div className="absolute inset-0 bg-[#38b9ffe4]" />

      <Image
        alt="Hero banner"
        src={isMobile ? heroBannerMobil : heroBanner}
        fill
        sizes={imageSizes}
        placeholder="blur"
        priority
        className="z-10 h-auto !animate-banner-scale object-cover"
      />
    </div>
  )
}

export default HeroBanner
