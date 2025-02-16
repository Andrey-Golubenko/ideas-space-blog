import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { auth } from '~/libs/auth/auth'
import { Toaster } from '~/components/ui/sonner'
import Providers from '~/components/layout/Providers'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import CookiesBanner from '~/components/layout/CookiesBanner'
import ClientTrackVisit from '~/components/layout/ClientTrackVisit'
import CookiesBannerTrigger from '~/components/layout/CookiesBanner/CookiesBannerTrigger'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ideas space',
  description:
    'Blog is designed to inspire and share knowledge on a wide range of topics, from technology to art',
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/icons/favicon.svg', color: '#5bbad5' }
    ]
  },
  robots: { index: true, follow: true }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CookiesBanner />

          <CookiesBannerTrigger tooltip="Manage cookies preferences" />

          <div className="relative flex h-screen flex-col">
            <Header />

            <Toaster
              position="top-center"
              toastOptions={{
                className: 'h-[65px] text-base pl-8 md:min-w-[450px]',
                classNames: {
                  closeButton:
                    'right-0 left-auto top-1/2 -translate-x-[50%] -translate-y-[50%] !text-black mr-8 !w-6 !h-6'
                }
              }}
            />

            {children}

            <Footer />
          </div>

          <ClientTrackVisit session={session} />
        </Providers>
      </body>
    </html>
  )
}
