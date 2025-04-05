'use client'

import Link from 'next/link'
import { Wifi, WifiOff } from 'lucide-react'

import { Button } from '~/components/ui/button'

const OfflinePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 flex items-center justify-center rounded-full bg-yellow-100 p-3">
        <WifiOff className="size-12 text-yellow-600" />
      </div>

      <h1 className="mb-2 text-2xl font-bold">You&apos;re offline</h1>

      <p className="mb-6 max-w-md text-gray-600">
        The page you&apos;re trying to view is not available offline.
        Please check your internet connection and try again.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Wifi className="mr-2 h-4 w-4" />
          Try again
        </Button>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  )
}

export default OfflinePage
