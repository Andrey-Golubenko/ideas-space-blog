'use server'

import { headers, cookies } from 'next/headers'
import { startOfDay } from 'date-fns'
import { tz } from '@date-fns/tz'

import {
  checkDailyVisitForGuest,
  checkDailyVisitForUser
} from '~/services/user-visits/visit-log'
import { createVisit } from '~/actions/create-visit'
import { setCookieWithExpiry } from '~/actions/set-cookie'
import { type Session } from 'next-auth'
import { TFullTZDate } from '~/types'

export const trackVisit = async (
  session: Session | null,
  timeZone: string
): Promise<void> => {
  const headersList = headers()
  const cookieStore = cookies()

  const today: Date = (
    startOfDay(new Date(), {
      in: tz(timeZone)
    }) as TFullTZDate
  )?.internal

  const ipAddress = headersList.get('x-forwarded-for') ?? ''
  const userAgent = headersList.get('user-agent') ?? ''

  const deviceType = headersList.get('x-device-type')
  const isMobile = deviceType === 'mobile'

  if (session) {
    const { sessionId } = session
    const previousSessionId = cookieStore.get('_prev_session_Id')?.value

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

      setCookieWithExpiry('_prev_session_Id', sessionId, timeZone)
    }
  }

  if (!session) {
    const previousGestIpAddress = cookieStore.get('_prevGIA')?.value

    const previousUserAgent = cookieStore.get('_prevUA')?.value

    const isNotPreviousGuest: boolean =
      previousGestIpAddress !== ipAddress &&
      previousUserAgent !== userAgent

    if (isNotPreviousGuest) {
      const visit = await checkDailyVisitForGuest({
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

      setCookieWithExpiry('_prevGIA', ipAddress, timeZone)
      setCookieWithExpiry('_prevUA', userAgent, timeZone)
    }
  }
}
