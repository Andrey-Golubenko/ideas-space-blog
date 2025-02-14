import { type SetStateAction, type Dispatch } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import LoadableImage from '~/components/shared/LoadableImage'

interface IThumbnailsSliderProps {
  imageUrls: string[]
  isMobile: boolean
  isThumbsInLoop: boolean
  thumbsPerView: number
  setThumbsSwiper: Dispatch<SetStateAction<null>>
  thumbsHeight: number
}

const ThumbnailsSlider = ({
  imageUrls,
  isMobile,
  isThumbsInLoop,
  setThumbsSwiper,
  thumbsHeight,
  thumbsPerView
}: IThumbnailsSliderProps) => {
  return (
    <Swiper
      style={{
        // @ts-ignore
        '--swiper-pagination-color': '#fff'
      }}
      onSwiper={setThumbsSwiper as (swiper: unknown) => void}
      navigation={!isMobile}
      loop={isThumbsInLoop}
      spaceBetween={10}
      slidesPerView={thumbsPerView}
      freeMode
      watchSlidesProgress
      modules={[FreeMode, Navigation, Thumbs]}
      className="box-border px-3 py-0 xs:w-[90%] sm:w-[82%] md:w-[75%]"
    >
      {!!imageUrls?.length &&
        imageUrls?.map((url, index) => {
          return (
            <SwiperSlide
              key={url}
              className="flex w-1/4 cursor-pointer items-center justify-center bg-white bg-cover bg-center text-center text-lg grayscale"
            >
              <LoadableImage
                src={url}
                alt="Thumbnail of the post"
                containerHeight={thumbsHeight}
                priority={index === 0}
                imageClassNames="block w-full rounded-md object-cover"
              />
            </SwiperSlide>
          )
        })}
    </Swiper>
  )
}

export default ThumbnailsSlider
