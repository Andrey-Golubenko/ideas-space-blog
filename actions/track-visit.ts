'use server'

import { headers, cookies } from 'next/headers'
import { startOfDay } from 'date-fns'
import { tz } from '@date-fns/tz'

import {
  checkDailyVisitForGast,
  checkDailyVisitForUser
} from '~/services/userVisits/visitLog'
import { createVisit } from '~/actions/create-visit'
import { setCookieWithExpiry } from '~/actions/set-cookie'
import { type Session } from 'next-auth'
import { FullTZDate } from '~/types'

export const trackVisit = async (
  session: Session | null,
  timeZone: string
): Promise<void> => {
  const headersList = headers()
  const cookieStore = cookies()

  const today: Date = (
    startOfDay(new Date(), {
      in: tz(timeZone)
    }) as FullTZDate
  )?.internal

  const ipAddress = headersList.get('x-forwarded-for') ?? ''
  const userAgent = headersList.get('user-agent') ?? ''

  const deviceType = headersList.get('x-device-type')
  const isMobile = deviceType === 'mobile'

  if (session) {
    const { sessionId } = session
    const previousSessionId = cookieStore.get('previousSessionId')?.value

    if (previousSessionId !== sessionId) {
      const userId = session?.user?.id ?? ''

      const visit = await checkDailyVisitForUser(userId, today)

      if (!visit) {
        await createVisit({
          userId,
          date: today,
          ipAddress,
          userAgent,
          isMobile
        })
      }

      setCookieWithExpiry('previousSessionId', sessionId, timeZone)
    }
  }

  if (!session) {
    const previousGastIpAddress = cookieStore.get(
      'previousGastIpAddress'
    )?.value

    const previousUserAgent = cookieStore.get('previousUserAgent')?.value

    const isNotPreviousGast: boolean =
      previousGastIpAddress !== ipAddress &&
      previousUserAgent !== userAgent

    if (isNotPreviousGast) {
      const visit = await checkDailyVisitForGast({
        ipAddress,
        userAgent,
        date: today
      })

      if (!visit) {
        await createVisit({
          userId: null,
          date: today,
          ipAddress,
          userAgent,
          isMobile
        })
      }

      setCookieWithExpiry('previousGastIpAddress', ipAddress, timeZone)
      setCookieWithExpiry('previousUserAgent', userAgent, timeZone)
    }
  }
}
