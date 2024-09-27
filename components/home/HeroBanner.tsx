'use client'

import { useParallax } from 'react-scroll-parallax'

import { IMAGES_PATHS } from '~/utils/constants/constants'
import LoadableImage from '~/components/shared/LoadableImage'

const HeroBanner = () => {
  const { ref } = useParallax<HTMLDivElement>({
    speed: 10,
    startScroll: -300,
    endScroll: 300
  })

  return (
    <div
      className="h-[650px] w-full overflow-hidden"
      ref={ref}
    >
      <LoadableImage
        src={IMAGES_PATHS.heroBanner}
        alt="Hero banner"
        width={500}
        height={500}
        priority
        imageClassNames="!animate-banner-scale h-full aspect-video w-full"
      />
    </div>
  )
}

export default HeroBanner
