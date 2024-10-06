'use client'

import { IMAGES_PATHS } from '~/utils/constants/constants'
import LoadableImage from '~/components/shared/LoadableImage'

const HeroBanner = () => {
  return (
    <div className="h-[600px] w-full">
      <LoadableImage
        src={IMAGES_PATHS.heroBanner}
        alt="Hero banner"
        width={500}
        height={500}
        priority
        imageClassNames="!animate-banner-scale object-cover h-full w-full"
      />
    </div>
  )
}

export default HeroBanner
