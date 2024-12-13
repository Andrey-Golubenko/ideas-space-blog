import { useCallback, useState } from 'react'
import { type DateRange } from 'react-day-picker'

import useStore from '~/store'
import DateRangePicker from '~/components/shared/DateRangePicker'
import { Button } from '~/components/ui/button'

const AdminDashboardHeader = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  })

  const [getUsersVisits] = useStore((state) => {
    return [state.getUsersVisits]
  })

  const handleClick = useCallback(async () => {
    try {
      await getUsersVisits(date?.from, date?.to)
    } catch (error) {
      console.error('Failed to download statistics:', error)
    }
  }, [date, getUsersVisits])

  return (
    <section className="mb-8 flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-4">
      <h2 className="flex self-start text-2xl font-bold tracking-tight">
        Hi, Welcome back!
      </h2>

      <DateRangePicker
        date={date}
        setDate={setDate}
        className="ml-auto w-full flex-grow lg:mb-0 lg:w-1/3 2xl:flex-grow-0"
      />

      <Button
        variant="outline"
        size="sm"
        className="ml-auto w-full border border-black/20 bg-blue-200 hover:bg-blue-200/70 sm:h-9 sm:px-4 sm:py-2 lg:w-auto"
        onClick={handleClick}
      >
        Download statistics
      </Button>
    </section>
  )
}

export default AdminDashboardHeader
