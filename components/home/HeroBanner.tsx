'use client'

import { useScreen } from '~/hooks/useScreen'
import LoadableImage from '~/components/shared/LoadableImage'
import { IMAGES_PATHS } from '~/utils/constants'

const HeroBanner = () => {
  const { isMobile } = useScreen()

  return (
    <div className="w-full">
      <LoadableImage
        src={
          isMobile ? IMAGES_PATHS.heroBannerMobil : IMAGES_PATHS.heroBanner
        }
        alt="Hero banner"
        containerHeight={600}
        priority
        imageClassNames="!animate-banner-scale object-cover"
      />
    </div>
  )
}

export default HeroBanner
