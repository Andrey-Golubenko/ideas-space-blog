'use server'

import { startOfMonth } from 'date-fns'
import { db } from '~/libs/db'
import { getVisitsByDate } from '~/services/userVisits/visitsByDate'
import { getBrowserStats } from '~/services/userVisits/browserStats'

export const fetchUsersVisits = async (
  startDate?: Date,
  endDate?: Date
) => {
  const start = startDate ?? startOfMonth(new Date())
  const end = endDate ?? new Date()

  try {
    const userVisits = await db.dailyVisit.findMany({
      where: {
        date: {
          gte: start,
          lte: end
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    if (!userVisits || userVisits.length === 0) {
      return { visitsByDate: [], browserStats: [] }
    }

    const visitsByDate = await getVisitsByDate(userVisits)

    const browserStats = await getBrowserStats(userVisits)

    return {
      visitsByDate,
      browserStats
    }
  } catch (error) {
    console.error('Error fetching visit:', error)

    return null
  }
}
