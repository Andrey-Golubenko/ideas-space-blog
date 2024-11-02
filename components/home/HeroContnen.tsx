'use client'

import { useParallax } from 'react-scroll-parallax'
import { fontPlayfairDisplay } from '~/utils/constants/fonts'

const HeroContnen = () => {
  const { ref } = useParallax<HTMLDivElement>({
    speed: 15,
    opacity: [2, 0]
  })

  return (
    <div
      className="absolute"
      ref={ref}
    >
      <p
        className={`${fontPlayfairDisplay.className} text-outline-black px-10 text-center text-5xl font-bold !italic text-white lg:text-6xl`}
      >
        Be inspired, create, embody!
      </p>
    </div>
  )
}

export default HeroContnen
