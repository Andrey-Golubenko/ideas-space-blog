'use server'

import { startOfMonth, format } from 'date-fns'
import { de } from 'date-fns/locale'
import { db } from '~/libs/db'

type VisitsByDate = Record<
  string,
  { date: string; desktop: number; mobile: number }
>

export const fetchUsersVisits = async (
  startDate?: Date,
  endDate?: Date
) => {
  const start = startDate ?? startOfMonth(new Date())

  const end = endDate || new Date()

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
      return []
    }

    const visitsByDate = userVisits.reduce((acc, visit) => {
      const formattedDate = format(new Date(visit.date), 'yyyy-MM-dd', {
        locale: de
      })

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          date: formattedDate,
          desktop: 0,
          mobile: 0
        }
      }

      if (visit.isMobile) {
        acc[formattedDate].mobile += 1
      } else {
        acc[formattedDate].desktop += 1
      }

      return acc
    }, {} as VisitsByDate)

    return Object.values(visitsByDate)
  } catch (error) {
    console.error('Error fetching visit:', error)

    return null
  }
}
