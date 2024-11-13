'use server'

import { db } from '~/libs/db'

interface INewDailyVisitArs {
  userId: string | null
  date: Date
  ipAddress: string
  userAgent: string
  isMobile: boolean
}

export const createVisit = async ({
  userId,
  date,
  ipAddress,
  userAgent,
  isMobile
}: INewDailyVisitArs) => {
  try {
    await db.dailyVisit.create({
      data: {
        userId,
        date,
        ipAddress,
        userAgent,
        isMobile
      }
    })

    return { success: 'New visit has been successfully created!' }
  } catch (error) {
    return { error: 'Failed to create a new visit!' }
  }
}
