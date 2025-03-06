'use client'

import { useParallax } from 'react-scroll-parallax'
import { fontPlayfairDisplay } from '~/utils/constants/fonts'

const HeroContent = () => {
  const { ref } = useParallax<HTMLDivElement>({
    speed: 15,
    opacity: [2, 0],
    startScroll: -400,
    endScroll: 400
  })

  return (
    <div
      className="absolute z-10"
      ref={ref}
    >
      <p
        className={`${fontPlayfairDisplay.className} text-outline-black px-10 text-center text-5xl font-bold !italic text-white drop-shadow-[1px_1px_2px_#000] lg:text-6xl`}
      >
        Be inspired, create, embody!
      </p>
    </div>
  )
}

export default HeroContent
