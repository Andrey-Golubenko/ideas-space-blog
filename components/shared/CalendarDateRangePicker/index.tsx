'use client'

import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '~/libs/utils'
import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { Calendar } from '~/components/ui/calendar'

const CalendarDateRangePicker = ({
  className
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    // to: addDays(new Date(2022, 0, 20), 20)
    to: undefined
  })

  const hasFullRange =
    (date?.from && date?.to && (
      <>
        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
      </>
    )) ??
    ''

  const hasStartRangeOnly =
    (date?.from && !date?.to && format(date.from, 'LLL dd, y')) ?? ''

  const hasNoStartRange = !date?.from && <span>Pick a date</span>

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-4" />
            {hasNoStartRange}
            {hasStartRangeOnly}
            {hasFullRange}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CalendarDateRangePicker
