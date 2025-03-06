import { Playfair_Display, Poppins } from 'next/font/google'

export const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap'
})

export const fontPlayfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})
