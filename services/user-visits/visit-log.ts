'use server'

import { db } from '~/libs/db'

interface ICheckDailyVisitForGuestArgs {
  ipAddress: string
  userAgent: string
  date: Date
}

export const checkDailyVisitForUser = async (
  userId: string,
  today: Date
) => {
  try {
    if (userId && today) {
      const visit = await db.dailyVisit.findFirst({
        where: {
          userId,
          date: today
        }
      })

      if (!visit) {
        return null
      }

      return visit
    }

    return null
  } catch (error) {
    console.error('Error fetching visit:', error)

    return null
  }
}

export const checkDailyVisitForGuest = async ({
  ipAddress,
  userAgent,
  date
}: ICheckDailyVisitForGuestArgs) => {
  try {
    if (ipAddress && userAgent && date) {
      const visit = await db.dailyVisit.findFirst({
        where: {
          ipAddress,
          userAgent,
          date
        }
      })

      if (!visit) {
        return null
      }

      return visit
    }

    return null
  } catch (error) {
    console.error('Error fetching visit:', error)

    return null
  }
}
