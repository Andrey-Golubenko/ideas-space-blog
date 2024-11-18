'use server'

import { format } from 'date-fns'
import { de } from 'date-fns/locale'

import { DailyVisit } from '@prisma/client'
import { type TVisitsByDate } from '~/types/types'

export const getVisitsByDate = async (
  userVisits: DailyVisit[]
): Promise<TVisitsByDate[keyof TVisitsByDate][]> => {
  const visitsByDate = userVisits.reduce((acc, visit) => {
    const formattedDate = format(new Date(visit?.date), 'yyyy-MM-dd', {
      locale: de
    })

    if (!acc[formattedDate]) {
      acc[formattedDate] = {
        date: formattedDate,
        desktop: 0,
        mobile: 0
      }
    }

    if (visit?.isMobile) {
      acc[formattedDate].mobile += 1
    } else {
      acc[formattedDate].desktop += 1
    }

    return acc
  }, {} as TVisitsByDate)

  return Object.values(visitsByDate)
}
