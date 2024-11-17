'use server'

import { cookies } from 'next/headers'
import { endOfDay } from 'date-fns'
import { tz } from '@date-fns/tz'
import { FullTZDate } from '~/types/types'
import { isWebKitDetermine } from '~/services/userAgent'

export const setCookieWithExpiry = async (
  name: string,
  value: string,
  timeZone: string
) => {
  const cookieStore = cookies()

  const isWebKitUserAgent = await isWebKitDetermine()

  const expiry: Date = isWebKitUserAgent
    ? endOfDay(new Date())
    : (
        endOfDay(new Date(), {
          in: tz(timeZone)
        }) as FullTZDate
      )?.internal

  const now = new Date()

  const endOfTheDay = new Date(now)

  endOfTheDay.setHours(23, 59, 59, 999)

  const secondsUntilEndOfDay = Math.floor(
    (expiry.getTime() - now.getTime()) / 1000
  )

  cookieStore.set(name, value, {
    maxAge: secondsUntilEndOfDay,
    expires: expiry,
    sameSite: 'lax',
    httpOnly: true
  })
}
