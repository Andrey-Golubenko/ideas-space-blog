'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { type DateRange } from 'react-day-picker'

import { cn } from '~/libs/utils'
import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { Calendar } from '~/components/ui/calendar'

interface IDateRangePickerProps {
  date: DateRange | undefined
  setDate: Dispatch<SetStateAction<DateRange | undefined>>
  className: string | undefined
}

const DateRangePicker = ({
  date,
  setDate,
  className
}: IDateRangePickerProps) => {
  const hasFullRange =
    (date?.from && date?.to && (
      <>
        {format(date.from, 'dd MMM y', { locale: de })} -{' '}
        {format(date.to, 'dd MMM y', { locale: de })}
      </>
    )) ??
    ''

  const hasStartRangeOnly =
    (date?.from &&
      !date?.to &&
      format(date.from, 'dd MMM y', { locale: de })) ??
    ''

  const hasNoStartRange = !date?.from && <span>Pick a date</span>

  return (
    <div className={cn('flex gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
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
            disabled={(thisDate) => {
              return (
                thisDate > new Date() || thisDate < new Date('2024-01-01')
              )
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangePicker
