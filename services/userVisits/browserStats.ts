'use server'

import { getBrowserName } from '~/services/userAgent'
import { type DailyVisit } from '@prisma/client'
import { type IBrowserStats } from '~/types'

export const getBrowserStats = async (
  userVisits: DailyVisit[]
): Promise<IBrowserStats[]> => {
  const browsersSet: Record<string, { visitors: number; fill: string }> = {
    chrome: { visitors: 0, fill: 'var(--color-chrome)' },
    safari: { visitors: 0, fill: 'var(--color-safari)' },
    firefox: { visitors: 0, fill: 'var(--color-firefox)' },
    edge: { visitors: 0, fill: 'var(--color-edge)' },
    other: { visitors: 0, fill: 'var(--color-other)' }
  }

  const browserNames = await Promise.all(
    userVisits.map((visit) => {
      return getBrowserName(visit.userAgent)
    })
  )

  browserNames.forEach((browserName) => {
    if (browsersSet[browserName]) {
      browsersSet[browserName].visitors += 1
    } else {
      browsersSet.other.visitors += 1
    }
  })

  const browserStats: IBrowserStats[] = Object.entries(browsersSet).map(
    ([browser, { visitors, fill }]) => {
      return {
        browser,
        visitors,
        fill
      }
    }
  )

  return browserStats
}
