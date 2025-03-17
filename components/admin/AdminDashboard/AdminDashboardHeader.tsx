import { useCallback, useState, useTransition } from 'react'
import { type DateRange } from 'react-day-picker'

import useGlobalStore from '~/store'
import { cn } from '~/libs/utils'
import DateRangePicker from '~/components/shared/DateRangePicker'
import LoadableButton from '~/components/shared/LoadableButton'

const AdminDashboardHeader = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  })

  const [isPending, startTransition] = useTransition()

  const { getUsersVisits } = useGlobalStore((state) => {
    return { getUsersVisits: state.getUsersVisits }
  })

  const handleClick = useCallback(() => {
    startTransition(() => {
      try {
        getUsersVisits(date?.from, date?.to)
      } catch (error) {
        console.error('Failed to download statistics:', error)
      }
    })
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
      <LoadableButton
        type="button"
        label="Download statistics"
        isDisabled={isPending}
        variant="outline"
        className={cn(
          'ml-auto w-full border border-black/20 bg-blue-200 hover:bg-blue-200/70 sm:h-9 sm:px-4 sm:py-2 lg:w-auto',
          isPending && 'sm:px-[26px]'
        )}
        onClick={handleClick}
      />
    </section>
  )
}

export default AdminDashboardHeader
