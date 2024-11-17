'use client'

import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import useStore from '~/store'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '~/components/ui/chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'

const chartConfig = {
  views: {
    label: 'Unique user visits'
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

const UsersVisitsGraph = () => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('desktop')

  const [usersVisits, getUsersVisits] = useStore((state) => {
    return [state.usersVisits, state.getUsersVisits]
  })

  useEffect(() => {
    const runGetUsersVisits = async () => {
      await getUsersVisits()
    }

    runGetUsersVisits()
  }, [])

  const total = useMemo(() => {
    return {
      desktop:
        usersVisits?.reduce((acc, item) => {
          return acc + item.desktop
        }, 0) ?? 0,
      mobile:
        usersVisits?.reduce((acc, item) => {
          return acc + item.mobile
        }, 0) ?? 0
    }
  }, [usersVisits])

  return (
    <section className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Users visits</CardTitle>

            <CardDescription>
              Showing total visitors from start of the current month or for
              a given time.
            </CardDescription>
          </div>

          <div className="flex">
            {['desktop', 'mobile'].map((key) => {
              const chart = key as keyof typeof chartConfig
              return (
                <button
                  type="button"
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t sm:px-8 sm:py-6"
                  onClick={() => {
                    return setActiveChart(chart)
                  }}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>

                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toString()}
                  </span>
                </button>
              )
            })}
          </div>
        </CardHeader>

        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[280px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={usersVisits ?? []}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('de-DE', {
                    day: 'numeric',
                    month: 'short'
                  })
                }}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('de-DE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })
                    }}
                  />
                }
              />

              <Bar
                dataKey={activeChart}
                fill={`var(--color-${activeChart})`}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  )
}

export default UsersVisitsGraph
