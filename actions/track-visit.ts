'use server'

import { headers, cookies } from 'next/headers'
import { startOfDay } from 'date-fns'
import {
  checkDailyVisitForGast,
  checkDailyVisitForUser
} from '~/services/visitLog'
import { type Session } from 'next-auth'
import { createVisit } from '~/actions/create-visit'

export const trackVisit = async (session: Session | null) => {
  const headersList = headers()
  const cookieStore = cookies()

  const today: Date = startOfDay(new Date())
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

      cookieStore.set('previousSessionId', sessionId)
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

      cookieStore.set('previousGastIpAddress', ipAddress)
      cookieStore.set('previousUserAgent', userAgent)
    }
  }
}
