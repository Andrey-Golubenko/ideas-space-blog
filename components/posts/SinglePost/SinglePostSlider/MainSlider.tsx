import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import LoadableImage from '~/components/shared/LoadableImage'
import { cn } from '~/libs/utils'

interface IMainSliderProps {
  imageUrls: string[]
  isImageInLoop: boolean
  thumbsSwiper: string | null
}

const MainSlider = ({
  imageUrls,
  isImageInLoop,
  thumbsSwiper
}: IMainSliderProps) => {
  return (
    <Swiper
      style={{
        // @ts-ignore
        '--swiper-pagination-color': '#fff'
      }}
      navigation
      slidesPerView={1}
      loop={isImageInLoop}
      spaceBetween={10}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs]}
      className={cn(
        'mx-auto !mb-8 w-full',
        imageUrls?.length && 'h-[500px]'
      )}
    >
      {!!imageUrls?.length &&
        imageUrls?.map((url, index) => {
          return (
            <SwiperSlide
              key={url}
              className="flex items-center justify-center bg-cover bg-center text-center text-lg"
            >
              <LoadableImage
                src={url}
                alt="Photo of the post"
                containerHeight={500}
                priority={index === 0}
                imageClassNames="block lg:rounded-b-md rounded-t-md object-cover"
              />
            </SwiperSlide>
          )
        })}
    </Swiper>
  )
}

export default MainSlider
